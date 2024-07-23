import { factories, Strapi } from '@strapi/strapi';
import pluginId from '../../admin/pluginId';
import { CustomVideo } from '../../types';
import { configClient, configGumletClient } from '../utils/config';
import { replacePrivateVideoTokens } from '../utils/private-videos';

const model = `plugin::${pluginId}.api-video-asset`;

export default factories.createCoreService<any, any>(
  model,
  (params: { strapi: Strapi }) => ({
    async createVideoId(data: any) {
      console.log('Create direct upload URL endpoint on gumlet');

      const client = await configGumletClient();

      try {
        // Create a direct upload URL from Gumlet
        const gumletResponse = await client.post('/video/assets/upload', {
          collection_id: '669d74091c2a88fdb5b2759f',
          format: 'MP4',
          title: data['title'],
          description: data['description'],
          tag: data['tags'],
        });

        const uploadUrl = gumletResponse.data.upload_url;
        const assetId = gumletResponse.data.asset_id;
        const thumbnail = gumletResponse.data.output.thumbnail_url[0];
        const playbackUrl = gumletResponse.data.output.playback_url;

        console.log('Successfully created gumlet direct upload URL.');

        return { uploadUrl, assetId, thumbnail, playbackUrl };
      } catch (error) {
        console.error('Error creating direct upload URL:', error);
        throw error;
      }
    },

    async findAll(query: any) {
      console.log('Find all endpoint');
      return await strapi.entityService.findMany(model, query);
    },

    async token(videoId: string) {
      const client = await configClient();

      const video = await client.videos.get(videoId);

      return {
        token: video?._public ? undefined : video.assets?.player?.split('=')[1],
      };
    },

    async create(data: CustomVideo) {
      console.log('Create video endpoint');

      try {
        if (!data._public) {
          data = await replacePrivateVideoTokens(
            data,
            '11111111-1111-1111-1111-111111111111'
          );
        }
        await strapi.entityService.create(model, { data });
        return true;
      } catch (error) {
        console.log('Error occured while creating asset');
        console.log(error);

        return false;
      }
    },

    async delete(id: string, videoId: string): Promise<boolean> {
      const client = await configClient();
      try {
        await client.videos.delete(videoId);
        await strapi.entityService.delete(model, id);
        return true;
      } catch (error) {
        return false;
      }
    },

    async update(id: string, videoId: string, data: any) {
      const client = await configClient();
      try {
        const updatedVideo = await client.videos.update(videoId, data);

        let customVideo = {
          title: updatedVideo.title,
          description: updatedVideo.description,
          _public: updatedVideo._public,
          videoId: updatedVideo.videoId,
          hls: updatedVideo.assets?.hls,
          iframe: updatedVideo.assets?.iframe,
          mp4: updatedVideo?.assets?.mp4,
          player: updatedVideo.assets?.player,
          thumbnail: updatedVideo?.assets?.thumbnail,
          tags: updatedVideo.tags,
          metadata: updatedVideo.metadata,
        } as CustomVideo;
        if (!customVideo._public) {
          customVideo = await replacePrivateVideoTokens(
            customVideo,
            '11111111-1111-1111-1111-111111111111'
          );
        }
        const res = await strapi.entityService.update(model, id, {
          data: customVideo,
        });
        return res;
      } catch (error) {
        return false;
      }
    },
  })
);
