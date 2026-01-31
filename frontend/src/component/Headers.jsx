import React from 'react'

const Headers = () => {
  return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              TASK DASHBOARD
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your work efficiently
            </p>
          </div>
        </div>
  )
}

export default Headers