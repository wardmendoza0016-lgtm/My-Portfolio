import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { Code2, Blocks, Wrench, Cpu } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────
const skillCategories = [
  {
    id: 'programming',
    title: "Programming",
    icon: Code2,
    skills: ["JavaScript", "C#", "HTML", "CSS", "SQL", "DAX"],
    accent: "#3b82f6", 
  },
  {
    id: 'frameworks',
    title: "Frameworks",
    icon: Blocks,
    skills: ["React", "Bootstrap", "Node.js", "Tailwind", "Next.js"],
    accent: "#10b981", 
  },
  {
    id: 'tools',
    title: "Tools & Platforms",
    icon: Wrench,
    skills: ["VS Code", "Unity", "Git/GitHub", "Canva", "Microsoft 365", "Firebase", "Cursor AI", "n8n", "BotCake"],
    accent: "#f59e0b", 
  },
  {
    id: 'other',
    title: "Other Skills",
    icon: Cpu,
    skills: ["Hardware", "Maintenance", "Networking", "Generative AI", "Prompt Engineering"],
    accent: "#6b8e23", 
  }
];

// ─── Expanding Orb Component (Auto-Resetting Sandbox - FIXED) ──────────
function ExpandingOrb({ category, isExpanded, onExpand, onCollapse }) {
  const orbRef = useRef(null);
  const sandboxRef = useRef(null);
  const Icon = category.icon;

  const [isInteracting, setIsInteracting] = useState(false);
  const timeoutRef = useRef(null);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleInteractionEnd = () => {
    timeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  useEffect(() => {
    if (!isExpanded) {
      setIsInteracting(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isExpanded]);

  return (
    <motion.div
      ref={orbRef}
      layout 
      onMouseEnter={onExpand}
      onMouseLeave={onCollapse}
      animate={{
        width: isExpanded ? 460 : 120,
        height: isExpanded ? 380 : 120,
        borderRadius: isExpanded ? 32 : 60,
        backgroundColor: isExpanded ? '#0f0f0f' : '#111111',
      }}
      transition={{ type: "spring", stiffness: 110, damping: 18, mass: 1 }}
      className="relative flex-shrink-0 cursor-pointer overflow-hidden border border-white/10 group"
      style={{
        boxShadow: isExpanded 
          ? `0 0 50px ${category.accent}15` 
          : `0 0 20px ${category.accent}00`
      }}
    >
      {/* ── COLLAPSED STATE (The Glowing Icon) ── */}
      <motion.div 
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-4 rounded-full border border-dashed border-white/20"
        />
        <div className="relative z-10 p-5 rounded-full" style={{ backgroundColor: `${category.accent}10`, color: category.accent }}>
          <Icon size={32} />
        </div>
      </motion.div>

      {/* ── EXPANDED STATE (Auto-Resetting Sandbox) ── */}
      <motion.div 
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3, delay: isExpanded ? 0.15 : 0 }}
        className="absolute inset-0 p-8 w-[460px] h-[380px] pointer-events-none flex flex-col"
      >
        {/* Header */}
        <div className="relative z-10 flex items-center gap-4 mb-6 pointer-events-auto shrink-0 h-[60px]">
          <div 
            className="p-3.5 rounded-xl shadow-lg border border-white/10"
            style={{ backgroundColor: `${category.accent}20`, color: category.accent }}
          >
            <Icon size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight leading-none">
              {category.title}
            </h3>
            <span className="text-[10px] text-gray-500 tracking-widest uppercase font-mono mt-1.5 block transition-colors duration-300" style={{ color: isInteracting ? category.accent : '' }}>
              {isInteracting ? "Physics Engine: Active" : "Status: Aligned"}
            </span>
          </div>
        </div>
        
        {/* Sandbox Area */}
        <div 
          ref={sandboxRef} 
          className="relative z-10 flex-grow w-full pointer-events-auto rounded-lg overflow-visible"
        >
          <div className="flex flex-wrap content-start gap-3 w-full h-full p-1">
            {isExpanded && category.skills.map((skill, index) => (
              <motion.div
                key={skill}
                drag
                dragConstraints={sandboxRef}
                dragElastic={0.2} 
                onDragStart={handleInteractionStart}
                onDragEnd={handleInteractionEnd}
                // THE FIX: Properly defining opacity and using undefined to release constraint locks
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: isInteracting ? undefined : 0,
                  y: isInteracting ? undefined : 0,
                  rotate: isInteracting ? undefined : 0
                }}
                whileDrag={{ scale: 1.1, zIndex: 50 }}
                transition={{ 
                  type: "spring", 
                  stiffness: isInteracting ? 0 : 200, 
                  damping: 15, 
                  // Don't stagger the delay if they are just snapping back from a drag
                  delay: isInteracting ? 0 : (0.1 + (index * 0.05)) 
                }}
                className="relative block cursor-grab active:cursor-grabbing px-4 py-2 text-sm font-medium text-white rounded-lg bg-[#111111] border border-white/10 select-none shadow-xl"
                style={{ 
                  boxShadow: `0 8px 20px rgba(0,0,0,0.4), inset 0 0 10px ${category.accent}15` 
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────
export default function Skills() {
  const [activeOrb, setActiveOrb] = useState(null);

  return (
    <section id="about" className="py-24 bg-[#030303] px-6 lg:px-12 relative overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-[-10%] w-[50%] h-[50%] bg-[#6b8e23]/3 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-[-10%] w-[50%] h-[50%] bg-[#3b82f6]/3 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center flex flex-col items-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#6b8e23]"></div>
            <span className="text-[#6b8e23] text-sm font-bold tracking-[0.2em] uppercase">Capabilities</span>
            <div className="w-8 h-[2px] bg-[#6b8e23]"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-base font-light max-w-xl">
            Hover over a node to expand the stack. Drag the modules to interact with the physics engine.
          </p>
        </motion.div>

        {/* The Orbs Gallery */}
        <div className="flex flex-wrap xl:flex-nowrap justify-center items-center gap-6 min-h-[400px]">
          {skillCategories.map((category) => (
            <ExpandingOrb 
              key={category.id} 
              category={category} 
              isExpanded={activeOrb === category.id}
              onExpand={() => setActiveOrb(category.id)}
              onCollapse={() => setActiveOrb(null)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}