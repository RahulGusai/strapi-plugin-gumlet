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
exports.findWithPrivateVideoTransform = exports.findOneWithPrivateVideoTransform = void 0;
const strapi_1 = require("@strapi/strapi");
const pluginId_1 = __importDefault(require("../../admin/pluginId"));
const private_videos_1 = require("../utils/private-videos");
const model = `plugin::${pluginId_1.default}.api-video-asset`;
const findOneWithPrivateVideoTransform = (id, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const video = yield strapi.entityService.findOne(model, id, ctx === null || ctx === void 0 ? void 0 : ctx.query);
    if (!video) {
        return null;
    }
    video._public = (_a = video._public) !== null && _a !== void 0 ? _a : true;
    return video._public ? video : yield (0, private_videos_1.replacePrivateVideoTokens)(video);
});
exports.findOneWithPrivateVideoTransform = findOneWithPrivateVideoTransform;
const findWithPrivateVideoTransform = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const videos = yield strapi.entityService.findMany(model, ctx === null || ctx === void 0 ? void 0 : ctx.query);
    return yield Promise.all(videos
        .map((video) => {
        var _a;
        return (Object.assign(Object.assign({}, video), { _public: (_a = video._public) !== null && _a !== void 0 ? _a : true }));
    })
        .map((video) => __awaiter(void 0, void 0, void 0, function* () { return video._public ? video : yield (0, private_videos_1.replacePrivateVideoTokens)(video); })));
});
exports.findWithPrivateVideoTransform = findWithPrivateVideoTransform;
exports.default = strapi_1.factories.createCoreController("plugin::strapi-uploader-plugin.api-video-asset", ({ strapi }) => ({
    count(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield strapi.entityService.count(model, ctx.query);
        });
    },
    find(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, exports.findWithPrivateVideoTransform)(ctx);
        });
    },
    findOne(ctx) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_a = (yield (0, exports.findOneWithPrivateVideoTransform)(ctx.params.id, ctx.query))) !== null && _a !== void 0 ? _a : ctx.notFound());
        });
    },
}));
