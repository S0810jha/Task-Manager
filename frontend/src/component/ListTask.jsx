import React, {useState} from "react"

const ListTask = ({
  task, 
  STATUS_OPTIONS, 
  handleStatusChange, 
  handleDeleteTask, 
  handleEditTask 
}) => {

const [editingId, setEditingId] = useState(null)
const [editForm, setEditForm] = useState({ title: "", description: "" })

const startEditing = (t) => {
  setEditingId(t._id)
  setEditForm({
    title: t.title || "",
    description: t.description || "",
  })
}

const cancelEditing = () => {
  setEditingId(null)
  setEditForm({ title: "", description: "" })
};

const handleEditChange = (e) => {
  const { name, value } = e.target
  setEditForm((prev) => ({ ...prev, [name]: value }))
};

const saveEdit = async () => {
  if (!editForm.title.trim()) return
  await handleEditTask(editingId, editForm.title, editForm.description)
  cancelEditing()
}


  return (

    <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">

      <h2 className="text-lg font-semibold text-slate-900 mb-3">
        All Tasks
      </h2>

      {task.length === 0 ? (

        <p className="text-sm text-slate-500">
          No tasks yet. Start by adding a new task.
        </p>
      ) : (
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">

          {task.map((t) => (
            <div
              key={t._id}
              className="border border-slate-200 rounded-xl p-3 flex flex-col gap-2">

              <div className="flex justify-between items-start gap-2">
                  
                  <div className="flex-1">

                    {editingId === t._id ? (
                      <>
                        <input
                          type="text"
                          name="title"
                          value={editForm.title}
                          onChange={handleEditChange}
                          className="w-full text-sm font-semibold text-slate-900 border border-slate-300 rounded-md px-2 py-1 mb-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Task title"/>

                        <textarea
                          name="description"
                          value={editForm.description}
                          onChange={handleEditChange}
                          className="w-full text-xs text-slate-700 border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Description (optional)"
                          rows={2}/>

                      </>
                    ) : (
                      <>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {t.title}
                        </h3>

                        {t.description && (
                          <p className="text-xs text-slate-500 mt-1">{t.description}</p>
                        )}

                      </>
                    )}

                  </div>

                  
                  <div className="flex flex-col items-end gap-1">
                    {editingId === t._id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="text-[11px] text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="text-[11px] text-slate-500 hover:text-slate-600 hover:underline"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(t)}
                          className="text-[11px] text-blue-500 hover:text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(t._id)}
                          className="text-[11px] text-red-500 hover:text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>


              <div className="flex items-center justify-between gap-2">

                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium
                    ${
                      t.status === "completed"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : t.status === "in_progress"
                        ? "bg-blue-50 text-blue-700 border border-blue-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}>

                  {t.status === "completed"
                    ? "Completed"
                    : t.status === "in_progress"
                    ? "In Progress"
                    : "Pending"}
                </span>

                <select
                  value={t.status}
                  onChange={(e) => handleStatusChange(t._id, e.target.value)}
                  className="text-xs rounded-lg border border-slate-300 px-2 py-1 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}

                </select>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default ListTask
