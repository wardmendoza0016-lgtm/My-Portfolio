import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function Hero() {
  // Animation Variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden selection:bg-[#6b8e23]/30">
      
      {/* 1. THE VISUAL ANCHOR: Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
            backgroundSize: '50px 50px' 
          }}
        />
        
        {/* Radial Mask to fade the grid at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_80%)]" />

        {/* Animated Floating Glows */}
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            y: [0, 50, 0], 
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#6b8e23]/20 blur-[120px] pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 0], 
            y: [0, -60, 0], 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#6b8e23]/10 blur-[120px] pointer-events-none" 
        />
      </div>

      {/* 2. Text Content - Now Centered for Balance */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 w-full text-center">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <span className="text-[#6b8e23] text-sm font-medium tracking-widest uppercase bg-[#6b8e23]/10 px-4 py-1.5 rounded-full border border-[#6b8e23]/20 backdrop-blur-sm">
              Available for work
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter leading-[1]"
          >
            Hi, I am <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600">
              Edward
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-2xl text-gray-400 mb-12 max-w-2xl font-light leading-relaxed"
          >
            Crafting seamless digital experiences with a mastery of 
            <span className="text-white font-normal"> full-stack development</span> and modern design.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6"
          >
            <a 
              href="#projects" 
              className="group relative px-8 py-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 text-xs font-bold tracking-widest uppercase flex items-center gap-2 overflow-hidden rounded-sm"
            >
              Show Profile
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#about" 
              className="px-8 py-4 border border-white/10 text-white hover:bg-white/5 transition-all duration-300 text-xs font-bold tracking-widest uppercase backdrop-blur-sm rounded-sm"
            >
              Know More
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* 3. Interactive Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-gray-400 w-5 h-5" />
        </motion.div>
      </motion.div>

    </section>
  );
}