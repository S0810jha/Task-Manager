import taskModel from '../models/task.model.js'
import validator from 'validator'


//API for get DashBoard Data
export const getDashData = async(userId) =>{ 

    const allTasks = await taskModel.find({ userId: userId })
    const totalTasks = allTasks.length
    
    const completedTasks = allTasks.filter(t => t.status === 'completed').length
    const pendingTasks = allTasks.filter(t => t.status === 'pending').length
    const inProgressTasks = allTasks.filter(t => t.status === 'in_progress').length

    const latestTasks = allTasks
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) 
        .slice(0, 10)

    return {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        latestTasks
    }

}


export const getDashboard = async(req, res) => {

    try {
        const dashboardData = await getDashData(req.userId); 
        res.json({
            success: true,
            dashboardData
        })

    } catch (err) {

        console.log(err);
        res.json({ 
            success: false,
            message: err.message,
        })

    }
}


//ALP for Add new task
export const createTask = async(req, res)=>{

    const { title, description , status} = req.body;
    const errors = [];

    if (validator.isEmpty(title || '')) {
        res.json({ 
          success: false,
          message: 'Task title is required' 
        })
    }
    
    if (errors.length > 0) {
        return res.json({ 
            success: false,
            errors
        })

    }

    try {
        const newTask = new taskModel({
            userId: req.userId,
            title,
            description,
            status
        })

        const task = await newTask.save();
        res.json({
            success: true,
            task
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }

}

//API for getting Tasks

export const getTasks = async(req, res) =>{

    try {
        const tasks = await taskModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json({
            success: true,
            tasks
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}


//API for uupdate the TASKs
export const updateTask = async (req, res) => {

  const { title, description, status } = req.body
  const validStatuses = ["pending", "in_progress", "completed"]
  const updateFields = {}


  if (title !== undefined) {
    if (validator.isEmpty(title.trim())) {
      return res.json({
        success: false,
        message: "Task title cannot be empty",
      })
    }
    updateFields.title = title.trim();
  }

  if (description !== undefined) {
    updateFields.description = description;
  }

  if (status !== undefined) {
    if (!validStatuses.includes(status)) {
      return res.json({
        success: false,
        message:
          "Invalid status provided",
      })
    }
    updateFields.status = status;
  }

  if (Object.keys(updateFields).length === 0) {
    return res.json({
      success: false,
      message: "No valid fields provided to update",
    })
  }

  try {
    let task = await taskModel.findById(req.params.id);

    if (!task) {
      return res.json({
        success: false,
        message: "Task not found",
      })
    }

    // Authorization
    if (task.userId.toString() !== req.userId) {
      return res.json({
        success: false,
        message: "User not authorized to update this task",
      })
    }

    task = await taskModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    )

    return res.json({
      success: true,
      task,
    })

  } catch (err) {
     console.log(err);
        res.json({
            success: false,
            message: err.message,
        })
  }
}


//api for delete the Task
export const deleteTask = async(req, res) =>{

    try {
        const task = await taskModel.findById(req.params.id);

        if (!task){ 
          return res.json({ 
            success: false,
            message: 'Task not found' 
          })
        }

        if (task.userId.toString() !== req.userId) {
            return res.json({ 
                success: false, 
                message: 'User not authorized to delete this task' 
            })
        }

        await taskModel.deleteOne({ _id: req.params.id });

        res.json({ 
            success: true, 
            message: 'Task removed'
        })

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: err.message,
        })
    }

}