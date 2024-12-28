import { createSecureServer } from "node:http2";
import Category from "../models/category.model";
import User from "../models/user.model"
import {generateRandomString} from "../helper/generate.helper"
import md5 from "md5"
import { Query } from "mongoose";
export const resolversUser = {


    Query:{
        getUser:async(_,arg)=>{
            const{token}=arg
            const check=await User.findOne({
                token:token,
                deleted:false
            });
            if(!check){
                return {
                    code:200,
                    message:"ID DNE"
                }
            }
            else return {
                id: check.id,
                fullName: check.fullName,
                email: check.email,
                token: check.token,
                code:200,
                message:" success"
            }
        }
    },
    Mutation:{

        register:async(_,arg)=>{

        const{user}=arg;
        const exitUser =await User.findOne({
            email:user.email
        })
        if(exitUser){
            return{
                code:400,
                message:"Email exited"
            }
        }

        const token=generateRandomString(15);
        user.password=md5(user.password)
        user.token=token;
        const record =new User(user);
        await record.save();            
        user.code=200,
        user.message="register success"
        user.id=record.id
        return user
       },
       login:async(_,arg)=>{
            const {email,password}=arg
            const emailCheck=await User.findOne({
                email:email,
                deleted:false
            })
            if(!emailCheck){
                return {
                    code:400,
                    message:"Email DNE"
                }
            }
            else{
                const passwordCheck=await User.findOne({
                    password: md5(password),
                    deleted:false
                }
                )
                if(!passwordCheck){
                    return {
                        code:400,
                        message:"Password DNE"
                    }
                }
            }
            return {
                id: emailCheck.id,
                fullName: emailCheck.fullName,
                email: emailCheck.email,
                token: emailCheck.token,
                code:200,
                message:"login success"
            }
            
       }

    }
    }