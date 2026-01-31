import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  )

  const [task, setTask] = useState([])
  const [dashData, setDashData] = useState(false)
  const [profileData, setProfileData] = useState(false)


  const getDashboardData = async () => {

  if (!token) return

  try {

    const { data } = await axios.get(backendUrl + "/api/task/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (data.success) {
      const dashboard = data.dashboardData || {
        totalTasks: data.totalTasks,
        completedTasks: data.completedTasks,
        pendingTasks: data.pendingTasks,
        inProgressTasks: data.inProgressTasks,
        latestTasks: data.latestTasks,
      }

      setDashData(dashboard)
      setTask(dashboard.latestTasks || [])

      
    } else {
      toast.error(data.message || "Failed to fetch dashboard data.")
    }

  } catch (error) {
    console.error(error)
    toast.error(error.message)
  }

}


  // ADD task
  const addTask = async (newTask) => {

    try {

      const { data } = await axios.post(
        backendUrl + "/api/task/create",
        newTask,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      if (data.success) {
        await getDashboardData()
        toast.success(data.message || "Task added")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // UPDATE task title & description
const updateTaskText = async (taskId, { title, description }) => {
  try {
    const { data } = await axios.put(
      `${backendUrl}/api/task/${taskId}`,
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      
      setTask((prev) => prev.map((t) => (t._id === taskId ? data.task : t)))

      await getDashboardData()

      toast.success(data.message || "Task updated")
    } else {
      toast.error(data.message || "Failed to update task")
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}



  // UPDATE task status
  const updateTaskStatus = async (taskId, status) => {

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/task/${taskId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setTask((prev) => prev.map((t) => (t._id === taskId ? { ...t, status } : t)))
        await getDashboardData()
        
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // DELETE task
 const deleteTask = async (taskId) => {

  try {

    const { data } = await axios.delete(
      `${backendUrl}/api/task/${taskId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )

    if (data.success) {
      
      setTask((prev) => prev.filter((t) => t._id !== taskId))

      await getDashboardData()

      toast.success(data.message || "Task deleted")
    } else {
      toast.error(data.message || "Failed to delete task")
    }

  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}



  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile",
        { headers: { Authorization: `Bearer ${token}` } })

      if (data.success) {
        setProfileData(data.profileData)
        console.log(data.profileData)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    backendUrl,
    token,
    setToken,
    task,
    setTask,
    getDashboardData,
    addTask,
    updateTaskText,
    updateTaskStatus,
    deleteTask,
    dashData,
    setDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider
export { AppContext };
