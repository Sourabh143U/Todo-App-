import { User } from "../models/user.model.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import { sendCookie } from "../utils/features.util.js";


export const getAllUsers = async (req,res) => {  
};

export const login = async (req,res,next) =>{
    try{
        const {email,password } = req.body;
        const user = await User.findOne({email}).select("+password");

        if(!user) return next(new ErrorHandler("Invalid Email or Password ",404));

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) return res.status(404).json({
            success:false,
            message:"Invalid Email or Password ",
        })

        sendCookie(user,res,`Welcome back, ${user.name}`,200);
    }
    catch(err){
        next(err);
    }
};

export const registerUser = async (req,res,next) =>{
    try{
        const {name,email,password} = req.body;
        let user = await User.findOne({email});

        if(user) return next(new ErrorHandler("User Already Exits ",404));
        const hashedPassword = await bcrypt.hash(password,10);
        user = await User.create({name,email,password:hashedPassword});

        sendCookie(user,res,"Registered Successfully",201);
    }catch(err){
        next(err);
    }
};


export const getMyProfile = (req,res)=>{

   res.status(200).json({
    success:true,
    user:req.user,
   });
};

export const logout = (req,res) =>{
    res.status(200).cookie("token","",{
        expires :new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development" ? "lax":"none",
        secure:process.env.NODE_ENV==="Development"? false:true,
    }).json({
        success:true,
        user:req.user,
        
    });
};
