"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsCategory = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsCategory = (0, apollo_server_express_1.gql) `
 

  type Category{
    id:String,
    title:String,
    avatar:String,
  }

  type Query {
   

    getListCategory:[Category]
    getCategory(id:String): Category

  }
  type Message{
    
      code: Int,
      Message:String
    
  }

 

  input categoryInput{
    title:String,
    avatar:String,
    
  }



  type Mutation{

    createCategory(Category:categoryInput): Category,
    deleteCategory(id:String): Message,
    editCategory(id:String,article:categoryInput ):Category


  }


    `;
