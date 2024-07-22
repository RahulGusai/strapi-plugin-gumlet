"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const content_api_routes_1 = __importDefault(require("./content-api-routes"));
const admin_routes_1 = __importDefault(require("./admin-routes"));
const settings_routes_1 = __importDefault(require("./settings-routes"));
const routes = {
    // routes for the admin panel (/strapi-uploader-plugin/api-video-asset/...)
    admin: {
        type: "admin",
        routes: admin_routes_1.default,
    },
    // routes for the plugin settings panel (/strapi-uploader-plugin/settings)
    settings: {
        routes: settings_routes_1.default,
    },
    // routes for the content api (/api/strapi-uploader-plugin/...)
    "content-api": {
        type: "content-api",
        routes: content_api_routes_1.default,
    },
};
exports.default = routes;
