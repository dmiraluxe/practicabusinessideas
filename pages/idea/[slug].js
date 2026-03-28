import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ideas from '../../data/ideas.json';
import Link from 'next/link';

export default function IdeaDetail({ idea }) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!idea) return <div className="bg-black h-screen text-gold-500 flex items-center justify-center">Loading Vision...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* NAVIGATION */}
      <nav className="p-8 flex justify-between items-center border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
        <Link href="/" className="text-gray-400 hover:text-gold-500 transition-colors uppercase tracking-widest text-xs font-bold">
          ← Back to Command Center
        </Link>
        <div className="text-gold-500 font-serif italic text-xl">DivaBiz Intelligence</div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* HEADER */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-24">
          <span className="text-gold-600 font-mono uppercase tracking-[0.4em] text-xs mb-4 block">{idea.category}</span>
          <h1 className="text-5xl md:text-7xl font-light mb-6 text-gold-glow">{idea.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">{idea.description}</p>
        </motion.div>

        {/* INTERACTIVE STEP-BY-STEP SYSTEM */}
        <div className="bg-luxury-charcoal rounded-[40px] p-8 md:p-16 border border-white/10 relative shadow-2xl">
          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-16 relative">
            <div className="absolute h-[1px] bg-white/10 w-full top-1/2 -z-10" />
            {idea.steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 
                ${currentStep >= index ? 'bg-gold-600 border-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.6)]' : 'bg-black border-white/20 text-gray-600'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Animated Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="text-gold-500 text-sm uppercase tracking-widest mb-4">Phase 0{currentStep + 1}</h3>
                <h2 className="text-4xl font-semibold mb-6">{idea.steps[currentStep].title}</h2>
                <p className="text-gray-300 text-xl leading-relaxed mb-8">{idea.steps[currentStep].desc}</p>
                
                {currentStep < idea.steps.length - 1 && (
                  <button 
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="text-gold-500 border-b border-gold-500 pb-1 hover:text-white hover:border-white transition-all text-sm font-bold uppercase tracking-widest"
                  >
                    Next Strategic Step →
                  </button>
                )}
              </div>

              {/* Visualization Box */}
              <div className="aspect-square bg-black/50 border border-white/5 rounded-3xl flex items-center justify-center text-8xl shadow-inner">
                <motion.div
                   animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                   transition={{ repeat: Infinity, duration: 4 }}
                >
                  {currentStep === 0 ? '🔍' : currentStep === 1 ? '✨' : currentStep === 2 ? '📸' : '🚀'}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RESEARCH TOOLS PANEL */}
        <div className="mt-24">
           <h4 className="text-center text-gray-500 uppercase tracking-widest text-xs mb-12">Executive Sourcing Tools</h4>
           <div className="flex flex-wrap justify-center gap-4">
              {['Airbnb', 'Google Maps', 'MagicBricks', 'Canva', 'Instagram'].map((tool) => (
                <div key={tool} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:border-gold-500/50 hover:bg-white/10 transition-all cursor-pointer text-sm">
                  {tool}
                </div>
              ))}
           </div>
        </div>
      </main>
    </div>
  );
}

// Logic to link JSON data to the page
export async function getStaticPaths() {
  const paths = ideas.map((idea) => ({ params: { slug: idea.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const idea = ideas.find((i) => i.slug === params.slug);
  return { props: { idea } };
}
