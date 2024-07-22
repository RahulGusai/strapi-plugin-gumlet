"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowedTo = void 0;
const admin_controller_1 = __importDefault(require("./admin-controller"));
const settings_controller_1 = __importDefault(require("./settings-controller"));
const content_api_controller_1 = __importDefault(require("./content-api-controller"));
const pluginId_1 = __importDefault(require("../../admin/pluginId"));
const model = `plugin::${pluginId_1.default}.api-video-asset`;
const isAllowedTo = (strapi, ctx, action) => {
    const pm = strapi.admin.services.permission.createPermissionsManager({
        ability: ctx.state.userAbility,
        action: action,
        model,
    });
    return pm.isAllowed;
};
exports.isAllowedTo = isAllowedTo;
exports.default = {
    admin: admin_controller_1.default,
    'content-api': content_api_controller_1.default,
    settings: settings_controller_1.default,
};
