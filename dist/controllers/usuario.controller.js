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
exports.autorizacionRecuperacion = exports.recuperarContraseña = exports.cambiarAperiencia = exports.postUsuarioLogin = exports.postUsuario = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../utils/config");
const email_1 = require("../utils/email");
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, correo, password, apellido } = req.body;
        const [ap, am] = apellido.split(' ');
        const validarCorreo = yield IConnection_database_1.default.usuario.findMany({
            where: { correo }
        });
        console.log(validarCorreo);
        if (validarCorreo.length > 0)
            return res.status(200).json({ msj: 'Correo ya existe' });
        const personaI = yield IConnection_database_1.default.persona.create({
            data: {
                nombre,
                apellido_paterno: ap,
                apellido_materno: am
            }
        });
        const usuarioI = yield IConnection_database_1.default.usuario.create({
            data: {
                correo,
                contrasenia: bcrypt_1.default.hashSync(password, 10),
                id_persona: personaI.id_persona,
                verificacion_email: false,
                id_estado: 1
            }
        });
        const imFP = ['imagenes/app-1.jpg', 'imagenes/app-2.jpg', 'imagenes/app-3.jpg', 'imagenes/app-4.jpg', 'imagenes/app-5.jpg'];
        const s = Math.floor(Math.random() * imFP.length);
        const im = imFP[s];
        const autor = yield IConnection_database_1.default.autor.create({
            data: {
                id_usuario: usuarioI.id_usuario,
                nick_name: 'Untitled',
                foto_perfil: im,
                foto_portada: 'imagenes/app-portada.jpg'
            }
        });
        const token = jsonwebtoken_1.default.sign({ username: correo }, process.env.SECRET || 'poma2088', { expiresIn: '1Hour' });
        res.status(200).json({ token, id: autor.id_autor });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postUsuario = postUsuario;
const postUsuarioLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, password } = req.body;
    try {
        const ValidarCorreo = yield IConnection_database_1.default.usuario.findFirst({
            where: { correo }
        });
        if (!ValidarCorreo)
            return res.status(404).json({ msj: 'Correo ingreado no corresponde a un correo valido' });
        const validarContraseña = bcrypt_1.default.compareSync(password, ValidarCorreo.contrasenia);
        if (!validarContraseña)
            return res.status(404).json({ msj: 'Contraseña incorrecta' });
        const autor = yield IConnection_database_1.default.autor.findFirst({
            where: {
                id_usuario: ValidarCorreo.id_usuario
            }, select: {
                id_autor: true,
            }
        });
        const tokenL = jsonwebtoken_1.default.sign({ username: correo }, process.env.SECRET || 'poma200', { expiresIn: '1h' });
        res.status(200).json({ tokenL, id: autor === null || autor === void 0 ? void 0 : autor.id_autor });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.postUsuarioLogin = postUsuarioLogin;
const cambiarAperiencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        const perfil = req.files['perfilimagen'][0];
        const fondo = req.files['backgroundImage'][0];
        const update = yield IConnection_database_1.default.autor.updateMany({
            where: {
                id_autor: parseInt(id)
            },
            data: {
                foto_perfil: 'imagenes/' + perfil.filename,
                foto_portada: 'imagenes/' + fondo.filename
            }
        });
        console.log('creo');
        console.log(update);
        res.status(200).json({ msj: 'se actualizo la apariencia' });
    }
    catch (error) {
        res.status(500).json({ msj: 'Error en el servidor' });
    }
});
exports.cambiarAperiencia = cambiarAperiencia;
const generarCodigoAleatorio = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = 6; // Puedes ajustar la longitud del código según tus necesidades
    let codigo = '';
    for (let i = 0; i < longitud; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return codigo;
};
const contarRegistrosPorFecha = (usuario, fecha) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(usuario, fecha);
    const fechaA = fecha.setHours(0, 0, 0);
    const cantidad = yield IConnection_database_1.default.recuperacion.count({
        where: {
            id_usuario: usuario,
            fecha_reg: {
                gte: fecha.toISOString(),
                lt: new Date().toISOString()
            }
        }
    });
    console.log(cantidad);
    return cantidad;
});
const recuperarContraseña = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo } = req.body;
    try {
        const v = yield IConnection_database_1.default.usuario.findFirst({
            where: {
                correo
            }
        });
        if (!v) {
            res.status(401).json({
                msj: 'no se encontro el correo registrado'
            });
        }
        else {
            const fechaActual = new Date();
            console.log(fechaActual);
            const cantidadRegistros = yield contarRegistrosPorFecha(v.id_usuario, fechaActual);
            console.log(cantidadRegistros);
            if (cantidadRegistros >= 3) {
                return res.status(400).json({ msj: 'No puede realizar mas registros' });
            }
            const ultimoCodigo = yield IConnection_database_1.default.recuperacion.findFirst({
                where: {
                    id_usuario: v.id_usuario
                },
                orderBy: {
                    fecha_reg: 'desc'
                }
            });
            if (ultimoCodigo) {
                if (ultimoCodigo.estado == 'creado') {
                    yield IConnection_database_1.default.recuperacion.update({
                        where: {
                            id_recuperacion: ultimoCodigo.id_recuperacion
                        },
                        data: {
                            estado: 'no usado'
                        }
                    });
                }
                else if (ultimoCodigo.estado == 'usado') {
                    const nuevoCodigo = generarCodigoAleatorio();
                    const r = yield IConnection_database_1.default.recuperacion.create({
                        data: {
                            id_usuario: v.id_usuario,
                            codigo: nuevoCodigo,
                            fecha_reg: new Date(),
                            estado: 'creado'
                        }
                    });
                    yield email_1.EmailService.enviarCorreo(correo, 'Recuperacion de cuenta', 'WRITEAD', config_1.local + '' + v.id_usuario, nuevoCodigo);
                    return res.status(200).json({ msj: 'Verfique su correo', id: r.id_recuperacion });
                }
            }
            const nuevoCodigo = generarCodigoAleatorio();
            const t = yield IConnection_database_1.default.recuperacion.create({
                data: {
                    id_usuario: v.id_usuario,
                    codigo: nuevoCodigo,
                    fecha_reg: new Date(),
                    estado: 'creado'
                }
            });
            yield email_1.EmailService.enviarCorreo(correo, 'Recuperacion de cuenta', 'WRITEAD', config_1.local + '' + v.id_usuario, nuevoCodigo);
            //    console.log(co)
            res.status(200).json({ msj: 'Revisar el correo electronico', id: t.id_recuperacion });
        }
    }
    catch (error) {
        res.status(500).json({ msj: 'error en el servidor' });
    }
});
exports.recuperarContraseña = recuperarContraseña;
const autorizacionRecuperacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, recuperacion } = req.body;
    try {
        const r = yield IConnection_database_1.default.recuperacion.findUnique({
            where: {
                id_recuperacion: parseInt(recuperacion),
                codigo: codigo,
            }
        });
        if (!r) {
            return res.status(401).json({ msj: 'Codigo no coincide' });
        }
        else {
            if (r.codigo !== codigo) {
                return res.status(401).json({ msj: 'Codigo no coincide' });
            }
            else {
                const usuario = yield IConnection_database_1.default.usuario.findFirst({
                    where: {
                        id_usuario: r.id_usuario
                    }
                });
                // const token = jsw.sign({username:usuario.correo},process.env.SECRET! || 'poma2088', {expiresIn:'1Hour'})
                res.status(200).json({ msj: 'Datos correctos', id: usuario === null || usuario === void 0 ? void 0 : usuario.id_usuario });
            }
        }
    }
    catch (error) {
        res.status(500).json({ msj: 'Error en el servicio' });
    }
});
exports.autorizacionRecuperacion = autorizacionRecuperacion;
