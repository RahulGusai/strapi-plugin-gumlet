"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Button_1 = require("@strapi/design-system/Button");
const Plus_1 = __importDefault(require("@strapi/icons/Plus"));
const AddVideo_1 = __importDefault(require("../../Modal/AddVideo"));
const AddButton = ({ isVisible, setIsVisible, update, dropboxAccessToken, }) => {
    //   const [isVisible, setIsVisible] = useState(false);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.Button, { endIcon: react_1.default.createElement(Plus_1.default, null), onClick: () => setIsVisible(true) }, "Add a video"),
        isVisible && (react_1.default.createElement(AddVideo_1.default, { update: update, close: () => setIsVisible(false), dropboxAccessToken: dropboxAccessToken }))));
};
exports.default = AddButton;
