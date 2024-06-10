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
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
class EmailService {
    static enviarCorreo(destinatario, asunto, companyName, link, codigo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Configuración del transporte
                console.log(config_1.email);
                const transporter = nodemailer_1.default.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: config_1.email,
                        pass: config_1.pass_email
                    }
                });
                // Leer el archivo HTML
                const htmlTemplate = fs_1.default.readFileSync(path_1.default.join(__dirname + '/template/plantilla.handlebars'), 'utf-8');
                // Compilar el template con Handlebars
                const template = handlebars_1.default.compile(htmlTemplate);
                // Datos dinámicos para el template
                const data = {
                    companyName: companyName,
                    link: link,
                    dest: destinatario,
                    cod: codigo
                };
                // Renderizar el template con los datos
                const htmlToSend = template(data);
                // Opciones del correo electrónico
                const mailOptions = {
                    from: 'developers.dash00@gmail.com',
                    to: destinatario,
                    subject: asunto,
                    html: htmlToSend
                };
                // Enviar el correo electrónico
                const info = yield transporter.sendMail(mailOptions);
                console.log('Correo electrónico enviado:', info.response);
                return true; // Envío exitoso
            }
            catch (error) {
                console.error('Error al enviar el correo electrónico:', error);
                return false; // Error en el envío
            }
        });
    }
}
exports.EmailService = EmailService;
