import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import { clubInfo, testimonials, partners } from '../data';
import { BrainCircuit, Cpu, Network, Sparkles, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Scroll Animations
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.2,
      });

      // Story Section Scroll Animation
      gsap.from('.story-text', {
        scrollTrigger: {
          trigger: storyRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.3,
      });

      // Testimonials Scroll Animation
      gsap.from('.testimonial-card', {
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      });
    });

    // Anime.js Floating Elements
    anime({
      targets: '.floating-icon',
      translateY: [-20, 20],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 3000,
      delay: anime.stagger(200),
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col gap-32 overflow-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center justify-center px-6"
      >
        <div className="absolute inset-0 z-[-1] flex items-center justify-center opacity-20">
          <div className="w-[800px] h-[800px] rounded-full border border-cyan-500/30 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-blue-500/20 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-indigo-500/40 animate-[spin_20s_linear_infinite]" />
        </div>

        <div className="max-w-5xl mx-auto text-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 mb-8 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide uppercase">
              {clubInfo.tagline}
            </span>
          </motion.div>

          <h1 className="hero-title text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500">
            Decode the Future.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Master the Enigma.
            </span>
          </h1>

          <p className="hero-title text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
            Immerse yourself in the sheer joy of experimenting with AI/ML technologies.
            Join the brightest minds at IIIT Kottayam.
          </p>

          <div className="hero-title mt-12 flex items-center justify-center gap-6">
            <div className="floating-icon p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-cyan-900/20">
              <BrainCircuit className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="floating-icon p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-blue-900/20">
              <Cpu className="w-8 h-8 text-blue-400" />
            </div>
            <div className="floating-icon p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl shadow-indigo-900/20">
              <Network className="w-8 h-8 text-indigo-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="relative px-6 py-24 bg-slate-900/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-500 uppercase mb-12 text-center">
            Peep Our Story
          </h2>
          <div className="space-y-8 text-2xl md:text-4xl font-light leading-snug text-slate-300 text-center">
            {clubInfo.story.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="story-text">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section ref={partnersRef} className="py-12 overflow-hidden">
        <h2 className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-12 text-center">
          Previous Partners & Collaborators
        </h2>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
            {[...partners, ...partners, ...partners].map((partner, idx) => (
              <span
                key={idx}
                className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 uppercase tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 py-4">
            {[...partners, ...partners, ...partners].map((partner, idx) => (
              <span
                key={idx}
                className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500 uppercase tracking-tighter opacity-50 hover:opacity-100 transition-opacity cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="px-6 py-24 max-w-7xl mx-auto w-full">
        <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-500 uppercase mb-16 text-center">
          What People Say About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="testimonial-card relative p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:bg-slate-800/60 transition-colors group"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-cyan-500/20 group-hover:text-cyan-500/40 transition-colors" />
              <p className="text-lg text-slate-300 mb-8 relative z-10 leading-relaxed">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/20">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.name}</h4>
                  <p className="text-sm text-cyan-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
