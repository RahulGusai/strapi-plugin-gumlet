"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyClipboard = void 0;
const copyClipboard = (entryText) => {
    navigator.clipboard.writeText(entryText);
};
exports.copyClipboard = copyClipboard;
