"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const ToggleInput_1 = require("@strapi/design-system/ToggleInput");
const Flex_1 = require("@strapi/design-system/Flex");
const Field_1 = require("@strapi/design-system/Field");
const FieldLabelStyled = (0, styled_components_1.default)(Field_1.FieldLabel) `
    & > div {
        width: max-content;
    }
`;
const Toggle = ({ label, required, checked, onLabel, offLabel, onChange = () => { }, }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Flex_1.Flex, null,
            react_1.default.createElement(FieldLabelStyled, { required: required }, label)),
        react_1.default.createElement(ToggleInput_1.ToggleInput, { checked: checked, onLabel: onLabel, offLabel: offLabel, onChange: onChange })));
};
exports.default = Toggle;
