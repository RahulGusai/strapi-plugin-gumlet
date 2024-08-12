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
const design_system_1 = require("@strapi/design-system");
const helper_plugin_1 = require("@strapi/helper-plugin");
const assets_1 = __importDefault(require("../../api/assets"));
const Flex_1 = require("@strapi/design-system/Flex");
const Field_1 = require("@strapi/design-system/Field");
const GumletVideoField = ({ name, error, attribute, }) => {
    const { modifiedData, onChange } = (0, helper_plugin_1.useCMEditViewDataManager)();
    const [videoAssets, setVideoAssets] = (0, react_1.useState)([]);
    const [assetId, setAssetId] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (modifiedData[name]) {
            setAssetId(JSON.parse(modifiedData[name]).assetId);
        }
    }, [modifiedData]);
    (0, react_1.useEffect)(() => {
        const fetchGumletAssets = () => __awaiter(void 0, void 0, void 0, function* () {
            const gumletAssets = yield assets_1.default.getAllvideos();
            setVideoAssets(gumletAssets);
            if (assetId && !gumletAssets.some((asset) => asset.videoId === assetId)) {
                setAssetId('');
            }
        });
        fetchGumletAssets();
    }, [assetId]);
    const handleChange = (value) => {
        onChange({
            target: {
                name: name,
                value: JSON.stringify(value),
                type: attribute.type,
            },
        });
    };
    return (react_1.default.createElement(Field_1.Field, { name: name, id: name, error: error },
        react_1.default.createElement(design_system_1.Select, { label: "Select Gumlet Video", name: "gumletVideo", value: assetId || '', onChange: (value) => handleChange({ assetId: value }) }, videoAssets.map((asset) => (react_1.default.createElement(design_system_1.Option, { key: asset.videoId, value: asset.videoId }, asset.title)))),
        assetId && assetId.length > 0 && (react_1.default.createElement(Flex_1.Flex, { paddingTop: 4, justifyContent: 'center' },
            react_1.default.createElement("iframe", { title: "Gumlet video player", style: { width: '60%', height: '300px' }, src: `https://play.gumlet.io/embed/${assetId}?preload=false&autoplay=false&loop=false&disable_player_controls=false`, allow: "accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;" })))));
};
exports.default = GumletVideoField;
