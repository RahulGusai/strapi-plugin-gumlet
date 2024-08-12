import React, { useState, useEffect, FC } from 'react';
import { Select, Option } from '@strapi/design-system';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import assetsRequests from '../../api/assets';
import styled from 'styled-components';
import { Flex } from '@strapi/design-system/Flex';
import { Field } from '@strapi/design-system/Field';
import VideoAssets from '@api.video/nodejs-client/lib/model/VideoAssets';

interface GumletVideoFieldProps {
  name: string;
  error: string;
  attribute;
}

const GumletVideoField: FC<GumletVideoFieldProps> = ({
  name,
  error,
  attribute,
}): JSX.Element => {
  const { modifiedData, onChange } = useCMEditViewDataManager();
  const [videoAssets, setVideoAssets] = useState([]);
  const [assetId, setAssetId] = useState(null);

  useEffect(() => {
    if (modifiedData[name]) {
      setAssetId(JSON.parse(modifiedData[name]).assetId);
    }
  }, [modifiedData]);

  useEffect(() => {
    const fetchGumletAssets = async () => {
      const gumletAssets = await assetsRequests.getAllvideos();
      setVideoAssets(gumletAssets);

      if (assetId && !gumletAssets.some((asset) => asset.videoId === assetId)) {
        setAssetId('');
      }
    };

    fetchGumletAssets();
  }, [assetId]);

  const handleChange = (value) => {
    onChange({
      target: {
        name: name,
        value: JSON.stringify(value),
        type: attribute.type,
      },
    });
  };

  return (
    <Field name={name} id={name} error={error}>
      <Select
        label="Select Gumlet Video"
        name="gumletVideo"
        value={assetId || ''}
        onChange={(value: string) => handleChange({ assetId: value })}
      >
        {videoAssets.map((asset) => (
          <Option key={asset.videoId} value={asset.videoId}>
            {asset.title}
          </Option>
        ))}
      </Select>
      {assetId && assetId.length > 0 && (
        <Flex paddingTop={4} justifyContent={'center'}>
          <iframe
            title="Gumlet video player"
            style={{ width: '60%', height: '300px' }}
            src={`https://play.gumlet.io/embed/${assetId}?preload=false&autoplay=false&loop=false&disable_player_controls=false`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
          ></iframe>
        </Flex>
      )}
    </Field>
  );
};

export default GumletVideoField;
