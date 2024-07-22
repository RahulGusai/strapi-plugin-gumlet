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
Object.defineProperty(exports, "__esModule", { value: true });
const private_videos_1 = require("./utils/private-videos");
exports.default = ({ strapi }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const extensionService = (_a = strapi.plugin('graphql')) === null || _a === void 0 ? void 0 : _a.service('extension');
    if (!extensionService) {
        return;
    }
    extensionService.use({
        resolvers: {
            ApiVideoUploaderApiVideoAssetEntity: {
                attributes: {
                    resolve: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () { return (0, private_videos_1.replacePrivateVideoTokens)(parent); })
                }
            },
        }
    });
});
