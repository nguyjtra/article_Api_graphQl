"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefsUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefsUser = (0, apollo_server_express_1.gql) `

  type user{
    id:String,
    fullName:String,
    email:String,
    token:String,
    code:Int,
    message:String
  }
  input UserInput{
    fullName:String,
    email:String,
    password:String,
  }
  input userLogin{
    email:String,
    password:String
  }

  type Query{
    getUser(token:String): user

  }



  type Mutation{
    register(user:UserInput): user
    login(email:String,password:String):user
  }
    `;
