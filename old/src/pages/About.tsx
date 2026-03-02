import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { team } from '../data';
import { Github, Linkedin, Instagram, X } from 'lucide-react';

type Member = {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  github: string;
  linkedin: string;
  instagram: string;
};

const MemberCard: React.FC<{ member: Member; onClick: () => void }> = ({ member, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative w-full aspect-[3/4] cursor-pointer rounded-3xl overflow-hidden border border-white/10 shadow-xl shadow-cyan-900/20 bg-slate-900 group"
      onClick={onClick}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      {/* Blackish gradient extending from the bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-300">
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-sm font-medium text-cyan-400 uppercase tracking-wider">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500">
          Meet the Minds
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
          The brilliant individuals driving Enigma forward. A collective of innovators, thinkers, and creators.
        </p>
      </div>

      <div className="space-y-32">
        {/* Mentors */}
        <section>
          <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-500 uppercase mb-12 text-center flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-cyan-500/30" />
            Mentors
            <span className="w-12 h-px bg-cyan-500/30" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center max-w-4xl mx-auto">
            {team.mentors.map((member) => (
              <MemberCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
            ))}
          </div>
        </section>

        {/* Leads */}
        <section>
          <h2 className="text-sm font-bold tracking-[0.2em] text-blue-500 uppercase mb-12 text-center flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-blue-500/30" />
            Leads
            <span className="w-12 h-px bg-blue-500/30" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {team.leads.map((member) => (
              <MemberCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
            ))}
          </div>
        </section>

        {/* Core Team */}
        <section>
          <h2 className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase mb-12 text-center flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-indigo-500/30" />
            Core Team
            <span className="w-12 h-px bg-indigo-500/30" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {team.core.map((member) => (
              <MemberCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
            ))}
          </div>
        </section>

        {/* Volunteers */}
        <section>
          <h2 className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase mb-12 text-center flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-slate-500/30" />
            Volunteers
            <span className="w-12 h-px bg-slate-500/30" />
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-6">
            {team.volunteers.map((member) => (
              <MemberCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
            ))}
          </div>
        </section>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl perspective-1000"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ rotateY: -90, scale: 0.8, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              exit={{ rotateY: 90, scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className="relative w-full max-w-md bg-slate-900 border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/50 preserve-3d"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors backdrop-blur-md"
                onClick={() => setSelectedMember(null)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 bg-slate-800">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
              </div>

              <div className="p-8 pt-0 relative -mt-12">
                <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h3>
                  <p className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-4 pb-4 border-b border-white/10">
                    {selectedMember.role}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {selectedMember.description}
                  </p>

                  <div className="flex items-center gap-4">
                    <a href={selectedMember.github} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href={selectedMember.linkedin} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={selectedMember.instagram} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
