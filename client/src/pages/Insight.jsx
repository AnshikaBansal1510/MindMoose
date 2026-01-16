// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { assets } from '../assets/assets';
// import Navbar from '../components/Navbar.jsx';
// import Moment from 'moment'
// import Loader from '../components/Loader.jsx';
// import QuoteSection from '../components/QuoteSection.jsx';
// import { useQueryClient, useQuery } from '@tanstack/react-query';
// import toast from 'react-hot-toast';
// import { getBlogById } from '../config/api.js';

// const Insight = () => {

//   const {id} = useParams();

//   const queryClient = useQueryClient();

//   const { data: blog, isLoading: blogLoading, error: blogError} = useQuery({  

//     queryKey: ["blog"],
//     queryFn: () => getBlogById(id),
//     enabled: !!id,
//     onError: (error) => {
//       toast.error("Failed to load this blog!")
//     }
//   });

//   return blog ? (
//     <div className='relative min-h-screen bg-[#fff5f9]'>
      
//       {/* <img className='absolute top-10 left-10 w-24 opacity-30 animate-bounce-slow' src={assets.flower} alt="flower" />
//       {/* <img className='absolute top-20 right-20 w-16 opacity-20 animate-pulse-slow' src={assets.smiley_icon} alt="smiley" /> */}
//       {/* <img className='absolute bottom-10 left-1/3 w-20 opacity-25 animate-bounce-slow' src={assets.flower} alt="flower" /> */} 
      
//       <Navbar/>

//       <div className='text-center mt-24 text-gray-700 px-6'>
//         <p className='text-pink-600 py-2 font-medium'>
//           Reflected on {Moment(blog.createdAt).format('MMMM Do YYYY')}
//         </p>
//         <h1 className='text-3xl sm:text-5xl font-semibold max-w-2xl mx-auto text-[#b22d64]'>
//           {blog.title}
//         </h1>
//         <h2 className='my-4 max-w-lg mx-auto text-gray-600'>{blog.author}</h2>
//         <p className='inline-block py-1 px-4 rounded-full mb-6 border border-pink-200 bg-pink-50 text-pink-600 text-sm font-medium'>
//           {blog.tags}
//         </p>
//       </div>

//       {/* Main content */}
//       <div className='mx-5 max-w-5xl md:mx-auto my-10'>
//         <img className='rounded-3xl mb-5 shadow-lg' src={blog.image} alt="" />

//         <div className='rich-text max-w-3xl mx-auto text-gray-700 prose prose-pink'>
//           <div dangerouslySetInnerHTML={{__html: blog.content}} />
//         </div>

//         <QuoteSection />

//       </div>
//     </div>
//   ) : <Loader/>
// }

// export default Insight;

import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { ArrowLeft, User, CalendarDays, Tag } from "lucide-react";
import { assets } from "../assets/assets";
import Loader from '../components/Loader.jsx';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getBlogById } from '../config/api.js';

const Insight = () => {
  const navigate = useNavigate();

  const {id} = useParams();

  const queryClient = useQueryClient();

  const { data: blog, isLoading: blogLoading, error: blogError} = useQuery({  

    queryKey: ["blog"],
    queryFn: () => getBlogById(id),
    enabled: !!id,
    onError: (error) => {
      toast.error("Failed to load this blog!")
    }
  });

  return blog ? (
    <div className="min-h-screen font-inter px-4 py-10 bg-gradient-to-b from-pink-50 via-white to-rose-50 text-gray-900">
      <div className="max-w-4xl mx-auto relative">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center font-semibold text-pink-600 hover:text-pink-700 transition-colors duration-200"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>

        {/* Floating illustration */}
        <img
          src={assets.flower_icon}
          alt="flower"
          className="absolute top-0 right-0 w-18 opacity-30 animate-bounce"
        />

        <img
          src={assets.flower_icon}
          alt="flower"
          className="absolute top-10 left-10 w-18 opacity-30 animate-bounce"
        />

        <img
          src={assets.flower_icon}
          alt="flower"
          className="absolute bottom-0 left-10 w-18 opacity-30 animate-bounce"
        />

        <img
          src={assets.flower_icon}
          alt="flower"
          className="absolute bottom-0 right-10 w-18 opacity-30 animate-bounce"
        />

        {/* Title */}
        <motion.h1
          className="text-4xl font-extrabold mb-8 text-center text-gray-700"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {blog.title} 🌸
        </motion.h1>

        {/* Cover image */}
        {blog.image && (
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="w-125 h-125 object-cover rounded-3xl mb-8 shadow-xl border-2 border-pink-200 mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Author + date */}
        <div className="flex flex-wrap justify-between text-sm mb-6 text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>{blog.author || "Admin"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Tags */}
        {blog.tags && (
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold bg-pink-200 text-pink-700 shadow-sm">
              <Tag className="w-4 h-4" />
              {blog.tags}
            </span>
          </div>
        )}


        {/* Content */}
        <div className="bg-white rounded-3xl p-8 shadow-lg max-w-none mx-auto prose prose-pink prose-sm sm:prose-base lg:prose-lg" style={{ wordBreak: "break-word" }}>
          <ReactMarkdown
            children={blog.content}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          />
        </div>

        {/* Floating smileys at the bottom */}
        {/* <img
          src={assets.smiley}
          alt="Smiley"
          className="absolute bottom-10 left-10 w-10 opacity-50 animate-bounce-slow"
        />
        <img
          src={assets.smiley}
          alt="Smiley"
          className="absolute bottom-16 right-10 w-12 opacity-40 animate-pulse"
        /> */}
      </div>
    </div>
  ) : <Loader />;
};

export default Insight
