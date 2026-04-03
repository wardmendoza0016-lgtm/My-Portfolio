import { motion } from 'framer-motion';
import { Code2, Blocks, Wrench, Cpu } from 'lucide-react';

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-6 h-6" />,
    skills: ["JavaScript", "C#", "HTML", "CSS", "SQL", "DAX"]
  },
  {
    title: "Frameworks",
    icon: <Blocks className="w-6 h-6" />,
    skills: ["React", "Bootstrap", "Node.js", "Tailwind", "Next.js"]
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-6 h-6" />,
    skills: ["VS Code", "Unity", "Git/GitHub", "Canva", "Microsoft 365", "Firebase", "Cursor AI", "n8n", "BotCake"]
  },
  {
    title: "Other Skills",
    icon: <Cpu className="w-6 h-6" />,
    skills: ["Hardware/Software Troubleshooting", "Preventive Maintenance", "Networking Fundamentals", "Generative AI Tools", "Prompt Engineering"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Skills() {
  return (
    <section id="about" className="py-24 bg-[#0a0a0a] px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Ambient Glow - Positioned differently for variety */}
      <div className="absolute top-1/4 right-[-10%] w-[50%] h-[50%] bg-[#6b8e23]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-[-10%] w-[50%] h-[50%] bg-[#6b8e23]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#6b8e23]"></div>
            <span className="text-[#6b8e23] text-sm font-bold tracking-[0.2em] uppercase">Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Arsenal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            A comprehensive breakdown of the technologies, frameworks, and tools I use to build robust systems and automate complex workflows.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="group relative p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#6b8e23]/40 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6b8e23]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-[#6b8e23]/10 text-[#6b8e23] group-hover:scale-110 group-hover:bg-[#6b8e23] group-hover:text-white transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#6b8e23] transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-4 py-2 text-sm font-medium text-gray-400 bg-white/5 border border-white/10 rounded-lg group-hover:border-white/20 group-hover:text-gray-200 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}