import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import { Select, Option } from '@strapi/design-system';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import assetsRequests from '../../api/assets';
import { Flex } from '@strapi/design-system/Flex';
import { Field } from '@strapi/design-system/Field';
import { Combobox, ComboboxOption } from '@strapi/design-system';

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
        setAssetId(null);
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
      <Combobox
        aria-label="Gumlet Video"
        value={assetId || ''}
        onChange={(value) => {
          handleChange({ assetId: value });
        }}
      >
        {videoAssets.map((asset, i) => (
          <ComboboxOption key={asset.videoId} value={asset.videoId}>
            {asset.title}
          </ComboboxOption>
        ))}
      </Combobox>
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
