import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import useAuthUser from '../../hooks/useAuthUser'
import { User } from "lucide-react"

const Sidebar = () => {

  const linkBase =
    "flex items-center gap-3 py-3.5 px-4 md:px-8 md:min-w-64 cursor-pointer " +
    "rounded-r-full transition-all duration-200 " +
    "hover:bg-rose-50 hover:translate-x-1"

  const linkActive =
    "text-[#b22d64] border-l-4 border-[#b22d64] font-medium border border-[#b22d64]/40 bg-[#b22d64]/10 "

  const { authUser } = useAuthUser();

  return (
    <div className="
      flex flex-col
      min-h-full
      pt-6
      bg-[#efd4e7]
      backdrop-blur
      border-r border-rose-200
    ">

      <NavLink
        end
        to="/dashboard"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : "text-black"}`
        }
      >
        <img className="w-8" src={assets.home_icon} alt="" />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to="/dashboard/mood"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : "text-black"}`
        }
      >
        <img className="w-8" src={assets.mood_icon} alt="" />
        <p className="hidden md:inline-block">Mood check</p>
      </NavLink>

      <NavLink
        to="/dashboard/stress-form"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : "text-black"}`
        }
      >
        <img className="w-7" src={assets.checklist} alt="" />
        <p className="hidden md:inline-block"> Stress form</p>
      </NavLink>

      <NavLink
        to="/dashboard/stress-history"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : "text-black"}`
        }
      >
        <img className="w-8" src={assets.history} alt="" />
        <p className="hidden md:inline-block"> Stress History</p>
      </NavLink>

      <NavLink
        to="/dashboard/add-blog"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : "text-black"}`
        }
      >
        <img className="w-8" src={assets.add_icon} alt="" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>

      <NavLink
        to="/dashboard/journal"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : "text-black"}`
        }
      >
        <img className="w-8" src={assets.user_icon} alt="" />
        <p className="hidden md:inline-block">Journaling</p>
      </NavLink>

      <NavLink
        to="/dashboard/ai-therapist"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : "text-black"}`
        }
      >
        <img className="w-8" src={assets.ai_icon} alt="" />
        <p className="hidden md:inline-block">AI Therapist</p>
      </NavLink>

      <NavLink
        to="/dashboard/habit"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : "text-black"}`
        }
      >
        <img className="w-8" src={assets.habit} alt="" />
        <p className="hidden md:inline-block">Habits</p>
      </NavLink>

      <div className="mt-auto px-4 py-3 border-t border-rose-200/50 bg-white/40 backdrop-blur-md">
        <div className="flex items-center gap-3 rounded-xl p-1 hover:bg-rose-50 transition">

          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
            <User size={18} className="text-[#b22d64]" />
          </div>

          {/* User Info */}
          <div>
            <p className="hidden md:inline-block text-sm font-semibold text-gray-800 truncate">
              {authUser?.name || "Guest User"}
            </p>

            {/* flex items-center*/}
            <div className='flex items-center'>
            <p className="hidden text-xs md:flex items-center gap-1 text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Online
            </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Sidebar
