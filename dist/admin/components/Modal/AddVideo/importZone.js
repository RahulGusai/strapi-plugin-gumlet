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
exports.ThumbnailImg = void 0;
const react_1 = __importStar(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const VideoCover_1 = require("../../../assets/VideoCover");
const helper_plugin_1 = require("@strapi/helper-plugin");
const hooks_1 = require("../../../utils/hooks");
const ImportZone = ({ initialState, onFileSelected, videoRef, sourceRef }) => {
    const inputFile = (0, react_1.useRef)(null);
    const notification = (0, helper_plugin_1.useNotification)();
    const [file, setFile] = (0, react_1.useState)();
    const theme = (0, hooks_1.useTheme)();
    const openFilePicker = () => {
        var _a;
        if (file) {
            setFile(undefined);
        }
        inputFile && ((_a = inputFile === null || inputFile === void 0 ? void 0 : inputFile.current) === null || _a === void 0 ? void 0 : _a.click());
    };
    const fileInputChange = (e) => __awaiter(void 0, void 0, void 0, function* () {
        const { files } = e.target;
        if (files && files.length > 0) {
            onFileSelected(files[0]);
        }
    });
    const onFileDrop = (ev) => __awaiter(void 0, void 0, void 0, function* () {
        ev.preventDefault();
        let file = null;
        if (ev.dataTransfer.items) {
            if (ev.dataTransfer.items.length > 1) {
                notification({
                    type: 'warning',
                    message: 'Only one file is allowed',
                });
                return;
            }
            const item = ev.dataTransfer.items[0];
            if (item.kind === 'file') {
                file = item.getAsFile();
            }
        }
        else if (ev.dataTransfer.files) {
            if (ev.dataTransfer.files.length > 1) {
                notification({
                    type: 'warning',
                    message: 'Only one file is allowed',
                });
                return;
            }
            file = ev.dataTransfer.files[0];
        }
        if (file) {
            if (!file.type.startsWith('video/')) {
                notification({
                    type: 'warning',
                    message: 'Only video files are allowed',
                });
                return;
            }
            onFileSelected(file);
        }
    });
    return (react_1.default.createElement(Wrapper, { onDrop: onFileDrop, onDragOver: (e) => e.preventDefault(), onClick: openFilePicker },
        initialState === 0 && react_1.default.createElement(VideoCover_1.VideoCover, null),
        react_1.default.createElement(exports.ThumbnailImg, { isShowed: initialState === 1 },
            react_1.default.createElement("video", { ref: videoRef },
                react_1.default.createElement("source", { ref: sourceRef }))),
        react_1.default.createElement(Title, { dark: theme === 'dark' },
            "Select a video",
            react_1.default.createElement(Asterisk, null, "*"),
            " file to upload"),
        react_1.default.createElement(Subtitle, null, "or drag and drop it here"),
        react_1.default.createElement("input", { type: "file", id: "upload", accept: 'video/*', ref: inputFile, name: "upload", onChange: (e) => fileInputChange(e), style: { display: 'none' } })));
};
exports.default = ImportZone;
const UploadImage = styled_components_1.default.img `
    width: 200px;
    height: auto;
    opacity: 0.4;
    transition: opacity 0.4s ease-in-out;
`;
exports.ThumbnailImg = styled_components_1.default.div `
    height: ${(props) => (props.isShowed ? '150px' : '0px')};
    border-radius: 4px;
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    visibility: ${(props) => (props.isShowed ? 'visible' : 'hidden')};
    video {
        height: 100%;
        border-radius: 4px;
    }
`;
const Wrapper = styled_components_1.default.div `
    width: 100%;
    height: 300px;
    border: 1px dashed #eaeaea;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: border 0.4s ease-in-out;
    margin-bottom: 20px;

    &:hover {
        border: 1px dashed #4642eb;
    }

    &:hover ${UploadImage} {
        opacity: 0.8;
    }
`;
const Title = styled_components_1.default.p `
    font-size: 24px;
    font-weight: 600;
    padding: 20px 0 10px 0;
    color: ${p => p.dark ? '#ffffff' : '#32324d'};
`;
const Subtitle = styled_components_1.default.p `
    font-size: 16px;
    color: #666687;
`;
const Asterisk = styled_components_1.default.span `
    color: red;
`;
