import React, { useState, FC } from 'react';
import assetsRequests from '../../../api/assets';
import { Button } from '@strapi/design-system/Button';
import { useNotification } from '@strapi/helper-plugin';
import CloudUpload from '@strapi/icons/CloudUpload';
import axios from 'axios';
import { Body } from '@strapi/helper-plugin';

export interface IUploadButtonProps {
  uploadMethod: string | undefined;
  currentFile: File | undefined;
  title: string;
  description: string;
  tags: string[];
  metadata: { key: string; value: string }[];
  collectionId: string;
  videoURL: string | undefined;
  update: () => void;
  close: () => void;
}

const UploadButton: FC<IUploadButtonProps> = ({
  uploadMethod,
  currentFile,
  title,
  description,
  tags,
  metadata,
  collectionId,
  videoURL,
  update,
  close,
}): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const notification = useNotification();
  let uploadIsDisabled =
    uploadMethod === undefined ||
    title.trim().length < 1 ||
    description.trim().length < 1 ||
    collectionId.length == 0;

  if (uploadMethod == 'file')
    uploadIsDisabled = uploadIsDisabled || currentFile === undefined;
  if (uploadMethod === 'url')
    uploadIsDisabled =
      uploadIsDisabled || videoURL === undefined || videoURL.length == 0;

  const fileInputChange = async () => {
    const body = {
      title: title,
      description: description,
      tags: tags,
      metadata: metadata,
      collectionId: collectionId,
    };

    if (uploadMethod == 'file') {
      uploadViaFile(body, currentFile);
    }

    if (uploadMethod == 'url') {
      uploadViaURL(body, videoURL);
    }
  };

  const uploadViaFile = async (body, currentFile: File) => {
    const { uploadUrl, assetId, thumbnail, playbackUrl } =
      await assetsRequests.createVideoId(body);

    setIsUploading(true);
    try {
      console.log(`Uploading the video to the gumlet's URL`);

      await axios.put(uploadUrl, currentFile, {
        headers: {
          'Content-Type': currentFile.type,
        },
        onUploadProgress: async (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentageCompleted = Math.round((loaded * 100) / total);
          setProgress(percentageCompleted);
        },
      });

      console.log('Video successfully uploaded on the Gumlet.');

      const strapiAssetData = {
        ...body,
        videoId: assetId,
        playbackUrl: playbackUrl,
        thumbnail: thumbnail,
      };
      createStrapiAsset(strapiAssetData);
    } catch (e) {
      console.error(e);
    }

    close();
  };

  const uploadViaURL = async (body, videoURL: string) => {
    const { assetId, thumbnail, playbackUrl } =
      await assetsRequests.createVideoAsset({ ...body, videoURL: videoURL });

    const strapiAssetData = {
      ...body,
      videoId: assetId,
      playbackUrl: playbackUrl,
      thumbnail: thumbnail,
    };
    createStrapiAsset(strapiAssetData);

    close();
  };

  const createStrapiAsset = async (strapiAssetData) => {
    const assetData = await assetsRequests.create(strapiAssetData);

    if (assetData) {
      setIsUploading(false);
      update();
    } else {
      notification({
        type: 'warning',
        message: 'Error while creating video',
      });
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
