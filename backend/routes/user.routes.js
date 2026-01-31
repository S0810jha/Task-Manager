import express from "express"
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js"

import authUser from "../middlewares/auth.user.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)

userRouter.post("/login", loginUser)

userRouter.get("/get-profile", authUser, getUser)

userRouter.put("/update-profile", authUser, updateUser)


export default userRouter;
