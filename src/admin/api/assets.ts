import { request } from '@strapi/helper-plugin';
import pluginId from '../pluginId';

const assetsRequests = {
  getAllvideos: async () => {
    return await request(`/${pluginId}/api-video-asset`, {
      method: 'GET',
    });
  },

  getVideoDetail: async (videoId: string) => {
    return await request(`/${pluginId}/api-video-asset/${videoId}`, {
      method: 'GET',
    });
  },
  createVideoAsset: async (body: Object) => {
    return await request(`/${pluginId}/api-video-asset/create/asset`, {
      method: 'POST',
      body,
    });
  },
  createVideoId: async (body: Object) => {
    return await request(`/${pluginId}/api-video-asset/create`, {
      method: 'POST',
      body,
    });
  },

  create: async (body: Object) => {
    return await request(`/${pluginId}/api-video-asset`, {
      method: 'POST',
      body,
    });
  },
  update: async (id: number, videoId: string, body: any) => {
    return await request(`/${pluginId}/api-video-asset/${id}/${videoId}`, {
      method: 'PUT',
      body,
    });
  },
  delete: async (id: number, videoId: string) => {
    return await request(`/${pluginId}/api-video-asset/${id}/${videoId}`, {
      method: 'DELETE',
    });
  },
};

export default assetsRequests;
