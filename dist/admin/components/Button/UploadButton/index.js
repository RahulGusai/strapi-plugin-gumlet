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
const react_1 = __importStar(require("react"));
const assets_1 = __importDefault(require("../../../api/assets"));
const Button_1 = require("@strapi/design-system/Button");
const helper_plugin_1 = require("@strapi/helper-plugin");
const CloudUpload_1 = __importDefault(require("@strapi/icons/CloudUpload"));
const axios_1 = __importDefault(require("axios"));
const UploadButton = ({ currentFile, title, description, tags, metadata, update, close, }) => {
    const [progress, setProgress] = (0, react_1.useState)(0);
    const [isUploading, setIsUploading] = (0, react_1.useState)(false);
    const notification = (0, helper_plugin_1.useNotification)();
    const uploadIsDisabled = currentFile === undefined ||
        title.trim().length < 1 ||
        description.trim().length < 1;
    const fileInputChange = () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            title: title,
            description: description,
            tags: tags,
            metadata: metadata,
        };
        if (currentFile) {
            const { uploadUrl, assetId, thumbnail, playbackUrl } = yield assets_1.default.createVideoId(body);
            setIsUploading(true);
            try {
                console.log(`Uploading the video to the gumlet's URL`);
                yield axios_1.default.put(uploadUrl, currentFile, {
                    headers: {
                        'Content-Type': currentFile.type,
                    },
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        setProgress(Math.round((loaded * 100) / total));
                    },
                });
                console.log('Video successfully uploaded on the Gumlet.');
                const body = {
                    title: title,
                    description: description,
                    videoId: assetId,
                    playbackUrl: playbackUrl,
                    thumbnail: thumbnail,
                    tags: tags,
                    metadata: metadata,
                };
                const assetData = yield assets_1.default.create(body);
                if (assetData) {
                    setIsUploading(false);
                    update();
                }
                else {
                    notification({
                        type: 'warning',
                        message: 'Error while creating video',
                    });
                }
            }
            catch (e) {
                console.error(e);
            }
            close();
        }
    });
    return (react_1.default.createElement(Button_1.Button, { endIcon: react_1.default.createElement(CloudUpload_1.default, null), loading: isUploading, onClick: fileInputChange, disabled: uploadIsDisabled }, isUploading ? `Uploading ${progress}%` : `Upload`));
};
exports.default = UploadButton;
