import {Task } from "../models/task.model.js";
import ErrorHandler from "../middlewares/error.middleware.js";


export const newTask = async (req,res,next) =>{
    try{
        const {title,description} = req.body;
        await Task.create({
            title,
            description,
            user:req.user,
        });

        res.status(201).json({
            success:true,
            message:"Task added Successfully ",

        });
    }
    catch(err){
        next(err);
    }
};

export const getMyTask = async (req,res,next) => {
    try{
        const userid = req.user._id;
        const tasks = await Task.find({user:userid});

        res.status(200).json({
            success:true,
            tasks,
        })
    }
    catch(err){
        next(err)
    }
};

export const updateTask = async (req,res,next) => {
   
    try{
        const task = await Task.findById(req.params.id);
        task.isCompleted = !task.isCompleted;
        await task.save(); 
        if(!task) return next(new ErrorHandler("Task Not Found",400));
    
        res.status(200).json({
            success:true,
            message:"Task Updated",
        });
    }catch(err){
        next(err);
    }
};

export const deleteTask = async (req,res,next) => {
    try{
        const task = await Task.findById(req.params.id);

        if(!task) return next(new ErrorHandler("Task Not Found",404));
        await task.deleteOne(); 

        res.status(200).json({
            success:true,
            message:"Task Deleted !",
        }); 
    }catch(err){
        next(err);
    }
};