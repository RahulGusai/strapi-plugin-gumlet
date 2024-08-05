import * as packageJson from '../../../package.json';
import { CustomSettings } from '../../types';
import axios from 'axios';

const getConfig = async () => {
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
    apiKey: configKey,
    defaultPublic: defaultPublic ?? true,
    videoFormat: videoFormat ?? 'MP4',
    collectionIds: collectionIds ?? [],
  };
  return res;
};

const isGumletApiKeyValid = async (apiKey: string) => {
  try {
    console.log('checking gumlet API key');
    const response = await axios.get(
      'https://api.gumlet.com/v1/video/sources',
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    console.log(response);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const configGumletClient = async () => {
  const config = await getConfig();
  const apiKey = config.apiKey;

  const client = axios.create({
    baseURL: 'https://api.gumlet.com/v1',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return client;
};

export { getConfig, isGumletApiKeyValid, configGumletClient };
