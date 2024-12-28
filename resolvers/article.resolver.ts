
import { gql } from "apollo-server-express";
import Article from "../models/article.model";
import Category from "../models/category.model";
export const resolversArticle = {
    Query: {
      getListArticle:async(_,arg)=>{    
        const {sortKey="title",sortValue="desc", limitItems=2,page=1,filterKey,filterValue}=arg
        const sort={};
        const filter={};
        if(filterKey && filterValue){ filter[filterKey]=filterValue}
        const skip=(page-1)* limitItems;
        if(sortKey && sortValue){
          sort[sortKey]=sortValue
        }
        const article=await Article.find(filter).limit(limitItems).skip(skip).sort(sort)
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

    }
    }