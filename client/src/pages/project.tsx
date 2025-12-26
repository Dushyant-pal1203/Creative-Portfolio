import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Sparkles,
  Zap,
  Target,
  Star,
  TrendingUp,
  Clock,
  Users,
  Award,
  Rocket,
} from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const projects = [
  {
    id: "01",
    title: "INVENTORY SYSTEM",
    category: "Inventory & Stock Management",
    description:
      "Real-time inventory management system enabling automated stock tracking, low-stock alerts, and multi-warehouse control. Provides an intuitive dashboard, role-based access, and optimized APIs to improve operational efficiency, accuracy, and visibility across inventory workflows while supporting scalability, security, and seamless integration with modern enterprise systems.",
    technologies: ["React", "Node.js", "PostgreSQL", "WebGL", "FHIR"],
    year: "2025",
    color: "#FF6B35",
    gradient: "from-orange-500 via-red-500 to-amber-600",
    stats: { patients: "200K+", accuracy: "99.7%", hospitals: "50+" },
    liveUrl: "https://inventory-system-h2u5.onrender.com/",
    codeUrl: "https://github.com/Dushyant-pal1203/Inventory_system.git",
    featured: false,
    highlight: "Most Efficient",
  },
  {
    id: "02",
    title: "GOLDBAZZAR",
    category: "Digital Gold Investment",
    description:
      "A modern digital investment platform for buying and selling 24K gold and silver with real-time price tracking. Includes instant transactions, live market charts, automated portfolio insights, and bank-grade security, delivering a seamless, transparent, and reliable investment experience for users across web platforms.",
    technologies: ["Next.js", "Three.js", "GSAP", "Sanity CMS"],
    year: "2025",
    color: "#9D4EDD",
    gradient: "from-purple-600 via-violet-600 to-fuchsia-600",
    stats: { views: "1M+", awards: "3", bounce: "< 20%" },
    liveUrl: "https://goldbazzar.in/",
    codeUrl: "https://gitlab.hashstudioz.com/gold_bazzar/marketing-web.git",
    featured: true,
    highlight: "Award Winning",
  },
  {
    id: "03",
    title: "MOTONEXA",
    category: "Automotive Parts Platform",
    description:
      "High-performance automotive parts sourcing platform offering real-time procurement insights. Enables live inventory tracking, intelligent supplier matching, and instant pricing updates through WebSocket streams, helping businesses optimize sourcing decisions, reduce delays, and improve supply chain efficiency with fast, reliable, data-driven workflows.",
    technologies: ["React", "TypeScript", "D3.js", "WebSocket", "Redis"],
    year: "2024",
    color: "#00FF88",
    gradient: "from-emerald-400 via-green-500 to-teal-600",
    stats: { users: "50K+", uptime: "99.9%", performance: "< 50ms" },
    liveUrl: "https://motonexa.com",
    codeUrl:
      "https://gitlab.hashstudioz.com/motonexa/front-end/frontend-app.git",
    featured: true,
    highlight: "High Performance",
  },
  {
    id: "04",
    title: "HASHSTUDIOZ",
    category: "AI & Cloud Solutions",
    description:
      "A multidisciplinary technology studio delivering intelligent digital products using cloud computing, artificial intelligence, blockchain, and IoT solutions. Focuses on building scalable, secure, and innovative software experiences for global brands while transforming complex ideas into impactful digital platforms.",
    technologies: ["Next.js", "Python", "Stable Diffusion", "Ethereum"],
    year: "2024",
    color: "#00D4FF",
    gradient: "from-cyan-500 via-blue-500 to-indigo-600",
    stats: { artworks: "100K+", artists: "5K+", volume: "$2M+" },
    liveUrl: "https://www.hashstudioz.com/",
    codeUrl: "/",
    featured: false,
  },
  {
    id: "05",
    title: "ALLEN ONE",
    category: "AI Education Platform",
    description:
      "An AI-powered education platform offering personalized learning paths, interactive content delivery, and real-time progress tracking. Designed to enhance student engagement and outcomes through data-driven insights, adaptive learning experiences, and scalable infrastructure supporting diverse courses and large user bases.",
    technologies: ["Next.js", "Python", "TensorFlow", "GraphQL"],
    year: "2024",
    color: "#3C99F6",
    gradient: "from-blue-500 via-sky-600 to-cyan-500",
    stats: { students: "10K+", courses: "200+", retention: "95%" },
    liveUrl: "#",
    codeUrl: "/",
    featured: false,
  },
  {
    id: "06",
    title: "Auction strategy for a new IPL franchise",
    category: "Sports Analytics & Strategy Platform",
    description:
      "A data-driven analytics platform designed to optimize IPL auction strategies. Uses machine learning to analyze player performance, budgets, and team requirements, providing predictive insights, real-time simulations, valuation models, and optimized bidding recommendations for building competitive and balanced franchise teams.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Dash", "PostgreSQL"],
    year: "2023",
    color: "#DC2626",
    gradient: "from-red-500 via-rose-500 to-pink-600",
    stats: { players: "500+", accuracy: "92%", simulations: "10K+" },
    liveUrl: "#",
    codeUrl: "#",
    featured: true,
    highlight: "Data-Driven Strategy",
  },
  {
    id: "07",
    title: "ML model to predict rainfall",
    category: "Climate Analytics & Prediction System",
    description:
      "An advanced machine learning platform for rainfall prediction using historical weather data and atmospheric parameters. Provides accurate forecasts through multiple models, feature analysis, and visual dashboards, enabling better climate insights, comparison of algorithms, and real-time prediction capabilities for research and planning.",
    technologies: ["Python", "TensorFlow", "XGBoost", "Matplotlib", "Flask"],
    year: "2023",
    color: "#0EA5E9",
    gradient: "from-sky-500 via-cyan-500 to-blue-600",
    stats: { accuracy: "94%", datasets: "100K+", models: "8+" },
    liveUrl: "#",
    codeUrl: "#",
    featured: true,
    highlight: "Climate Intelligence",
  },
  {
    id: "08",
    title: "Linear regression model using Python",
    category: "Statistical Analysis & Prediction Tool",
    description:
      "A statistical analysis tool built using linear regression for predictive modeling. Includes data preprocessing, model training, residual evaluation, and visualization. Supports detailed statistical reporting and interactive interpretation, enabling accurate predictions, deeper insights, and effective analysis of relationships between variables.",
    technologies: ["Python", "NumPy", "SciPy", "Seaborn", "Jupyter"],
    year: "2023",
    color: "#8B5CF6",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-600",
    stats: { r_score: "0.96", features: "15+", predictions: "1M+" },
    liveUrl: "#",
    codeUrl: "#",
    featured: false,
    highlight: "Statistical Excellence",
  },
  {
    id: "09",
    title: "MCS PUBLISHER",
    category: "Digital Publishing Suite",
    description:
      "Advanced digital publishing platform supporting automated content formatting, multi-channel distribution, and performance analytics. Enables publishers to manage publications efficiently, track reader engagement, and optimize content reach through centralized dashboards, scalable architecture, and streamlined workflows for modern digital publishing operations.",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    year: "2023",
    color: "#FFB347",
    gradient: "from-amber-500 via-orange-500 to-yellow-600",
    stats: { publications: "5K+", authors: "500+", reach: "1M+" },
    liveUrl: "#",
    codeUrl: "/",
    featured: true,
  },
  {
    id: "10",
    title: "Online Book Stock and Print Management",
    category: "Inventory & Publishing System",
    description:
      "A comprehensive book inventory and print management system for publishers and bookstores. Supports real-time stock tracking, automated reordering, print queue handling, barcode scanning, sales analytics, and multi-warehouse operations to improve efficiency, reduce errors, and streamline publishing and distribution workflows.",
    technologies: ["React", "Express.js", "MySQL", "Redis", "Printer API"],
    year: "2021",
    color: "#059669",
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    stats: { books: "50K+", orders: "100K+", efficiency: "85%" },
    liveUrl:
      "https://drive.google.com/file/d/1p7p3EnNZ9vj5-SfW3b1wioN7Wam_h9DT/view?usp=drivesdk",
    codeUrl: "#",
    featured: false,
    // highlight: "Inventory Optimized",
  },
  {
    id: "11",
    title: "Online Delhi Guider",
    category: "Educational Platform & University Guide",
    description:
      "Online Delhi Guider is a web-based platform designed to help tourists, newcomers, and residents explore Delhi more easily and efficiently. The project acts as a virtual travel guide, offering structured information about historical places, local attractions, transportation options, food hubs, markets, accommodations, and cultural events across the city.",
    technologies: ["React", "Node.js", "MongoDB", "Mapbox", "Chart.js"],
    year: "2019",
    color: "#4F46E5",
    gradient: "from-indigo-500 via-purple-500 to-blue-600",
    stats: { students: "10K+", colleges: "50+", accuracy: "98%" },
    liveUrl:
      "https://drive.google.com/file/d/1p9hZ2d6Pw2YLDBvvbsamEu3udeL5aTAb/view?usp=drivesdk",
    codeUrl: "#",
    featured: false,
    highlight: "Travelling Resource",
  },
  {
    id: "12",
    title: "Huawei EMUI-9 Theme Project",
    category: "UI/UX Design & Android Customization",
    description:
      "A custom Huawei EMUI-9 / EMUI-9.1 theme designed to enhance the visual experience of Huawei and Honor smartphones. The theme customizes system icons, wallpapers, fonts, lock-screen layout, quick settings panel, and core UI elements to deliver a clean, modern, and visually consistent interface while maintaining system performance and usability.",
    technologies: [
      "Photoshop",
      "Illustrator",
      "Huawei Theme Studio",
      "HWT Packaging",
    ],
    year: "2019",
    color: "#FFB347",
    gradient: "from-amber-500 via-orange-500 to-yellow-600",
    stats: {
      downloads: "5K+",
      devices_supported: "EMUI 9 / 9.1",
      rating: "4.8★",
    },
    liveUrl: "https://sharetheme.page.link/aXjqwoLnYxa2QEnbA",
    codeUrl: "#",
    featured: true,
    highlight: "Custom System Theme for EMUI",
  },
];

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-px h-px bg-white/30 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
          }}
          animate={{
            y: [null, `-${Math.random() * 100}%`],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function GlowingOrb({
  color,
  size,
  position,
}: {
  color: string;
  size: number;
  position: [number, number];
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40, transparent 70%)`,
        left: `${position[0]}%`,
        top: `${position[1]}%`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? -1 : 1, 0]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale, rotate }}
      className={`relative group perspective-1000 ${
        project.featured ? "lg:col-span-2" : "lg:col-span-1"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(45deg, ${project.color}20, transparent 50%, ${project.color}20)`,
        }}
        animate={{
          background: [
            `linear-gradient(45deg, ${project.color}20, transparent 50%, ${project.color}20)`,
            `linear-gradient(135deg, ${project.color}30, transparent 50%, ${project.color}30)`,
            `linear-gradient(45deg, ${project.color}20, transparent 50%, ${project.color}20)`,
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Card Container */}
      <motion.div
        className="relative bg-linear-to-br from-white/3 via-black/50 to-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:shadow-2xl"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: isHovered ? 2 : 0,
          rotateX: isHovered ? -1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-size-[20px_20px]" />
        </div>

        {/* Floating Particles */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{ background: project.color }}
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  scale: 0,
                }}
                animate={{
                  x: [null, `calc(${Math.random() * 100}% - 8px)`],
                  y: [null, `calc(${Math.random() * 100}% - 8px)`],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            ))}
          </div>
        )}

        {/* Glowing Corner */}
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-4 right-4 w-24 h-24 bg-linear-to-br from-white/5 to-transparent rounded-full blur-xl" />
        </div>

        {/* Project Number with Glow */}
        <div className="relative flex items-start justify-between mb-8">
          <motion.div
            className="relative"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-6xl font-mono font-bold text-white/5">
              {project.id}
            </span>
            <motion.span
              className="absolute top-0 text-6xl font-mono font-bold bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent"
              animate={{ y: isHovered ? [0, -5, 0] : 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {project.id}
            </motion.span>
          </motion.div>

          <div className="flex flex-col items-end gap-2">
            {project.highlight && (
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-white/10 to-white/5 border border-white/10 backdrop-blur-sm"
              >
                <Sparkles
                  className="w-3 h-3"
                  style={{ color: project.color }}
                />
                <span
                  className="text-xs font-medium text-white"
                  style={{ color: project.color }}
                >
                  {project.highlight}
                </span>
              </motion.span>
            )}
            <span className="text-sm font-medium text-white/40">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative space-y-6">
          {/* Title with Gradient */}
          <div>
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-3 bg-linear-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              {project.title}
            </motion.h3>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white/60">
                {project.category}
              </span>
              <div className="flex-1 h-px bg-linear-to-r from-white/20 to-transparent" />
            </div>
          </div>

          {/* Description with Icon */}
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-transparent via-white/20 to-transparent" />
            <p className="text-white/70 text-sm leading-relaxed pl-4">
              {project.description}
            </p>
          </div>

          {/* Technologies with Hover Effect */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="relative px-3 py-1.5 rounded-lg bg-linear-to-r from-white/5 to-white/2 border border-white/10 text-xs font-medium text-white/60 hover:text-white transition-all overflow-hidden group/tech"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: techIndex * 0.05 }}
              >
                <span className="relative z-10">{tech}</span>
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-white/10 to-white/5"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.span>
            ))}
          </div>

          {/* Stats with Icons */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            {Object.entries(project.stats).map(([key, value], statIndex) => (
              <motion.div
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: statIndex * 0.1 }}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: project.color }}
                  />
                  <motion.span
                    className="text-xl font-bold text-white"
                    animate={{ scale: isHovered ? 1.15 : 1 }}
                    transition={{ delay: statIndex * 0.05 }}
                  >
                    {value}
                  </motion.span>
                </div>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                  {key}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons with Glow */}
          <div className="flex gap-3 pt-6 border-t border-white/10">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/live flex-1 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-white/10 rounded-xl blur-md group-hover/live:blur-xl transition-all duration-300 opacity-0 group-hover/live:opacity-100" />
              <div className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-white/10 to-white/5 border border-white/10 group-hover/live:border-white/20 text-white font-medium transition-all">
                <ExternalLink className="w-4 h-4 group-hover/live:rotate-12 transition-transform" />
                <span>Live Preview</span>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/live:opacity-100 group-hover/live:translate-x-0 transition-all" />
              </div>
            </motion.a>

            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/code"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/10 rounded-xl blur-md group-hover/code:blur-lg transition-all duration-300 opacity-0 group-hover/code:opacity-100" />
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 group-hover/code:border-white/20 text-white transition-all">
                <Github className="w-5 h-5" />
              </div>
            </motion.a>
          </div>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 rounded-br-lg" />
      </motion.div>
    </motion.div>
  );
}

const Project = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [filter, setFilter] = useState("all");
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);

  const filteredProjects =
    filter === "featured" ? projects.filter((p) => p.featured) : projects;

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-linear-to-b from-black via-gray-900/20 to-black py-20 md:py-32 relative overflow-hidden"
    >
      {/* Advanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/10 via-transparent to-cyan-900/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-size-[50px_50px]" />

        {/* Animated Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_49px,rgba(255,255,255,0.02)_50%,transparent_50%)] bg-size-[50px_50px] animate-grid" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24px,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_49px,rgba(255,255,255,0.02)_50%,transparent_50%)] bg-size-[50px_50px] animate-grid" />
        </div>

        <ParticleBackground />

        {/* Floating Orbs */}
        <GlowingOrb color="#9D4EDD" size={400} position={[10, 20]} />
        <GlowingOrb color="#00D4FF" size={300} position={[80, 70]} />
        <GlowingOrb color="#FF6B35" size={350} position={[90, 30]} />
        <GlowingOrb color="#00FF88" size={250} position={[20, 60]} />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 via-cyan-500 to-blue-500 origin-left z-50 shadow-lg shadow-purple-500/20"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-20">
          {/* Animated Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-linear-to-r from-white/5 to-white/2 border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white/80">
                Featured Work
              </span>
              <div className="w-2 h-2 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-white">CREATIVE</span>
              <br />
              <span className="bg-linear-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                PORTFOLIO
              </span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Where{" "}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.1, rotate: -2 }}
              >
                innovation
              </motion.span>{" "}
              meets{" "}
              <motion.span
                className="text-primary inline-block"
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                execution
              </motion.span>{" "}
              — showcasing digital excellence through cutting-edge projects
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              {
                label: "Projects",
                value: "10+",
                icon: <Rocket className="w-5 h-5" />,
                color: "from-purple-500 to-pink-500",
              },
              {
                label: "Happy Clients",
                value: "50+",
                icon: <Users className="w-5 h-5" />,
                color: "from-cyan-500 to-blue-500",
              },
              {
                label: "Awards",
                value: "8+",
                icon: <Award className="w-5 h-5" />,
                color: "from-orange-500 to-red-500",
              },
              {
                label: "Years Experience",
                value: "3+",
                icon: <Clock className="w-5 h-5" />,
                color: "from-green-500 to-emerald-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-r ${stat.color} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                />
                <div className="relative p-4 rounded-2xl bg-linear-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg bg-linear-to-r ${stat.color} bg-opacity-20`}
                    >
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <TrendingUp className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Filter Buttons with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center gap-3 mb-12"
          >
            {["all", "featured", "web", "mobile"].map((filterType) => (
              <motion.button
                key={filterType}
                onClick={() => setFilter(filterType)}
                onMouseEnter={() => setHoveredFilter(filterType)}
                onMouseLeave={() => setHoveredFilter(null)}
                className="relative px-6 py-3 rounded-full text-sm font-medium transition-all overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hover Background */}
                {hoveredFilter === filterType && (
                  <motion.div
                    className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-cyan-500/20"
                    layoutId="filterBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                {/* Active State */}
                {filter === filterType ? (
                  <>
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-cyan-500 rounded-full" />
                    <span className="relative text-white font-semibold">
                      {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </span>
                  </>
                ) : (
                  <span className="relative text-white/60 group-hover:text-white transition-colors">
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </span>
                )}

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-white/20 transition-colors" />
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-32 text-center"
        >
          {/* Background Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-transparent to-cyan-500/10 blur-3xl" />

          <div className="relative max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Something{" "}
              <span className="bg-linear-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Amazing?
              </span>
            </h2>

            <p className="text-white/60 text-lg mb-8">
              Let's collaborate and turn your vision into reality with
              cutting-edge technology and innovative design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="group relative px-8 py-4 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-cyan-500" />
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative text-white font-semibold flex items-center justify-center gap-2">
                  Start a Project
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </motion.a>

              {/* <motion.a
                href="/projects"
                className="group px-8 py-4 rounded-2xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/20 text-white font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
              </motion.a> */}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-1/4 left-4 w-2 h-2 rounded-full bg-linear-to-r from-purple-400 to-cyan-400 animate-bounce" />
      <div className="fixed top-1/2 right-8 w-3 h-3 rounded-full bg-linear-to-r from-pink-400 to-rose-400 animate-pulse delay-300" />
      <div className="fixed bottom-1/3 left-10 w-2 h-2 rounded-full bg-linear-to-r from-blue-400 to-cyan-400 animate-bounce delay-500" />

      {/* Animated Text Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[20vw] font-black text-center">
            <span className="bg-linear-to-r from-transparent via-white/10 to-transparent bg-clip-text text-transparent">
              PROJECTS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add CSS for animations
const styles = `
@keyframes grid {
  from { transform: translateY(0) translateX(0); }
  to { transform: translateY(50px) translateX(50px); }
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-grid {
  animation: grid 20s linear infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.perspective-1000 {
  perspective: 1000px;
}
`;

export default function ProjectsPage() {
  useEffect(() => {
    // Inject styles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return <Project />;
}
