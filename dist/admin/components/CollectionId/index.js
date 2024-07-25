"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const design_system_1 = require("@strapi/design-system");
const settings_1 = __importDefault(require("../../api/settings"));
const Field_1 = require("@strapi/design-system/Field");
const Stack_1 = require("@strapi/design-system/Stack");
const styled_components_1 = __importDefault(require("styled-components"));
const CollectionId = ({ name, description, required, selectedValue, onChange, }) => {
    const [selected, setSelected] = (0, react_1.useState)(selectedValue);
    const [collectionIds, setCollectionIds] = (0, react_1.useState)([]);
    const handleSelectChange = (value) => {
        setSelected(value);
        onChange(value);
    };
    (0, react_1.useEffect)(() => {
        const fetchCollectionIds = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { collectionIds } = yield settings_1.default.get();
                setCollectionIds(collectionIds);
            }
            catch (error) {
                console.error('Failed to fetch collection IDs:', error);
            }
        });
        fetchCollectionIds();
    }, []);
    const FieldLabelStyled = (0, styled_components_1.default)(Field_1.FieldLabel) `
    width: 100%;
    & > div {
      width: max-content;
    }
  `;
    return (react_1.default.createElement(Field_1.Field, { name: name, hint: description },
        react_1.default.createElement(Stack_1.Stack, null,
            react_1.default.createElement(FieldLabelStyled, { required: required }, description),
            react_1.default.createElement(design_system_1.Select, { placeholder: "Choose a value", value: selected, onChange: handleSelectChange }, collectionIds.map((collectionId) => (react_1.default.createElement(design_system_1.Option, { key: collectionId, value: collectionId }, collectionId)))))));
};
exports.default = CollectionId;
