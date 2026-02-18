
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function GlobalBackground() {
    const { scrollYProgress } = useScroll();

    // Fade in the video background after the hero and skills section
    // Adjusting the range to match the scroll progression
    const opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.95, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            style={{ opacity }}
            className="fixed inset-0 z-0 pointer-events-none"
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60"
            >
                <source src="/globe-loop.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </motion.div>
    );
}
