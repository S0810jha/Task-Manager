import React, { useState , useEffect} from "react"
import axios from 'axios'
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react"

const Login = () => {

  const {token, setToken, backendUrl } = useContext(AppContext)
  
  const [state, setState] = useState("Sign up")

  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")

  const [name, setName] = useState("")

  const [errors, setErrors] = useState({})

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (state === "Sign up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        })

        if (data.success) {
          localStorage.setItem("token", data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        })

        if (data.success) {
          localStorage.setItem("token", data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      }
    } catch (error) {
      toast.error(error.message)
    } finally {
    setLoading(false)
  }
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-0">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
          
          {/* Left Section */}
          <div className="hidden md:flex bg-blue-900 p-12 flex-col justify-center items-start relative overflow-hidden h-full">
           
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h1 className="text-5xl font-bold text-white mb-4">Dashboard</h1>
              
              <p className="text-lg text-blue-200 mb-12">Manage your work efficiently</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white hover:translate-x-1 transition-transform">
                  <span className="text-3xl">📊</span>
                  <span className="text-base font-medium">Analytics</span>
                </div>
                <div className="flex items-center gap-4 text-white hover:translate-x-1 transition-transform">
                  <span className="text-3xl">🎯</span>
                  <span className="text-base font-medium">Goals</span>
                </div>
                <div className="flex items-center gap-4 text-white hover:translate-x-1 transition-transform">
                  <span className="text-3xl">👥</span>
                  <span className="text-base font-medium">Team</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white p-8 md:p-12 flex flex-col justify-center h-[680px] overflow-auto">
            <form onSubmit={onSubmitHandler} className="w-full">
              
              <div className="flex gap-2 mb-8 bg-blue-50 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setState("Login");
                    setErrors({});
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all uppercase tracking-wider ${
                    state === "Login"
                      ? "bg-white text-blue-900 shadow-sm" 
                      : "text-slate-500 hover:text-blue-700 bg-transparent"
                  }`}>
                  Sign In </button>

                <button
                  type="button"
                  onClick={() => {
                    setState("Sign up");
                    setErrors({});
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all uppercase tracking-wider ${
                    state === "Sign up"
                      ? "bg-white text-blue-900 shadow-sm" // Active: Dark Blue Text
                      : "text-slate-500 hover:text-blue-700 bg-transparent"
                  }`}>
                  Sign Up </button>

              </div>


              <div className="mb-8">
                
                <h2 className="text-3xl font-bold text-blue-950 mb-2">
                  {state === "Sign up" ? "Create Your Account" : "Welcome Back"}
                </h2>
                <p className="text-slate-500">
                  {state === "Sign up" ? "Join us to get started" : "Sign in to your dashboard"}
                </p>

              </div>

              
              {state === "Sign up" && (
                <div className="mb-5">

                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                      errors.name
                        ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 bg-white focus:border-blue-800 focus:ring-2 focus:ring-blue-100" // Focused border matches theme
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1 font-medium">{errors.name}</p>}

                </div>
              )}

              
              <div className="mb-5">

                <label htmlFor="email" className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 bg-white focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>}

              </div>


              <div className="mb-5">

                <label htmlFor="password" className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all ${
                    errors.password
                      ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-slate-300 bg-white focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
                  }`}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>}

              </div>

              
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-bold text-white text-base uppercase tracking-wider transition-all mb-6 ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-blue-900 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0" // Matches Sidebar Background
                }`}>
                {loading ? "Processing..." : state === "Sign up" ? "Create Account" : "Sign In"}
              </button>

             
              <div className="text-center text-sm text-slate-600">

                {state === "Sign up" ? (
                  <p>
                    Already have an account?{" "}
                    <span
                      onClick={() => setState("Login")}
                      className="text-blue-700 font-bold cursor-pointer hover:text-blue-900 underline"
                    >
                      Sign in here
                    </span>
                  </p>

                ) : (
                  <p>
                    Don't have an account?{" "}
                    <span
                      onClick={() => setState("Sign up")}
                      className="text-blue-700 font-bold cursor-pointer hover:text-blue-900 underline"
                    >
                      Create one
                    </span>
                  </p>

                )}
              </div>

            </form>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Login;