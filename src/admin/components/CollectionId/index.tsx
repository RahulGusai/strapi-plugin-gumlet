import React, { useEffect, useState } from 'react';
import { Box, Select, Option } from '@strapi/design-system';
import settingsRequests from '../../api/settings';
import { Field, FieldLabel } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import styled from 'styled-components';
import fetchCollectionIdMap from '../../utils/collectionId';

const CollectionId = ({
  name,
  description,
  required,
  selectedValue,
  onChange,
}) => {
  const [selected, setSelected] = useState(selectedValue);
  const [collectionIdMap, setCollectionIdMap] = useState({});

  const handleSelectChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  useEffect(() => {
    const fetchCollectionIds = async () => {
      try {
        const { collectionIds, collectionIdMap } = await settingsRequests.get();
        if (collectionIdMap) {
          setCollectionIdMap(collectionIdMap);
        } else {
          setCollectionIdMap(await fetchCollectionIdMap(collectionIds));
        }
      } catch (error) {
        console.error('Failed to fetch collection IDs:', error);
      }
    };
    fetchCollectionIds();
  }, []);

  const FieldLabelStyled = styled(FieldLabel)`
    width: 100%;
    & > div {
      width: max-content;
    }
  `;

  return (
    <Field name={name} hint={description}>
      <Stack>
        <FieldLabelStyled required={required}>{description}</FieldLabelStyled>
        <Select
          placeholder="Choose a value"
          value={selected}
          onChange={handleSelectChange}
        >
          {Object.keys(collectionIdMap).map((collectionName) => (
            <Option
              key={collectionIdMap[collectionName]}
              value={collectionIdMap[collectionName]}
            >
              {collectionName}
            </Option>
          ))}
        </Select>
      </Stack>
    </Field>
  );
};

export default CollectionId;
