// 'use client'
// import SectionTitle from "../components/SectionTitle"
// import { pricingData } from "../data/pricing";
// import type { IPricing } from "../types";
// import { CheckIcon } from "lucide-react";
// import { motion } from "motion/react";

// export default function PricingSection() {
//     return (
//         <div id="pricing" className="px-4 md:px-16 lg:px-24 xl:px-32">
//             <SectionTitle text1="Pricing" text2="Simple Pricing" text3="Choose the plan that fits your creation schedule. Cancel anytime" />

//             <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
//                 {pricingData.map((plan: IPricing, index: number) => (
//                     <motion.div key={index} className={`w-72 text-center border border-purple-950 p-6 pb-16 rounded-xl ${plan.mostPopular ? 'bg-purple-950 relative' : 'bg-purple-950/30'}`}
//                         initial={{ y: 150, opacity: 0 }}
//                         whileInView={{ y: 0, opacity: 1 }}
//                         viewport={{ once: true }}
//                         transition={{ delay: index * 0.15, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
//                     >
//                         {plan.mostPopular && (
//                             <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-purple-400 rounded-full">Most Popular</p>
//                         )}
//                         <p className="font-semibold">{plan.name}</p>
//                         <h1 className="text-3xl font-semibold">${plan.price}<span className="text-gray-500 font-normal text-sm">/{plan.period}</span></h1>
//                         <ul className="list-none text-slate-300 mt-6 space-y-2">
//                             {plan.features.map((feature, index) => (
//                                 <li key={index} className="flex items-center gap-2">
//                                     <CheckIcon className="size-4.5 text-purple-600" />
//                                     <p>{feature}</p>
//                                 </li>
//                             ))}
//                         </ul>
//                         <button type="button" className={`w-full py-2.5 rounded-md font-medium mt-7 transition-all ${plan.mostPopular ? 'bg-white text-purple-600 hover:bg-slate-200' : 'bg-purple-500 hover:bg-purple-600'}`}>
//                             Get Started
//                         </button>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// }

'use client'

import SectionTitle from "../components/SectionTitle"
import { pricingData } from "../data/pricing";
import type { IPricing } from "../types";
import { CheckIcon } from "lucide-react";
import { motion } from "motion/react";

export default function PricingSection() {
  return (
    <div id="pricing" className="relative px-4 md:px-16 lg:px-24 xl:px-32 py-18 overflow-hidden">

      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-indigo-600/20 blur-3xl rounded-full" />

      <SectionTitle 
        text1="Pricing" 
        text2="Simple, transparent pricing" 
        text3="Choose the plan that fits your creation schedule. Cancel anytime." 
      />

      <div className="relative flex flex-wrap items-center justify-center gap-10 mt-20">

        {pricingData.map((plan: IPricing, index: number) => (
          <motion.div
            key={index}
            className={`relative w-80 rounded-2xl border backdrop-blur-xl p-8 shadow-xl transition-all
              ${plan.mostPopular 
                ? "border-violet-500/50 bg-gradient-to-b from-violet-900/60 to-indigo-900/40 scale-105" 
                : "border-white/10 bg-zinc-900/50 hover:border-violet-500/30"
              }
            `}
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, type: "spring", stiffness: 260, damping: 30 }}
          >

            {/* Most popular badge */}
            {plan.mostPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold rounded-full 
                bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg">
                Most Popular
              </div>
            )}

            {/* Plan name */}
            <p className="text-sm uppercase tracking-wider text-zinc-400">
              {plan.name}
            </p>

            {/* Price */}
            <h1 className="mt-4 text-4xl font-bold text-white">
              ${plan.price}
              <span className="text-zinc-400 font-medium text-sm"> /{plan.period}</span>
            </h1>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-white/10" />

            {/* Features */}
            <ul className="list-none text-zinc-300 space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="mt-1 size-4.5 text-violet-400 shrink-0" />
                  <p className="text-sm">{feature}</p>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              type="button"
              className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all
                ${plan.mostPopular
                  ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg hover:opacity-90 active:scale-[0.98]"
                  : "bg-white/10 text-white hover:bg-white/20 active:scale-[0.98]"
                }
              `}
            >
              Get Started
            </button>

          </motion.div>
        ))}

      </div>
    </div>
  );
}
