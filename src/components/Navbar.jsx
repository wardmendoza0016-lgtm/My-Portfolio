import { Menu, Github, Linkedin, Instagram } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="absolute top-0 w-full z-50 pt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Social Icons */}
          <div className="hidden md:flex items-center space-x-4 text-slate-400">
            <a href="https://github.com" target="_blank" className="hover:text-white transition-colors"><Github size={20} /></a>
            <a href="www.linkedin.com/in/wardmendoza" target="_blank" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="https://instagram.com/mendz.17" target="_blank" className="hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-slate-300 hover:text-white">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}