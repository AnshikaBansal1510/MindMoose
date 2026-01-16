import React, { useState, useRef, useEffect } from 'react'
import { assets } from '../../assets/assets'
import Quill from 'quill';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { addBlog, generateContent } from '../../config/api';
import toast from 'react-hot-toast';
import { parse } from 'marked';

const AddBlog = () => {

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const blogTags = ["Physical Exercise", "Journal", "Habits", "Anxiety", "Mental Awareness", "Self love", "Decision Making", "Problem solving", "Productivity"]

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState('');
  const[tags, setTags] = useState([]);
  const[author, setAuthor] = useState('Admin');

  const queryClient = useQueryClient();

const {
  mutate: addBlogMutation,
  isPending: isAdding,
} = useMutation({
  mutationFn: addBlog,
  onSuccess: (data) => {
    if(data.success) {
      toast.success("Blog added successfully");

      setTitle("");
      setTags("");
      setAuthor("");
      setImage(null);
      quillRef.current.root.innerHTML = "";

      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    } else {
      toast.error(data.message);
    }
  },

  onError: (error) => {
    toast.error(
      error.response?.data?.message || error.message
    );
  },
});

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
  
    addBlogMutation({
      title,
      content: quillRef.current.root.innerHTML, 
      tags,
      author,
      image,
    });
  }

  const { mutate: generateMutation, isPending: isGenerating, error: generateError } = useMutation({
    mutationFn: generateContent,
    onSuccess: (data) => {
      if(data.success) {
        toast.success("Content created successfully");
        quillRef.current.root.innerHTML = parse(data.content);
      } else {
        toast.error(data.message);
      }
    },
  
    onError: (error) => {
      toast.error(
        error.response?.data?.message || error.message
      );
    },
  });

  useEffect(() => {
    // initiate quill only once
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
    }
  }, []);

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer'/>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required/>
        </label>

        <p className='mt-4'>Reflection title</p>
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'/>

        <p className='mt-4'>Author</p>
        <input onChange={(e) => setAuthor(e.target.value)} value={author} type="text" placeholder='Type here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'/>

        <p className='mt-4'>Reflection content</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>
          {isGenerating && ( <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
            <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
          </div> )}
          <button type='button' disabled={isGenerating} onClick={() => generateMutation(title)} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-[#AA336A] px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog tag</p>
        <select onChange={(e) => setTags(e.target.value)} name="tag" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">Select tag</option>
          {
            blogTags.map((item, index) => {
              return <option key={index} value={item}>{item}</option>
            })
          }
        </select>

        <br/>

        <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-black text-white rounded cursor-pointer text-sm'>
          {isAdding ? "Adding Reflection..." : "Add Reflection"}
        </button>
      </div>
    </form>
  )
}

export default AddBlog