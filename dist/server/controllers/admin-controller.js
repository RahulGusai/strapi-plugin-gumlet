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
const _1 = require(".");
const actions_1 = require("../../admin/actions");
exports.default = ({ strapi }) => ({
    createVideoId(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainCreateAction)) {
                    return ctx.forbidden();
                }
                return yield strapi
                    .plugin("strapi-uploader-plugin")
                    .service("api-video-asset")
                    .createVideoId(ctx.request.body);
            }
            catch (err) {
                ctx.throw(500, err);
            }
        });
    },
    create(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainCreateAction)) {
                    return ctx.forbidden();
                }
                ctx.body = yield strapi
                    .plugin("strapi-uploader-plugin")
                    .service("api-video-asset")
                    .create(ctx.request.body);
            }
            catch (err) {
                ctx.throw(500, err);
            }
        });
    },
    findAll(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainReadAction)) {
                    return ctx.forbidden();
                }
                ctx.body = yield strapi
                    .plugin("strapi-uploader-plugin")
                    .service("api-video-asset")
                    .findAll(ctx.request.body);
            }
            catch (err) {
                ctx.throw(500, err);
            }
        });
    },
    token(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainReadAction)) {
                    return ctx.forbidden();
                }
                ctx.body = yield strapi
                    .plugin("strapi-uploader-plugin")
                    .service("api-video-asset")
                    .token(ctx.params.videoId);
            }
            catch (err) {
                ctx.throw(500, err);
            }
        });
    },
    update(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainUpdateAction)) {
                    return ctx.forbidden();
                }
                ctx.body = yield strapi
                    .plugin("strapi-uploader-plugin")
                    .service("api-video-asset")
                    .update(ctx.params.id, ctx.params.videoId, ctx.request.body);
            }
            catch (err) {
                ctx.throw(500, err);
            }
        });
    },
    delete(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainDeleteAction)) {
                    return ctx.forbidden();
                }
                return yield strapi
                    .plugin("strapi-uploader-plugin")
                    .service("api-video-asset")
                    .delete(ctx.params.id, ctx.params.videoId);
            }
            catch (err) {
                ctx.throw(500, err);
            }
        });
    },
});
