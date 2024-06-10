"use strict";
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
exports.postSeguidor = exports.getSeguidores = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
// import { seguidor } from '../generate/client/index';
const getSeguidores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getSeguidores = getSeguidores;
const postSeguidor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tipo, id, id_autor_v } = req.body;
    const prisma = IConnection_database_1.default;
    try {
        // Inicia una transacción para asegurar consistencia
        const result = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            // Busca seguimiento existente
            const seguimiento = yield prisma.seguimiento.findFirst({
                where: {
                    id_autor: parseInt(id),
                },
            });
            let id_seguimiento_u;
            if (!seguimiento) {
                // Crea seguimiento si no existe
                const nuevoSeguimiento = yield prisma.seguimiento.create({
                    data: {
                        id_autor: parseInt(id),
                    },
                });
                id_seguimiento_u = nuevoSeguimiento.id_seguimiento_u;
            }
            else {
                id_seguimiento_u = seguimiento.id_seguimiento_u;
            }
            // Busca seguimiento_usuario existente
            const seguimientoUsuario = yield prisma.seguimiento_usuario.findFirst({
                where: {
                    id_autor_seguido: parseInt(id_autor_v),
                    id_seguimiento_u,
                },
            });
            if (!seguimientoUsuario) {
                // Crea nuevo seguimiento_usuario si no existe
                yield prisma.seguimiento_usuario.create({
                    data: {
                        id_tipo_seguimiento: tipo,
                        id_autor_seguido: parseInt(id_autor_v),
                        fecha_seguimiento: new Date(),
                        id_seguimiento_u,
                    },
                });
                return { msj: 'Estás siguiendo a este usuario' };
            }
            else {
                // Actualiza tipo de seguimiento existente
                yield prisma.seguimiento_usuario.update({
                    where: {
                        id_seguimiento_usuario: seguimientoUsuario.id_seguimiento_usuario,
                    },
                    data: {
                        id_tipo_seguimiento: tipo,
                    },
                });
                if (tipo == 1) {
                    return { msj: 'Dejaste de seguir al usuario' };
                }
                else {
                    return { msj: 'Estás siguiendo a este usuario' };
                }
            }
        }));
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ha ocurrido un error' });
    }
    // try {
    //     const f = await conn.seguimiento.findFirst({
    //         where:{
    //             id_autor: parseInt(id)
    //         }
    //     })
    //     if(!f){
    //         const d = await conn.seguimiento.create({
    //             data:{
    //                 id_autor: parseInt(id),
    //             }
    //         })
    //         await conn.seguimiento_usuario.create({
    //             data:{
    //                 id_tipo_seguimiento:tipo,
    //                 id_autor_seguido:parseInt(id_autor_v),
    //                 fecha_seguimiento: new Date(),
    //                 id_seguimiento_u: d.id_seguimiento_u
    //             }
    //         })
    //         return res.status(200).json({msj:'Estas seguiendo a este usuario'})
    //     }else{
    //         const sdd = await conn.seguimiento_usuario.findFirst({
    //             where:{
    //                 id_autor_seguido:parseInt(id_autor_v),
    //                 id_seguimiento_u:f.id_seguimiento_u
    //             }
    //         })
    //         if(!sdd){
    //              await conn.seguimiento_usuario.create({
    //                 data:{
    //                     id_tipo_seguimiento:tipo,
    //                     id_autor_seguido:parseInt(id_autor_v),
    //                     fecha_seguimiento: new Date(),
    //                     id_seguimiento_u: f.id_seguimiento_u
    //                 }
    //             })
    //             return res.status(200).json({msj:'Estas seguiendo a este usuario'})
    //         }else{
    //             if(tipo == 1){
    //                 await conn.seguimiento_usuario.updateMany({
    //                     where:{
    //                         id_autor_seguido:parseInt(id_autor_v),
    //                         id_seguimiento_u:f.id_seguimiento_u
    //                     },
    //                     data:{
    //                         id_tipo_seguimiento:1
    //                     }
    //                 })
    //                 return res.status(200).json({msj:'Dejo de seguir al usuario'})
    //             }else{
    //                 await conn.seguimiento_usuario.updateMany({
    //                     where:{
    //                         id_autor_seguido:parseInt(id_autor_v),
    //                         id_seguimiento_u:f.id_seguimiento_u
    //                     },
    //                     data:{
    //                         id_tipo_seguimiento:2
    //                     }
    //                 })
    //                 return res.status(200).json({msj:'Estas seguiendo a este usuario'})
    //             }
    //         }
    //     }
    // } catch (error) {
    //     res.status(500).json(error)
    // }
});
exports.postSeguidor = postSeguidor;
