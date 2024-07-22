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
const Table_1 = require("@strapi/design-system/Table");
const ModalLayout_1 = require("@strapi/design-system/ModalLayout");
const Box_1 = require("@strapi/design-system/Box");
const Button_1 = require("@strapi/design-system/Button");
const Typography_1 = require("@strapi/design-system/Typography");
const TextInput_1 = require("@strapi/design-system/TextInput");
const VisuallyHidden_1 = require("@strapi/design-system/VisuallyHidden");
const Flex_1 = require("@strapi/design-system/Flex");
const IconButton_1 = require("@strapi/design-system/IconButton");
const Plus_1 = __importDefault(require("@strapi/icons/Plus"));
const Trash_1 = __importDefault(require("@strapi/icons/Trash"));
const form_1 = require("../../styles/form");
const hooks_1 = require("../../utils/hooks");
const MetadataTable = ({ metadata, handleSetMetadata, handleRemoveMetadata, editable }) => {
    const [inputData, setInputData] = (0, react_1.useState)({
        key: '',
        value: '',
    });
    const [modalIsVisible, setModalIsVisible] = (0, react_1.useState)(false);
    const { key, value } = inputData;
    const theme = (0, hooks_1.useTheme)();
    const clearInputData = () => setInputData({ key: '', value: '' });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData((prevInputData) => (Object.assign(Object.assign({}, prevInputData), { [name]: value })));
    };
    const saveMetadata = () => {
        handleSetMetadata({
            key: key,
            value: value,
        });
        closeModal();
    };
    const closeModal = () => {
        setModalIsVisible(false);
        clearInputData();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(form_1.Title, { dark: theme === 'dark' },
            "Metadata",
            react_1.default.createElement(form_1.CustomBadge, { active: (metadata === null || metadata === void 0 ? void 0 : metadata.length) !== 0 }, metadata === null || metadata === void 0 ? void 0 : metadata.length)),
        react_1.default.createElement(form_1.SubTitle, null, "A list of key value pairs that you use to provide metadata for your video."),
        react_1.default.createElement(Table_1.Table, { colCount: 5, rowCount: 2, footer: react_1.default.createElement(Table_1.TFooter, { onClick: () => setModalIsVisible(true), icon: react_1.default.createElement(Plus_1.default, null) }, "Add another metadata to this video") },
            react_1.default.createElement(Table_1.Thead, null,
                react_1.default.createElement(Table_1.Tr, null,
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma" }, "Id")),
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma" }, "Key")),
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma" }, "Value")),
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(VisuallyHidden_1.VisuallyHidden, null, "Actions")))),
            react_1.default.createElement(Table_1.Tbody, null, metadata === null || metadata === void 0 ? void 0 : metadata.map((entry, index) => (react_1.default.createElement(Table_1.Tr, { key: index },
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, index + 1)),
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, entry.key)),
                react_1.default.createElement(Table_1.Td, { style: { flex: '1' } },
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, entry.value)),
                react_1.default.createElement(Table_1.Td, null, editable && (react_1.default.createElement(Flex_1.Flex, { justifyContent: 'flex-end' },
                    react_1.default.createElement(IconButton_1.IconButton, { disabled: index === 0, onClick: () => handleRemoveMetadata(entry), label: index === 0 ? "Default value, can't be deleted" : 'Delete', noBorder: true, icon: react_1.default.createElement(Trash_1.default, null) }))))))))),
        modalIsVisible && (react_1.default.createElement(ModalLayout_1.ModalLayout, { onClose: closeModal, labelledBy: "title" },
            react_1.default.createElement(ModalLayout_1.ModalHeader, null,
                react_1.default.createElement(Typography_1.Typography, { fontWeight: "bold", textColor: "neutral800", as: "h2", id: "title" }, "Video metadata")),
            react_1.default.createElement(ModalLayout_1.ModalBody, null,
                react_1.default.createElement(Flex_1.Flex, { gap: 3 },
                    react_1.default.createElement(Box_1.Box, { grow: '1' },
                        react_1.default.createElement(TextInput_1.TextInput, { placeholder: "Metadata key", label: "Key", name: "key", onChange: handleChange, value: key })),
                    react_1.default.createElement(Box_1.Box, { grow: '1' },
                        react_1.default.createElement(TextInput_1.TextInput, { placeholder: "Metadata value", label: "Value", name: "value", onChange: handleChange, value: value })))),
            react_1.default.createElement(ModalLayout_1.ModalFooter, { startActions: react_1.default.createElement(Button_1.Button, { onClick: closeModal, variant: "tertiary" }, "Cancel"), endActions: react_1.default.createElement(Button_1.Button, { onClick: saveMetadata }, "Save") })))));
};
exports.default = MetadataTable;
