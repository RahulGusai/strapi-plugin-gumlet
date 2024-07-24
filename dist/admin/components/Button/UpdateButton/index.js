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
const Button_1 = require("@strapi/design-system/Button");
const helper_plugin_1 = require("@strapi/helper-plugin");
const assets_1 = __importDefault(require("../../../api/assets"));
const UpdateButton = ({ title, description, _public, tags, metadata, id, videoId, update, close, }) => {
    const [isUploading, setIsUploading] = (0, react_1.useState)(false);
    const notification = (0, helper_plugin_1.useNotification)();
    const updateData = () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            title: title,
            description: description,
            //   tag: tags,
            //   metadata: metadata,
        };
        setIsUploading(true);
        try {
            const data = yield assets_1.default.update(id, videoId, body);
            if (data) {
                setIsUploading(false);
                update();
                close();
            }
            else {
                notification({
                    type: 'warning',
                    message: 'Error while creating video',
                });
            }
        }
        catch (e) {
            console.error(e);
        }
    });
    return react_1.default.createElement(Button_1.Button, { onClick: updateData }, "Update");
};
exports.default = UpdateButton;
