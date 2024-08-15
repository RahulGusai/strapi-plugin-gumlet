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
const Stack_1 = require("@strapi/design-system/Stack");
const styled_components_1 = __importDefault(require("styled-components"));
const Field_1 = require("@strapi/design-system/Field");
const dropbox_1 = require("../../../constants/dropbox");
const react_dropbox_chooser_1 = __importDefault(require("react-dropbox-chooser"));
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
    const [uploadMethod, setUploadMethod] = (0, react_1.useState)(undefined);
    const [dropboxFileLinks, setDropboxFileLinks] = (0, react_1.useState)([]);
    const [dropboxFileNames, setDropboxFileNames] = (0, react_1.useState)([]);
    // CONSTANTS
    const videoRef = (0, react_1.useRef)(null);
    const sourceRef = (0, react_1.useRef)(null);
    const { title, description, tags, metadata, collectionId, videoURL } = inputData;
    const displayVideoFrame = (video, source, file) => {
        source.setAttribute('src', URL.createObjectURL(file));
        video.load();
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevInputData) => (Object.assign(Object.assign({}, prevInputData), { [name]: value })));
    };
    const updateCollectionId = (collectionId) => {
        setInputData(Object.assign(Object.assign({}, inputData), { collectionId: collectionId }));
    };
    const updateVideoURL = (event) => {
        setInputData(Object.assign(Object.assign({}, inputData), { videoURL: event.target.value }));
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
    function handleDropboxFiles(files) {
        setUploadMethod('dropbox');
        setDropboxFileLinks(files.map((file) => {
            return file.link;
        }));
        setDropboxFileNames(files.map((file) => {
            return file.name;
        }));
    }
    const renderUploadMethod = () => {
        if (uploadMethod === 'file') {
            return (react_1.default.createElement(importZone_1.default, { initialState: initialState, onFileSelected: onFileSelected, videoRef: videoRef, sourceRef: sourceRef }));
        }
        else if (uploadMethod === 'url') {
            return (react_1.default.createElement(Wrapper, null,
                react_1.default.createElement(Stack_1.Stack, null,
                    react_1.default.createElement(FieldLabelStyled, { required: true }, "Video URL"),
                    react_1.default.createElement(Field_1.FieldInput, { placeholder: "Enter URL to import a file", type: "text", onChange: updateVideoURL }))));
        }
        else if (uploadMethod === 'dropbox') {
            return (react_1.default.createElement(Wrapper, null,
                react_1.default.createElement(Stack_1.Stack, { spacing: 2 },
                    react_1.default.createElement(Typography_1.Typography, null, `${dropboxFileLinks.length} ${dropboxFileLinks.length > 1 ? 'files' : 'file'} selected`),
                    react_1.default.createElement("ul", null, dropboxFileNames.map((fileName, index) => (react_1.default.createElement("li", { key: index },
                        react_1.default.createElement(Typography_1.Typography, { variant: "omega" }, `${index + 1}. ${fileName}`))))))));
        }
        else {
            return (react_1.default.createElement(Wrapper, null,
                react_1.default.createElement(Stack_1.Stack, { size: 4 },
                    react_1.default.createElement(Button_1.Button, { variant: "primary", onClick: () => {
                            setUploadMethod('file');
                        } }, "Upload via File"),
                    react_1.default.createElement(Button_1.Button, { variant: "primary", onClick: () => {
                            setUploadMethod('url');
                        } }, "Upload via URL"),
                    react_1.default.createElement(react_dropbox_chooser_1.default, { appKey: dropbox_1.DROPBOX_CLIENT_ID, success: handleDropboxFiles, cancel: () => console.log('closed'), multiselect: true },
                        react_1.default.createElement(Button_1.Button, { variant: "primary" }, "Upload via Dropbox")))));
        }
    };
    return (react_1.default.createElement(ModalLayout_1.ModalLayout, { onClose: close, labelledBy: "title" },
        react_1.default.createElement(ModalLayout_1.ModalHeader, null,
            react_1.default.createElement(Typography_1.Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title" }, "Upload a video")),
        react_1.default.createElement(ModalLayout_1.ModalBody, null,
            renderUploadMethod(),
            react_1.default.createElement(Fields_1.default, { name: "title", label: "Title", value: title, placeholder: "Enter your title", onChange: handleChange, required: true }),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Fields_1.default, { name: "description", label: "Description", value: description || '', placeholder: "Enter a description", onChange: handleChange, required: true }),
            react_1.default.createElement("br", null),
            react_1.default.createElement(CollectionId_1.default, { name: "Collection Id", description: "Collection Id", required: true, selectedValue: collectionId, onChange: updateCollectionId }),
            react_1.default.createElement("br", null),
            react_1.default.createElement(Tags_1.default, { handleSetTag: handleSetTag, handleRemoveTag: handleRemoveTag, tags: tags || [], editable: true }),
            react_1.default.createElement(Metadata_1.default, { metadata: metadata, handleSetMetadata: handleSetMetadata, handleRemoveMetadata: handleRemoveMetadata, editable: true })),
        react_1.default.createElement(ModalLayout_1.ModalFooter, { startActions: react_1.default.createElement(Button_1.Button, { onClick: close, variant: "tertiary" }, "Cancel"), endActions: react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(UploadButton_1.default, { uploadMethod: uploadMethod, currentFile: file, title: title, description: description, tags: tags || [], metadata: metadata || [], collectionId: collectionId, videoURL: videoURL, dropboxFileLinks: dropboxFileLinks, update: update, close: close })) })));
};
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
`;
const DropboxWrapper = styled_components_1.default.div `
  width: 100%;
  height: 300px;
  border: 1px dashed #eaeaea;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: border 0.4s ease-in-out;
  margin-bottom: 20px;
  padding: 10px;

  &:hover {
    border: 1px dashed #4642eb;
  }
`;
const FieldLabelStyled = (0, styled_components_1.default)(Field_1.FieldLabel) `
  width: 100%;
  & > div {
    width: max-content;
  }
`;
exports.default = AddVideoModal;
