import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { Checkbox } from '@strapi/design-system';
import { Radio } from '@strapi/design-system';
import React, { FC, SetStateAction } from 'react';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import styled from 'styled-components';

interface DropboxViewProps {
  dropboxFilePaths: string[];
  selectedFilePath: string;
  setUploadMethod: (arg0: SetStateAction<'url' | 'file' | 'dropbox'>) => void;
  handleRadioChange: (arg0: string) => void;
}

const DropboxView: FC<DropboxViewProps> = ({
  dropboxFilePaths,
  selectedFilePath,
  setUploadMethod,
  handleRadioChange,
}) => {
  return (
    <DropboxWrapper>
      <Stack spacing={2}>
        <Typography fontWeight="bold">Dropbox</Typography>
        <Flex gap={3}>
          <Typography>rgusai97@gmail.com</Typography>
          <Button onClick={() => setUploadMethod(undefined)} variant="danger">
            Logout
          </Button>
        </Flex>
        <Box padding={2} hasRadius background="neutral100">
          {dropboxFilePaths.map((filePath, index) => (
            <Radio
              key={filePath}
              onChange={() => handleRadioChange(filePath)}
              checked={selectedFilePath === filePath}
            >
              <Typography>{`${index + 1}. ${filePath}`}</Typography>
            </Radio>
          ))}
        </Box>
      </Stack>
    </DropboxWrapper>
  );
};

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
export default DropboxView;
