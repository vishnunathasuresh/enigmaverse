import {
  isRouteErrorResponse,
  Links,
  Link,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BrainCircuit, Calendar, Menu, Users, X } from "lucide-react";
import clsx from "clsx";

import "./app.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <SiteLayout />;
}

function SiteLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: BrainCircuit },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "About Us", path: "/about", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-black text-slate-50 font-sans selection:bg-cyan-500/30">


      <header className="fixed top-0 w-full z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <nav
          className={clsx(
            "pointer-events-auto w-full max-w-2xl flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500",
            "bg-white/[0.04] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl backdrop-saturate-150",
            isScrolled && "bg-white/[0.07] border-white/[0.12] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          )}
        >
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-white/90">
              Enigma
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "relative px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "text-cyan-300 bg-white/[0.08]"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto absolute top-[72px] left-4 right-4 mx-auto max-w-2xl rounded-2xl bg-white/[0.05] border border-white/[0.08] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.4)] mt-5 py-3 px-4 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "bg-white/[0.08] text-cyan-300"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                )}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </header>

      <main className="pt-24 pb-16 min-h-screen">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-slate-950/50 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-80">
            <BrainCircuit className="w-5 h-5 text-cyan-500" />
            <span className="font-semibold tracking-tight">Enigma AI/ML Club</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} IIIT Kottayam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
