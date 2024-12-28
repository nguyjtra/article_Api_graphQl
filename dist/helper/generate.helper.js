"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
const generateRandomString = (length) => {
    const chareacters = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chareacters.charAt(Math.floor(Math.random() * chareacters.length));
    }
    return result;
};
exports.generateRandomString = generateRandomString;
