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
exports.getActividades = exports.postActividad = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
const postActividad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_autor, tipo_actividad } = req.body;
    try {
        console.log(req.body);
        const v = yield IConnection_database_1.default.actividad.findMany({
            where: {
                tipo_actividad
            }
        });
        if (v.length > 0) {
            return res.status(300).json('correcto');
        }
        else {
            const actividad = yield IConnection_database_1.default.actividad.create({
                data: {
                    id_autor: parseInt(id_autor),
                    tipo_actividad: tipo_actividad,
                    fecha_registrada: new Date()
                }
            });
            return res.status(200).json(actividad);
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postActividad = postActividad;
const getActividades = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actividasuarios = yield IConnection_database_1.default.$queryRaw `
                    
                    SELECT 
                        au.id_autor,
                        au.foto_perfil,
                        pe.nombre AS nombre_persona,
                        pe.apellido_paterno
                    FROM (
                        SELECT id_autor, COUNT(*) AS total_actividades
                        FROM actividad
                        GROUP BY id_autor
                        HAVING total_actividades >= 3
                    ) AS usuarios_con_actividades
                    JOIN autor AS au ON usuarios_con_actividades.id_autor = au.id_autor
                    JOIN usuario AS us ON au.id_usuario = us.id_usuario
                    JOIN persona AS pe ON us.id_persona = pe.id_persona
                    ORDER BY usuarios_con_actividades.total_actividades DESC
                    LIMIT 3;

                    `;
        res.status(200).json(actividasuarios);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getActividades = getActividades;
