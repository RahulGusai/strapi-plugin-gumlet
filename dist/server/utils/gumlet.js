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
const axios_1 = __importDefault(require("axios"));
const createDirectUploadUrl = (apiKey, collectionId, format) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post('https://api.gumlet.com/v1/assets/direct-upload', { collectionId, format }, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });
    return response.data.upload_url;
});
const uploadVideo = (apiKey, videoFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const uploadUrl = yield createDirectUploadUrl(apiKey, '', '');
    // const videoData = await fs.promises.readFile(videoFilePath);
    const response = yield axios_1.default.put(uploadUrl, {}, {
        headers: {
            'Content-Type': 'video/mp4',
        },
    });
    return response.data;
});
