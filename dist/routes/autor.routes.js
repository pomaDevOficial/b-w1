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
