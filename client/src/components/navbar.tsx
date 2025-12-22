import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Logo from "/icons/logo.webp";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "WORK", href: "/work" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-background/90 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        {/* LOGO */}
        <Link href="/">
          <motion.span
            className="flex items-center gap-2 text-lg sm:text-xl font-bold font-heading tracking-tighter text-white cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Home"
          >
            <img
              src={Logo}
              alt="Dushyant Pal Logo"
              className="w-10 h-8 sm:w-12 sm:h-10"
              width={48}
              height={40}
            />
            DUSHYANT PAL<span className="text-primary">.</span>
          </motion.span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-1">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="relative px-4 py-2 text-sm font-medium tracking-widest text-white group"
            >
              <span className="relative z-10">{item.label}</span>

              <motion.span
                className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
              />

              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 text-black flex items-center justify-center text-sm font-medium tracking-widest transition-opacity z-20">
                {item.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* DESKTOP CTA */}
        <motion.a
          href="/contact"
          className="hidden md:block relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10 block px-6 py-2 text-sm font-bold border border-white/20 text-white group-hover:text-black transition-colors duration-300 hover:bg-primary rounded-xl">
            LET&apos;S TALK
          </span>
          <motion.span
            className="absolute inset-0 bg-primary"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </motion.a>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden text-white z-50 p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <motion.div
            animate={menuOpen ? "open" : "closed"}
            className="w-6 h-5 relative"
          >
            <motion.span
              className="absolute h-0.5 w-full bg-white top-0 rounded-full"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 10 },
              }}
            />
            <motion.span
              className="absolute h-0.5 w-full bg-white top-2 rounded-full"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
            />
            <motion.span
              className="absolute h-0.5 w-full bg-white top-4 rounded-full"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6 },
              }}
            />
          </motion.div>
        </button>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center gap-8 md:hidden z-40 pt-20"
            onClick={() => setMenuOpen(false)}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                    }}
                    className="text-3xl font-bold tracking-widest text-white cursor-pointer block py-2 px-4 hover:text-primary transition-colors duration-300"
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="mt-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Link href="/contact">
                <span
                  onClick={() => setMenuOpen(false)}
                  className="px-8 py-3 text-lg font-bold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 rounded-xl inline-block"
                >
                  LET&apos;S TALK
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
