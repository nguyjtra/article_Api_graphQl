import { gql } from "apollo-server-express"

export const typeDefsUser = gql`

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
    `