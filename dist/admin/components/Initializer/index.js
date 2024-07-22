"use strict";
/**
 *
 * Initializer
 *
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const prop_types_1 = __importDefault(require("prop-types"));
const pluginId_1 = __importDefault(require("../../pluginId"));
const Initializer = ({ setPlugin }) => {
    const ref = (0, react_1.useRef)();
    ref.current = setPlugin;
    (0, react_1.useEffect)(() => {
        ref.current(pluginId_1.default);
    }, []);
    return null;
};
Initializer.propTypes = {
    setPlugin: prop_types_1.default.func.isRequired,
};
exports.default = Initializer;
