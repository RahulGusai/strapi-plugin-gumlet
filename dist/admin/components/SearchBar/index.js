"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Searchbar_1 = require("@strapi/design-system/Searchbar");
const SearchBar = ({ clearSearch, handleSearch, search }) => {
    return (react_1.default.createElement(Searchbar_1.SearchForm, null,
        react_1.default.createElement(Searchbar_1.Searchbar, { name: "searchbar", onClear: clearSearch, value: search, onChange: (e) => handleSearch(e.target.value), clearLabel: "Clearing the plugin search", placeholder: "Filter by title" }, "Searching for a plugin")));
};
exports.default = SearchBar;
