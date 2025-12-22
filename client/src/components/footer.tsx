import { motion } from "framer-motion";
import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/10 p-6 text-xs font-mono text-muted-foreground uppercase tracking-widest"
      >
        <motion.div
          whileHover={{ color: "#ffffff" }}
          className="transition-colors"
        >
          © 2025 Portfolio
        </motion.div>
        <motion.div
          whileHover={{ color: "#D1F608" }}
          className="transition-colors"
        >
          Designed & Built with Passion By Dushyant Pal
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Footer;
