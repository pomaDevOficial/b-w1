"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAutor = void 0;
const express_1 = require("express");
const autor_controllers_1 = require("../controllers/autor.controllers");
const routerAutor = (0, express_1.Router)();
exports.routerAutor = routerAutor;
routerAutor.get('/', autor_controllers_1.getAutores);
// routerAutor.post('/nombre/:nombre', getAutoresName)
// routerAutor.post('/seguir',postSeguir)
// routerAutor.get('/followers/:id',getFollowerUsuarioID)
// routerAutor.put('/seguir',putSeguidor)
// routerAutor.post('/seguir/insert',postSeguidorInsert)
routerAutor.put('/actualizarPerfil/:id', autor_controllers_1.putActualizarPerfil);
routerAutor.get('/informacion/:id', autor_controllers_1.getInformacionAutor);
routerAutor.get('/listaxAutor/:id', autor_controllers_1.getListaNumberPublicaciones);
routerAutor.put('/ocupacion/:id', autor_controllers_1.putOcupacion);
routerAutor.get('/notificaciones/:id', autor_controllers_1.getListaNotificacionzUsuario);
routerAutor.put('/notificacionP/:id', autor_controllers_1.putVistaNotificacion);
routerAutor.put('/descripcion/:id', autor_controllers_1.putDescripcion);
