"use strict";
/*
 *
 * HomePage
 *
 */
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
const Layout_1 = require("@strapi/design-system/Layout");
const helper_plugin_1 = require("@strapi/helper-plugin");
const react_1 = __importStar(require("react"));
const private_video_session_1 = require("@api.video/private-video-session");
const helper_plugin_2 = require("@strapi/helper-plugin");
const assets_1 = __importDefault(require("../../api/assets"));
const settings_1 = __importDefault(require("../../api/settings"));
const AddButton_1 = __importDefault(require("../../components/Button/AddButton"));
const EmptyState_1 = __importDefault(require("../../components/EmptyState"));
const SearchBar_1 = __importDefault(require("../../components/SearchBar"));
const SetupNeeded_1 = __importDefault(require("../../components/SetupNeeded"));
const Videos_1 = __importDefault(require("../../components/Videos"));
const styles_1 = require("../../components/Videos/styles");
const permissions_1 = __importDefault(require("../../permissions"));
const HomePage = () => {
    const [isLoadingData, setIsLoadingData] = (0, react_1.useState)(true);
    const [isLoadingConfiguration, setIsLoadingConfiguration] = (0, react_1.useState)(false);
    const [isConfigurated, setIsConfigurated] = (0, react_1.useState)(false);
    const [assets, setAssets] = (0, react_1.useState)([]);
    const [search, setSearch] = (0, react_1.useState)('');
    const permissions = (0, react_1.useMemo)(() => {
        return {
            read: permissions_1.default.mainRead,
            create: permissions_1.default.mainCreate,
            delete: permissions_1.default.mainDelete,
            update: permissions_1.default.mainUpdate,
            updateSettings: permissions_1.default.settingsUpdate,
        };
    }, []);
    const { isLoading: isLoadingPermissions, allowedActions: { canRead, canCreate, canDelete, canUpdate, canUpdateSettings, }, } = (0, helper_plugin_2.useRBAC)(permissions);
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        if (isLoadingData === false)
            setIsLoadingData(true);
        const data = yield Promise.all((yield assets_1.default.getAllvideos()).map((video) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            video._public = (_a = video._public) !== null && _a !== void 0 ? _a : true;
            if (video._public) {
                return video;
            }
            const token = (yield assets_1.default.getToken(video.videoId)).token;
            const privateSession = new private_video_session_1.PrivateVideoSession({
                token,
                videoId: video.videoId,
            });
            return Object.assign(Object.assign({}, video), { 
                // thumbnail: await privateSession.getThumbnailUrl(),
                // privateSession: await privateSession.getSessionToken(),
                token });
        })));
        setIsLoadingData(false);
        setAssets(data);
    });
    const getApiKey = () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        setIsLoadingConfiguration(true);
        const settings = yield settings_1.default.get();
        setIsConfigurated(((_b = settings === null || settings === void 0 ? void 0 : settings.apiKey) === null || _b === void 0 ? void 0 : _b.length) > 0);
        setIsLoadingConfiguration(false);
    });
    (0, react_1.useEffect)(() => {
        fetchData();
    }, []);
    (0, react_1.useEffect)(() => {
        getApiKey();
    }, []);
    const handleSearch = (value) => {
        setSearch(value);
    };
    if (isLoadingConfiguration || isLoadingPermissions)
        return react_1.default.createElement(helper_plugin_1.LoadingIndicatorPage, null);
    return (react_1.default.createElement(Layout_1.Layout, null,
        react_1.default.createElement(Layout_1.BaseHeaderLayout, { title: "Gumlet video uploader", subtitle: "Upload to and manage your Gumlet library directly within Strapi", as: "h2", primaryAction: isConfigurated && canCreate && react_1.default.createElement(AddButton_1.default, { update: fetchData }) }),
        isConfigurated ? (!isLoadingData && (assets === null || assets === void 0 ? void 0 : assets.length) > 0 ? (react_1.default.createElement(Layout_1.ContentLayout, null,
            react_1.default.createElement(SearchBar_1.default, { search: search, handleSearch: (query) => handleSearch(query), clearSearch: () => setSearch('') }),
            react_1.default.createElement(styles_1.GridBroadcast, null, assets
                .filter((item) => item.title.includes(search))
                .map((video) => {
                const { videoId } = video;
                return (react_1.default.createElement(Videos_1.default, { video: video, key: videoId, updateData: fetchData, editable: canUpdate, deletable: canDelete }));
            })))) : (react_1.default.createElement(EmptyState_1.default, { update: fetchData }))) : (react_1.default.createElement(SetupNeeded_1.default, null))));
};
exports.default = () => (react_1.default.createElement(helper_plugin_2.CheckPagePermissions, { permissions: permissions_1.default.mainRead },
    react_1.default.createElement(HomePage, null)));
