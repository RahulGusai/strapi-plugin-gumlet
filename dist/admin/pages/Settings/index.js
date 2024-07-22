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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const helper_plugin_1 = require("@strapi/helper-plugin");
const Box_1 = require("@strapi/design-system/Box");
const Button_1 = require("@strapi/design-system/Button");
const Grid_1 = require("@strapi/design-system/Grid");
const Layout_1 = require("@strapi/design-system/Layout");
const Stack_1 = require("@strapi/design-system/Stack");
const Typography_1 = require("@strapi/design-system/Typography");
const Check_1 = __importDefault(require("@strapi/icons/Check"));
const settings_1 = __importDefault(require("../../api/settings"));
const Fields_1 = __importDefault(require("../../components/FieldComp/Fields"));
const Toggle_1 = __importDefault(require("../../components/Toggle"));
const permissions_1 = __importDefault(require("../../permissions"));
const Settings = () => {
    const [settings, setSettings] = (0, react_1.useState)({
        apiKey: '',
        defaultPublic: true
    });
    const { lockApp, unlockApp } = (0, helper_plugin_1.useOverlayBlocker)();
    const notification = (0, helper_plugin_1.useNotification)();
    const getSettings = () => __awaiter(void 0, void 0, void 0, function* () {
        const settings = yield settings_1.default.get();
        setSettings(settings);
    });
    (0, react_1.useEffect)(() => {
        getSettings();
    }, []);
    const handleChange = (event) => {
        setSettings(Object.assign(Object.assign({}, settings), { apiKey: event.target.value }));
    };
    const handleSetPublic = (event) => {
        setSettings(Object.assign(Object.assign({}, settings), { defaultPublic: event.target.checked }));
    };
    const handleOnSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        lockApp();
        const response = yield settings_1.default.update(settings);
        if (response) {
            notification({
                type: 'success',
                message: 'Changes saved',
            });
        }
        else {
            notification({
                type: 'warning',
                message: 'Please enter valid settings',
            });
        }
        unlockApp();
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Layout_1.HeaderLayout, { title: 'api.video uploader', primaryAction: react_1.default.createElement(Button_1.Button, { type: "submit", onClick: handleOnSubmit, startIcon: react_1.default.createElement(Check_1.default, null), size: "L" }, "Save") }),
        react_1.default.createElement(Layout_1.ContentLayout, null,
            react_1.default.createElement(Box_1.Box, { background: "neutral0", hasRadius: true, shadow: "filterShadow", paddingTop: 6, paddingBottom: 6, paddingLeft: 7, paddingRight: 7 },
                react_1.default.createElement(Stack_1.Stack, { size: 4 },
                    react_1.default.createElement(Typography_1.Typography, { variant: "delta", as: "h2" }, "Settings"),
                    react_1.default.createElement(Grid_1.Grid, { gap: 6 },
                        react_1.default.createElement(Grid_1.GridItem, { col: 12, s: 12 },
                            react_1.default.createElement(Fields_1.default, { name: "API Key", label: "API Key", value: settings.apiKey, placeholder: "Enter your API Key", description: "Generated in the api.video's dashboard and used for authenticating API calls.", detailsLink: "https://dashboard.api.video", isPassword: true, onChange: handleChange })),
                        react_1.default.createElement(Grid_1.GridItem, { col: 12, s: 12 },
                            react_1.default.createElement(Toggle_1.default, { label: "Default Video Privacy", checked: settings.defaultPublic, required: true, onLabel: "Public", offLabel: "Private", onChange: handleSetPublic }))))))));
};
exports.default = () => (react_1.default.createElement(helper_plugin_1.CheckPagePermissions, { permissions: permissions_1.default.settingsRoles },
    react_1.default.createElement(Settings, null)));
