// 'use client'
// import SectionTitle from "../components/SectionTitle";
// import { ArrowRightIcon, MailIcon, UserIcon } from "lucide-react";
// import { motion } from "motion/react";

// export default function ContactSection() {
//     return (
//         <div className="px-4 md:px-16 lg:px-24 xl:px-32">
//             <SectionTitle text1="Contact" text2="Grow your channel" text3="Have question about our AI ? Ready to scale your views? Lets's talk" />
//             <form onSubmit={(e) => e.preventDefault()} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-slate-300 mt-16 w-full' >
//                 <motion.div
//                     initial={{ y: 150, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//                 >
//                     <p className='mb-2 font-medium'>Your name</p>
//                     <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-purple-500'>
//                         <UserIcon className='size-5' />
//                         <input name='name' type="text" placeholder='Enter your name' className='w-full p-3 outline-none' />
//                     </div>
//                 </motion.div>

//                 <motion.div
//                     initial={{ y: 150, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
//                 >
//                     <p className='mb-2 font-medium'>Email id</p>
//                     <div className='flex items-center pl-3 rounded-lg border border-slate-700 focus-within:border-purple-500'>
//                         <MailIcon className='size-5' />
//                         <input name='email' type="email" placeholder='Enter your email' className='w-full p-3 outline-none' />
//                     </div>
//                 </motion.div>

//                 <motion.div className='sm:col-span-2'
//                     initial={{ y: 150, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
//                 >
//                     <p className='mb-2 font-medium'>Message</p>
//                     <textarea name='message' rows={8} placeholder='Enter your message' className='focus:border-purple-500 resize-none w-full p-3 outline-none rounded-lg border border-slate-700' />
//                 </motion.div>

//                 <motion.button type='submit' className='w-max flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-full'
//                     initial={{ y: 150, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
//                 >
//                     Submit
//                     <ArrowRightIcon className="size-5" />
//                 </motion.button>
//             </form>
//         </div>
//     );
// }

'use client'
import SectionTitle from "../components/SectionTitle";
import { ArrowRightIcon, MailIcon, UserIcon, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <div id="contact" className="relative px-4 md:px-16 lg:px-24 xl:px-32 py-16 overflow-hidden">

      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 blur-3xl rounded-full" />

      <SectionTitle 
        text1="Contact" 
        text2="Let’s grow your channel" 
        text3="Have questions about our AI? Ready to scale your views? Let’s talk." 
      />

      <motion.form
        onSubmit={(e) => e.preventDefault()}
        className="relative max-w-2xl mx-auto mt-20 p-8 rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl grid sm:grid-cols-2 gap-5 text-zinc-300"
        initial={{ y: 80, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >

        {/* Name */}
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-300">Your name</p>
          <div className="flex items-center gap-2 pl-3 rounded-xl border border-white/10 bg-black/30 focus-within:border-violet-500 transition">
            <UserIcon className="size-5 text-violet-400" />
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 bg-transparent outline-none text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <p className="mb-2 text-sm font-medium text-zinc-300">Email address</p>
          <div className="flex items-center gap-2 pl-3 rounded-xl border border-white/10 bg-black/30 focus-within:border-violet-500 transition">
            <MailIcon className="size-5 text-violet-400" />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-transparent outline-none text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-medium text-zinc-300">Message</p>
          <textarea
            name="message"
            rows={6}
            placeholder="Tell us what you're building..."
            className="w-full p-4 rounded-xl border border-white/10 bg-black/30 outline-none resize-none text-white placeholder:text-zinc-500 focus:border-violet-500 transition"
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex items-center justify-between gap-4 mt-2">

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Sparkles className="w-4 h-4 text-violet-400" />
            We usually reply within 24 hours
          </div>

          <motion.button
            type="submit"
            className="group flex items-center gap-2 rounded-xl px-8 py-3 font-semibold text-white
              bg-gradient-to-r from-violet-500 to-indigo-500 shadow-lg hover:opacity-90 active:scale-[0.98] transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send message
            <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
          </motion.button>

        </div>

      </motion.form>
    </div>
  );
}
