import { gql } from "apollo-server-express"

export const typeDefsArticle = gql`
  type Article{
   id:String,
    title:String,
    avatar:String,
    description:String
    categoryId:String
    category:Category
  }


  type Query {
    getListArticle(sortKey:String, sortValue:String, limitItems:Int, page: Int, filterKey:String, filterValue:String ):[Article]
    getArticle(id:String): Article

  }
  type Message{
    
      code: Int,
      Message:String
    
  }

  input articleInput{
    title:String,
    avatar:String,
    description:String,
    categoryId:String,
  }

 



  type Mutation{
    createArticle(article:articleInput): Article,
    deleteArticle(id:String): Message,
    editArticle(id:String,article:articleInput ):Article,

  }


    `;