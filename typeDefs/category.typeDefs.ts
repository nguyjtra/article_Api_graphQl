import { gql } from "apollo-server-express"

export const typeDefsCategory = gql`
 

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


    `