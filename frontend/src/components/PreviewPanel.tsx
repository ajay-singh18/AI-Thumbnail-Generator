import type { AspectRatio, IThumbnail } from "../assets/assets";
import { Loader2, Sparkles } from "lucide-react";

import { DownloadIcon, ImageIcon } from "lucide-react";



const PreviewPanel = ({
  thumbnail,
  isLoading,
  aspectRatio,
}: {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: AspectRatio;
}) => {
  const aspectClasses = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  } as Record<AspectRatio, string>;

  // const onDownload = ()=>{
  //     if(!thumbnail?.image_url) return;
  //     const link = document.createElement('a');
  //     link.href = thumbnail?.image_url.replace('/upload','/upload/f1_attachment')
  //     document.body.appendChild(link)
  //     link.click()
  //     link.remove()
  // }

  const onDownload = async () => {
    if (!thumbnail?.image_url) return;

    try {
      const response = await fetch(thumbnail.image_url);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "thumbnail.png"; // you can change name
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
      alert("Failed to download image");
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            {/* Glow background */}
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-400/20 blur-3xl rounded-full" />

            {/* Card */}
            <div className="relative flex flex-col items-center gap-4 px-8 py-6 rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl shadow-2xl">
              {/* Spinner */}
              <div className="relative">
                <Loader2 className="size-10 animate-spin text-cyan-400" />
                <div className="absolute inset-0 size-10 rounded-full blur-md bg-cyan-400/30" />
              </div>

              {/* Text */}
              <div className="text-center">
                <p className="text-sm font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  AI is creating your thumbnail
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  This usually takes 10–20 seconds
                </p>
              </div>

              {/* Subtle hint */}
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Optimizing colors, layout & composition...
              </div>
            </div>
          </div>
        )}

        {/* Image preview */}
        {/* {!isLoading && thumbnail?.image_url && (
          <div className="group relative h-full w-full">
            <img
              src={thumbnail.image_url}
              alt={thumbnail.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-end justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={onDownload}
                type="button"
                className="mb-6 flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-medium transition bg-white/30 ring-2 ring-white/40 backdrop-blur hover:scale-105 active:scale-95"
              >
                <DownloadIcon className="size-4" />
                Download Thumbnail
              </button>
            </div>
          </div>
        )} */}

{/* Image preview */}
{!isLoading && thumbnail?.image_url && (
  <div className="group relative h-full w-full overflow-hidden rounded-xl">

    {/* Image */}
    <img
      src={thumbnail.image_url}
      alt={thumbnail.title}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* Gradient hover overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

    {/* Action bar */}
    <div className="absolute inset-0 flex items-end justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-xl px-5 py-2.5 shadow-2xl">

        <button
          onClick={onDownload}
          type="button"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-5 py-2 text-xs font-medium text-white shadow-lg hover:opacity-90 active:scale-95 transition"
        >
          <DownloadIcon className="size-4" />
          Download
        </button>

        <div className="flex items-center gap-1 text-xs text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          AI Generated
        </div>

      </div>
    </div>

  </div>
)}

        

        {/* Empty state */}
        {!isLoading && !thumbnail?.image_url && (
          <div className="absolute inset-0 z-10 m-3 flex items-center justify-center">
            {/* Glow */}
            <div className="absolute w-[300px] h-[300px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-400/20 blur-3xl rounded-full" />

            {/* Card */}
            <div className="relative flex flex-col items-center gap-4 px-8 py-8 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-xl text-center">
              {/* Icon bubble */}
              <div className="relative flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg">
                <ImageIcon className="size-10 text-white" />
                <div className="absolute inset-0 rounded-2xl blur-md bg-cyan-400/30" />
              </div>

              {/* Text */}
              <div>
                <p className="text-sm font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Generate your first thumbnail
                </p>
                <p className="mt-1 text-xs text-zinc-400">
                  Fill out the form and click{" "}
                  <span className="text-cyan-400">Generate</span>
                </p>
              </div>

              {/* Hint */}
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Your AI designs will appear here
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
