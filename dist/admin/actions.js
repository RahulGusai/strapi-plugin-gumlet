"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainDeleteAction = exports.mainUpdateAction = exports.mainCreateAction = exports.mainReadAction = exports.settingsUpdateAction = exports.settingsReadAction = void 0;
const pluginId_1 = __importDefault(require("./pluginId"));
exports.settingsReadAction = `plugin::${pluginId_1.default}.settings.read`;
exports.settingsUpdateAction = `plugin::${pluginId_1.default}.settings.update`;
exports.mainReadAction = `plugin::${pluginId_1.default}.read`;
exports.mainCreateAction = `plugin::${pluginId_1.default}.create`;
exports.mainUpdateAction = `plugin::${pluginId_1.default}.update`;
exports.mainDeleteAction = `plugin::${pluginId_1.default}.delete`;
