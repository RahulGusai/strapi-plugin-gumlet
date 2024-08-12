import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import pluginPermissions from './permissions';
import pluginId from './pluginId';
import GumletVideoField from './components/GumletVideoField';
import GumletVideoIcon from './components/GumletVideoIcon';

const name = pluginPkg.strapi.name;
const displayName = pluginPkg.strapi.displayName;

export default {
  register(app: any) {
    app.customFields.register({
      name: 'gumlet-video',
      pluginId: 'strapi-uploader-plugin',
      type: 'json',
      icon: GumletVideoIcon,
      intlLabel: {
        id: 'gumlet-video.label',
        defaultMessage: 'Gumlet Video',
      },
      intlDescription: {
        id: 'gumlet-video.description',
        defaultMessage: 'Select a Gumlet video asset to map its playback URL.',
      },
      components: {
        Input: async () => import('./components/GumletVideoField'),
      },
    });

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: displayName,
      },
      permissions: pluginPermissions.mainRead,
      Component: async () => await import('./pages/App'),
    });

    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: 'Gumlet Video Uploader plugin Settings Section',
          defaultMessage: 'Gumlet Video Uploader',
        },
      },
      [
        {
          intlLabel: {
            id: 'Settings Section Gumlet Video Uploader',
            defaultMessage: 'Settings',
          },
          id: 'strapi-uploader-plugin-settings',
          to: `/settings/${pluginId}`,
          permissions: pluginPermissions.settingsRoles,
          Component: async () => await import('./pages/Settings'),
        },
      ]
    );

    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app: any) {},
  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map((locale: any) => {
        return import(`./translations/${locale}`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
