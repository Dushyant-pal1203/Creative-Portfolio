import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "/icons/logo.webp";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "WORK", href: "/work" },
    { label: "ABOUT", href: "/about" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-white/5"
            : "mix-blend-difference"
        }`}
      >
        {/* LOGO */}
        <Link href="/">
          <motion.span
            className="flex items-center gap-2 text-xl font-bold font-heading tracking-tighter text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={Logo} alt="Logo" className="w-12 h-10" />
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
          className="md:hidden text-white z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.div
            animate={menuOpen ? "open" : "closed"}
            className="w-6 h-5 relative"
          >
            <motion.span
              className="absolute h-0.5 w-full bg-white top-0"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 10, background: "red" },
              }}
            />
            <motion.span
              className="absolute h-0.5 w-full bg-white top-2"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
            />
            <motion.span
              className="absolute h-0.5 w-full bg-white top-4"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6, background: "red" },
              }}
            />
          </motion.div>
        </button>
      </motion.nav>

      {/* MOBILE MENU OVERLAY */}
      <motion.div
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, y: 0 },
          closed: { opacity: 0, y: -20, pointerEvents: "none" },
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-transparent backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden z-40"
      >
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <span
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold tracking-widest text-white cursor-pointer"
            >
              {item.label}
            </span>
          </Link>
        ))}
      </motion.div>
    </>
  );
}
