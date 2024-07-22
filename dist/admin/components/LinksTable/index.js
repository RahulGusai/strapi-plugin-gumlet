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
const Button_1 = require("@strapi/design-system/Button");
const Flex_1 = require("@strapi/design-system/Flex");
const IconButton_1 = require("@strapi/design-system/IconButton");
const Table_1 = require("@strapi/design-system/Table");
const Typography_1 = require("@strapi/design-system/Typography");
const VisuallyHidden_1 = require("@strapi/design-system/VisuallyHidden");
const Link_1 = __importDefault(require("@strapi/icons/Link"));
const react_1 = __importStar(require("react"));
const private_videos_1 = require("../../../server/utils/private-videos");
const assets_1 = __importDefault(require("../../api/assets"));
const form_1 = require("../../styles/form");
const utils_1 = require("../../utils");
const hooks_1 = require("../../utils/hooks");
const videoToAssets = (video) => {
    const assets = {
        hls: video.hls,
        iframe: video.iframe,
        mp4: video.mp4,
        player: video.player,
    };
    return assets;
};
const LinksTable = ({ video }) => {
    const [assets, setAssets] = (0, react_1.useState)(!!(video === null || video === void 0 ? void 0 : video.token) ? undefined : videoToAssets(video));
    const theme = (0, hooks_1.useTheme)();
    const COL_COUNT = 4;
    const ROW_COUNT = 2;
    const isPrivate = !!(video === null || video === void 0 ? void 0 : video.token);
    const generateToken = () => __awaiter(void 0, void 0, void 0, function* () {
        const token = (yield assets_1.default.getToken(video.videoId)).token;
        setAssets(videoToAssets(yield (0, private_videos_1.replacePrivateVideoTokens)(video, token)));
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(form_1.Title, { dark: theme === 'dark', style: { marginTop: '20px' } }, "Links"),
        isPrivate
            ? react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(form_1.SubTitle, null, "The URLs for assets of private videos can only be used once. To obtain new URLs, you can click on the button below to generate fresh links. Each time you access a private video through the Strapi Content API, a new set of private asset URLs will be generated."),
                react_1.default.createElement(Button_1.Button, { onClick: () => generateToken() }, "Generate new urls"))
            : react_1.default.createElement(form_1.SubTitle, null, "A list of links you can copy by clicking on the copy button."),
        assets && (react_1.default.createElement(Table_1.Table, { colCount: COL_COUNT, rowCount: ROW_COUNT },
            react_1.default.createElement(Table_1.Thead, null,
                react_1.default.createElement(Table_1.Tr, null,
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma" }, "Type")),
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(Typography_1.Typography, { variant: "sigma" }, "Link")),
                    react_1.default.createElement(Table_1.Th, null,
                        react_1.default.createElement(VisuallyHidden_1.VisuallyHidden, null, "Copy")))),
            react_1.default.createElement(Table_1.Tbody, null, Object.entries(assets).map((links, index) => (react_1.default.createElement(Table_1.Tr, { key: index },
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, links[0])),
                react_1.default.createElement(Table_1.Td, { style: {
                        flex: '1',
                        overflow: 'hidden',
                        maxWidth: '50ch',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    } },
                    react_1.default.createElement(Typography_1.Typography, { textColor: "neutral800" }, links[1])),
                react_1.default.createElement(Table_1.Td, null,
                    react_1.default.createElement(Flex_1.Flex, { justifyContent: 'flex-end' },
                        react_1.default.createElement(IconButton_1.IconButton, { onClick: () => (0, utils_1.copyClipboard)(links[1]), label: 'Copy', noBorder: true, icon: react_1.default.createElement(Link_1.default, null) })))))))))));
};
exports.default = LinksTable;
