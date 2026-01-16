import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import BlogCard from "../components/BlogCard.jsx";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../config/api.js";
import { assets } from "../assets/assets.js";


export default function BlogsPage() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {data: blogs = [], isLoading: blogLoading, error: blogError} = useQuery({  

    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    onError: (error) => {
      toast.error("Failed to load blogs!")
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-peach-50 p-6">

      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-[#b22d64] font-medium"
      >
        ← Go Back
      </button>

      <img
        src={assets.smiley}
        alt="Smiley"
        className="absolute top-19 left-145 w-10 opacity-50 animate-bounce-slow"
      />   

      {/* Page Heading */}
      <h1 className="text-4xl font-semibold text-center text-[#b22d64] mb-10">
        MindMoose Reflections
      </h1>

      <img
        src={assets.smiley}
        alt="Smiley"
        className="absolute top-19 right-145 w-10 opacity-50 animate-bounce-slow"
      /> 

      {/* Loader */}
      {blogLoading && <Loader />}

      {/* Blogs */}
      {!blogLoading && blogs.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!blogLoading && blogs.length === 0 && (
        <p className="text-center text-2xl text-gray-500 mt-20">
          No Reflections are there to show 🌱
        </p>
      )}
    </div>
  );
}