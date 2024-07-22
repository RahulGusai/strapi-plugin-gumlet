"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDayMonthYearHourDate = void 0;
const getDayMonthYearHourDate = (dateParam) => {
    const dateObject = new Date(dateParam);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return dateObject.toLocaleDateString('en-GB', options);
};
exports.getDayMonthYearHourDate = getDayMonthYearHourDate;
