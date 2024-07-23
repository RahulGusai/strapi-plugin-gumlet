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
exports.configGumletClient = exports.isGumletApiKeyValid = exports.configClient = exports.isValidApiKey = exports.getConfig = void 0;
const nodejs_client_1 = __importDefault(require("@api.video/nodejs-client"));
const packageJson = __importStar(require("../../../package.json"));
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
    const res = {
        apiKey: configKey,
        defaultPublic: defaultPublic !== null && defaultPublic !== void 0 ? defaultPublic : true,
    };
    return res;
});
exports.getConfig = getConfig;
const isValidApiKey = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield configClient(apiKey);
    try {
        const { accessToken } = yield client.getAccessToken();
        return accessToken ? true : false;
    }
    catch (error) {
        return false;
    }
});
exports.isValidApiKey = isValidApiKey;
const isGumletApiKeyValid = (apiKey, collectionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('checking gumlet API key');
        const response = yield axios_1.default.get(`https://api.gumlet.com/v1/video/assets/list/${collectionId}`, {
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
const configClient = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    return new nodejs_client_1.default({
        apiKey: apiKey ? apiKey : (yield getConfig()).apiKey,
        sdkName: 'strapi-plugin',
        sdkVersion: packageJson.version,
    });
});
exports.configClient = configClient;
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
