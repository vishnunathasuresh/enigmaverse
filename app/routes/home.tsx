import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { clubInfo, testimonials, partners } from "@/data";
import Silk from "@/components/Silk";
import PixelSnow from "@/components/PixelSnow";
import ShinyText from "@/components/ShinyText";
import TextType from "@/components/TextType";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import GradientText from "@/components/GradientText";
import { BrainCircuit, Cpu, Network, Sparkles, Quote } from "lucide-react";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

export function meta() {
  return [
    { title: "Enigma | Home" },
    { name: "description", content: "Enigma AI/ML club of IIIT Kottayam" },
  ];
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let ctx: { revert: () => void } | undefined;

    const initAnimations = async () => {
      const [{ gsap }, scrollTriggerModule, animeModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("animejs"),
      ]);

      if (!isMounted) return;

      const ScrollTrigger =
        (scrollTriggerModule as { ScrollTrigger?: unknown; default?: unknown }).ScrollTrigger ??
        (scrollTriggerModule as { default?: unknown }).default;
      const anime = ((animeModule as { default?: unknown }).default ?? animeModule) as {
        (params: Record<string, unknown>): unknown;
        stagger: (value: number) => unknown;
      };

      if (ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger as object);
      }

      ctx = gsap.context(() => {
        gsap.from(".hero-title", {
          y: 120,
          opacity: 0,
          duration: 1.6,
          ease: "power4.out",
          stagger: 0.18,
        });

        gsap.from(".testimonial-card", {
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "back.out(1.7)",
        });
      });

      anime({
        targets: ".floating-icon",
        translateY: [-18, 18],
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
        duration: 3200,
        delay: anime.stagger(250),
      });

      anime({
        targets: ".hero-orb",
        scale: [1, 1.06, 1],
        opacity: [0.07, 0.14, 0.07],
        duration: 6000,
        direction: "alternate",
        loop: true,
        easing: "easeInOutQuad",
        delay: anime.stagger(800),
      });
    };

    void initAnimations();

    return () => {
      isMounted = false;
      ctx?.revert();
    };
  }, []);

  const storyParagraphs = clubInfo.story.split("\n\n");

  return (
    <div className="flex flex-col overflow-hidden relative bg-black">
      {/* Global snow */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ width: "100%", height: "100vh" }}>
        <PixelSnow
          color="#93c5fd"
          flakeSize={0.008}
          minFlakeSize={1.1}
          pixelResolution={220}
          speed={1.0}
          density={0.25}
          direction={120}
          brightness={0.9}
          depthFade={10}
          farPlane={22}
          gamma={0.5}
          variant="square"
        />
      </div>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
      >
        {/* Animated orbs */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="hero-orb absolute w-175 h-175 rounded-full bg-cyan-500/7 blur-[120px]" />
          <div className="hero-orb absolute w-125 h-125 rounded-full bg-blue-600/9 blur-[100px] translate-x-32" />
          <div className="hero-orb absolute w-100 h-100 rounded-full bg-indigo-500/8 blur-[90px] -translate-x-24 translate-y-16" />
        </div>

        {/* Spinning rings */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-215 h-215 rounded-full border border-cyan-400/30 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-160 h-160 rounded-full border border-blue-400/20 animate-[spin_40s_linear_infinite_reverse]" />
          <div className="absolute w-105 h-105 rounded-full border border-indigo-400/30 animate-[spin_25s_linear_infinite]" />
        </div>

        {/* Ice grid overlay */}
        <div className="absolute inset-0 z-0 bg-ice-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 w-full max-w-300 mx-auto px-4 sm:px-8 lg:px-14 text-center">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-950/70 border border-cyan-400/50 mb-10 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
            <ShinyText
              text={clubInfo.tagline.toUpperCase()}
              className="text-xs sm:text-sm font-semibold tracking-widest"
              speed={2.5}
              shineColor="#ffffff"
              color="#67e8f9"
              spread={180}
            />
          </motion.div>

          {/* Main headline */}
          <h1 className="hero-title text-5xl sm:text-7xl md:text-[6rem] font-black tracking-tight mb-6 leading-none">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-slate-100 to-slate-600">
              Decode the Future.
            </span>
            <br />
            <TextType
              text={["Master the Enigma.", "Shape Tomorrow.", "Crack the Code."]}
              className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500 pb-3 block"
              typingSpeed={90}
              pauseDuration={2800}
              deletingSpeed={45}
              loop={true}
              showCursor={false}
            />
          </h1>

          {/* Sub */}
          <p className="hero-title text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Immerse yourself in the sheer joy of experimenting with AI/ML technologies.
            Join the brightest minds at IIIT Kottayam.
          </p>

          {/* CTA */}
          <div className="hero-title flex flex-wrap items-center justify-center gap-5">
            <motion.a
              href="/events"
              whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full bg-cyan-500 text-black font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/30 transition-all"
            >
              Explore Events
            </motion.a>
            <motion.a
              href="/about"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full border border-white/20 text-white font-medium text-sm backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all"
            >
              Meet the Team
            </motion.a>
          </div>

          {/* Floating icons */}
          <div className="hero-title mt-14 flex flex-wrap items-center justify-center gap-5">
            {[
              { icon: BrainCircuit, color: "text-cyan-400", shadow: "shadow-cyan-900/30" },
              { icon: Cpu, color: "text-blue-400", shadow: "shadow-blue-900/30" },
              { icon: Network, color: "text-indigo-400", shadow: "shadow-indigo-900/30" },
            ].map(({ icon: Icon, color, shadow }, i) => (
              <div
                key={i}
                className={`floating-icon p-4 rounded-2xl bg-white/4 border border-white/10 backdrop-blur-xl shadow-2xl ${shadow}`}
              >
                <Icon className={`w-8 h-8 ${color}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none z-10" />
      </section>

      {/* ── PEEP OUR STORY ───────────────────────────────────── */}
      <section
        ref={storyRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 sm:px-6 overflow-hidden"
      >
        {/* Silk background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Silk speed={5} scale={1} color="#0e2a3a" noiseIntensity={0.12} rotation={0.04} />
        </div>

        {/* Glowing accents */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 rounded-full bg-cyan-500/6 blur-[100px] pointer-events-none" />
        <div className="absolute left-1/4 top-1/3 w-75 h-75 rounded-full bg-blue-600/6 blur-[80px] pointer-events-none" />

        {/* Border lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-16">
          {/* Badge — animated underline title */}
          <div className="flex flex-col items-center gap-3">
            <AnimatedText
              text="Peep Our Story"
              textClassName="text-3xl sm:text-4xl font-black tracking-wide text-white"
              underlineClassName="text-cyan-400"
              underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
              underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
              underlineDuration={1.8}
            />
          </div>

          {/* Main statement — SplitText word by word */}
          <div className="story-line-1">
            <SplitText
              text={storyParagraphs[0].replace(/\n/g, " ")}
              tag="h2"
              className="text-4xl sm:text-5xl md:text-[3.5rem] font-black leading-tight tracking-tight text-white"
              splitType="words"
              from={{ opacity: 0, y: 60 }}
              to={{ opacity: 1, y: 0 }}
              duration={1.0}
              delay={80}
              rootMargin="80px"
              textAlign="center"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-linear-to-r from-transparent to-cyan-500/60" />
            <Sparkles className="w-5 h-5 text-cyan-500/70" />
            <div className="h-px w-24 bg-linear-to-l from-transparent to-cyan-500/60" />
          </div>

          {/* Supporting line — BlurText */}
          <div className="story-line-2">
            <BlurText
              text={storyParagraphs[1]?.replace(/\n/g, " ") ?? ""}
              animateBy="words"
              direction="bottom"
              delay={120}
              stepDuration={0.5}
              className="text-xl sm:text-2xl md:text-3xl text-slate-300 font-light leading-relaxed"
            />
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
            {[
              { value: "2024", label: "Founded" },
              { value: "25", label: "Members" },
              { value: "25+", label: "Events" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <GradientText
                  className="text-3xl sm:text-4xl font-black"
                  colors={["#22d3ee", "#38bdf8", "#818cf8", "#22d3ee"]}
                  animationSpeed={6}
                >
                  {value}
                </GradientText>
                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREVIOUS PARTNERS ────────────────────────────────── */}
      <section
        ref={partnersRef}
        className="relative z-10 px-4 sm:px-6 py-14 overflow-hidden border-t border-white/4"
      >
        <div className="absolute inset-0 bg-linear-to-b from-black via-slate-950/60 to-black pointer-events-none" />

        <p className="relative text-xs font-bold tracking-[0.25em] text-slate-600 uppercase mb-10 text-center">
          Previous Partners &amp; Collaborators
        </p>

        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-20 py-4">
            {[...partners, ...partners, ...partners].map((partner, idx) => (
              <span
                key={`${partner}-${idx}`}
                className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-700 hover:text-cyan-400 transition-colors duration-300 cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-20 py-4">
            {[...partners, ...partners, ...partners].map((partner, idx) => (
              <span
                key={`${partner}-2-${idx}`}
                className="text-xl md:text-2xl font-black uppercase tracking-tight text-slate-700 hover:text-cyan-400 transition-colors duration-300 cursor-default"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section
        ref={testimonialsRef}
        className="relative z-10 px-4 sm:px-6 py-24 max-w-7xl mx-auto w-full"
      >
        <div className="text-center mb-16">
          <AnimatedText
            text="What People Say"
            textClassName="text-2xl sm:text-3xl font-bold text-cyan-400 tracking-wide"
            underlineClassName="text-cyan-500/60"
            underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
            underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
            underlineDuration={1.6}
            className="mb-3"
          />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            Voices from the Community
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t: (typeof testimonials)[number]) => (
            <div
              key={t.id}
              className="testimonial-card relative p-8 rounded-3xl bg-white/3 border border-white/7 backdrop-blur-md hover:bg-white/6 hover:border-cyan-500/25 transition-all duration-500 group"
            >
              <div className="absolute inset-0 rounded-3xl bg-cyan-500/0 group-hover:bg-cyan-500/3 transition-all duration-500 pointer-events-none" />
              <Quote className="absolute top-6 right-6 w-7 h-7 text-cyan-500/15 group-hover:text-cyan-500/35 transition-colors duration-300" />
              <p className="text-base text-slate-300 mb-8 relative z-10 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-linear-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20 text-base">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-cyan-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
