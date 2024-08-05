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
exports.configGumletClient = exports.isGumletApiKeyValid = exports.getConfig = void 0;
const axios_1 = __importDefault(require("axios"));
const getConfig = () => __awaiter(void 0, void 0, void 0, function* () {
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
    const res = {
        apiKey: configKey,
        defaultPublic: defaultPublic !== null && defaultPublic !== void 0 ? defaultPublic : true,
        videoFormat: videoFormat !== null && videoFormat !== void 0 ? videoFormat : 'MP4',
        collectionIds: collectionIds !== null && collectionIds !== void 0 ? collectionIds : [],
    };
    return res;
});
exports.getConfig = getConfig;
const isGumletApiKeyValid = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('checking gumlet API key');
        const response = yield axios_1.default.get('https://api.gumlet.com/v1/video/sources', {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
        console.log(response);
        return response.status === 200;
    }
    catch (error) {
        return false;
    }
});
exports.isGumletApiKeyValid = isGumletApiKeyValid;
const configGumletClient = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = yield getConfig();
    const apiKey = config.apiKey;
    const client = axios_1.default.create({
        baseURL: 'https://api.gumlet.com/v1',
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });
    return client;
});
exports.configGumletClient = configGumletClient;
