"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Icon_1 = require("@strapi/design-system/Icon");
const Flex_1 = require("@strapi/design-system/Flex");
const icons_1 = require("@strapi/icons");
const IconBox = (0, styled_components_1.default)(Flex_1.Flex) `
  /* Hard code color values */
  /* to stay consistent between themes */
  background-color: #f0f0ff; /* primary100 */
  border: 1px solid #d9d8ff; /* primary200 */
  svg > path {
    fill: #4945ff; /* primary600 */
  }
`;
const GumletVideoIcon = () => {
    return (react_1.default.createElement(IconBox, { justifyContent: "center", alignItems: "center", width: 7, height: 6, hasRadius: true, "aria-hidden": true },
        react_1.default.createElement(Icon_1.Icon, { as: icons_1.Play })));
};
exports.default = GumletVideoIcon;
