// 'use client'
// import { motion } from "motion/react";
// import { useNavigate } from "react-router-dom";

// export default function CTASection() {
//     const navigate = useNavigate()
//     return (
//         <motion.div className="max-w-5xl py-16 mt-40 md:pl-20 md:w-full max-md:mx-4 md:mx-auto flex flex-col md:flex-row max-md:gap-6 items-center justify-between text-left bg-linear-to-b from-purple-900 to-purple-950 rounded-2xl p-6 text-white"
//             initial={{ y: 150, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//         >
//             <div>
//                 <motion.h1 className="text-4xl md:text-[46px] md:leading-15 font-semibold bg-linear-to-r from-white to-purple-400 text-transparent bg-clip-text"
//                     initial={{ y: 80, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
//                 >
//                     Ready to go viral?
//                 </motion.h1>
//                 <motion.p className="bg-linear-to-r from-white to-purple-400 text-transparent bg-clip-text text-lg"
//                     initial={{ y: 80, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ type: "spring", stiffness: 200, damping: 70, mass: 1 }}
//                 >
//                     Join thousands of creators using AI to boost their CTR.
//                 </motion.p>
//             </div>
//             <motion.button className="px-12 py-3 text-slate-800 bg-white hover:bg-slate-200 rounded-full text-sm mt-4  "
//                 initial={{ y: 80, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
//                 onClick={()=>navigate('/generate')}
//             >
//                 Generate Free THumbnails
//             </motion.button>
//         </motion.div>
//     );
// }

'use client'
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="relative max-w-5xl py-16 mt-40 md:px-20 md:w-full max-md:mx-4 md:mx-auto 
      flex flex-col md:flex-row gap-8 items-center justify-between text-left 
      bg-gradient-to-b from-violet-900 to-indigo-950 rounded-3xl p-8 text-white overflow-hidden"
      initial={{ y: 120, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 160, damping: 20 }}
    >

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-purple-600/10 to-indigo-600/20 blur-3xl" />

      {/* Text */}
      <div className="relative">
        <motion.h1
          className="text-3xl md:text-4xl font-bold leading-tight 
          bg-gradient-to-r from-white to-violet-300 text-transparent bg-clip-text"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        >
          Turn your ideas into <br /> scroll-stopping thumbnails
        </motion.h1>

        <motion.p
          className="mt-4 text-lg text-zinc-300 max-w-xl"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          Create high-CTR thumbnails in seconds with AI — no design skills needed.
        </motion.p>
      </div>

      {/* Button */}
      <motion.button
        className="relative px-10 py-3.5 rounded-xl font-semibold text-white
        bg-gradient-to-r from-violet-500 to-indigo-500 shadow-lg 
        hover:opacity-90 active:scale-[0.98] transition"
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        onClick={() => navigate('/generate')}
      >
        Start generating — it’s free
      </motion.button>

    </motion.div>
  );
}
