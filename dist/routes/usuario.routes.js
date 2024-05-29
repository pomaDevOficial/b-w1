"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsuario = void 0;
const express_1 = require("express");
const imagen_1 = __importDefault(require("../utils/helpers/imagen"));
const usuario_controller_1 = require("../controllers/usuario.controller");
const routerUsuario = (0, express_1.Router)();
exports.routerUsuario = routerUsuario;
routerUsuario.post('/', usuario_controller_1.postUsuario);
routerUsuario.post('/login', usuario_controller_1.postUsuarioLogin);
routerUsuario.post('/upload/informacion', imagen_1.default.fields([{ name: 'perfilimagen', maxCount: 1 }, { name: 'backgroundImage', maxCount: 1 }]), usuario_controller_1.cambiarAperiencia);
