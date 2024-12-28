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
exports.resolversUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generate_helper_1 = require("../helper/generate.helper");
const md5_1 = __importDefault(require("md5"));
exports.resolversUser = {
    Query: {
        getUser: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { token } = arg;
            const check = yield user_model_1.default.findOne({
                token: token,
                deleted: false
            });
            if (!check) {
                return {
                    code: 200,
                    message: "ID DNE"
                };
            }
            else
                return {
                    id: check.id,
                    fullName: check.fullName,
                    email: check.email,
                    token: check.token,
                    code: 200,
                    message: " success"
                };
        })
    },
    Mutation: {
        register: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = arg;
            const exitUser = yield user_model_1.default.findOne({
                email: user.email
            });
            if (exitUser) {
                return {
                    code: 400,
                    message: "Email exited"
                };
            }
            const token = (0, generate_helper_1.generateRandomString)(15);
            user.password = (0, md5_1.default)(user.password);
            user.token = token;
            const record = new user_model_1.default(user);
            yield record.save();
            user.code = 200,
                user.message = "register success";
            user.id = record.id;
            return user;
        }),
        login: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = arg;
            const emailCheck = yield user_model_1.default.findOne({
                email: email,
                deleted: false
            });
            if (!emailCheck) {
                return {
                    code: 400,
                    message: "Email DNE"
                };
            }
            else {
                const passwordCheck = yield user_model_1.default.findOne({
                    password: (0, md5_1.default)(password),
                    deleted: false
                });
                if (!passwordCheck) {
                    return {
                        code: 400,
                        message: "Password DNE"
                    };
                }
            }
            return {
                id: emailCheck.id,
                fullName: emailCheck.fullName,
                email: emailCheck.email,
                token: emailCheck.token,
                code: 200,
                message: "login success"
            };
        })
    }
};
