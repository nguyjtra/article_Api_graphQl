import Category from "../models/category.model";
export const resolversCategory = {
    Query: {

      getListCategory:async()=>{
        const article=await Category.find({
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

    Mutation:{

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