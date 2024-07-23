import React, { useState, FC } from 'react';
import { VideoUploader } from '@api.video/video-uploader';
import assetsRequests from '../../../api/assets';
import { Button } from '@strapi/design-system/Button';
import { useNotification } from '@strapi/helper-plugin';

import CloudUpload from '@strapi/icons/CloudUpload';
import axios from 'axios';
import { Thumbnail } from '../../Videos/styles';

export interface IUploadButtonProps {
  currentFile: File | undefined;
  title: string;
  description: string;
  _public: boolean;
  tags: string[];
  metadata: { key: string; value: string }[];
  update: () => void;
  close: () => void;
}

const UploadButton: FC<IUploadButtonProps> = ({
  currentFile,
  title,
  description,
  _public,
  tags,
  metadata,
  update,
  close,
}): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const notification = useNotification();
  const uploadIsDisabled =
    currentFile === undefined ||
    title.trim().length < 1 ||
    description.trim().length < 1;

  const fileInputChange = async () => {
    const body = {
      title: title,
      description: description,
      _public: _public,
      tags: tags,
      metadata: metadata,
    };
    if (currentFile) {
      const { uploadUrl, assetId, thumbnail, playbackUrl } =
        await assetsRequests.createVideoId(body);

      setIsUploading(true);
      try {
        console.log(`Uploading the video to the gumlet's URL`);

        await axios.put(uploadUrl, currentFile, {
          headers: {
            'Content-Type': currentFile.type,
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            setProgress(Math.round((loaded * 100) / total));
          },
        });

        console.log('Video successfully uploaded on the Gumlet.');

        const body = {
          title: title,
          description: description,
          _public: true,
          videoId: assetId,
          hls: '',
          iframe: '',
          mp4: playbackUrl,
          player: '',
          thumbnail: thumbnail,
        };
        const assetData = await assetsRequests.create(body);

        if (assetData) {
          setIsUploading(false);
          update();
        } else {
          notification({
            type: 'warning',
            message: 'Error while creating video',
          });
        }
      } catch (e) {
        console.error(e);
      }
      close();
    }
  };

  return (
    <Button
      endIcon={<CloudUpload />}
      loading={isUploading}
      onClick={fileInputChange}
      disabled={uploadIsDisabled}
    >
      {isUploading ? `Uploading ${progress}%` : `Upload`}
    </Button>
  );
};

export default UploadButton;
