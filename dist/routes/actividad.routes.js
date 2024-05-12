"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerActividad = void 0;
const express_1 = require("express");
const actividad_controllers_1 = require("../controllers/actividad.controllers");
const routerActividad = (0, express_1.Router)();
exports.routerActividad = routerActividad;
routerActividad.get('/', actividad_controllers_1.getActividades);
routerActividad.post('/', actividad_controllers_1.postActividad);
