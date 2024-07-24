"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const react_player_1 = __importDefault(require("react-player"));
const PlayerView = ({ video }) => {
    const { playbackUrl } = video;
    return (react_1.default.createElement(Wrapper, null,
        react_1.default.createElement(react_player_1.default, { url: playbackUrl, controls: true, width: "auto", height: "300px", style: {
                borderRadius: 4,
                overflow: 'hidden',
                marginBottom: '20px',
            } })));
};
exports.default = PlayerView;
const Wrapper = styled_components_1.default.div `
  width: 100%;
  height: auto;
`;
