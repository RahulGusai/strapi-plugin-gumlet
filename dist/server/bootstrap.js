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
const pluginId_1 = __importDefault(require("../admin/pluginId"));
exports.default = ({ strapi }) => __awaiter(void 0, void 0, void 0, function* () {
    const actions = [
        // App
        {
            section: 'plugins',
            displayName: 'Read',
            uid: 'read',
            pluginName: pluginId_1.default,
        },
        {
            section: 'plugins',
            displayName: 'Create',
            uid: 'create',
            pluginName: pluginId_1.default,
        },
        {
            section: 'plugins',
            displayName: 'Update',
            uid: 'update',
            pluginName: pluginId_1.default,
        },
        {
            section: 'plugins',
            displayName: 'Delete',
            uid: 'delete',
            pluginName: pluginId_1.default,
        },
        // Settings
        {
            section: 'plugins',
            displayName: 'Read',
            subCategory: 'settings',
            uid: 'settings.read',
            pluginName: pluginId_1.default,
        },
        {
            section: 'plugins',
            displayName: 'Update',
            subCategory: 'settings',
            uid: 'settings.update',
            pluginName: pluginId_1.default,
        },
    ];
    yield strapi.admin.services.permission.actionProvider.registerMany(actions);
});
