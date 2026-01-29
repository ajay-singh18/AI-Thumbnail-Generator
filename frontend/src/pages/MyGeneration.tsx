import { useEffect, useState } from "react"
import SoftBackdrop from "../components/SoftBackdrop"
import {  type IThumbnail } from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { ArrowUpRightIcon, DownloadIcon, TrashIcon } from "lucide-react"
import { userAuth } from "../context/AuthContext"
import api from "../configs/api"
import toast from "react-hot-toast"
import { Sparkles, Wand2 } from "lucide-react";


const MyGeneration = () => {
  const {isLoggedIn} = userAuth()

  const navigate = useNavigate()
  const aspectRatioClassMap : Record<string,string> ={
        '16:9' : 'aspect-video',
        '1:1' : 'aspect-square',
        '9:16' : 'aspect-[9/16]'
  }

  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([])
  const [loading,setLoading] = useState(false)

  const fetchThumbnails = async()=>{
     try {
       setLoading(true)
       const {data} = await api.get('/api/user/thumbnails')
       setThumbnails(data.thumbnails || [])
     } catch (error:any) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message)
     }
     finally{
      setLoading(false);
     }
  }
  const handleDownload = async (image_url:string)=>{
    if (!image_url) return;

  try {
    const response = await fetch(image_url);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "thumbnail.png";   // you can change name
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download image");
  }
  }


  const handleDelete = async(id:string)=>{
    try {
      const confirm = window.confirm('Are you sure you want to delete this thumbnail?')
      if(!confirm) return;
      const {data} = await api.delete(`/api/thumbnail/delete/${id}`)
      toast.success(data.message)
      setThumbnails(thumbnails.filter((t)=>t._id !== id))
    } catch (error:any) {
      console.log(error)
      toast.error(error?.response?.data?.message || error.message)
    }
  }
  useEffect(()=>{
    if(isLoggedIn){
      fetchThumbnails()
    }
    fetchThumbnails()
  },[isLoggedIn])
  return (
    <>
      <SoftBackdrop/>
      <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
          {/* HEADER */}
          {/* <div className="mb-8">
            <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
            <p className="text-sm text-zinc-400 mt-1">View and manage all your AI-generated thumbnails</p>
          </div> */}
          {/* HEADER */}
<div className="relative bottom-10">

  {/* Glow */}
  <div className="absolute -top-10 -left-10 w-64 h-32 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl pointer-events-none" />

  <h1 className="text-3xl  font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
    My Generations
  </h1>

  <p className="text-sm  text-zinc-400 mt-2 max-w-xl">
    View and manage all your AI-generated thumbnails in one place.
  </p>

</div>

          {/* LOADING */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({length:6}).map((_,i)=>(
                <div key={i} className="rounded-2xl bg-white/6 border border-white/10 animate-pulse h-[260px]"/>
              ))}
            </div>
          )}

        {/* EMPTY STATE */}
        {/* {!loading && thumbnails.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-zinc-200">No thumbnails yet</h3>
            <p className="text-sm text-zinc-400 mt-2">Generate your first thumbnail to see it here</p>

          </div>
        )} */}

{!loading && thumbnails.length === 0 && (
  <div className="flex items-center justify-center py-32">
    <div className="relative text-center max-w-md">

      {/* Gradient Glow */}
      <div className="absolute inset-0 blur-3xl opacity-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full" />

      {/* Card */}
      <div className="relative backdrop-blur-xl bg-zinc-900/60 border border-white/10 rounded-3xl p-10 shadow-2xl">

        {/* Icon Bubble */}
        <div className="relative mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
          <Wand2 className="w-10 h-10 text-white" />
          
          {/* Pulse Ring */}
          <div className="absolute inset-0 rounded-2xl animate-ping bg-purple-500/30" />
        </div>

        {/* Text */}
        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          No thumbnails yet
        </h3>

        <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
          Create stunning AI-powered thumbnails in seconds. Your generated designs will appear here.
        </p>

        {/* CTA Hint */}
        <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300">
          <Sparkles className="w-4 h-4" />
          Click <span onClick={()=> navigate('/generate')} className="text-pink-400 font-medium">Generate</span> to get started
        </div>

      </div>
    </div>
  </div>
)}


    {/* GRID */}
 {!loading && thumbnails.length > 0 && (
  <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
    {thumbnails.map((thumb: IThumbnail) => {
      const aspectClass = aspectRatioClassMap[thumb.aspect_ratio || "16:9"];

      return (
        <div
          key={thumb._id}
          onClick={() => navigate(`/generate/${thumb._id}`)}
          className="group relative mb-8 break-inside-avoid cursor-pointer 
          rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-xl 
          hover:shadow-2xl overflow-hidden hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300

"
        >
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-gradient-to-br from-violet-600/20 to-indigo-600/20 blur-3xl" />
          </div>

          {/* IMAGE */}
          <div className={`relative overflow-hidden ${aspectClass} bg-black`}>
            {thumb.image_url ? (
              <img
                src={thumb.image_url}
                alt={thumb.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-zinc-400">
                {thumb.isGenerating ? "Generating..." : "No image"}
              </div>
            )}

            {/* Generating overlay */}
            {thumb.isGenerating && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-sm font-medium text-white">
                Generating…
              </div>
            )}

            {/* Top-right badge */}
            <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-black/60 text-zinc-200 border border-white/10">
              {thumb.aspect_ratio}
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4 space-y-3">
            <h3 className="text-base 
 font-semibold text-zinc-100 line-clamp-2">
              {thumb.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-[11px] text-zinc-300">
              <span className=" rounded-full px-2.5 py-1 text-[11px] bg-white/10 border border-white/10
">
                {thumb.style}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/10">
                {thumb.color_scheme}
              </span>
            </div>

            <p className="text-[11px] text-zinc-500">
              {new Date(thumb.createdAt!).toDateString()}
            </p>
          </div>

          {/* ACTIONS */}
          <div
            className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleDelete(thumb._id)}
              className="p-2 rounded-lg bg-black/60 border border-white/10 text-red-400 hover:bg-red-500/20 transition"
            >
              <TrashIcon className="size-4" />
            </button>

            <button
              onClick={() => handleDownload(thumb._id)}
              className="p-2 rounded-lg bg-black/60 border border-white/10 text-violet-400 hover:bg-violet-500/20 transition"
            >
              <DownloadIcon className="size-4" />
            </button>

            <Link
              target="_blank"
              to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}
              className="p-2 rounded-lg bg-black/60 border border-white/10 text-zinc-300 hover:bg-white/20 transition"
            >
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      );
    })}
  </div>
)}

      </div>
    </>
  )
}

export default MyGeneration