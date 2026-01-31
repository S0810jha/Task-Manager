import React from "react";

const AddTask = ({
  newTask,
  STATUS_OPTIONS,
  handleInputChange,
  handleAddTask,
}) => {
  return (

    <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        Add New Task
      </h2>

      <form className="space-y-4" onSubmit={handleAddTask}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50"/>

        </div>

        <div>

          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>

          <textarea
            name="description"
            value={newTask.description}
            onChange={handleInputChange}
            placeholder="Optional description"
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-50 resize-none"/>

        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>

          <select
            name="status"
            value={newTask.status}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">

            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}

          </select>

        </div>

        <button
          type="submit"
          className="w-full inline-flex justify-center items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition">
          Add Task
        </button>

      </form>

    </div>
  )
}

export default AddTask;
