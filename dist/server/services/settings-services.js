"use strict";
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
const config_1 = require("../utils/config");
const collectionId_1 = __importDefault(require("../../admin/utils/collectionId"));
exports.default = ({ strapi }) => ({
    getSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const pluginStore = strapi.store({
                environment: strapi.config.environment,
                type: 'plugin',
                name: 'strapi-uploader-plugin',
            });
            const defaultPublic = yield pluginStore.get({
                key: 'defaultPublic',
            });
            const configKey = yield pluginStore.get({
                key: 'apiKey',
            });
            const videoFormat = yield pluginStore.get({
                key: 'videoFormat',
            });
            const collectionIds = yield pluginStore.get({
                key: 'collectionIds',
            });
            const collectionIdMap = yield pluginStore.get({
                key: 'collectionIdMap',
            });
            const res = {
                apiKey: configKey,
                defaultPublic: (defaultPublic !== null && defaultPublic !== void 0 ? defaultPublic : true),
                videoFormat: (videoFormat !== null && videoFormat !== void 0 ? videoFormat : 'MP4'),
                collectionIds: (collectionIds !== null && collectionIds !== void 0 ? collectionIds : []),
                collectionIdMap: (collectionIdMap !== null && collectionIdMap !== void 0 ? collectionIdMap : {}),
            };
            return res;
        });
    },
    saveSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const pluginStore = strapi.store({
                environment: strapi.config.environment,
                type: 'plugin',
                name: 'strapi-uploader-plugin',
            });
            try {
                const isValid = yield (0, config_1.isGumletApiKeyValid)(settings.apiKey);
                if (isValid) {
                    yield pluginStore.set({
                        key: 'apiKey',
                        value: settings.apiKey,
                    });
                    yield pluginStore.set({
                        key: 'defaultPublic',
                        value: settings.defaultPublic,
                    });
                    yield pluginStore.set({
                        key: 'videoFormat',
                        value: settings.videoFormat,
                    });
                    yield pluginStore.set({
                        key: 'collectionIds',
                        value: settings.collectionIds,
                    });
                    const collectionIdMap = yield (0, collectionId_1.default)(settings.collectionIds);
                    yield pluginStore.set({
                        key: 'collectionIdMap',
                        value: collectionIdMap,
                    });
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (_a) {
                return false;
            }
        });
    },
});
