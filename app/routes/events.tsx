import { useEffect, useRef, useState } from "react";
import type React from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import {
  Calendar,
  Filter,
  X,
  ExternalLink,
  Image as ImageIcon,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { events, type EventType, type ClubEvent } from "../data";

const filters: Array<EventType | "all"> = ["all", "tech", "non-tech", "chai talks"];

gsap.registerPlugin(ScrollTrigger);

export function meta() {
  return [
    { title: "Enigma | Events" },
    { name: "description", content: "Explore Enigma events timeline" },
  ];
}

export default function Events() {
  const [filter, setFilter] = useState<EventType | "all">("all");
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  const filteredEvents = events.filter((e) => filter === "all" || e.type === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, [filter]);

  const nextPhoto = () => {
    if (selectedEvent) {
      setCurrentPhotoIndex((prev) => (prev + 1) % selectedEvent.photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedEvent) {
      setCurrentPhotoIndex((prev) => (prev - 1 + selectedEvent.photos.length) % selectedEvent.photos.length);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Event Timeline
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Explore our journey through time. From hackathons to chai talks, see what we've been up to.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 p-2 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-md">
          <Filter className="w-5 h-5 text-slate-400 ml-2" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize",
                filter === f
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div ref={timelineRef} className="relative border-l border-white/10 ml-4 md:ml-8 space-y-12">
        {filteredEvents.map((event, idx) => (
          <div
            key={event.id}
            className="timeline-item relative pl-8 md:pl-12 group cursor-pointer"
            onClick={() => {
              setSelectedEvent(event);
              setCurrentPhotoIndex(0);
            }}
          >
            <div
              className={clsx(
                "absolute left-[-9px] top-2 w-4 h-4 rounded-full border-2 transition-all duration-300",
                event.status === "upcoming"
                  ? "bg-cyan-500 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  : event.status === "current"
                  ? "bg-blue-500 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                  : "bg-slate-700 border-slate-500 group-hover:bg-slate-500"
              )}
            />

            <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:bg-slate-800/60 hover:border-white/10 transition-all group-hover:-translate-y-1">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className={clsx(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      event.type === "tech"
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                        : event.type === "non-tech"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                    )}
                  >
                    {event.type}
                  </span>
                  <span
                    className={clsx(
                      "text-sm font-medium",
                      event.status === "upcoming"
                        ? "text-cyan-300"
                        : event.status === "current"
                        ? "text-blue-300"
                        : "text-slate-500"
                    )}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {event.title}
              </h3>
              <p className="text-slate-400 line-clamp-2">{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 shadow-2xl shadow-cyan-900/20"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
                onClick={() => setSelectedEvent(null)}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-64 md:h-96 bg-black group">
                <img
                  src={selectedEvent.photos[currentPhotoIndex]}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                {selectedEvent.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 backdrop-blur-md"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80 backdrop-blur-md"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedEvent.photos.map((_, i) => (
                        <div
                          key={`${selectedEvent.id}-${i}`}
                          className={clsx(
                            "w-2 h-2 rounded-full transition-all",
                            i === currentPhotoIndex ? "bg-cyan-500 w-6" : "bg-white/50"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {selectedEvent.type}
                  </span>
                  <span className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-5 h-5" />
                    {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  {selectedEvent.title}
                </h2>

                <p className="text-lg text-slate-300 leading-relaxed mb-8">
                  {selectedEvent.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-6 border-top border-white/10">
                  <a
                    href={selectedEvent.resourcesLink}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium transition-colors shadow-lg shadow-cyan-600/20"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Resources
                  </a>
                  <a
                    href={selectedEvent.mediaLink}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
                  >
                    <ImageIcon className="w-5 h-5" />
                    Photos
                  </a>
                  <a
                    href={selectedEvent.mediaLink}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors border border-white/10"
                  >
                    <Video className="w-5 h-5" />
                    Videos
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
