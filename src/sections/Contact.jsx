import { useState } from 'react'; // Import useState for form handling
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';

export default function Contact() {
  // State to track form status
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    const form = e.target;
    const data = new FormData(form);

    try {
      // REPLACE 'your_formspree_id' with the ID you get from Formspree.io
      const response = await fetch('https://formspree.io/f/mvzvwprp', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        setStatus('success');
        form.reset(); // Clear the form after success
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-[#6b8e23]/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/2 right-[-10%] w-[40%] h-[40%] bg-[#6b8e23]/5 blur-[120px] pointer-events-none rounded-full" />

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
            <span className="text-[#6b8e23] text-sm font-bold tracking-[0.2em] uppercase">Contact</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Connect</span>
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            Whether you have a freelance project in mind, a full-time opportunity, or just want to chat about web development and automation, my inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            <div className="group flex items-start space-x-6">
              <div className="p-4 bg-[#6b8e23]/10 text-[#6b8e23] rounded-2xl group-hover:bg-[#6b8e23] group-hover:text-white transition-all duration-300">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                <p className="text-gray-400 text-lg">ward.mendoza0016@gmail.com</p>
                <p className="text-sm text-gray-500 mt-1 font-light">Shoot me an email directly for a faster response.</p>
              </div>
            </div>

            <div className="group flex items-start space-x-6">
              <div className="p-4 bg-[#6b8e23]/10 text-[#6b8e23] rounded-2xl group-hover:bg-[#6b8e23] group-hover:text-white transition-all duration-300">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Location</h3>
                <p className="text-gray-400 text-lg">Imus, Cavite, Philippines</p>
                <p className="text-sm text-gray-500 mt-1 font-light">Available for remote collaborations worldwide.</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-8 md:p-10 rounded-3xl bg-[#111111] border border-white/5 shadow-2xl"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

            {/* Success Overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#111111] rounded-3xl text-center p-6"
                >
                  <div className="w-20 h-20 bg-[#6b8e23]/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-[#6b8e23] w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">Thank you for reaching out, Ward will get back to you soon.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-[#6b8e23] text-sm font-bold uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name" // Crucial: Formspree uses the 'name' attribute
                    id="name" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6b8e23]/50 focus:ring-1 focus:ring-[#6b8e23]/50 transition-all duration-300 placeholder:text-gray-700"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" // Crucial: Formspree uses the 'name' attribute
                    id="email" 
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6b8e23]/50 focus:ring-1 focus:ring-[#6b8e23]/50 transition-all duration-300 placeholder:text-gray-700"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Message</label>
                <textarea 
                  name="message" // Crucial: Formspree uses the 'name' attribute
                  id="message" 
                  rows="4" 
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6b8e23]/50 focus:ring-1 focus:ring-[#6b8e23]/50 transition-all duration-300 resize-none placeholder:text-gray-700"
                  placeholder="How can I help you?"
                  required
                ></textarea>
              </div>

              <motion.button 
                whileHover={status !== 'submitting' ? { scale: 1.02 } : {}}
                whileTap={status !== 'submitting' ? { scale: 0.98 } : {}}
                disabled={status === 'submitting'}
                type="submit" 
                className={`w-full flex items-center justify-center gap-3 font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg ${
                  status === 'submitting' 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#6b8e23] hover:bg-[#55711b] text-white shadow-[#6b8e23]/20'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </motion.button>
              
              {status === 'error' && (
                <p className="text-red-500 text-center text-sm font-medium">Something went wrong. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}