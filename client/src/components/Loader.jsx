import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-[#fff5f9]'>
      <div className='relative w-16 h-16'>
        <div className='absolute inset-0 rounded-full border-4 border-pink-200 border-t-pink-400 animate-spin'></div>
        <div className='absolute inset-2 rounded-full bg-pink-50'></div>
        <div className='absolute inset-0 flex justify-center items-center'>
          <span className='text-pink-400 text-2xl animate-pulse'>🌸</span>
        </div>
      </div>
    </div>
  )
}

export default Loader
