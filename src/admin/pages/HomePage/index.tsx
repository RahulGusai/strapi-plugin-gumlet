/*
 *
 * HomePage
 *
 */

import {
  BaseHeaderLayout,
  ContentLayout,
  Layout,
} from '@strapi/design-system/Layout';
import { LoadingIndicatorPage } from '@strapi/helper-plugin';
import React, { useEffect, useMemo, useState } from 'react';
import { CheckPagePermissions, useRBAC } from '@strapi/helper-plugin';
import { CustomVideo } from '../../../types';
import assetsRequests from '../../api/assets';
import settingsRequests from '../../api/settings';
import AddButton from '../../components/Button/AddButton';
import EmptyState from '../../components/EmptyState';
import SearchBar from '../../components/SearchBar';
import SetupNeeded from '../../components/SetupNeeded';
import VideoView from '../../components/Videos';
import { GridBroadcast } from '../../components/Videos/styles';
import pluginPermissions from '../../permissions';
import AddVideoModal from '../../components/Modal/AddVideo';

const HomePage = () => {
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingConfiguration, setIsLoadingConfiguration] = useState(false);
  const [isConfigurated, setIsConfigurated] = useState(false);
  const [assets, setAssets] = useState<CustomVideo[]>([]);
  const [search, setSearch] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [dropboxAccessToken, setDropboxAccessToken] = useState(undefined);

  const permissions = useMemo(() => {
    return {
      read: pluginPermissions.mainRead,
      create: pluginPermissions.mainCreate,
      delete: pluginPermissions.mainDelete,
      update: pluginPermissions.mainUpdate,
      updateSettings: pluginPermissions.settingsUpdate,
    };
  }, []);

  const {
    isLoading: isLoadingPermissions,
    allowedActions: {
      canRead,
      canCreate,
      canDelete,
      canUpdate,
      canUpdateSettings,
    },
  } = useRBAC(permissions);

  const fetchData = async () => {
    if (isLoadingData === false) setIsLoadingData(true);
    const data = await Promise.all(
      (
        await assetsRequests.getAllvideos()
      ).map(async (video: CustomVideo): Promise<CustomVideo> => {
        return video;
      })
    );

    setIsLoadingData(false);
    setAssets(data);
  };

  const getApiKey = async () => {
    setIsLoadingConfiguration(true);
    const settings = await settingsRequests.get();
    setIsConfigurated(settings?.apiKey?.length > 0);
    setIsLoadingConfiguration(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getApiKey();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
      setDropboxAccessToken(setDropboxAccessToken);
      setIsVisible(true);
    } else {
      console.log('No access token found in the URL.');
    }
  }, []);

  const fetchDropboxFiles = async (accessToken) => {
    var Dropbox = require('dropbox').Dropbox;
    var dbx = new Dropbox({ accessToken });

    const files = await dbx.filesListFolder({ path: '' });

    const videos = files.result.entries.filter(
      (file) => file['.tag'] === 'file'
    );
    const response = await dbx.filesGetTemporaryLink({
      path: videos[0].path_lower,
    });
    console.log(response);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
  };
  if (isLoadingConfiguration || isLoadingPermissions)
    return <LoadingIndicatorPage />;

  return (
    <Layout>
      <BaseHeaderLayout
        title="Gumlet video uploader"
        subtitle="Upload to and manage your Gumlet library directly within Strapi"
        as="h2"
        primaryAction={
          isConfigurated && canCreate && <AddButton update={fetchData} />
        }
      />

      {isConfigurated ? (
        !isLoadingData && assets?.length > 0 ? (
          <ContentLayout>
            <SearchBar
              search={search}
              handleSearch={(query) => handleSearch(query)}
              clearSearch={() => setSearch('')}
            />
            <GridBroadcast>
              {assets
                .filter((item) => item.title.includes(search))
                .map((video) => {
                  const { videoId } = video;
                  return (
                    <VideoView
                      video={video}
                      key={videoId}
                      updateData={fetchData}
                      editable={canUpdate}
                      deletable={canDelete}
                    />
                  );
                })}
            </GridBroadcast>
          </ContentLayout>
        ) : (
          <EmptyState update={fetchData} />
        )
      ) : (
        <SetupNeeded />
      )}
    </Layout>
  );
};

export default () => (
  <CheckPagePermissions permissions={pluginPermissions.mainRead}>
    <HomePage />
  </CheckPagePermissions>
);

//TODO Whenever connect to dropbox is clicked, check if access token is present or not. If yes then connect to dropbox using that token otherwise,
// Connect to dropbox auth to login the user and obbtain access token
//Once token is there, fetch all the files from the account and display in Add video modal
