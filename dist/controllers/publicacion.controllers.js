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
exports.getListarCollecciones = exports.deletePLibro = exports.getListaLibroSelect = exports.publicacionLibro = exports.putPublicacionE = exports.postPublicacionLibro = exports.postPublicacionLibroContinuidad = exports.compartirPublicacion = exports.getListaPublicacionLibro = exports.getListaPublicacionesLibre = exports.getListaPublicaciones = exports.postPublicacionLibre = void 0;
const IConnection_database_1 = __importDefault(require("../database/IConnection.database"));
const postPublicacionLibre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_autor, id_etiqueta, contenido } = req.body;
    try {
        console.log(req.body);
        const pLE = yield IConnection_database_1.default.editorial.create({
            data: {
                fecha_registro: new Date(),
                id_estado: 1
            }
        });
        const pLL = yield IConnection_database_1.default.pl_libre.create({
            data: {
                id_editorial_pl: pLE.id_editorial_pl,
                id_etiqueta,
                id_autor: parseInt(id_autor),
                contenido,
            }
        });
        res.status(200).json({ msj: 'Publicacion libre publicado', id: pLL.id_pl_libre });
    }
    catch (error) {
        res.status(500).json({ msj: 'Error al crear publicacion' });
    }
});
exports.postPublicacionLibre = postPublicacionLibre;
const getListaPublicaciones = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicaciones = yield IConnection_database_1.default.editorial.findMany({
            where: {
                id_estado: 1
            },
            orderBy: {
                fecha_registro: 'desc'
            },
            select: {
                id_editorial_pl: true,
                fecha_registro: true,
                reaccion: {
                    where: {
                        estado: 1
                    },
                    select: {
                        estado: true,
                        autor: {
                            select: {
                                foto_perfil: true,
                                usuario: {
                                    select: {
                                        persona: {
                                            select: {
                                                nombre: true,
                                                apellido_paterno: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                comentario: {
                    where: {
                        id_estado: 1,
                    },
                    orderBy: {
                        id_comentario: 'desc'
                    },
                    select: {
                        fecha_registro: true,
                        contenido: true,
                        id_autor: true,
                        id_comentario: true,
                        autor: {
                            select: {
                                foto_perfil: true,
                                usuario: {
                                    select: {
                                        persona: {
                                            select: {
                                                nombre: true,
                                                apellido_paterno: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                pl_libre: {
                    select: {
                        id_autor: true,
                        autor: {
                            select: {
                                foto_perfil: true,
                                foto_portada: true,
                                usuario: {
                                    select: {
                                        persona: {
                                            select: {
                                                nombre: true,
                                                apellido_paterno: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        contenido: true,
                        categoria: {
                            select: {
                                descripcion: true
                            }
                        },
                        etiqueta: {
                            select: {
                                nombre: true,
                                id_etiqueta: true
                            }
                        }
                    }
                },
                cap_pl_ln: {
                    select: {
                        id_cap_pl: true,
                        id_editorial_pl: true,
                        contenido: true,
                        nombre_capitulo: true,
                        nro_capitulo: true,
                        pl_nl: {
                            select: {
                                id_autor: true,
                                autor: {
                                    select: {
                                        foto_perfil: true,
                                        foto_portada: true,
                                        usuario: {
                                            select: {
                                                persona: {
                                                    select: {
                                                        nombre: true,
                                                        apellido_paterno: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                titulo: true,
                                descripcion: true,
                                genero: {
                                    select: {
                                        nombre: true,
                                        id_genero: true,
                                        categoria: {
                                            select: {
                                                descripcion: true
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    }
                }, compartir: {
                    select: {
                        id_compartir: true,
                        cotenido: true,
                        compartir_datail: {
                            select: {
                                id_editorial: true,
                                editorial: {
                                    select: {
                                        fecha_registro: true,
                                        pl_libre: {
                                            select: {
                                                id_autor: true,
                                                autor: {
                                                    select: {
                                                        foto_perfil: true,
                                                        foto_portada: true,
                                                        usuario: {
                                                            select: {
                                                                persona: {
                                                                    select: {
                                                                        nombre: true,
                                                                        apellido_paterno: true
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                contenido: true,
                                                categoria: {
                                                    select: {
                                                        descripcion: true
                                                    }
                                                },
                                                etiqueta: {
                                                    select: {
                                                        nombre: true,
                                                        id_etiqueta: true
                                                    }
                                                }
                                            }
                                        },
                                        cap_pl_ln: {
                                            select: {
                                                id_cap_pl: true,
                                                id_editorial_pl: true,
                                                contenido: true,
                                                nombre_capitulo: true,
                                                nro_capitulo: true,
                                                pl_nl: {
                                                    select: {
                                                        id_autor: true,
                                                        autor: {
                                                            select: {
                                                                foto_perfil: true,
                                                                foto_portada: true,
                                                                usuario: {
                                                                    select: {
                                                                        persona: {
                                                                            select: {
                                                                                nombre: true,
                                                                                apellido_paterno: true
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        },
                                                        titulo: true,
                                                        descripcion: true,
                                                        genero: {
                                                            select: {
                                                                nombre: true,
                                                                id_genero: true,
                                                                categoria: {
                                                                    select: {
                                                                        descripcion: true
                                                                    }
                                                                }
                                                            }
                                                        },
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        // id_editorial:true,
                        id_autor: true,
                        autor: {
                            select: {
                                foto_perfil: true,
                                usuario: {
                                    select: {
                                        persona: {
                                            select: {
                                                nombre: true,
                                                apellido_paterno: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(publicaciones);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getListaPublicaciones = getListaPublicaciones;
const getListaPublicacionesLibre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const publicaciones = yield IConnection_database_1.default.editorial.findFirst({
            where: {
                id_estado: 1,
                id_editorial_pl: parseInt(id)
            },
            select: {
                id_editorial_pl: true,
                fecha_registro: true,
                pl_libre: {
                    select: {
                        id_autor: true,
                        autor: {
                            select: {
                                foto_perfil: true,
                                foto_portada: true,
                                usuario: {
                                    select: {
                                        persona: {
                                            select: {
                                                nombre: true,
                                                apellido_paterno: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        contenido: true,
                        categoria: {
                            select: {
                                descripcion: true
                            }
                        },
                        etiqueta: {
                            select: {
                                nombre: true,
                                id_etiqueta: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(publicaciones);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getListaPublicacionesLibre = getListaPublicacionesLibre;
const getListaPublicacionLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, idCapitulo } = req.params;
    try {
        const publicaciones = yield IConnection_database_1.default.editorial.findFirst({
            where: {
                id_editorial_pl: parseInt(id),
                cap_pl_ln: {
                    some: {
                        id_cap_pl: parseInt(idCapitulo)
                    }
                }
            },
            select: {
                id_editorial_pl: true,
                fecha_registro: true,
                cap_pl_ln: {
                    select: {
                        id_cap_pl: true,
                        id_editorial_pl: true,
                        contenido: true,
                        nombre_capitulo: true,
                        nro_capitulo: true,
                        pl_nl: {
                            select: {
                                id_autor: true,
                                autor: {
                                    select: {
                                        foto_perfil: true,
                                        foto_portada: true,
                                        usuario: {
                                            select: {
                                                persona: {
                                                    select: {
                                                        nombre: true,
                                                        apellido_paterno: true
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                titulo: true,
                                descripcion: true,
                                genero: {
                                    select: {
                                        nombre: true,
                                        id_genero: true,
                                        categoria: {
                                            select: {
                                                descripcion: true,
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(publicaciones);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getListaPublicacionLibro = getListaPublicacionLibro;
const compartirPublicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_autor, id_categoria, contenido, id_editorial_pl } = req.body;
    try {
        const ediPl = yield IConnection_database_1.default.editorial.create({
            data: {
                fecha_registro: new Date(),
                id_estado: 1,
            }
        });
        const c = yield IConnection_database_1.default.compartir.create({
            data: {
                id_editorial: ediPl.id_editorial_pl,
                id_autor: parseInt(id_autor),
                id_categoria: parseInt(id_categoria),
                cotenido: contenido
            }
        });
        const cfD = yield IConnection_database_1.default.compartir_datail.create({
            data: {
                // : parseInt(id_editorial_pl),
                id_compartir: c.id_compartir,
                id_editorial: id_editorial_pl
            }
        });
        res.status(200).json({ msj: 'Se compartio publicacion', id: c.id_compartir });
    }
    catch (error) {
        res.status(500).json({ msj: 'Error en servidor' });
    }
});
exports.compartirPublicacion = compartirPublicacion;
const postPublicacionLibroContinuidad = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_pl_ln, contenido, nro_capitulo, nombre_capitulo } = req.body;
    console.log(req.body);
    try {
        const plEdR = yield IConnection_database_1.default.editorial.create({
            data: {
                fecha_registro: new Date(),
                id_estado: 1
            }
        });
        const capituloR = yield IConnection_database_1.default.cap_pl_ln.create({
            data: {
                id_editorial_pl: plEdR.id_editorial_pl,
                id_pl_ln: id_pl_ln,
                nro_capitulo,
                nombre_capitulo,
                contenido
            }
        });
        res.status(200).json({ msj: 'Se registro el libro' });
    }
    catch (error) {
        res.status(500).json({ msj: 'Error en servidor' });
    }
});
exports.postPublicacionLibroContinuidad = postPublicacionLibroContinuidad;
const postPublicacionLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_autor, id_categoria, id_genero, contenido, descripcion, titulo, nro_capitulo, nombre_capitulo } = req.body;
    console.log(req.body);
    try {
        const plEdR = yield IConnection_database_1.default.editorial.create({
            data: {
                fecha_registro: new Date(),
                id_estado: 1
            }
        });
        const plLibroR = yield IConnection_database_1.default.pl_nl.create({
            data: {
                id_genero,
                titulo,
                id_autor: parseInt(id_autor),
                descripcion,
                estado: 'publicado'
            }
        });
        const capituloR = yield IConnection_database_1.default.cap_pl_ln.create({
            data: {
                id_editorial_pl: plEdR.id_editorial_pl,
                id_pl_ln: plLibroR.id_pl_ln,
                nro_capitulo,
                nombre_capitulo,
                contenido
            }
        });
        res.status(200).json({ msj: 'Se registro el libro', id: capituloR.id_cap_pl });
    }
    catch (error) {
        res.status(500).json({ msj: 'Error en servidor' });
    }
});
exports.postPublicacionLibro = postPublicacionLibro;
const putPublicacionE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { id_estado } = req.body;
    try {
        const putC = yield IConnection_database_1.default.editorial.updateMany({
            where: {
                id_editorial_pl: parseInt(id)
            },
            data: {
                id_estado
            }
        });
        res.status(200).json('Elimincion de la publicacion');
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.putPublicacionE = putPublicacionE;
const publicacionLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vl = yield IConnection_database_1.default.pl_nl.findMany({
            where: {
                estado: 'publicado'
            },
            select: {
                id_autor: true,
                autor: {
                    select: {
                        usuario: {
                            select: {
                                persona: {
                                    select: {
                                        nombre: true
                                    }
                                }
                            }
                        }
                    }
                },
                id_pl_ln: true,
                cap_pl_ln: {
                    select: {
                        id_cap_pl: true,
                        nro_capitulo: true,
                        editorial: {
                            select: {
                                fecha_registro: true,
                            }
                        }
                    }
                },
                titulo: true,
                descripcion: true,
                genero: {
                    select: {
                        nombre: true,
                        id_genero: true,
                        categoria: {
                            select: {
                                descripcion: true
                            }
                        }
                    }
                },
            }
        });
        res.status(200).json(vl);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.publicacionLibro = publicacionLibro;
const getListaLibroSelect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield IConnection_database_1.default.pl_nl.findMany({
            select: {
                id_pl_ln: true,
                estado: true,
                titulo: true,
                id_autor: true,
                genero: {
                    select: {
                        categoria: {
                            select: {
                                descripcion: true
                            }
                        }
                    }
                },
                cap_pl_ln: true
            }
        });
        res.status(200).json(list);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getListaLibroSelect = getListaLibroSelect;
const deletePLibro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pl = yield IConnection_database_1.default.pl_nl.updateMany({
            where: {
                id_pl_ln: parseInt(id)
            }, data: {
                estado: 'eliminado'
            }
        });
        res.status(200).json({ msj: 'Se elimino el libro' });
    }
    catch (error) {
        res.status(500).json({ msj: 'Error en servidor' });
    }
});
exports.deletePLibro = deletePLibro;
const getListarCollecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const list = yield IConnection_database_1.default.pl_nl.findMany({
            where: {
                id_autor: parseInt(id)
            }, select: {
                titulo: true,
                descripcion: true,
                genero: {
                    select: {
                        categoria: {
                            select: {
                                descripcion: true
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(list);
    }
    catch (error) {
        res.status(500).json({ msj: 'Error en el servidor' });
    }
});
exports.getListarCollecciones = getListarCollecciones;
