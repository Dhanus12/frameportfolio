
'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion, useSpring, AnimatePresence } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import { heroCopy } from './hero-copy';

// Generate image paths
const frameCount = 120;
const imagePaths = Array.from({ length: frameCount }, (_, i) =>
    `/sequence-1/ezgif-frame-${(i + 1).toString().padStart(3, '0')}.jpg`
);

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { images, loaded } = useImagePreloader(imagePaths);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Liquid smooth spring physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,    // Balanced for a smooth, liquid response
        damping: 40,      // Sufficient damping for a weighted feel
        restDelta: 0.001
    });

    const [currentFrame, setCurrentFrame] = useState(0);

    // Update canvas on scroll
    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (latest) => {
            const frameIndex = Math.floor(latest * (frameCount - 1));
            setCurrentFrame(Math.max(0, Math.min(frameIndex, frameCount - 1)));
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    // Draw current frame to canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !loaded || !images[currentFrame]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[currentFrame];

        // Set canvas dimensions to window size for high quality
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calculate aspect ratio to maintain cover style
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    }, [currentFrame, loaded, images]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            // Trigger a redraw
            setCurrentFrame(prev => prev);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className="h-[800vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />

                {/* Overlay Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={Math.floor((currentFrame / frameCount) * heroCopy.length)}
                            className="text-white text-4xl md:text-7xl font-bold text-center mix-blend-difference"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="block drop-shadow-lg">
                                {heroCopy[Math.min(Math.floor((currentFrame / frameCount) * heroCopy.length), heroCopy.length - 1)]}
                            </span>
                        </motion.h1>
                    </AnimatePresence>
                </div>

                {/* Loading Indicator */}
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black z-50 text-white">
                        Loading Experience...
                    </div>
                )}
            </div>
        </div>
    );
}
