import { Strapi } from '@strapi/strapi';
import { CustomSettings } from '../../types';
import { configGumletClient, isGumletApiKeyValid } from '../utils/config';
import fetchCollectionIdMap from '../../admin/utils/collectionId';

export default ({ strapi }: { strapi: Strapi }) => ({
  async getSettings() {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-plugin-gumlet',
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

    const collectionIdMap = await pluginStore.get({
      key: 'collectionIdMap',
    });

    const res: CustomSettings = {
      apiKey: configKey as string,
      defaultPublic: (defaultPublic ?? true) as boolean,
      videoFormat: (videoFormat ?? 'MP4') as string,
      collectionIds: (collectionIds ?? []) as string[],
      collectionIdMap: (collectionIdMap ?? {}) as { [key: string]: string },
    };
    return res;
  },

  async saveSettings(settings: CustomSettings) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-plugin-gumlet',
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

        const collectionIdMap = await fetchCollectionIdMap(
          settings.collectionIds
        );
        await pluginStore.set({
          key: 'collectionIdMap',
          value: collectionIdMap,
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
