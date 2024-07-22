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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const form_1 = require("../../styles/form");
const hooks_1 = require("../../utils/hooks");
const design_system_1 = require("@strapi/design-system");
const Tags = ({ tags, handleSetTag, handleRemoveTag, editable }) => {
    const [value, setValue] = (0, react_1.useState)('');
    const theme = (0, hooks_1.useTheme)();
    const onCreateOption = (value) => {
        handleSetTag(value);
        setValue(value);
    };
    const onClear = () => {
        if (tags.find(tag => tag === value)) {
            handleRemoveTag(value);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(form_1.Title, { dark: theme === 'dark' },
            "Tags",
            react_1.default.createElement(form_1.CustomBadge, { active: tags.length > 0 }, tags.length)),
        react_1.default.createElement(form_1.SubTitle, null, "A list of tags you want to use to describe your video."),
        react_1.default.createElement(design_system_1.CreatableCombobox, { "aria-label": "Tags", value: value, onChange: setValue, onCreateOption: onCreateOption, onClear: onClear, disabled: !editable }, tags.map((tag, i) => (react_1.default.createElement(design_system_1.ComboboxOption, { key: i, value: tag }, tag)))),
        react_1.default.createElement("br", null)));
};
exports.default = Tags;
