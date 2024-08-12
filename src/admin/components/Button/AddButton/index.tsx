import React, { useState, FC } from 'react';
import { Button } from '@strapi/design-system/Button';

import Plus from '@strapi/icons/Plus';
import AddVideoModal from '../../Modal/AddVideo';

interface IAddButtonProps {
  isVisible: boolean;
  setIsVisible: (arg0: boolean) => void;
  update: () => void;
  dropboxAccessToken?: string;
}

const AddButton: FC<IAddButtonProps> = ({
  isVisible,
  setIsVisible,
  update,
  dropboxAccessToken,
}) => {
  return (
    <>
      <Button endIcon={<Plus />} onClick={() => setIsVisible(true)}>
        Add a video
      </Button>
      {isVisible && (
        <AddVideoModal update={update} close={() => setIsVisible(false)} />
      )}
    </>
  );
};

export default AddButton;
