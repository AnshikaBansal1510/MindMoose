import React, { useState, useEffect } from 'react'
import { Flower } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../config/api.js';

const Signup = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate: signupMutation, isPending, error} = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created");
      queryClient.invalidateQueries({queryKey: ["authUser"]});
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong!")
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signupMutation(formData);
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-peach-50 overflow-hidden">

      {/* Floating Balls */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-rose-200 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-32 h-32 bg-pink-300 rounded-full blur-2xl animate-ping"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-rose-300 rounded-full blur-2xl animate-pulse"></div>

      {/* Signup Card */}
      <div className="relative w-full max-w-sm p-8 mx-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-rose-200">

        {/* Logo / Brand */}
        <div className="text-center mb-2">
          <h1 className="text-2xl font-semibold text-[#b22d64]">MindMoose</h1>
        </div>

        {/* Flower Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center">
            <Flower className="text-[#b22d64]" size={28} />
          </div>
        </div>

        {/* Headings */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Start your journey to better mental wellness
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-600">

          <div className="flex flex-col">
            <label className="text-sm mb-1">Full Name</label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              type="text"
              required
              placeholder="Enter your fullname"
              className="border-b-2 border-rose-200 bg-transparent p-2 outline-none focus:border-[#b22d64] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Email</label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              type="email"
              required
              placeholder="Enter your email id"
              className="border-b-2 border-rose-200 bg-transparent p-2 outline-none focus:border-[#b22d64] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              type="password"
              required
              placeholder="Create a strong password"
              className="border-b-2 border-rose-200 bg-transparent p-2 outline-none focus:border-[#b22d64] transition"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-full bg-[#b22d64] text-white font-medium hover:scale-105 hover:bg-rose-700 transition-all"
          >
            {isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Bloom gently. Heal deeply 🌷
        </p>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-[#b22d64] font-medium cursor-pointer hover:underline"
          >
            Sign in
          </span>
        </p>

      </div>
    </div>
  )
}

export default Signup
