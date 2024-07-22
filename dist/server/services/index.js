"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const settings_services_1 = __importDefault(require("./settings-services"));
const api_video_asset_services_1 = __importDefault(require("./api-video-asset-services"));
exports.default = {
    settings: settings_services_1.default,
    'api-video-asset': api_video_asset_services_1.default,
};
