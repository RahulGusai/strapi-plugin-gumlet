"use strict";
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
const strapi_1 = require("@strapi/strapi");
const pluginId_1 = __importDefault(require("../../admin/pluginId"));
const model = `plugin::${pluginId_1.default}.api-video-asset`;
exports.default = strapi_1.factories.createCoreController('plugin::strapi-uploader-plugin.api-video-asset', ({ strapi }) => ({
    count(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return yield strapi.entityService.count(model, ctx.query);
        });
    },
    find(ctx) {
        return __awaiter(this, void 0, void 0, function* () { });
    },
    findOne(ctx) {
        return __awaiter(this, void 0, void 0, function* () { });
    },
}));
