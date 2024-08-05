import { factories, Strapi } from '@strapi/strapi';
import pluginId from '../../admin/pluginId';
import { CustomVideo } from '../../types';
import { configGumletClient, getConfig } from '../utils/config';

const model = `plugin::${pluginId}.api-video-asset`;

export default factories.createCoreService<any, any>(
  model,
  (params: { strapi: Strapi }) => ({
    async createVideoAsset(data: any) {
      console.log('Create video asset on Gumlet via URL.');

      const client = await configGumletClient();
      const { videoFormat } = await getConfig();

      try {
        const gumletResponse = await client.post('/video/assets', {
          format: videoFormat,
          input: data['videoURL'],
          collection_id: data['collectionId'],
          title: data['title'],
          description: data['description'],
          tag: data['tags'],
        });

        const assetId = gumletResponse.data.asset_id;
        const playbackUrl = gumletResponse.data.output.playback_url;
        const thumbnail = gumletResponse.data.output.thumbnail_url[0];

        console.log('Successfully created video asset on the Gumlet.');

        return { assetId, thumbnail, playbackUrl };
      } catch (error) {
        console.error('Error creating direct upload URL:', error);
        throw error;
      }
    },

    async createVideoId(data: any) {
      console.log('Create direct upload URL endpoint on gumlet');

      const client = await configGumletClient();
      const { videoFormat } = await getConfig();

      try {
        const gumletResponse = await client.post('/video/assets/upload', {
          format: videoFormat,
          collection_id: data['collectionId'],
          title: data['title'],
          description: data['description'],
          tag: data['tags'],
        });

        const uploadUrl = gumletResponse.data.upload_url;
        const assetId = gumletResponse.data.asset_id;
        const playbackUrl = gumletResponse.data.output.playback_url;
        const thumbnail = gumletResponse.data.output.thumbnail_url[0];

        console.log('Successfully created gumlet direct upload URL.');

        return { uploadUrl, assetId, thumbnail, playbackUrl };
      } catch (error) {
        console.error('Error creating direct upload URL:', error);
        throw error;
      }
    },

    async getVideoDetail(videoId: string) {
      try {
        console.log(videoId);
        const client = await configGumletClient();
        const gumletResponse = await client.get(`/video/assets/${videoId}`);

        console.log('Response of gunlet API - ');
        console.log(gumletResponse);

        const duration = gumletResponse.data.input.duration;
        return { duration };
      } catch (error) {
        console.log(
          'Error while fetching the details of the video form gumlet: ',
          error
        );
        throw error;
      }
    },

    async findAll(query: any) {
      console.log('Find all endpoint');
      return await strapi.entityService.findMany(model, query);
    },

    async create(data: CustomVideo) {
      console.log('Create video endpoint');

      try {
        await strapi.entityService.create(model, { data });
        return true;
      } catch (error) {
        console.log('Error occured while creating asset');
        console.log(error);

        return false;
      }
    },

    async delete(id: string, videoId: string): Promise<boolean> {
      const client = await configGumletClient();
      try {
        await client.delete(`/video/assets/${videoId}`);
        await strapi.entityService.delete(model, id);
        return true;
      } catch (error) {
        return false;
      }
    },

    async update(id: string, videoId: string, data: any) {
      try {
        const client = await configGumletClient();

        const updateData = {
          ...data,
          metadata: data.metadata.reduce((accumulator, currentObject) => {
            accumulator[currentObject.key] = currentObject.value;
            return accumulator;
          }, {}),
        };
        await client.post('/video/assets/update', {
          asset_id: videoId,
          ...updateData,
        });
        console.log('Updated video on gumlet');

        const res = await strapi.entityService.update(model, id, {
          data: data,
        });
        console.log('Update strapi asset');

        return res;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  })
);
