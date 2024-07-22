import apiVideoContentApiRoutes from "./content-api-routes";
import apiVideoAdminRoutes from "./admin-routes";
import apiVideoSettingsRoutes from "./settings-routes";

const routes = {
  // routes for the admin panel (/strapi-uploader-plugin/api-video-asset/...)
  admin: {
    type: "admin",
    routes: apiVideoAdminRoutes,
  },
  // routes for the plugin settings panel (/strapi-uploader-plugin/settings)
  settings: {
    routes: apiVideoSettingsRoutes,
  },
  // routes for the content api (/api/strapi-uploader-plugin/...)
  "content-api": {
    type: "content-api",
    routes: apiVideoContentApiRoutes,
  },
};

export default routes;
