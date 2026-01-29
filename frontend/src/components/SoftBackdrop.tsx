

// const SoftBackdrop = () => {
//   return (
//     <div>
//             <div className='fixed inset-0 -z-1 pointer-events-none'>
//                 <div className='absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-pink-800/35 to-transparent rounded-full blur-3xl' />
//                 <div className='absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-pink-700/35 to-transparent rounded-full blur-2xl' />
//             </div>
//     </div>
//   )
// }

// export default SoftBackdrop

const SoftBackdrop = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

      {/* Top Center Main Glow */}
      <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-violet-600/30 via-purple-600/25 to-indigo-600/20 rounded-full blur-3xl" />

      {/* Right Bottom Glow */}
      <div className="absolute right-[-100px] bottom-[-80px] w-[500px] h-[280px] bg-gradient-to-bl from-purple-600/25 to-transparent rounded-full blur-3xl" />

      {/* Left Bottom Subtle Glow */}
      <div className="absolute left-[-120px] bottom-[20%] w-[420px] h-[240px] bg-gradient-to-tr from-indigo-600/20 to-transparent rounded-full blur-3xl" />

    </div>
  );
};

export default SoftBackdrop;

