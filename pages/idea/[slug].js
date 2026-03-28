import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ideas from '../../data/ideas.json';

export default function IdeaDetail({ idea }) {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6">
      <div className="max-w-4xl mx-auto py-20">
        <h1 className="text-gold-500 text-center text-5xl mb-20 font-playfair italic">{idea.title} Execution</h1>

        <div className="bg-white/5 rounded-[50px] p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-9xl mb-12 animate-bounce">
                {step === 0 ? '🔍' : step === 1 ? '✨' : step === 2 ? '📸' : '🚀'}
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gold-300">Phase {step + 1}: {idea.steps[step].title}</h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-md">{idea.steps[step].desc}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-16 flex justify-center gap-4">
            {idea.steps.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${step === i ? 'bg-gold-500' : 'bg-gray-800'}`} />
            ))}
          </div>

          <button 
            onClick={() => setStep((step + 1) % idea.steps.length)}
            className="mt-12 w-full py-5 bg-gold-600 text-black font-bold uppercase tracking-widest rounded-2xl hover:bg-gold-400 transition-all"
          >
            {step === idea.steps.length - 1 ? 'RESTART JOURNEY' : 'NEXT STEP →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = ideas.map((idea) => ({ params: { slug: idea.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const idea = ideas.find((i) => i.slug === params.slug);
  return { props: { idea } };
}
