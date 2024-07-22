"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Dialog_1 = require("@strapi/design-system/Dialog");
const Button_1 = require("@strapi/design-system/Button");
const Stack_1 = require("@strapi/design-system/Stack");
const Typography_1 = require("@strapi/design-system/Typography");
const Flex_1 = require("@strapi/design-system/Flex");
const ExclamationMarkCircle_1 = __importDefault(require("@strapi/icons/ExclamationMarkCircle"));
const Trash_1 = __importDefault(require("@strapi/icons/Trash"));
const styled_components_1 = __importDefault(require("styled-components"));
const DialogDelete = ({ title, isOpen, close, deleteVideo }) => {
    return (react_1.default.createElement(Dialog_1.Dialog, { onClose: close, title: "Confirmation", isOpen: isOpen },
        react_1.default.createElement(Dialog_1.DialogBody, { icon: react_1.default.createElement(ExclamationMarkCircle_1.default, null) },
            react_1.default.createElement(Stack_1.Stack, { spacing: 2 },
                react_1.default.createElement(Flex_1.Flex, { justifyContent: "center" },
                    react_1.default.createElement(Typography_1.Typography, { id: "confirm-description", textAlign: 'center' },
                        "Are you sure you want to delete the video named ",
                        react_1.default.createElement(Title, null, title),
                        "?")))),
        react_1.default.createElement(Dialog_1.DialogFooter, { startAction: react_1.default.createElement(Button_1.Button, { onClick: close, variant: "tertiary" }, "Cancel"), endAction: react_1.default.createElement(Button_1.Button, { variant: "danger-light", startIcon: react_1.default.createElement(Trash_1.default, null), onClick: deleteVideo }, "Confirm") })));
};
exports.default = DialogDelete;
const Title = styled_components_1.default.span `
    font-weight: bold;
`;
