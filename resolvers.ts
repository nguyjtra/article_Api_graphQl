
import { gql } from "apollo-server-express";
import Article from "./models/article.model";
import Category from "./models/category.model";
export const resolvers = {
    Query: {
      getListArticle:async()=>{
        const article=await Article.find({
          deleted:false
        })
        return article
      },

      getListCategory:async()=>{
        const article=await Category.find({
          deleted:false
        })
        return article
      },

      getArticle:async(_,arg)=>{
        const{ id }=arg;
        const article=await Article.findOne({
          _id:id,
          deleted:false
        })
        return article
      },

      getCategory:async(_,arg)=>{
        const{ id }=arg;
        const article=await Category.findOne({
          _id:id,
          deleted:false
        })
        return article
      }


      },
    Article:{
      category:async(article)=>{
        const record=await Category.findOne({
          _id:article.categoryId,
          deleted:false
        })
        return record
      }

    },

    Mutation:{
      createArticle:async(_,arg)=>{
       const{ article }=arg;
       const record =new Article(article);
       await record.save();
       return record;
      },

      deleteArticle:async(_,arg)=>{
        const {id}=arg;
        await Article.updateOne({
          _id:id
        },{
          deleted:true
        })
        return {
          code :200,
          Message:"delete success "
        }
      },
      editArticle:async (_,arg) => {
        console.log(arg)
        const {id,article}=arg
        await Article.updateOne({
          _id:id,
          deleted:false
        },article)
        const newA=await Article.findOne({
          _id:id
        })
        return newA
      },



      createCategory:async(_,arg)=>{
        const{category}=arg;
        const record =new Category(category);
        await record.save();
        return record;
       },
 
      deleteCategory:async(_,arg)=>{
         const {id}=arg;
         await Category.updateOne({
           _id:id
         },{
           deleted:true
         })
         return {
           code :200,
           Message:"delete success "
         }
       },
      editCategory:async (_,arg) => {
         const {id,category}=arg
         await Category.updateOne({
           _id:id,
           deleted:false
         },category)
         const newA=await Category.findOne({
           _id:id
         })
         return newA
       }
    }
    }