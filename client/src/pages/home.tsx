import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Testimonials from "@/components/testimonials";
import About from "@/components/about";
import Contact from "@/components/contact";
import CustomCursor from "@/components/cursor";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black grainy cursor-none"
    >
      {isDesktop && <CustomCursor />}

      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Experience />
        <Testimonials />
        <About />
        <Contact />
      </main>
    </motion.div>
  );
}