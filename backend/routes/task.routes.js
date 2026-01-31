import express from "express"
import authUser from "../middlewares/auth.user.js"
import {
  getDashboard,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js"

const taskRouter = express.Router()

taskRouter.get("/dashboard", authUser, getDashboard)

taskRouter.post("/create", authUser, createTask)

taskRouter.put("/:id", authUser, updateTask)

taskRouter.delete("/:id", authUser, deleteTask)

export default taskRouter
