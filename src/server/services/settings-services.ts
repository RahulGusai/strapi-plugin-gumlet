import { Strapi } from "@strapi/strapi";
import { CustomSettings } from "../../types";
import { isValidApiKey } from "../utils/config";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getSettings() {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-uploader-plugin",
    });

    const defaultPublic = await pluginStore.get({
      key: "defaultPublic",
    });

    const configKey = await pluginStore.get({
      key: "apiKey",
    });

    const res: CustomSettings = {
      apiKey: configKey as string,
      defaultPublic: (defaultPublic ?? true) as boolean,
    };
    return res;
  },
  async saveSettings(settings: CustomSettings) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-uploader-plugin",
    });

    try {
      const isValid = await isValidApiKey(settings.apiKey);
      if (isValid) {
        await pluginStore.set({
          key: "apiKey",
          value: settings.apiKey,
        });

        await pluginStore.set({
          key: "defaultPublic",
          value: settings.defaultPublic,
        });
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  },
});
