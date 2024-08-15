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
    getSettings(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, _1.isAllowedTo)(strapi, ctx, actions_1.settingsReadAction) &&
                    !(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainReadAction) &&
                    !!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainCreateAction) &&
                    !!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainUpdateAction) &&
                    !!(0, _1.isAllowedTo)(strapi, ctx, actions_1.mainDeleteAction)) {
                    return ctx.forbidden();
                }
                console.log('controller.getSettings');
                return yield strapi
                    .plugin('strapi-plugin-gumlet')
                    .service('settings')
                    .getSettings(ctx);
            }
            catch (err) {
                ctx.throw(500, err);
            }
        });
    },
    saveSettings(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, _1.isAllowedTo)(strapi, ctx, actions_1.settingsUpdateAction)) {
                    return ctx.forbidden();
                }
                console.log('controller.saveSettings');
                return yield strapi
                    .plugin('strapi-plugin-gumlet')
                    .service('settings')
                    .saveSettings(ctx.request.body);
            }
            catch (err) {
                ctx.throw(500, err);
            }
        });
    },
});
