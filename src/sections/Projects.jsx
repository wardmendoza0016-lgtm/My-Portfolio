import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2 } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: "Business Product Automation Agent",
    description: "An intelligent e-commerce automation workflow designed to streamline shop operations, handle data routing, and improve business efficiency.",
    tech: ["n8n", "Automation", "E-commerce Workflow"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 2,
    title: "Walking-Activity Tracker",
    description: "A comprehensive web-based fitness and dietary tracking application. Allows users to actively monitor their daily activities and caloric intake.",
    tech: ["React", "Vercel", "Full-Stack Development"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 3,
    title: "DLSUD - GO",
    description: "Whether you’re a student, staff member, visitor, or applicant, DLSU-D Go! helps you navigate, find information, and stay updated with campus events.",
    tech: ["System Design", "Frontend", "Backend"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    id: 4,
    title: "Cybereum",
    description: "A 2024-2025 Capstone Thesis Project: A gamified educational platform designed to teach K-12 students essential cybersecurity concepts through interactive learning.",
    tech: ["Gamification", "Cybersecurity", "Educational Tech"],
    githubUrl: "#",
    liveUrl: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#0a0a0a] px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Ambient Glow (Consistent with Hero) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#6b8e23]/5 blur-[120px] pointer-events-none rounded-full" />

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
            <span className="text-[#6b8e23] text-sm font-bold tracking-[0.2em] uppercase">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Work</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl bg-[#111111] border border-white/5 hover:border-[#6b8e23]/40 transition-all duration-300 overflow-hidden"
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6b8e23]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-lg bg-[#6b8e23]/10 flex items-center justify-center text-[#6b8e23] group-hover:scale-110 transition-transform duration-300">
                    <Code2 className="w-6 h-6" />
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={project.githubUrl} 
                      className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                      aria-label="Github"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href={project.liveUrl} 
                      className="p-2 rounded-full bg-white/5 text-gray-400 hover:text-[#6b8e23] hover:bg-[#6b8e23]/10 transition-all"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#6b8e23] transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-8 leading-relaxed font-light flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index} 
                      className="text-[10px] uppercase tracking-wider font-bold text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-md group-hover:border-[#6b8e23]/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}