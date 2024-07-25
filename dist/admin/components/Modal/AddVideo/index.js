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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const Button_1 = require("@strapi/design-system/Button");
const Typography_1 = require("@strapi/design-system/Typography");
const Fields_1 = __importDefault(require("../../FieldComp/Fields"));
const UploadButton_1 = __importDefault(require("../../Button/UploadButton"));
const importZone_1 = __importDefault(require("./importZone"));
const Tags_1 = __importDefault(require("../../Tags"));
const Metadata_1 = __importDefault(require("../../Metadata"));
const CollectionId_1 = __importDefault(require("../../CollectionId"));
const AddVideoModal = ({ update, close, }) => {
    const [inputData, setInputData] = (0, react_1.useState)({
        title: '',
        description: '',
        tags: [],
        metadata: [
            {
                key: 'Upload source',
                value: 'Strapi',
            },
        ],
        collectionId: '',
    });
    const [file, setFile] = (0, react_1.useState)();
    const [initialState, setInitialState] = (0, react_1.useState)(0);
    // CONSTANTS
    const videoRef = (0, react_1.useRef)(null);
    const sourceRef = (0, react_1.useRef)(null);
    const { title, description, tags, metadata, collectionId } = inputData;
    const displayVideoFrame = (video, source, file) => {
        // Object Url as the video source
        source.setAttribute('src', URL.createObjectURL(file));
        // Load the video and show it
        video.load();
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevInputData) => (Object.assign(Object.assign({}, prevInputData), { [name]: value })));
    };
    const updateCollectionId = (collectionId) => {
        setInputData(Object.assign(Object.assign({}, inputData), { collectionId: collectionId }));
    };
    const handleSetTag = (tag) => {
        if (tag) {
            setInputData(Object.assign(Object.assign({}, inputData), { tags: [...(inputData.tags || []), tag] }));
        }
    };
    const handleRemoveTag = (tag) => {
        const newTags = inputData.tags && inputData.tags.filter((t) => t !== tag);
        setInputData(Object.assign(Object.assign({}, inputData), { tags: newTags }));
    };
    const handleSetMetadata = (metadata) => {
        if (metadata) {
            setInputData(Object.assign(Object.assign({}, inputData), { metadata: [...(inputData.metadata || []), metadata] }));
        }
    };
    const handleRemoveMetadata = (metadata) => {
        const newMetadata = (inputData === null || inputData === void 0 ? void 0 : inputData.metadata) && (inputData === null || inputData === void 0 ? void 0 : inputData.metadata.filter((m) => m !== metadata));
        setInputData(Object.assign(Object.assign({}, inputData), { metadata: newMetadata }));
    };
    const onFileSelected = (file) => {
        console.log(file, 'file');
        setFile(file);
        setInputData((prevInputData) => (Object.assign(Object.assign({}, prevInputData), { title: file.name.replace(/\.[^/.]+$/, '') })));
        if (initialState === 0) {
            setInitialState(1);
        }
        if (videoRef.current && sourceRef.current)
            displayVideoFrame(videoRef.current, sourceRef.current, file);
    };
    return (react_1.default.createElement(ModalLayout_1.ModalLayout, { onClose: close, labelledBy: "title" },
        react_1.default.createElement(ModalLayout_1.ModalHeader, null,
            react_1.default.createElement(Typography_1.Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title" }, "Upload a video")),
        react_1.default.createElement(ModalLayout_1.ModalBody, null,
            react_1.default.createElement(importZone_1.default, { initialState: initialState, onFileSelected: onFileSelected, videoRef: videoRef, sourceRef: sourceRef }),
            react_1.default.createElement(Fields_1.default, { name: "title", label: "Title", value: title, placeholder: "Enter your title", onChange: handleChange, required: true }),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Fields_1.default, { name: "description", label: "Description", value: description || '', placeholder: "Enter a description", onChange: handleChange, required: true }),
            react_1.default.createElement("br", null),
            react_1.default.createElement(CollectionId_1.default, { name: "Collection Id", description: "Collection Id", required: true, selectedValue: collectionId, onChange: updateCollectionId }),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Tags_1.default, { handleSetTag: handleSetTag, handleRemoveTag: handleRemoveTag, tags: tags || [], editable: true }),
            react_1.default.createElement(Metadata_1.default, { metadata: metadata, handleSetMetadata: handleSetMetadata, handleRemoveMetadata: handleRemoveMetadata, editable: true })),
        react_1.default.createElement(ModalLayout_1.ModalFooter, { startActions: react_1.default.createElement(Button_1.Button, { onClick: close, variant: "tertiary" }, "Cancel"), endActions: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(UploadButton_1.default, { currentFile: file, title: title, description: description, tags: tags || [], metadata: metadata || [], collectionId: collectionId, update: update, close: close })) })));
};
exports.default = AddVideoModal;
