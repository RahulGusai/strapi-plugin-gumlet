import React, { useEffect, useState } from 'react';
import { Box, Select, Option } from '@strapi/design-system';
import settingsRequests from '../../api/settings';
import { Field, FieldLabel } from '@strapi/design-system/Field';
import { Stack } from '@strapi/design-system/Stack';
import styled from 'styled-components';

const CollectionId = ({
  name,
  description,
  required,
  selectedValue,
  onChange,
}) => {
  const [selected, setSelected] = useState(selectedValue);
  const [collectionIds, setCollectionIds] = useState([]);

  const handleSelectChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  useEffect(() => {
    const fetchCollectionIds = async () => {
      try {
        const { collectionIds } = await settingsRequests.get();
        setCollectionIds(collectionIds);
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
          {collectionIds.map((collectionId: string) => (
            <Option key={collectionId} value={collectionId}>
              {collectionId}
            </Option>
          ))}
        </Select>
      </Stack>
    </Field>
  );
};

export default CollectionId;
