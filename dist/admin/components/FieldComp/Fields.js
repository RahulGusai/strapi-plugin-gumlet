"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Box_1 = require("@strapi/design-system/Box");
const Field_1 = require("@strapi/design-system/Field");
const Flex_1 = require("@strapi/design-system/Flex");
const Link_1 = require("@strapi/design-system/Link");
const Stack_1 = require("@strapi/design-system/Stack");
const FieldLabelStyled = (0, styled_components_1.default)(Field_1.FieldLabel) `
    width: 100%;
    & > div {
        width: max-content;
    }
`;
const TooltipButtonStyled = styled_components_1.default.button `
    border: none;
    padding: 0;
    background: transparent;
`;
const FieldComp = ({ name, label, value, isPassword, placeholder, description, tooltip, detailsLink, error, required, onChange = () => { }, editable, }) => {
    return (react_1.default.createElement(Field_1.Field, { name: name, hint: description, error: error },
        react_1.default.createElement(Stack_1.Stack, { spacing: 1 },
            react_1.default.createElement(Flex_1.Flex, null,
                react_1.default.createElement(FieldLabelStyled, { required: required }, label),
                react_1.default.createElement(Box_1.Box, { paddingLeft: 2 }),
                detailsLink && (react_1.default.createElement(Flex_1.Flex, { width: "100%", justifyContent: "flex-end" },
                    react_1.default.createElement(Link_1.Link, { isExternal: true, href: detailsLink }, "Details")))),
            react_1.default.createElement(Field_1.FieldInput, { disabled: editable === undefined ? false : !editable, placeholder: placeholder, value: value, type: isPassword ? 'password' : 'text', onChange: onChange }),
            react_1.default.createElement(Field_1.FieldHint, null),
            react_1.default.createElement(Field_1.FieldError, null))));
};
exports.default = FieldComp;
