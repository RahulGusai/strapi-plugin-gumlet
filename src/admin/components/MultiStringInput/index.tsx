import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button } from '@strapi/design-system/Button';
import { Box, Stack } from '@strapi/design-system';
import { FieldInput, FieldLabel } from '@strapi/design-system/Field';

interface MultiStringInputProps {
  values: string[];
  onChange: (values: string[]) => void;
}

const MultiStringInput: React.FC<MultiStringInputProps> = ({
  values,
  onChange,
}) => {
  const [inputValues, setInputValues] = useState<string[]>(values);

  useEffect(() => {
    setInputValues(values);
  }, [values]);

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...inputValues];
    updatedValues[index] = value;
    setInputValues(updatedValues);
    onChange(updatedValues);
  };

  const handleAddInput = () => {
    setInputValues([...inputValues, '']);
  };

  const handleRemoveInput = (index: number) => {
    const updatedValues = inputValues.filter((_, i) => i !== index);
    setInputValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <Stack spacing={5}>
      <FieldLabel>Collection Ids</FieldLabel>
      {inputValues.map((value, index) => (
        <Stack key={index} horizontal spacing={4}>
          <FieldInput
            placeholder="Enter a value"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(index, e.target.value)
            }
          />
          <Button onClick={() => handleRemoveInput(index)}>Remove</Button>
        </Stack>
      ))}
      <Button onClick={handleAddInput}>Add another value</Button>
    </Stack>
  );
};

export default MultiStringInput;
