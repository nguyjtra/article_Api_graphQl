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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = require("./config/database");
const apollo_server_express_1 = require("apollo-server-express");
const index_resolver_1 = require("./resolvers/index.resolver");
const index_typeDefs_1 = require("./typeDefs/index.typeDefs");
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, database_1.connectDatabase)();
    const app = (0, express_1.default)();
    const port = 3000;
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs: index_typeDefs_1.typeDefs,
        resolvers: index_resolver_1.resolvers
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app: app,
        path: "/graphql"
    });
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});
startServer();
