export const clubInfo = {
  name: "Enigma",
  tagline: "The official AI/ML club of IIIT Kottayam",
  story: `We trace our roots to Enigma.\nWhere intelligence was engineered.

Inspired by the codebreakers of World War II,\nwe build systems that push AI forward.`,
};

export const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Alumni",
    text: "Enigma gave me the practical exposure I needed to kickstart my AI career.",
  },
  {
    id: 2,
    name: "Bob Smith",
    role: "Student",
    text: "The community here is incredibly supportive and forward-thinking.",
  },
  {
    id: 3,
    name: "Charlie Davis",
    role: "Industry Expert",
    text: "A brilliant group of minds shaping the future of technology.",
  },
];

export const partners = [
  "Google Developer Groups",
  "Microsoft Learn Student Ambassadors",
  "AWS Academy",
  "NVIDIA Deep Learning Institute",
  "OpenAI",
  "Hugging Face",
];

export type EventType = "tech" | "non-tech" | "chai talks";
export type EventStatus = "past" | "current" | "upcoming";

export type ClubEvent = {
  id: string;
  title: string;
  date: string;
  type: EventType;
  status: EventStatus;
  description: string;
  photos: string[];
  resourcesLink: string;
  mediaLink: string;
};

export const events: ClubEvent[] = [
  {
    id: "e1",
    title: "Neural Networks Workshop",
    date: "2026-04-15",
    type: "tech",
    status: "upcoming",
    description: "Dive deep into the architecture of modern neural networks.",
    photos: ["https://picsum.photos/seed/nn1/800/600", "https://picsum.photos/seed/nn2/800/600"],
    resourcesLink: "#",
    mediaLink: "#",
  },
  {
    id: "e2",
    title: "AI in Healthcare Panel",
    date: "2026-03-10",
    type: "chai talks",
    status: "current",
    description: "A casual discussion on how AI is revolutionizing healthcare.",
    photos: ["https://picsum.photos/seed/health1/800/600"],
    resourcesLink: "#",
    mediaLink: "#",
  },
  {
    id: "e3",
    title: "Winter Hackathon 2025",
    date: "2025-12-20",
    type: "tech",
    status: "past",
    description: "48 hours of non-stop coding to build futuristic AI solutions.",
    photos: ["https://picsum.photos/seed/hack1/800/600", "https://picsum.photos/seed/hack2/800/600"],
    resourcesLink: "#",
    mediaLink: "#",
  },
  {
    id: "e4",
    title: "Team Building Retreat",
    date: "2025-11-05",
    type: "non-tech",
    status: "past",
    description: "A fun-filled day of games and bonding for the Enigma family.",
    photos: ["https://picsum.photos/seed/retreat1/800/600"],
    resourcesLink: "#",
    mediaLink: "#",
  },
];

export const team = {
  mentors: Array.from({ length: 2 }).map((_, i) => ({
    id: `m${i}`,
    name: `Mentor ${i + 1}`,
    role: "Faculty Advisor",
    image: `https://picsum.photos/seed/mentor${i}/400/500`,
    description: "Guiding the club with years of industry and academic experience.",
    github: "#",
    linkedin: "#",
    instagram: "#",
  })),
  leads: Array.from({ length: 5 }).map((_, i) => ({
    id: `l${i}`,
    name: `Lead ${i + 1}`,
    role: "Club Lead",
    image: `https://picsum.photos/seed/lead${i}/400/500`,
    description: "Spearheading initiatives and managing the core operations.",
    github: "#",
    linkedin: "#",
    instagram: "#",
  })),
  core: Array.from({ length: 10 }).map((_, i) => ({
    id: `c${i}`,
    name: `Core Member ${i + 1}`,
    role: "Core Team",
    image: `https://picsum.photos/seed/core${i}/400/500`,
    description: "Executing events and driving technical projects.",
    github: "#",
    linkedin: "#",
    instagram: "#",
  })),
  volunteers: Array.from({ length: 14 }).map((_, i) => ({
    id: `v${i}`,
    name: `Volunteer ${i + 1}`,
    role: "Volunteer",
    image: `https://picsum.photos/seed/vol${i}/400/500`,
    description: "Supporting the club's day-to-day activities and events.",
    github: "#",
    linkedin: "#",
    instagram: "#",
  })),
};
