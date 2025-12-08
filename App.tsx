import React, { useState, useEffect } from "react";
import { Section, Project } from "./types";
import ThreeScene from "./components/ThreeScene";
import ChatInterface from "./components/ChatInterface";
import ProjectCard from "./components/ProjectCard";

// Icons
const IconGithub = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);
const IconLinkedin = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.HOME);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "AI Chatbot Orchestrator",
      description:
        "A centralized system for managing multiple conversational agents using Gemini API and WebSocket streams.",
      tags: ["React", "Gemini API", "WebSockets"],
      imageUrl: "https://picsum.photos/600/400?random=1",
    },
    {
      id: 2,
      title: "3D E-Commerce Visualizer",
      description:
        "Interactive 3D product configurator using Three.js allowing users to customize laptop specs visually.",
      tags: ["Three.js", "WebGL", "React Fiber"],
      imageUrl: "https://picsum.photos/600/400?random=2",
    },
    {
      id: 3,
      title: "FinTech Dashboard",
      description:
        "High-performance real-time data visualization dashboard for crypto assets.",
      tags: ["D3.js", "TypeScript", "Tailwind"],
      imageUrl: "https://picsum.photos/600/400?random=3",
    },
  ];

  return (
    <div className="min-h-screen font-sans text-gray-300 selection:bg-neon-blue selection:text-black">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-gray-800 py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold font-mono text-white tracking-tighter">
            &lt;Michael /&gt;
          </div>
          <div className="hidden md:flex gap-8">
            {Object.values(Section).map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={() => setActiveSection(sec)}
                className={`uppercase text-sm tracking-widest font-bold hover:text-neon-blue transition-colors ${
                  activeSection === sec ? "text-neon-blue" : "text-gray-400"
                }`}
              >
                {sec.replace("-", " ")}
              </a>
            ))}
          </div>
          <button className="border border-neon-blue text-neon-blue px-4 py-1 rounded text-sm hover:bg-neon-blue hover:text-black transition-all font-bold uppercase">
            Resume
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id={Section.HOME}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background 3D Scene */}
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center pointer-events-none">
          <div className="pointer-events-auto">
            <div className="inline-block px-3 py-1 mb-4 border border-neon-purple rounded-full bg-neon-purple/10 text-neon-purple text-xs font-mono font-bold">
              SYSTEM ONLINE
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Emmanuel <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                "Michael"
              </span>{" "}
              Taiwo
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-lg">
              Website Developer & Chatbot System Architect. Bridging the gap
              between 3D visuals and Artificial Intelligence.
            </p>
            <div className="flex gap-4">
              <a
                href="#projects"
                className="bg-neon-blue text-black px-8 py-3 rounded font-bold hover:bg-white transition-colors"
              >
                View Work
              </a>
              <a
                href="#ai-chat"
                className="border border-gray-600 bg-black/50 backdrop-blur text-white px-8 py-3 rounded font-bold hover:border-neon-purple hover:text-neon-purple transition-colors"
              >
                Talk to AI
              </a>
            </div>
          </div>
          {/* Right side is left empty for the 3D visual balance */}
          <div className="hidden md:block"></div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id={Section.ABOUT} className="py-24 bg-tech-dark relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <img
                src="https://picsum.photos/800/800?grayscale"
                alt="Emmanuel"
                className="rounded-2xl border-2 border-gray-800 shadow-2xl shadow-neon-blue/20"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-white">
                <span className="text-neon-blue">01.</span> About Me
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                I am Emmanuel Oluwasegun Taiwo, professionally known as Michael.
                I specialize in crafting high-performance digital experiences.
                My passion lies at the intersection of creative design and
                robust engineering.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                With extensive experience in designing chatbot systems and
                integrating complex 3D assets using Three.js, I build websites
                that are not just functional, but immersive. I turn static pages
                into dynamic worlds.
              </p>

              <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm text-neon-purple">
                <li>▹ JavaScript (ES6+)</li>
                <li>▹ TypeScript</li>
                <li>▹ React 18</li>
                <li>▹ Three.js / R3F</li>
                <li>▹ Gemini AI API</li>
                <li>▹ Tailwind CSS</li>
                <li>▹ Node.js</li>
                <li>▹ Python</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id={Section.PROJECTS} className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-white text-center">
            <span className="text-neon-blue">02.</span> Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-500">
              And many more experiments in the lab...
            </p>
          </div>
        </div>
      </section>

      {/* AI Chat Section */}
      <section
        id={Section.CHAT}
        className="py-24 bg-tech-dark border-t border-gray-900 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              <span className="text-neon-blue">03.</span> Interactive AI Hub
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              This chatbot is powered by Google's Gemini API. It has been
              trained on my professional profile. Go ahead, ask it about my
              skills or what kind of coffee I like while coding.
            </p>
          </div>

          <ChatInterface />
        </div>
      </section>

      {/* Contact Section */}
      <section id={Section.CONTACT} className="py-24 bg-black text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-4xl font-bold mb-8 text-white">
            <span className="text-neon-blue">04.</span> Get In Touch
          </h2>
          <p className="text-gray-400 mb-12">
            Whether you have a question about 3D web implementation, want to
            build a custom chatbot system, or just want to say hi, my inbox is
            always open.
          </p>

          <a
            href="mailto:michael.dev@example.com"
            className="inline-block border border-neon-blue text-neon-blue px-10 py-4 rounded font-bold hover:bg-neon-blue/10 transition-all mb-12"
          >
            Say Hello
          </a>

          <div className="flex justify-center gap-8 text-gray-500">
            <a href="#" className="hover:text-neon-blue transition-colors">
              <IconGithub />
            </a>
            <a href="#" className="hover:text-neon-blue transition-colors">
              <IconLinkedin />
            </a>
          </div>

          <footer className="mt-20 text-sm text-gray-700 font-mono">
            <p>Designed & Built by Emmanuel 'Michael' Taiwo</p>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default App;
