import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Admin/Sidebar'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../../config/api'
import toast from 'react-hot-toast'

const Layout = () => {

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {mutate: logoutMutation} = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully")
      queryClient.invalidateQueries({queryKey: ["authUser"]});
      navigate("/");
    }
  })

  const location = useLocation();

  const hideLayout =
    location.pathname.startsWith("/dashboard/ai-therapist");

  return (
    <>
      {/* Top Bar */}
      {!hideLayout && (<div className="
        flex items-center justify-between
        h-[72px]
        px-4 sm:px-12
        bg-[#efd4e7]
        border-b border-rose-200
        shadow-sm
      ">
        <img
          className="w-32 sm:w-40 cursor-pointer rounded-full border border-[#b22d64]"
          src={assets.logo}
          alt="MindMoose Logo"
        />

        <button
          onClick={logoutMutation}
          className="
            text-sm
            px-8 py-2
            rounded-full
            bg-[#ebeddf]
            text-black
            hover:bg-[#c6c9b4]
            border border-[#b22d64]
            hover:scale-105
            transition-all
          "
        >
          Logout
        </button>
      </div>)}

      {/* Body */}
      <div className="flex min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-peach-50">
        {!hideLayout && <Sidebar />}
        <div className={`flex-1 overflow-y-auto ${hideLayout ? "p-0" : "p-4 sm:p-6"}`}>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout
