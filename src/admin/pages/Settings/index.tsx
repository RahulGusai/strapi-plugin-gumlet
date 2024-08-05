import React, { ChangeEvent, useEffect, useState } from 'react';

import {
  CheckPagePermissions,
  useNotification,
  useOverlayBlocker,
} from '@strapi/helper-plugin';

import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { ContentLayout, HeaderLayout } from '@strapi/design-system/Layout';
import { Stack } from '@strapi/design-system/Stack';
import { Typography } from '@strapi/design-system/Typography';
import Check from '@strapi/icons/Check';
import { CustomSettings } from '../../../types';
import settingsRequests from '../../api/settings';
import FieldComp from '../../components/FieldComp/Fields';
import pluginPermissions from '../../permissions';
import MultiStringInput from '../../components/MultiStringInput';
import { Select, Option } from '@strapi/design-system/Select';

const Settings = () => {
  const [settings, setSettings] = useState<CustomSettings>({
    apiKey: '',
    defaultPublic: true,
    videoFormat: 'MP4',
    collectionIds: [],
  });

  const { lockApp, unlockApp } = useOverlayBlocker();
  const notification = useNotification();

  const getSettings = async () => {
    const settings = await settingsRequests.get();
    setSettings(settings);
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, apiKey: event.target.value });
  };

  const updateCollectionIds = (collectionIds: string[]) => {
    setSettings((settings) => {
      return {
        ...settings,
        collectionIds: collectionIds,
      };
    });
  };

  const updateVideoFormat = (value: string) => {
    setSettings({ ...settings, videoFormat: value });
  };

  const handleOnSubmit = async () => {
    lockApp();
    const response = await settingsRequests.update(settings);

    if (response) {
      notification({
        type: 'success',
        message: 'Changes saved',
      });
    } else {
      notification({
        type: 'warning',
        message: 'Please enter valid settings',
      });
    }

    unlockApp();
  };

  return (
    <>
      <HeaderLayout
        title={'Gumlet uploader'}
        primaryAction={
          <Button
            type="submit"
            onClick={handleOnSubmit}
            startIcon={<Check />}
            size="L"
          >
            Save
          </Button>
        }
      />

      <ContentLayout>
        <Box
          background="neutral0"
          hasRadius
          shadow="filterShadow"
          paddingTop={6}
          paddingBottom={6}
          paddingLeft={7}
          paddingRight={7}
        >
          <Stack size={4}>
            <Typography variant="delta" as="h2">
              Settings
            </Typography>
            <Grid gap={6}>
              <GridItem col={12} s={12}>
                <FieldComp
                  name="API Key"
                  label="API Key"
                  value={settings.apiKey}
                  placeholder="Enter your API Key"
                  description="Generated in the Gumlet's dashboard and used for authenticating API calls."
                  detailsLink="https://dashboard.gumlet.com/"
                  isPassword
                  onChange={handleChange}
                />
              </GridItem>
              <GridItem col={12} s={12}>
                <Select
                  id="dropdownOption"
                  label="Select the video format"
                  value={settings.videoFormat}
                  onChange={updateVideoFormat}
                >
                  <Option value="MP4">MP4</Option>
                  <Option value="ABP">ABP</Option>
                </Select>
              </GridItem>
              <GridItem col={12} s={12}>
                <MultiStringInput
                  values={settings.collectionIds}
                  onChange={updateCollectionIds}
                ></MultiStringInput>
              </GridItem>
            </Grid>
          </Stack>
        </Box>
      </ContentLayout>
    </>
  );
};

export default () => (
  <CheckPagePermissions permissions={pluginPermissions.settingsRoles}>
    <Settings />
  </CheckPagePermissions>
);
