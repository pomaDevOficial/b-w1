"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uploadFoler = path_1.default.join(__dirname, '../public/imagenes');
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFoler);
    },
    filename: (req, file, cb) => {
        // console.log(file)
        const filename = 'user' + Date.now() + path_1.default.extname(file.originalname);
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
