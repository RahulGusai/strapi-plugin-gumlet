"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/settings',
        handler: 'settings.getSettings',
        config: {
            policies: [],
        },
    },
    {
        method: 'POST',
        path: '/settings',
        handler: 'settings.saveSettings',
        config: {
            policies: [],
        },
    },
];
