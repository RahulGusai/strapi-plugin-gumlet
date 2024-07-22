"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Box_1 = require("@strapi/design-system/Box");
const EmptyStateLayout_1 = require("@strapi/design-system/EmptyStateLayout");
const ArrowRight_1 = __importDefault(require("@strapi/icons/ArrowRight"));
const Button_1 = require("@strapi/design-system/Button");
const Illo_1 = require("../../assets/Illo");
const react_router_dom_1 = require("react-router-dom");
const pluginId_1 = __importDefault(require("../../pluginId"));
const SetupNeeded = () => {
    const history = (0, react_router_dom_1.useHistory)();
    const onSettingsClick = () => {
        history.push(`/settings/${pluginId_1.default}`);
    };
    return (react_1.default.createElement(Box_1.Box, { padding: 10, background: "neutral100" },
        react_1.default.createElement(EmptyStateLayout_1.EmptyStateLayout, { icon: react_1.default.createElement(Illo_1.Illo, null), content: "In order for uploads to function, an administrator will need to complete the setup of this plugin by visiting the settings page. Click the button below to be taken there now.", action: react_1.default.createElement(Button_1.Button, { variant: "default", endIcon: react_1.default.createElement(ArrowRight_1.default, null), onClick: onSettingsClick }, "Go to settings") })));
};
exports.default = SetupNeeded;
