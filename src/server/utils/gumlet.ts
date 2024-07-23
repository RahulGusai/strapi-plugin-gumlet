import axios from 'axios';

const createDirectUploadUrl = async (
  apiKey: string,
  collectionId: string,
  format: string
) => {
  const response = await axios.post(
    'https://api.gumlet.com/v1/assets/direct-upload',
    { collectionId, format },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.upload_url;
};

const uploadVideo = async (apiKey: string, videoFilePath: string) => {
  const uploadUrl = await createDirectUploadUrl(apiKey, '', '');

  // const videoData = await fs.promises.readFile(videoFilePath);

  const response = await axios.put(
    uploadUrl,
    {},
    {
      headers: {
        'Content-Type': 'video/mp4',
      },
    }
  );

  return response.data;
};
