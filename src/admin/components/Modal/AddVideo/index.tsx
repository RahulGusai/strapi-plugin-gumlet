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
import { DROPBOX_CLIENT_ID } from '../../../constants/dropbox';
import DropboxChooser from 'react-dropbox-chooser';

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
  const [dropboxFileLinks, setDropboxFileLinks] = useState<string[]>([]);
  const [dropboxFileNames, setDropboxFileNames] = useState<string[]>([]);

  // CONSTANTS
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const { title, description, tags, metadata, collectionId, videoURL } =
    inputData;

  const displayVideoFrame = (
    video: HTMLVideoElement,
    source: HTMLSourceElement,
    file: File
  ) => {
    source.setAttribute('src', URL.createObjectURL(file));
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

  function handleDropboxFiles(files) {
    setUploadMethod('dropbox');
    setDropboxFileLinks(
      files.map((file) => {
        return file.link;
      })
    );
    setDropboxFileNames(
      files.map((file) => {
        return file.name;
      })
    );
  }

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
      return (
        <Wrapper>
          <Stack spacing={2}>
            <Typography>{`${dropboxFileLinks.length} ${
              dropboxFileLinks.length > 1 ? 'files' : 'file'
            } selected`}</Typography>
            <ul>
              {dropboxFileNames.map((fileName, index) => (
                <li key={index}>
                  <Typography variant="omega">{`${
                    index + 1
                  }. ${fileName}`}</Typography>
                </li>
              ))}
            </ul>
          </Stack>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <Stack size={4}>
            <Button
              variant="primary"
              onClick={() => {
                setUploadMethod('file');
              }}
            >
              Upload via File
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setUploadMethod('url');
              }}
            >
              Upload via URL
            </Button>

            <DropboxChooser
              appKey={DROPBOX_CLIENT_ID}
              success={handleDropboxFiles}
              cancel={() => console.log('closed')}
              multiselect={true}
            >
              <Button variant="primary">Upload via Dropbox</Button>
            </DropboxChooser>
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
              dropboxFileLinks={dropboxFileLinks}
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

const DropboxWrapper = styled.div`
  width: 100%;
  height: 300px;
  border: 1px dashed #eaeaea;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: border 0.4s ease-in-out;
  margin-bottom: 20px;
  padding: 10px;

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
