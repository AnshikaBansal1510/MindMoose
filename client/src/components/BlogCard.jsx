import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

const BlogCard = ({ blog }) => {
  const { title, content, tags, image, author, _id } = blog;
  const navigate = useNavigate();

  // Remove HTML tags for preview
  const plainText = content.replace(/<[^>]+>/g, "").slice(0, 80);

  return (
    <div
      onClick={() => navigate(`/blogs/${blog._id}`)}
      className="w-full rounded-2xl overflow-hidden
                 bg-white border border-[#f0c9d8]
                 shadow-sm hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="aspect-video w-full object-cover h-72  mb-8"
      />

      {/* Meta */}
      <div className="px-5 pt-4 flex items-center justify-between">
        {/* Tag pill */}
        <span className="px-3 py-1 rounded-full text-xs font-medium
                         bg-[#fde7ef] text-[#b22d64]">
          {tags}
        </span>

        {/* Author */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <User size={14} />
          <span>{author || "Admin"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 pt-3">
        <h5 className="mb-2 font-semibold text-gray-900 line-clamp-2">
          {title}
        </h5>

        <p className="text-sm text-gray-600 line-clamp-3">
          {plainText}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
