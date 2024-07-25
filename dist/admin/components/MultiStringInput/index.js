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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Button_1 = require("@strapi/design-system/Button");
const design_system_1 = require("@strapi/design-system");
const Field_1 = require("@strapi/design-system/Field");
const MultiStringInput = ({ values, onChange, }) => {
    const [inputValues, setInputValues] = (0, react_1.useState)(values);
    (0, react_1.useEffect)(() => {
        setInputValues(values);
    }, [values]);
    const handleInputChange = (index, value) => {
        const updatedValues = [...inputValues];
        updatedValues[index] = value;
        setInputValues(updatedValues);
        onChange(updatedValues);
    };
    const handleAddInput = () => {
        setInputValues([...inputValues, '']);
    };
    const handleRemoveInput = (index) => {
        const updatedValues = inputValues.filter((_, i) => i !== index);
        setInputValues(updatedValues);
        onChange(updatedValues);
    };
    return (react_1.default.createElement(design_system_1.Stack, { spacing: 5 },
        react_1.default.createElement(Field_1.FieldLabel, null, "Collection Ids"),
        inputValues.map((value, index) => (react_1.default.createElement(design_system_1.Stack, { key: index, horizontal: true, spacing: 4 },
            react_1.default.createElement(Field_1.FieldInput, { placeholder: "Enter a value", value: value, onChange: (e) => handleInputChange(index, e.target.value) }),
            react_1.default.createElement(Button_1.Button, { onClick: () => handleRemoveInput(index) }, "Remove")))),
        react_1.default.createElement(Button_1.Button, { onClick: handleAddInput }, "Add another value")));
};
exports.default = MultiStringInput;
