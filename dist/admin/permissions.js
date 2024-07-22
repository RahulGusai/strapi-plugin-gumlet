"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const settingsRead = [{ action: actions_1.settingsReadAction, subject: null }];
const settingsUpdate = [{ action: actions_1.settingsUpdateAction, subject: null }];
const mainRead = [{ action: actions_1.mainReadAction, subject: null }];
const mainCreate = [{ action: actions_1.mainCreateAction, subject: null }];
const mainUpdate = [{ action: actions_1.mainUpdateAction, subject: null }];
const mainDelete = [{ action: actions_1.mainDeleteAction, subject: null }];
const pluginPermissions = {
    // This permission regards the main component (App) and is used to tell
    // If the plugin link should be displayed in the menu
    // And also if the plugin is accessible. This use case is found when a user types the url of the
    // plugin directly in the browser
    settingsRoles: new Array().concat(settingsRead, settingsUpdate),
    settingsRead,
    settingsUpdate,
    mainRead,
    mainCreate,
    mainUpdate,
    mainDelete,
};
exports.default = pluginPermissions;
