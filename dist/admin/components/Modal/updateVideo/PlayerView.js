"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_player_1 = __importDefault(require("@api.video/react-player"));
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const PlayerView = ({ video }) => {
    const { videoId, token, privateSession } = video;
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(react_player_1.default, { video: video._public ? { id: videoId } : { id: videoId, token, privateSession }, videoStyleObjectFit: 'cover', style: {
                width: 'auto',
                height: 300,
                borderRadius: 4,
                overflow: 'hidden',
            } })));
};
exports.default = PlayerView;
const Wrapper = styled_components_1.default.div `
    border-radius: 4px;
    padding-bottom: 10px;
`;
