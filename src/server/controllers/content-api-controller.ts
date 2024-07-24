import { factories } from '@strapi/strapi';
import pluginId from '../../admin/pluginId';
import { CustomVideo } from '../../types';

const model = `plugin::${pluginId}.api-video-asset`;

export default factories.createCoreController(
  'plugin::strapi-uploader-plugin.api-video-asset',
  ({ strapi }) => ({
    async count(ctx) {
      // @ts-ignore
      return await strapi.entityService.count(model, ctx.query);
    },
    async find(ctx) {},
    async findOne(ctx) {},
  })
);
