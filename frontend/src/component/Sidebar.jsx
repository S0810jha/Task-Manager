import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()

  const handleLogout = () => {

    try {
      localStorage.removeItem('token')
    } catch (err) {
      console.debug('Failed removing token', err)
    }

    navigate('/login')
    setTimeout(() => window.location.reload(), 200)
  }

  
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-colors duration-300 text-sm font-medium ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
        : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
    }`

  return (

    <aside className="w-64 bg-blue-900 border-r border-slate-800 flex flex-col h-screen">

      <div className="px-6 py-5 flex items-center gap-3 border-b border-slate-800">
        
        <div className="w-9 h-9 bg-blue-600 text-white rounded flex items-center justify-center font-bold shadow-md shadow-blue-500/20">DB</div>

        <div>
          <div className="text-lg font-semibold text-white">Dashboard</div>
          <div className="text-xs text-slate-400">panel</div>
        </div>

      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">

        <NavLink to="/" className={linkClass} end>

          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
          </svg>
          <span>Dashboard</span>

        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.636 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Profile</span>
        </NavLink>

      </nav>

      <div className="px-4 py-4 border-t border-slate-800">

        <button
          onClick={handleLogout}
          // Adjusted logout for dark mode
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 text-red-400 rounded-md hover:bg-blue-600 hover:text-white transition-colors duration-200">

          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1" />
          </svg>

          <span className="text-sm font-medium cursor-pointer">Logout</span>
        </button>
        
      </div>
    </aside>
  )
}

export default Sidebar