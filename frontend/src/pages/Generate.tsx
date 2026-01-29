import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { IThumbnail } from "../assets/assets";
import SoftBackdrop from "../components/SoftBackdrop";
import { ImageIcon } from "lucide-react";

import {
  colorSchemes,
  type AspectRatio,
  type IThumbnail,
  type ThumbnailStyle,
} from "../assets/assets";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSelector from "../components/ColorSelector";
import PreviewPanel from "../components/PreviewPanel";
import { userAuth } from "../context/AuthContext";
import { Sparkles } from "lucide-react";

import toast from "react-hot-toast";
import api from "../configs/api";

const Generate = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = userAuth();

  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(
    colorSchemes[0].id,
  );
  const [style, setStyle] = useState<ThumbnailStyle>("Bold & Graphic");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  const handleGenerate = async () => {
    if (!isLoggedIn) return toast.error("Please login to generate thumbnails");
    if (!title.trim()) return toast.error("Title is required");
    setLoading(true);
    const api_payload = {
      title,
      prompt: additionalDetails,
      style,
      aspect_ratio: aspectRatio,
      color_scheme: colorSchemeId,
      text_overlay: true,
    };
    const { data } = await api.post("/api/thumbnail/generate", api_payload);
    if (data.thumbnail) {
      navigate("/generate/" + data.thumbnail._id);
      toast.success(data.message);
    }
  };

  const fetchThumbnail = async () => {
    try {
      const { data } = await api.get(`/api/user/thumbnail/${id}`);
      setThumbnail(data?.thumbnail as IThumbnail);
      setLoading(!data?.thumbnail?.image_url);
      setAdditionalDetails(data?.thumbnail?.user_prompt);
      setTitle(data?.thumbnail?.title);
      setColorSchemeId(data?.thumbnail?.color_scheme);
      setAspectRatio(data?.thumbnail?.aspect_ratio);
      setStyle(data?.thumbnail?.style);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && id) {
      fetchThumbnail();
    }
    if (id && loading && isLoggedIn) {
      const interval = setInterval(() => {
        fetchThumbnail();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [id, loading, isLoggedIn]);

  useEffect(() => {
    if (!id && thumbnail) {
      setThumbnail(null);
    }
  }, [pathname]);

  return (
    <>
      <SoftBackdrop />
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8 ">
            {/* LEFT PANEL */}
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">
                <h2 className="text-xl font-bold text-zinc-100 mb-1">
                  Create Your Ai Thumbnail
                </h2>
                <p className="text-sm text-zinc-400">
                  Describe your vision and let AI bring it to life
                </p>
              </div>

              <div className="space-y-5 ">
                {/* TITLE INPUT */}
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-zinc-200">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={100}
                    placeholder="e.g. 10 Habits That Changed My Life"
                    className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-purple-500"
                  />
                  <div className="flex justify-end">
                    <span className="text-xs text-zinc-400">
                      {title.length}/100
                    </span>
                  </div>
                </div>
                {/* StyleSelector */}
                <StyleSelector
                  value={style}
                  onChange={setStyle}
                  isOpen={styleDropdownOpen}
                  setIsOpen={setStyleDropdownOpen}
                />
                {/* AspectRatioSeclector */}
                <AspectRatioSelector
                  value={aspectRatio}
                  onChange={setAspectRatio}
                />
                {/* ColorSchemeSelector */}
                <ColorSelector
                  value={colorSchemeId}
                  onChange={setColorSchemeId}
                />

                {/* DETAILS */}

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-zinc-300">
                    Additional Prompt{" "}
                    <span className="text-zinc-500">(optional)</span>
                  </label>

                  <div className="relative">
                    {/* Icon */}
                    <Sparkles className="absolute top-3.5 left-3 size-5 text-violet-400 pointer-events-none" />

                    <textarea
  value={additionalDetails}
  onChange={(e) => setAdditionalDetails(e.target.value)}
  rows={3}
  placeholder="Add details like mood, colors, background, objects, camera angle, lighting, or style..."
  className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 
  bg-zinc-900/60 
  text-zinc-100 placeholder:text-zinc-400 
  focus:outline-none focus:ring-2 focus:ring-violet-500 
  resize-none transition"
/>


                  </div>
                </div>
              </div>

              {/* BUTTON */}
              {!id && (
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center gap-2 py-3.5 rounded-xl font-semibold
    text-white bg-gradient-to-r from-violet-500 to-indigo-500 
    shadow-lg hover:opacity-90 active:scale-[0.98] 
    disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-xl blur-md bg-violet-500/40 opacity-0 group-hover:opacity-100 transition pointer-events-none" />

                  {/* Content */}
                  {loading ? (
                    <>
                      <svg className="size-5 animate-spin" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="white"
                          strokeWidth="3"
                          fill="none"
                          opacity="0.3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="white"
                          strokeWidth="3"
                          fill="none"
                        />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-5" />
                      Generate thumbnail
                    </>
                  )}
                </button>
              )}
            </div>
            {/* RIGHT PANEL */}
            {/* <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4 ">
                  Preview
                </h2>
                <PreviewPanel
                  thumbnail={thumbnail}
                  isLoading={loading}
                  aspectRatio={aspectRatio}
                />
              </div>
            </div> */}


{/* RIGHT PANEL */}
<div>
  <div className="relative p-6 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden">

    {/* Subtle glow */}
    <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-gradient-to-br from-violet-600/20 to-indigo-600/20 blur-3xl pointer-events-none" />

    {/* Header */}
    <div className="relative flex items-center justify-between mb-4">

      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center size-9 rounded-lg 
          bg-gradient-to-br from-violet-500 to-indigo-500 shadow-md">
          <ImageIcon className="size-5 text-white" />
        </div>

        <h2 className="text-lg font-semibold text-zinc-100 ">
          Generated Thumbnail
        </h2>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <Sparkles className="size-4 text-violet-400" />
        AI Output
      </div>
    </div>

    {/* Divider */}
    <div className="mb-4 h-px w-full bg-white/10" />

    {/* Preview Panel */}
    <PreviewPanel
      thumbnail={thumbnail}
      isLoading={loading}
      aspectRatio={aspectRatio}
    />

  </div>
</div>


          </div>
        </main>
      </div>
    </>
  );
};

export default Generate;
