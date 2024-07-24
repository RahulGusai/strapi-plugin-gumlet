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
const Trash_1 = __importDefault(require("@strapi/icons/Trash"));
const react_1 = __importStar(require("react"));
const assets_1 = __importDefault(require("../../api/assets"));
const VideoCover_1 = require("../../assets/VideoCover");
const date_1 = require("../../utils/date");
const Dialog_1 = __importDefault(require("../Dialog"));
const updateVideo_1 = __importDefault(require("../Modal/updateVideo"));
const styles_1 = require("./styles");
const hooks_1 = require("../../utils/hooks");
const VideoView = ({ video, updateData, deletable, editable, }) => {
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = (0, react_1.useState)(false);
    const [thumbnail, setThumbnail] = (0, react_1.useState)();
    const theme = (0, hooks_1.useTheme)();
    const thumbnailTimout = (0, react_1.useRef)(0);
    (0, react_1.useEffect)(() => {
        const fetchThumbnail = () => __awaiter(void 0, void 0, void 0, function* () {
            const fetchRes = yield fetch(video.thumbnail);
            if (fetchRes.status === 200) {
                setThumbnail(URL.createObjectURL(yield fetchRes.blob()));
                return;
            }
            thumbnailTimout.current = setTimeout(() => fetchThumbnail(), 1000);
        });
        setThumbnail(undefined);
        fetchThumbnail();
        return () => {
            setTimeout(() => {
                if (thumbnailTimout.current)
                    clearTimeout(thumbnailTimout.current);
            }, 1000);
        };
    }, [video]);
    const deleteVideo = () => __awaiter(void 0, void 0, void 0, function* () {
        yield assets_1.default.delete(video.id, video.videoId);
        setIsDeleteDialogOpen(false);
        updateData();
    });
    const openDeleteDialog = (e) => {
        e.stopPropagation();
        setIsDeleteDialogOpen(true);
    };
    const formatedCreatedAt = (0, date_1.getDayMonthYearHourDate)(video.createdAt);
    return (react_1.default.createElement(styles_1.Container, null,
        react_1.default.createElement(styles_1.WrapperVideo, { onClick: () => setIsModalOpen(true) },
            thumbnail ? (react_1.default.createElement(styles_1.Thumbnail, { src: thumbnail, alt: 'thumbnail' })) : (react_1.default.createElement(VideoCover_1.VideoCover, null)),
            deletable && (react_1.default.createElement(styles_1.DeleteIcon, { onClick: openDeleteDialog, "aria-label": "Delete", icon: react_1.default.createElement(Trash_1.default, null) }))),
        react_1.default.createElement(styles_1.TitleWrapper, null,
            react_1.default.createElement(styles_1.Title, { dark: theme === 'dark' }, video.title),
            react_1.default.createElement(styles_1.SubTitle, null, video.description),
            react_1.default.createElement(styles_1.DateStyle, null, formatedCreatedAt)),
        isModalOpen && (react_1.default.createElement(updateVideo_1.default, { video: video, update: updateData, editable: editable, close: () => setIsModalOpen(false) })),
        isDeleteDialogOpen && (react_1.default.createElement(Dialog_1.default, { title: video.title, isOpen: isDeleteDialogOpen, close: () => setIsDeleteDialogOpen(false), deleteVideo: deleteVideo }))));
};
exports.default = VideoView;
