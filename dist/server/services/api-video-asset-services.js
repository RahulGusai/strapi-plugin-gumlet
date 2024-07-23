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
const private_videos_1 = require("../utils/private-videos");
const model = `plugin::${pluginId_1.default}.api-video-asset`;
exports.default = strapi_1.factories.createCoreService(model, (params) => ({
    createVideoId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Create direct upload URL endpoint on gumlet');
            const client = yield (0, config_1.configGumletClient)();
            try {
                // Create a direct upload URL from Gumlet
                const gumletResponse = yield client.post('/video/assets/upload', {
                    collection_id: '669d74091c2a88fdb5b2759f',
                    format: 'MP4',
                    title: data['title'],
                    description: data['description'],
                    tag: data['tags'],
                });
                const uploadUrl = gumletResponse.data.upload_url;
                const assetId = gumletResponse.data.asset_id;
                const thumbnail = gumletResponse.data.output.thumbnail_url[0];
                const playbackUrl = gumletResponse.data.output.playback_url;
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
    token(videoId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, config_1.configClient)();
            const video = yield client.videos.get(videoId);
            return {
                token: (video === null || video === void 0 ? void 0 : video._public) ? undefined : (_b = (_a = video.assets) === null || _a === void 0 ? void 0 : _a.player) === null || _b === void 0 ? void 0 : _b.split('=')[1],
            };
        });
    },
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Create video endpoint');
            try {
                if (!data._public) {
                    data = yield (0, private_videos_1.replacePrivateVideoTokens)(data, '11111111-1111-1111-1111-111111111111');
                }
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
            const client = yield (0, config_1.configClient)();
            try {
                yield client.videos.delete(videoId);
                yield strapi.entityService.delete(model, id);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    },
    update(id, videoId, data) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, config_1.configClient)();
            try {
                const updatedVideo = yield client.videos.update(videoId, data);
                let customVideo = {
                    title: updatedVideo.title,
                    description: updatedVideo.description,
                    _public: updatedVideo._public,
                    videoId: updatedVideo.videoId,
                    hls: (_a = updatedVideo.assets) === null || _a === void 0 ? void 0 : _a.hls,
                    iframe: (_b = updatedVideo.assets) === null || _b === void 0 ? void 0 : _b.iframe,
                    mp4: (_c = updatedVideo === null || updatedVideo === void 0 ? void 0 : updatedVideo.assets) === null || _c === void 0 ? void 0 : _c.mp4,
                    player: (_d = updatedVideo.assets) === null || _d === void 0 ? void 0 : _d.player,
                    thumbnail: (_e = updatedVideo === null || updatedVideo === void 0 ? void 0 : updatedVideo.assets) === null || _e === void 0 ? void 0 : _e.thumbnail,
                    tags: updatedVideo.tags,
                    metadata: updatedVideo.metadata,
                };
                if (!customVideo._public) {
                    customVideo = yield (0, private_videos_1.replacePrivateVideoTokens)(customVideo, '11111111-1111-1111-1111-111111111111');
                }
                const res = yield strapi.entityService.update(model, id, {
                    data: customVideo,
                });
                return res;
            }
            catch (error) {
                return false;
            }
        });
    },
}));
