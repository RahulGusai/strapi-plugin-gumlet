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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../utils/config");
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
            const collectionIds = yield pluginStore.get({
                key: 'collectionIds',
            });
            const res = {
                apiKey: configKey,
                defaultPublic: (defaultPublic !== null && defaultPublic !== void 0 ? defaultPublic : true),
                collectionIds: (collectionIds !== null && collectionIds !== void 0 ? collectionIds : []),
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
                        key: 'collectionIds',
                        value: settings.collectionIds,
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
