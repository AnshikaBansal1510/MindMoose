import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div className='flex justify-between items-center py-3 px-8 sm:mx-20 xl:mx-32'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-36 sm:w-44 rounded-full cursor-pointer border border-[#b22d64]'/>
        <button onClick={() => navigate('/login')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-[#ebeddf] border border-[#b22d64] text-black px-10 py-2.5'>
          Login &#8594;
        </button>
    </div>
  )
}

export default Navbar