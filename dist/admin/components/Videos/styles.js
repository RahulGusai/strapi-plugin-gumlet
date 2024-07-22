"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateStyle = exports.SubTitle = exports.Title = exports.TitleWrapper = exports.WrapperVideo = exports.Thumbnail = exports.GridBroadcast = exports.Container = exports.DeleteIcon = exports.GridBroadcastWrapper = void 0;
const styled_components_1 = __importDefault(require("styled-components"));
const IconButton_1 = require("@strapi/design-system/IconButton");
exports.GridBroadcastWrapper = styled_components_1.default.div `
    padding: 10px;
`;
exports.DeleteIcon = (0, styled_components_1.default)(IconButton_1.IconButton) `
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: none;
`;
exports.Container = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    background: #212134;
    border: 1px solid #32324d;
    cursor: pointer;
    box-shadow: 1px 1px 10px rgba(3,3,5,0.2);

    &:hover ${exports.DeleteIcon} {
        display: block;
    }
`;
exports.GridBroadcast = styled_components_1.default.div `
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 16px;
    width: 100%;
    padding: 20px 0;
    overflow: auto;
`;
exports.Thumbnail = styled_components_1.default.img `
    width: fit-content;
    height: 100%;
`;
exports.WrapperVideo = styled_components_1.default.div `
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 10.25rem;
    overflow: hidden;
    background: repeating-conic-gradient(#181826 0% 25%,transparent 0% 50%) 50% / 20px 20px;
`;
exports.TitleWrapper = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
`;
exports.Title = styled_components_1.default.p `
    font-size: .75rem;
    line-height: 1.33;
    font-weight: 600;
    color: ${p => p.dark ? '#ffffff' : '#32324d'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 4px;
`;
exports.SubTitle = styled_components_1.default.p `
    color: #606060;
    font-size: .70rem;
    font-style: italic;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;
exports.DateStyle = styled_components_1.default.p `
    color: #666687;
    font-size: .70rem;
    margin-top: 10px;
`;
