import express from "express";
import {isAuthenticated} from "../middlewares/auth.middleware.js";
import { newTask,getMyTask, updateTask, deleteTask } from "../controllers/task.controller.js";
const router = express.Router();

router.post("/new",isAuthenticated,newTask);

router.get("/my",isAuthenticated,getMyTask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);
export default router;