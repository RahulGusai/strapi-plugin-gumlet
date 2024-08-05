import { Strapi } from '@strapi/strapi';
import { CustomSettings } from '../../types';
import { isGumletApiKeyValid } from '../utils/config';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getSettings() {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-uploader-plugin',
    });

    const defaultPublic = await pluginStore.get({
      key: 'defaultPublic',
    });

    const configKey = await pluginStore.get({
      key: 'apiKey',
    });

    const videoFormat = await pluginStore.get({
      key: 'videoFormat',
    });

    const collectionIds = await pluginStore.get({
      key: 'collectionIds',
    });

    const res: CustomSettings = {
      apiKey: configKey as string,
      defaultPublic: (defaultPublic ?? true) as boolean,
      videoFormat: (videoFormat ?? 'MP4') as string,
      collectionIds: (collectionIds ?? []) as string[],
    };
    return res;
  },

  async saveSettings(settings: CustomSettings) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-uploader-plugin',
    });

    try {
      const isValid = await isGumletApiKeyValid(settings.apiKey);
      if (isValid) {
        await pluginStore.set({
          key: 'apiKey',
          value: settings.apiKey,
        });

        await pluginStore.set({
          key: 'defaultPublic',
          value: settings.defaultPublic,
        });

        await pluginStore.set({
          key: 'videoFormat',
          value: settings.videoFormat,
        });

        await pluginStore.set({
          key: 'collectionIds',
          value: settings.collectionIds,
        });

        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  },
});
