import { Button } from '@strapi/design-system/Button';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { Table, Tbody, Td, Th, Thead, Tr } from '@strapi/design-system/Table';
import { Typography } from '@strapi/design-system/Typography';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import Link from '@strapi/icons/Link';
import React, { FC, useState } from 'react';
import { CustomAssets, CustomVideo } from '../../../types';
import { SubTitle, Title } from '../../styles/form';
import { copyClipboard } from '../../utils';
import { useTheme } from '../../utils/hooks';

interface LinksProps {
  video: CustomVideo;
}

const videoToAssets = (video: CustomVideo): CustomAssets => {
  const assets = {
    playbackUrl: video.playbackUrl,
    // iframe: video.iframe,
    // mp4: video.mp4,
    // player: video.player,
  };
  return assets;
};

const LinksTable: FC<LinksProps> = ({ video }) => {
  const [assets, setAssets] = useState<CustomAssets>(videoToAssets(video));
  const theme = useTheme();
  const COL_COUNT = 4;
  const ROW_COUNT = 2;

  return (
    <>
      <Title dark={theme === 'dark'} style={{ marginTop: '20px' }}>
        Links
      </Title>
      <SubTitle>
        A list of links you can copy by clicking on the copy button.
      </SubTitle>

      {assets && (
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">Type</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Link</Typography>
              </Th>
              <Th>
                <VisuallyHidden>Copy</VisuallyHidden>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(assets).map((links, index) => (
              <Tr key={index}>
                <Td>
                  <Typography textColor="neutral800">{links[0]}</Typography>
                </Td>
                <Td
                  style={{
                    flex: '1',
                    overflow: 'hidden',
                    maxWidth: '50ch',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography textColor="neutral800">{links[1]}</Typography>
                </Td>
                <Td>
                  <Flex justifyContent={'flex-end'}>
                    <IconButton
                      onClick={() => copyClipboard(links[1])}
                      label={'Copy'}
                      noBorder
                      icon={<Link />}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
};

export default LinksTable;
