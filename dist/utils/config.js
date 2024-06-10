"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.local = exports.pass_email = exports.email = exports.TOKEN_LOGIN = void 0;
require("dotenv/config");
exports.TOKEN_LOGIN = process.env.SECRET_TOKEN;
exports.email = process.env.EMAIL;
exports.pass_email = process.env.PASS_MAIL;
exports.local = process.env.LOCAL;
