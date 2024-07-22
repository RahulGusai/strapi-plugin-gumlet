"use strict";
/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const helper_plugin_1 = require("@strapi/helper-plugin");
const pluginId_1 = __importDefault(require("../../pluginId"));
const HomePage_1 = __importDefault(require("../HomePage"));
const App = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: `/plugins/${pluginId_1.default}`, component: HomePage_1.default, exact: true }),
            react_1.default.createElement(react_router_dom_1.Route, { component: helper_plugin_1.NotFound }))));
};
exports.default = App;
