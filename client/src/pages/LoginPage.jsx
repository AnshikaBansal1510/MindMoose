import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Flower, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../config/api';

const LoginPage = () => {

  // const { axios, setToken } = useAppContext()
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate: loginMutation, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(formData);
  }
  
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-peach-50 overflow-hidden">

      {/* Floating Balls */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-rose-200 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-32 right-24 w-32 h-32 bg-pink-300 rounded-full blur-2xl animate-ping"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-rose-300 rounded-full blur-2xl animate-pulse"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-sm p-8 mx-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-rose-200">

        {/* Flower Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center">
            <Flower className="text-[#b22d64]" size={28} />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">
            <span className="text-[#b22d64]">Wellness</span> Login
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            A calm space to manage reflections
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6 text-gray-600">  

        {/* // onSubmit={handleSubmit} */}

          <div className="flex flex-col">
            <label className="text-sm mb-1">Email</label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value})}
              type="email"
              required
              placeholder="Enter your email id"
              className="border-b-2 border-rose-200 bg-transparent p-2 outline-none focus:border-[#b22d64] transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm mb-1">Password</label>
            <input
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value})}
              type="password"
              required
              placeholder="Enter your password"
              className="border-b-2 border-rose-200 bg-transparent p-2 outline-none focus:border-[#b22d64] transition"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-full bg-[#b22d64] text-white font-medium hover:scale-105 hover:bg-rose-700 transition-all"
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer Text */}
        <p className="text-xs text-center text-gray-400 mt-6">
          We’re glad you’re here 🌷
        </p>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-[#b22d64] font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
