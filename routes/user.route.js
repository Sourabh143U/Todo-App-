import express from 'express';
// import {User} from "../models/user.model.js";
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import {getAllUsers,
        registerUser,
        getMyProfile,
       login,
       logout
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerUser);

 router.post("/login",login);

 router.get("/logout",logout);
router.get("/me",isAuthenticated,getMyProfile); 

export default router;