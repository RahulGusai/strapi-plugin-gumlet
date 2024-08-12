"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dropbox_chooser_1 = __importDefault(require("react-dropbox-chooser"));
const dropbox_1 = require("../../constants/dropbox");
const DropboxChooserComponent = () => {
    return (react_1.default.createElement(react_dropbox_chooser_1.default, { origin: 'http://localhost:1337/admin', appKey: dropbox_1.DROPBOX_CLIENT_ID, success: (files) => console.log('closed'), cancel: () => console.log('closed'), multiselect: true },
        react_1.default.createElement("div", { className: "dropbox-button" }, "Click me!")));
};
exports.default = DropboxChooserComponent;
