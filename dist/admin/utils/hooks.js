"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = void 0;
const react_1 = require("react");
function useTheme() {
    const [theme, setTheme] = (0, react_1.useState)('dark');
    (0, react_1.useEffect)(() => {
        var _a;
        if (window && window.localStorage)
            setTheme((_a = window.localStorage) === null || _a === void 0 ? void 0 : _a.STRAPI_THEME);
    }, []);
    return theme;
}
exports.useTheme = useTheme;
