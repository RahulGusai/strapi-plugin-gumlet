import React, { FC, useEffect, useState, useRef, ChangeEvent } from 'react';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Button } from '@strapi/design-system/Button';
import { Typography } from '@strapi/design-system/Typography';
import FieldComp from '../../FieldComp/Fields';
import UploadButton from '../../Button/UploadButton';
import ImportZone from './importZone';
import Tags from '../../Tags';
import { InputData } from '../../../../types';
import MetadataTable from '../../Metadata';
import CollectionId from '../../CollectionId';
import { Stack } from '@strapi/design-system/Stack';
import styled from 'styled-components';
import { FieldLabel, FieldInput } from '@strapi/design-system/Field';
import { Dropbox } from 'dropbox';

interface IAddVideoModalProps {
  close: () => void;
  update: () => void;
}

const AddVideoModal: FC<IAddVideoModalProps> = ({
  update,
  close,
}): JSX.Element => {
  const [inputData, setInputData] = useState<InputData>({
    title: '',
    description: '',
    tags: [],
    metadata: [
      {
        key: 'Upload source',
        value: 'Strapi',
      },
    ],
    collectionId: '',
  });

  const [file, setFile] = useState<File | undefined>();
  const [initialState, setInitialState] = useState<number>(0);
  const [uploadMethod, setUploadMethod] = useState<
    'file' | 'url' | 'dropbox' | undefined
  >(undefined);

  // CONSTANTS
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const { title, description, tags, metadata, collectionId, videoURL } =
    inputData;

  // useEffect(() => {
  //   if (dropboxAccessToken != undefined) {
  //     setUploadMethod('dropbox');
  //   }
  // }, [dropboxAccessToken]);

  const displayVideoFrame = (
    video: HTMLVideoElement,
    source: HTMLSourceElement,
    file: File
  ) => {
    // Object Url as the video source
    source.setAttribute('src', URL.createObjectURL(file));
    // Load the video and show it
    video.load();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
  };

  const updateCollectionId = (collectionId: string) => {
    setInputData({ ...inputData, collectionId: collectionId });
  };

  const updateVideoURL = (event: ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, videoURL: event.target.value });
  };

  const handleSetTag = (tag: string) => {
    if (tag) {
      setInputData({ ...inputData, tags: [...(inputData.tags || []), tag] });
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = inputData.tags && inputData.tags.filter((t) => t !== tag);
    setInputData({ ...inputData, tags: newTags });
  };

  const handleSetMetadata = (metadata: any) => {
    if (metadata) {
      setInputData({
        ...inputData,
        metadata: [...(inputData.metadata || []), metadata],
      });
    }
  };

  const handleRemoveMetadata = (metadata: Object) => {
    const newMetadata =
      inputData?.metadata && inputData?.metadata.filter((m) => m !== metadata);
    setInputData({ ...inputData, metadata: newMetadata });
  };

  const onFileSelected = (file: File) => {
    console.log(file, 'file');
    setFile(file);
    setInputData((prevInputData) => ({
      ...prevInputData,
      title: file.name.replace(/\.[^/.]+$/, ''),
    }));
    if (initialState === 0) {
      setInitialState(1);
    }
    if (videoRef.current && sourceRef.current)
      displayVideoFrame(videoRef.current, sourceRef.current, file);
  };
  const connectToDropbox = () => {
    const clientId = 'xzz26raqipbnvup';
    const redirectUri =
      'http://localhost:1337/admin/plugins/strapi-uploader-plugin';
    const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  const fetchDropboxFiles = async (accessToken) => {
    var Dropbox = require('dropbox').Dropbox;
    var dbx = new Dropbox({ accessToken });

    const files = await dbx.filesListFolder({ path: '' });

    const videos = files.result.entries.filter(
      (file) => file['.tag'] === 'file'
    );

    return videos.map((video) => {
      return video.path_lower;
    });
    // for (const video of videos) {
    //   const response = await dbx.filesGetTemporaryLink({
    //     path: video.path_lower,
    //   });
    // }
  };

  const renderUploadMethod = () => {
    if (uploadMethod === 'file') {
      return (
        <ImportZone
          initialState={initialState}
          onFileSelected={onFileSelected}
          videoRef={videoRef}
          sourceRef={sourceRef}
        />
      );
    } else if (uploadMethod === 'url') {
      return (
        <Wrapper>
          <Stack>
            <FieldLabelStyled required={true}>Video URL</FieldLabelStyled>
            <FieldInput
              placeholder="Enter URL to import a file"
              type="text"
              onChange={updateVideoURL}
            />
          </Stack>
        </Wrapper>
      );
    } else if (uploadMethod === 'dropbox') {
      connectToDropbox();
      // <Wrapper>
      //   <Typography>Connecting to Gumlet...</Typography>
      // </Wrapper>;
    } else {
      return (
        <Wrapper>
          <Stack size={4}>
            <Button variant="primary" onClick={() => setUploadMethod('file')}>
              Upload via File
            </Button>
            <Button variant="secondary" onClick={() => setUploadMethod('url')}>
              Upload via URL
            </Button>
            <Button
              variant="tertiary"
              onClick={() => setUploadMethod('dropbox')}
            >
              Upload via Dropbox
            </Button>
          </Stack>
        </Wrapper>
      );
    }
  };

  return (
    <ModalLayout onClose={close} labelledBy="title">
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Upload a video
        </Typography>
      </ModalHeader>
      <ModalBody>
        {renderUploadMethod()}
        <FieldComp
          name="title"
          label="Title"
          value={title}
          placeholder="Enter your title"
          onChange={handleChange}
          required
        />
        <br />
        <FieldComp
          name="description"
          label="Description"
          value={description || ''}
          placeholder="Enter a description"
          onChange={handleChange}
          required
        />
        <br />

        <CollectionId
          name="Collection Id"
          description="Collection Id"
          required={true}
          selectedValue={collectionId}
          onChange={updateCollectionId}
        ></CollectionId>
        <br />

        <Tags
          handleSetTag={handleSetTag}
          handleRemoveTag={handleRemoveTag}
          tags={tags || []}
          editable={true}
        />

        <MetadataTable
          metadata={metadata}
          handleSetMetadata={handleSetMetadata}
          handleRemoveMetadata={handleRemoveMetadata}
          editable={true}
        />
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={close} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={
          <>
            <UploadButton
              uploadMethod={uploadMethod}
              currentFile={file}
              title={title}
              description={description}
              tags={tags || []}
              metadata={metadata || []}
              collectionId={collectionId}
              videoURL={videoURL}
              update={update}
              close={close}
            />
          </>
        }
      />
    </ModalLayout>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  border: 1px dashed #eaeaea;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border 0.4s ease-in-out;
  margin-bottom: 20px;

  &:hover {
    border: 1px dashed #4642eb;
  }
`;

const FieldLabelStyled = styled(FieldLabel)`
  width: 100%;
  & > div {
    width: max-content;
  }
`;

export default AddVideoModal;
