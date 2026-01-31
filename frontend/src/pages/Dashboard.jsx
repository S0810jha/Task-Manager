import React, { useState, useMemo, useEffect, useContext } from "react"
import { AppContext } from "../context/AppContext";
import Headers from "../component/Headers.jsx"
import StateCard from "../component/StateCard.jsx"
import AddTask from "../component/AddTask.jsx"
import Chart from "../component/Chart.jsx"
import ListTask from "../component/ListTask.jsx";

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const STATUS_COLORS = {
  pending: "#fbbf24",
  in_progress: "#3b82f6",
  completed: "#22c55e",
};

const Dashboard = () => {

  const { 
    token,
    task, 
    getDashboardData, 
    addTask, 
    updateTaskStatus, 
    dashData, 
    deleteTask, 
    updateTaskText } = useContext(AppContext);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
  })


  useEffect(() => {
    if (token) {
      getDashboardData();
    }
  }, [token]);



    const { 
      total,
      pending, 
      inProgress, 
      completed, 
      chartData } = useMemo(() => {

          const total = dashData ? dashData.totalTasks : task.length;
          const pending = dashData
            ? dashData.pendingTasks
            : task.filter((t) => t.status === "pending").length
          const inProgress = dashData
            ? dashData.inProgressTasks
            : task.filter((t) => t.status === "in_progress").length
          const completed = dashData
            ? dashData.completedTasks
            : task.filter((t) => t.status === "completed").length

          const chartData = [
            { name: "Pending", value: pending, status: "pending" },
            { name: "In Progress", value: inProgress, status: "in_progress" },
            { name: "Completed", value: completed, status: "completed" },
          ].filter((item) => item.value > 0);

            return { total, pending, inProgress, completed, chartData }

      }, [dashData, task]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) return;

    await addTask({
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      status: newTask.status,
    });

    setNewTask({ title: "", description: "", status: "pending" })
  };

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status)
  };


  const handleEditTask = async (id, title, description) => {

  if (!title.trim()) return;
  await updateTaskText(id, {
    title: title.trim(),
    description: description.trim(),
  });
};


  const handleDeleteTask = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this task?");
    if (!ok) return;
    await deleteTask(id);
};



  return (
    <div className="h-screen  px-5 py-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <Headers />

        <StateCard
          total={total}
          pending={pending}
          inProgress={inProgress}
          completed={completed}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AddTask
            newTask={newTask}
            STATUS_OPTIONS={STATUS_OPTIONS}
            handleInputChange={handleInputChange}
            handleAddTask={handleAddTask}
          />

          <Chart
            chartData={chartData}
            STATUS_COLORS={STATUS_COLORS}
          />

          <ListTask
            task={task}
            STATUS_OPTIONS={STATUS_OPTIONS}
            handleStatusChange={handleStatusChange}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask} 
          />

        </div>
      </div>
    </div>
  )
}

export default Dashboard;
