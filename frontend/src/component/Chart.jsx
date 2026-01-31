import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"

const Chart = ({ chartData, STATUS_COLORS }) => {

  return (

    <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        Tasks by Status
      </h2>

      {chartData.length === 0 ? (

        <p className="text-sm text-slate-500">
          No tasks yet. Add some tasks to see the chart.
        </p>

      ) : (

        <div className="h-64">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label>

                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.status]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default Chart;
