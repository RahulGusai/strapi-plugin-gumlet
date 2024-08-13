import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { Select, Option } from '@strapi/design-system';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import assetsRequests from '../../api/assets';
import styled from 'styled-components';
import { Flex } from '@strapi/design-system/Flex';
import { Field } from '@strapi/design-system/Field';
import { FieldInput, FieldLabel } from '@strapi/design-system/Field';

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
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [assetId, setAssetId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (modifiedData[name]) {
      setAssetId(JSON.parse(modifiedData[name]).assetId);
    }
  }, [modifiedData]);

  useEffect(() => {
    const fetchGumletAssets = async () => {
      const gumletAssets = await assetsRequests.getAllvideos();
      setVideoAssets(gumletAssets);
      setFilteredAssets(gumletAssets);

      if (assetId && !gumletAssets.some((asset) => asset.videoId === assetId)) {
        setAssetId('');
      }
    };

    fetchGumletAssets();
  }, [assetId]);

  useEffect(() => {
    setFilteredAssets(
      videoAssets.filter((asset) =>
        asset.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, videoAssets]);

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
      <Flex direction="column" alignItems="stretch" gap={2}>
        <FieldLabel>Filter For Gumlet Video</FieldLabel>
        <FieldInput
          type="text"
          placeholder="Search video..."
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />
        <Select
          label="Select Gumlet Video"
          name="gumletVideo"
          value={assetId || ''}
          onChange={(value: string) => handleChange({ assetId: value })}
        >
          {filteredAssets.map((asset) => (
            <Option key={asset.videoId} value={asset.videoId}>
              {asset.title}
            </Option>
          ))}
        </Select>
      </Flex>
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
