// 'use client'
// import { CheckIcon, ChevronRightIcon, VideoIcon } from "lucide-react";
// import TiltedImage from "../components/TiltImage";
// import { motion } from "motion/react";
// import { useNavigate } from "react-router-dom";

// export default function HeroSection() {
//     const navigate = useNavigate()
//     const specialFeatures = [
//         "No design skills needed",
//         "Fast Generation",
//         "High CTR templates",
//     ];

//     return (
//         <div className="relative flex flex-col items-center justify-center px-4 md:px-16 lg:px-24 xl:px-32">
//             <div className="absolute top-30 -z-10 left-1/4 size-72 bg-purple-600 blur-[300px]"></div>
//             <motion.a onClick={()=> navigate('/generate')}  className="group flex items-center gap-2 rounded-full p-1 pr-3 mt-44 text-purple-100 bg-purple-200/15"
//                 initial={{ y: -20, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//             >
//                 <span className="bg-purple-800 text-white text-xs px-3.5 py-1 rounded-full">
//                     NEW
//                 </span>
//                 <p className="flex items-center gap-1">
//                     <span>Generate your first thumbnail for free </span>
//                     <ChevronRightIcon size={16} className="group-hover:translate-x-0.5 transition duration-300" />
//                 </p>
//             </motion.a>
//             <motion.h1 className="text-5xl/17 md:text-6xl/21 font-medium max-w-3xl text-center"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
//             >
//                 Design YouTube Thumbnails in Seconds with <span className="move-gradient  px-3 rounded-xl text-nowrap">AI.</span>
//             </motion.h1>
//             <motion.p className="text-base text-center text-slate-200 max-w-lg mt-6"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//             >
//                 Stop wasting hours on design. Get high-converting thumbnails in seconds with our advanced AI.</motion.p>
//             <motion.div className="flex items-center gap-4 mt-8"
//                 initial={{ y: 50, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//             >
//                 <button onClick={()=>navigate('/generate')} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-7 h-11">
//                     Generate Now
//                 </button>
//                 <button className="flex items-center gap-2 border border-purple-900 hover:bg-purple-950/50 transition rounded-full px-6 h-11">
//                     <VideoIcon strokeWidth={1} />
//                     <span>See Demo</span>
//                 </button>
//             </motion.div>

//             <div className="flex flex-wrap justify-center items-center gap-4 md:gap-14 mt-12">
//                 {specialFeatures.map((feature, index) => (
//                     <motion.p className="flex items-center gap-2" key={index}
//                         initial={{ y: 30, opacity: 0 }}
//                         whileInView={{ y: 0, opacity: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.2, duration: 0.3 }}
//                     >
//                         <CheckIcon className="size-5 text-purple-600" />
//                         <span className="text-slate-400">{feature}</span>
//                     </motion.p>
//                 ))}
//             </div>
//             <TiltedImage />
//         </div>
//     );
// }


'use client'
import { CheckIcon, ChevronRightIcon, Play } from "lucide-react";
import TiltedImage from "../components/TiltImage";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const specialFeatures = [
    "No design skills required",
    "Lightning-fast generation",
    "High-conversion templates",
  ];

  return (
    <div className="relative flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 blur-3xl -z-10" />

      {/* Top Badge */}
      <motion.button
        onClick={() => navigate('/generate')}
        className="group flex items-center gap-2 rounded-full p-1 pr-4 mt-40
        text-violet-200 bg-white/10 border border-white/10 backdrop-blur
        hover:bg-white/15 transition"
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <span className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs px-3 py-1 rounded-full">
          NEW
        </span>
        <span className="flex items-center gap-1 text-sm">
          Generate your first thumbnail for free
          <ChevronRightIcon size={16} className="group-hover:translate-x-0.5 transition" />
        </span>
      </motion.button>

      {/* Heading */}
      <motion.h1
        className="mt-10 text-4xl md:text-6xl font-bold max-w-4xl text-center leading-tight"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
      >
        Create{" "}
        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
          scroll-stopping
        </span>{" "}
        thumbnails with AI
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-base md:text-lg text-center text-zinc-300 max-w-2xl mt-6"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, type: "spring", stiffness: 160, damping: 20 }}
      >
        Turn your ideas into high-CTR thumbnails in seconds. No design skills required.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-wrap items-center gap-4 mt-10"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 20 }}
      >
        <button
          onClick={() => navigate('/generate')}
          className="px-8 h-12 rounded-xl font-semibold text-white
          bg-gradient-to-r from-violet-500 to-indigo-500 shadow-lg
          hover:opacity-90 active:scale-[0.98] transition"
        >
          Start generating — it’s free
        </button>

        <button
          className="flex items-center gap-2 px-7 h-12 rounded-xl
          border border-white/15 bg-white/5 backdrop-blur
          hover:bg-white/10 transition text-white"
        >
          <Play className="size-5" />
          Watch demo
        </button>
      </motion.div>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
        {specialFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 text-sm text-zinc-400"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
          >
            <div className="flex items-center justify-center size-6 rounded-full bg-violet-500/20">
              <CheckIcon className="size-4 text-violet-400" />
            </div>
            {feature}
          </motion.div>
        ))}
      </div>

      {/* Image */}
      <TiltedImage />
    </div>
  );
}
