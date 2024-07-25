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
const strapi_1 = require("@strapi/strapi");
const pluginId_1 = __importDefault(require("../../admin/pluginId"));
const config_1 = require("../utils/config");
const gumlet_1 = require("../constants/gumlet");
const model = `plugin::${pluginId_1.default}.api-video-asset`;
exports.default = strapi_1.factories.createCoreService(model, (params) => ({
    createVideoId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Create direct upload URL endpoint on gumlet');
            const client = yield (0, config_1.configGumletClient)();
            try {
                const gumletResponse = yield client.post('/video/assets/upload', {
                    format: gumlet_1.GUMLET_VIDEO_FORMAT,
                    collection_id: data['collectionId'],
                    title: data['title'],
                    description: data['description'],
                    tag: data['tags'],
                });
                const uploadUrl = gumletResponse.data.upload_url;
                const assetId = gumletResponse.data.asset_id;
                const playbackUrl = gumletResponse.data.output.playback_url;
                const thumbnail = gumletResponse.data.output.thumbnail_url[0];
                console.log('Successfully created gumlet direct upload URL.');
                return { uploadUrl, assetId, thumbnail, playbackUrl };
            }
            catch (error) {
                console.error('Error creating direct upload URL:', error);
                throw error;
            }
        });
    },
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Find all endpoint');
            return yield strapi.entityService.findMany(model, query);
        });
    },
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Create video endpoint');
            try {
                yield strapi.entityService.create(model, { data });
                return true;
            }
            catch (error) {
                console.log('Error occured while creating asset');
                console.log(error);
                return false;
            }
        });
    },
    delete(id, videoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, config_1.configGumletClient)();
            try {
                yield client.delete(`/video/assets/${videoId}`);
                yield strapi.entityService.delete(model, id);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    },
    update(id, videoId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield (0, config_1.configGumletClient)();
                const updateData = Object.assign(Object.assign({}, data), { metadata: data.metadata.reduce((accumulator, currentObject) => {
                        accumulator[currentObject.key] = currentObject.value;
                        return accumulator;
                    }, {}) });
                yield client.post('/video/assets/update', Object.assign({ asset_id: videoId }, updateData));
                console.log('Updated video on gumlet');
                const res = yield strapi.entityService.update(model, id, {
                    data: data,
                });
                console.log('Update strapi asset');
                return res;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        });
    },
}));
