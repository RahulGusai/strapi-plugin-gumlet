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
exports.replacePrivateVideoTokens = void 0;
const replacePrivateVideoTokens = (video, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (video._public) {
        return video;
    }
    token =
        token !== null && token !== void 0 ? token : (yield strapi
            .plugin("strapi-uploader-plugin")
            .service("api-video-asset")
            .token(video.videoId)).token;
    return Object.assign(Object.assign({}, video), { mp4: video.mp4.replace(/token\/[\w-]+\//, `token/${token}/`), thumbnail: video.thumbnail.replace(/token\/[\w-]+\//, `token/${token}/`), hls: video.hls.replace(/token\/[\w-]+\//, `token/${token}/`), iframe: video.iframe.replace(/token=[\w-]+/, `token=${token}`), player: video.player.replace(/token=[\w-]+/, `token=${token}`) });
});
exports.replacePrivateVideoTokens = replacePrivateVideoTokens;
