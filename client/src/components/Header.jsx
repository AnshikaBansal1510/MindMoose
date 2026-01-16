import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { DotLottieReact } from 
"@lottiefiles/dotlottie-react";
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative mb-40'>

      <DotLottieReact
              src="/animations/rainbow.lottie"
              loop
              autoplay
              speed={0.8}
              className="
                absolute 
                top-32 
                left-[-30px] 
                w-60 h-60
                rotate-[-12deg] 
                opacity-60 
                pointer-events-none
              "
            />

      <DotLottieReact
              src="/animations/rainbow.lottie"
              loop
              autoplay
              speed={0.8}
              className="
                absolute 
                top-36 
                right-[-40px] 
                w-60 h-60 
                rotate-[-10deg] 
                opacity-60 
                pointer-events-none
              "
      />

      <div className='text-center mt-40 mb-8'>
        
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-6
            border border-[#b22d64]/40 
            bg-[#b22d64]/10 
            rounded-full text-sm text-[#b22d64]">
            <p>New: AI feature integrated</p>
            <img className='w-2.5' src={assets.star2} alt="" />
        </div>
        
        <h1 className='text-5xl sm:text-7xl font-semibold sm:leading-16 text-gray-700'>The only journal that <br /> <span className='text-[#b22d64]'>reflects back</span> </h1>

        <p className='my-6 sm:my-8 max-w-2xl m-auto text-xl max-sm:text-s text-gray-500'>A gentle space for your thoughts and feelings <br/> Write freely. Reflect kindly. Heal at your own pace.</p>

        {/* <form className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
            <input className='w-full pl-4  outline-none' type="text" placeholder="What's on your mind" required />
            <button className='bg-[#ebeddf] text-black px-8 py-2 m-1.5 border border-[#b22d64] rounded hover:scale-105 transition-all cursor-pointer' type='submit'>Search</button>
        </form> */}
        <form className="flex justify-between items-center max-w-lg max-sm:scale-75 mx-auto rounded-full px-2 py-5 gap-5">
  
          <button
            type="button"
            className="flex-1 mx-1 py-3 rounded-full bg-[#b22d64] text-white font-medium hover:scale-105 transition-all"
            onClick={() => navigate('/signup')}
          >
            🌸  Get started →
          </button>

          <button
            type="button"
            onClick={() => navigate("/blogs")}
            className="flex-1 mx-1 py-3 rounded-full border border-[#b22d64] text-[#b22d64] font-medium bg-[#ebeddf] hover:bg-rose-50 hover:scale-105 transition-all"
          >
            ✍️ Community blogs
          </button>

        </form>
      </div>
      {/* <div className='text-center'>
        <button className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>
      </div> */}
    </div>
  )
}

export default Header