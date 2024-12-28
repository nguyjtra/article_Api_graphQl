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
exports.resolvers = void 0;
const article_model_1 = __importDefault(require("./models/article.model"));
const category_model_1 = __importDefault(require("./models/category.model"));
exports.resolvers = {
    Query: {
        getListArticle: () => __awaiter(void 0, void 0, void 0, function* () {
            const article = yield article_model_1.default.find({
                deleted: false
            });
            return article;
        }),
        getListCategory: () => __awaiter(void 0, void 0, void 0, function* () {
            const article = yield category_model_1.default.find({
                deleted: false
            });
            return article;
        }),
        getArticle: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = arg;
            const article = yield article_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        }),
        getCategory: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = arg;
            const article = yield category_model_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        })
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const record = yield category_model_1.default.findOne({
                _id: article.categoryId,
                deleted: false
            });
            return record;
        })
    },
    Mutation: {
        createArticle: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = arg;
            const record = new article_model_1.default(article);
            yield record.save();
            return record;
        }),
        deleteArticle: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = arg;
            yield article_model_1.default.updateOne({
                _id: id
            }, {
                deleted: true
            });
            return {
                code: 200,
                Message: "delete success "
            };
        }),
        editArticle: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(arg);
            const { id, article } = arg;
            yield article_model_1.default.updateOne({
                _id: id,
                deleted: false
            }, article);
            const newA = yield article_model_1.default.findOne({
                _id: id
            });
            return newA;
        }),
        createCategory: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { category } = arg;
            const record = new category_model_1.default(category);
            yield record.save();
            return record;
        }),
        deleteCategory: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = arg;
            yield category_model_1.default.updateOne({
                _id: id
            }, {
                deleted: true
            });
            return {
                code: 200,
                Message: "delete success "
            };
        }),
        editCategory: (_, arg) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, category } = arg;
            yield category_model_1.default.updateOne({
                _id: id,
                deleted: false
            }, category);
            const newA = yield category_model_1.default.findOne({
                _id: id
            });
            return newA;
        })
    }
};
