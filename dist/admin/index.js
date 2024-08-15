"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_plugin_1 = require("@strapi/helper-plugin");
const package_json_1 = __importDefault(require("../../package.json"));
const Initializer_1 = __importDefault(require("./components/Initializer"));
const PluginIcon_1 = __importDefault(require("./components/PluginIcon"));
const permissions_1 = __importDefault(require("./permissions"));
const pluginId_1 = __importDefault(require("./pluginId"));
const GumletVideoIcon_1 = __importDefault(require("./components/GumletVideoIcon"));
const name = package_json_1.default.strapi.name;
const displayName = package_json_1.default.strapi.displayName;
exports.default = {
    register(app) {
        app.customFields.register({
            name: 'gumlet-video',
            pluginId: 'strapi-plugin-gumlet',
            type: 'json',
            icon: GumletVideoIcon_1.default,
            intlLabel: {
                id: 'gumlet-video.label',
                defaultMessage: 'Gumlet Video',
            },
            intlDescription: {
                id: 'gumlet-video.description',
                defaultMessage: 'Select a Gumlet video asset to map its playback URL.',
            },
            components: {
                Input: () => __awaiter(this, void 0, void 0, function* () { return Promise.resolve().then(() => __importStar(require('./components/GumletVideoField'))); }),
            },
        });
        app.addMenuLink({
            to: `/plugins/${pluginId_1.default}`,
            icon: PluginIcon_1.default,
            intlLabel: {
                id: `${pluginId_1.default}.plugin.name`,
                defaultMessage: displayName,
            },
            permissions: permissions_1.default.mainRead,
            Component: () => __awaiter(this, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require('./pages/App'))); }),
        });
        app.createSettingSection({
            id: pluginId_1.default,
            intlLabel: {
                id: 'Gumlet Video Uploader plugin Settings Section',
                defaultMessage: 'Gumlet Video Uploader',
            },
        }, [
            {
                intlLabel: {
                    id: 'Settings Section Gumlet Video Uploader',
                    defaultMessage: 'Settings',
                },
                id: 'strapi-plugin-gumlet-settings',
                to: `/settings/${pluginId_1.default}`,
                permissions: permissions_1.default.settingsRoles,
                Component: () => __awaiter(this, void 0, void 0, function* () { return yield Promise.resolve().then(() => __importStar(require('./pages/Settings'))); }),
            },
        ]);
        app.registerPlugin({
            id: pluginId_1.default,
            initializer: Initializer_1.default,
            isReady: false,
            name,
        });
    },
    bootstrap(app) { },
    registerTrads(app) {
        return __awaiter(this, void 0, void 0, function* () {
            const { locales } = app;
            const importedTrads = yield Promise.all(locales.map((locale) => {
                return Promise.resolve(`${`./translations/${locale}`}`).then(s => __importStar(require(s))).then(({ default: data }) => {
                    return {
                        data: (0, helper_plugin_1.prefixPluginTranslations)(data, pluginId_1.default),
                        locale,
                    };
                })
                    .catch(() => {
                    return {
                        data: {},
                        locale,
                    };
                });
            }));
            return Promise.resolve(importedTrads);
        });
    },
};
