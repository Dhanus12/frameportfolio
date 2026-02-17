'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Briefcase, Code, GraduationCap, Server, User } from 'lucide-react';

const skills = [
    'Java', 'Spring Boot', 'Hibernate', 'React.js', 'MySQL', 'RESTful APIs',
    'Git', 'Postman', 'IntelliJ IDEA', 'VS Code'
];

export default function SkillsOverlay() {
    return (
        <section className="relative z-10 min-h-screen py-20 px-6 md:px-20 text-white overflow-hidden">
            <div className="max-w-6xl mx-auto space-y-24">

                {/* Intro / Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <User className="w-8 h-8 text-blue-400" />
                        <h2 className="text-3xl font-bold">About Me</h2>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                        A passionate Software Developer (Fresher) with hands-on experience in Java, Spring Boot, React.js, and MySQL.
                        Proficient in building full-stack applications emphasizing clean design, security, and performance.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Code className="w-8 h-8 text-green-400" />
                            <h3 className="text-2xl font-bold">Technical Skills</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-colors cursor-default"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <GraduationCap className="w-8 h-8 text-yellow-400" />
                            <h3 className="text-2xl font-bold">Education</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-lg">B.E. ECE</h4>
                                <p className="text-gray-400">P.S.V. College (2021-2025)</p>
                                <p className="text-sm text-gray-500">GPA: 7.8</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">HSC / SSLC</h4>
                                <p className="text-gray-400">Syed Ammal Hr. Sec. School</p>
                                <p className="text-sm text-gray-500">HSC: 75% | SSLC: 65%</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Experience */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <Briefcase className="w-8 h-8 text-purple-400" />
                        <h2 className="text-3xl font-bold">Experience</h2>
                    </div>

                    <div className="border-l-2 border-white/10 pl-8 relative">
                        <span className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                        <div className="mb-2">
                            <h3 className="text-xl font-bold">Bright Greeks Software Solutions</h3>
                            <p className="text-purple-300 font-medium">Intern | Mar 2023 – Jun 2023</p>
                        </div>
                        <p className="text-gray-300 leading-relaxed">
                            Built login systems, Spring Boot APIs, and MySQL integration.
                            Improved bug resolution by 20% through efficient debugging and code optimization.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
