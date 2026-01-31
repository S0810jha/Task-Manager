import React from "react"

const StateCard = ({ total, pending, inProgress, completed }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <p className="text-xs font-medium text-slate-500 uppercase">
          Total Tasks
        </p>
        <p className="text-3xl font-semibold text-slate-900 mt-1">{total}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <p className="text-xs font-medium text-slate-500 uppercase">
          Completed
        </p>
        <p className="text-3xl font-semibold text-emerald-600 mt-1">
          {completed}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <p className="text-xs font-medium text-slate-500 uppercase">
          Pending
        </p>
        <p className="text-3xl font-semibold text-amber-500 mt-1">
          {pending}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <p className="text-xs font-medium text-slate-500 uppercase">
          In Progress
        </p>
        <p className="text-3xl font-semibold text-blue-500 mt-1">
          {inProgress}
        </p>
      </div>

    </div>
  )
}

export default StateCard
