// import { footerData } from "../data/footer";
// import { DribbbleIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
// import { motion } from "motion/react";
// import type { IFooterLink } from "../types";
// import { Link } from "react-router-dom";

// export default function Footer() {
//     return (
//         <footer className="flex flex-wrap justify-center md:justify-between overflow-hidden gap-10 md:gap-20 mt-40 py-6 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500">
//             <motion.div className="flex flex-wrap items-start gap-10 md:gap-35"
//                 initial={{ x: -150, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
//             >
//                 <Link to='/'>
//                     <img className="size-8 aspect-square" src="/favicon.svg" alt="footer logo" width={32} height={32} />
//                 </Link>
//                 {footerData.map((section, index) => (
//                     <div key={index}>
//                         <p className="text-slate-100 font-semibold">{section.title}</p>
//                         <ul className="mt-2 space-y-2">
//                             {section.links.map((link: IFooterLink, index: number) => (
//                                 <li key={index}>
//                                     <Link to={link.href} className="hover:text-purple-600 transition">
//                                         {link.name}
//                                     </Link>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </motion.div>
//             <motion.div className="flex flex-col max-md:items-center max-md:text-center gap-2 items-end"
//                 initial={{ x: 150, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{ type: "spring", stiffness: 280, damping: 70, mass: 1 }}
//             >
//                 <p className="max-w-60">Making every customer feel valued—no matter the size of your audience.</p>
//                 <div className="flex items-center gap-4 mt-3">
//                     <a href="#" target="_blank" rel="noreferrer">
//                         <DribbbleIcon className="size-5 hover:text-purple-500" />
//                     </a>
//                     <a href="#" target="_blank" rel="noreferrer">
//                         <LinkedinIcon className="size-5 hover:text-purple-500" />
//                     </a>
//                     <a href="#" target="_blank" rel="noreferrer">
//                         <TwitterIcon className="size-5 hover:text-purple-500" />
//                     </a>
//                     <a href="#" target="_blank" rel="noreferrer">
//                         <YoutubeIcon className="size-6 hover:text-purple-500" />
//                     </a>
//                 </div>
//                 <p className="mt-3 text-center">&copy; {new Date().getFullYear()} <a href="#">Glimpsify</a></p>
//             </motion.div>
//         </footer>
//     );
// }


import { footerData } from "../data/footer";
import { Dribbble, Linkedin, Twitter, Play } from "lucide-react";
import { motion } from "motion/react";
import type { IFooterLink } from "../types";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-center md:justify-between overflow-hidden 
      gap-10 md:gap-20 mt-12 py-8 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-zinc-400 border-t border-white/10">

      {/* LEFT */}
      <motion.div
        className="flex flex-wrap items-start gap-10 md:gap-20"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      >
        <Link to="/">
          <img
            className="size-8 aspect-square"
            src="/favicon.svg"
            alt="footer logo"
            width={32}
            height={32}
          />
        </Link>

        {footerData.map((section, index) => (
          <div key={index}>
            <p className="text-zinc-200 font-semibold">{section.title}</p>
            <ul className="mt-2 space-y-2">
              {section.links.map((link: IFooterLink, index: number) => (
                <li key={index}>
                  <Link to={link.href} className="hover:text-violet-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* RIGHT */}
      <motion.div
        className="flex flex-col max-md:items-center max-md:text-center gap-4 items-end"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
      >
        {/* Socials */}
        <div className="flex items-center gap-4">
          <a href="#" target="_blank" rel="noreferrer">
            <Dribbble className="size-5 hover:text-violet-400 transition" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <Linkedin className="size-5 hover:text-violet-400 transition" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <Twitter className="size-5 hover:text-violet-400 transition" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <Play className="size-5 hover:text-violet-400 transition" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-zinc-500">
          © {new Date().getFullYear()} Glimpsify
        </p>

        {/* Credit */}
<p className="text-center text-sm text-zinc-500 flex items-center justify-center gap-2">
  Made with 
  <span className="text-red-400 animate-pulse">❤️</span> 
  by 
  <span className="font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
    Ajay
  </span>
</p>

      </motion.div>
    </footer>
  );
}
