"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Box_1 = require("@strapi/design-system/Box");
const Flex_1 = require("@strapi/design-system/Flex");
const design_system_1 = require("@strapi/design-system");
const react_1 = __importDefault(require("react"));
const Stack_1 = require("@strapi/design-system/Stack");
const Typography_1 = require("@strapi/design-system/Typography");
const Button_1 = require("@strapi/design-system/Button");
const styled_components_1 = __importDefault(require("styled-components"));
const DropboxView = ({ dropboxFilePaths, selectedFilePath, setUploadMethod, handleRadioChange, }) => {
    return (react_1.default.createElement(DropboxWrapper, null,
        react_1.default.createElement(Stack_1.Stack, { spacing: 2 },
            react_1.default.createElement(Typography_1.Typography, { fontWeight: "bold" }, "Dropbox"),
            react_1.default.createElement(Flex_1.Flex, { gap: 3 },
                react_1.default.createElement(Typography_1.Typography, null, "rgusai97@gmail.com"),
                react_1.default.createElement(Button_1.Button, { onClick: () => setUploadMethod(undefined), variant: "danger" }, "Logout")),
            react_1.default.createElement(Box_1.Box, { padding: 2, hasRadius: true, background: "neutral100" }, dropboxFilePaths.map((filePath, index) => (react_1.default.createElement(design_system_1.Radio, { key: filePath, onChange: () => handleRadioChange(filePath), checked: selectedFilePath === filePath },
                react_1.default.createElement(Typography_1.Typography, null, `${index + 1}. ${filePath}`))))))));
};
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
exports.default = DropboxView;
