"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomBadge = exports.FormInput = exports.SubTitle = exports.Title = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const Badge_1 = require("@strapi/design-system/Badge");
exports.Title = styled_components_1.default.p `
    color: ${p => p.dark ? '#ffffff' : '#32324d'};
    font-size: 12px;
    font-weight: bold;
    padding: 0px 0px 5px 0px;
`;
exports.SubTitle = styled_components_1.default.p `
    color: #666c8e;
    font-size: 12px;
    padding-bottom: 10px;
`;
exports.FormInput = styled_components_1.default.input `
    border: 1px solid #eaeaef;
    width: 150px;
    height: 32px;
    padding: 0px 12px;
    border-radius: 4px;
    color: #32324d;
    font-size: 12px;

    &:focus {
        outline: none;
    }
    &::placeholder {
        color: #cecece;
    }
`;
exports.CustomBadge = (0, styled_components_1.default)(Badge_1.Badge) `
    margin-left: 10px;
`;
