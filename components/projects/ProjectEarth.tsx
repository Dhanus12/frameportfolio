'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Server } from 'lucide-react';

const projects = [
    {
        title: 'Retail Billing (POS) System',
        tech: 'Java, Spring Boot, React.js',
        desc: 'Reduced manual effort by 40%. Full-stack solution for retail management.',
        link: 'https://symphonious-seahorse-1e94dc.netlify.app/'
    },
    {
        title: 'Result Management System',
        tech: 'Spring Boot, Thymeleaf, MySQL',
        desc: 'Role-based access security for managing academic results safely.',
        link: 'https://result-app-latest.onrender.com/'
    },
    {
        title: 'Gemini AI Chatbot',
        tech: 'Spring Boot + React + Google Gemini API',
        desc: 'Intelligent chatbot integration using Google\'s Gemini API.',
        link: 'https://snazzy-rabanadas-6dac57.netlify.app/'
    },
    {
        title: 'Portfolio v1',
        tech: 'React, Framer Motion',
        desc: 'Previous iteration of my personal portfolio showcasing early frontend skills.',
        link: 'https://portfolio-dhanus.netlify.app'
    },
    {
        title: 'Portfolio v2',
        tech: 'React, Gsap',
        desc: 'Another iteration of my portfolio implementing different design concepts.',
        link: 'https://portfoliodhanus1.netlify.app'
    }
];

export default function ProjectEarth() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={containerRef} className="relative min-h-screen py-20 px-6">



            {/* Scrolling Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-32 -mt-[100vh] pt-[120vh]">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-5xl md:text-7xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
                >
                    Selected Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className="group backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                        >
                            <div className="mb-6">
                                <Server className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-cyan-200 text-sm font-mono mb-4">{project.tech}</p>
                                <p className="text-gray-300 mb-6 line-clamp-3">{project.desc}</p>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                {project.link !== '#' && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium hover:text-cyan-400 transition-colors"
                                    >
                                        Live Demo <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                                <a
                                    href="https://github.com/Dhanus12"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors ml-auto"
                                >
                                    <Github className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer in Projects Section for smooth flow */}
                <footer className="text-center py-20 mt-20 border-t border-white/10">
                    <h3 className="text-3xl font-bold mb-4">Let's Build Something Amazing.</h3>
                    <p className="text-gray-400 mb-8">dhanusmani43@gmail.com</p>
                    <div className="flex justify-center gap-6">
                        <a href="https://github.com/Dhanus12" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
                    </div>
                    <p className="text-xs text-gray-600 mt-12">© {new Date().getFullYear()} Dhanus Mani. All rights reserved.</p>
                </footer>

            </div>
        </section>
    );
}
