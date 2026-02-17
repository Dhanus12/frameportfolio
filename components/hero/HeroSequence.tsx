'use client';

import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Number of frames - matched to updated asset set (240 frames)
    const frameCount = 240;

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const imagePromises = [];

            for (let i = 1; i <= frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Matched to actual filenames: ezgif-frame-001.jpg
                    const formattedIndex = i.toString().padStart(3, '0');
                    img.src = `/assets/hero-sequence/ezgif-frame-${formattedIndex}.jpg`;
                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        resolve();
                    };
                    img.onerror = () => {
                        console.warn(`Failed to load image ${i}`);
                        resolve();
                    };
                });
                imagePromises.push(promise);
            }

            await Promise.all(imagePromises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas || !isLoaded || images.length === 0) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const idx = Math.round(currentIndex.get());
            const img = images[idx];

            if (img) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                // Calculate aspect ratio to cover
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);

                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(
                    img,
                    0,
                    0,
                    img.width,
                    img.height,
                    centerShift_x,
                    centerShift_y,
                    img.width * ratio,
                    img.height * ratio
                );
            }

            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [isLoaded, currentIndex, images]);

    // Opacity for the name overlay
    // Appears after some scrolling (e.g., 60-80% of sequence)
    // Smooth out the scroll progress for text animations
    const smoothProgress = useSpring(scrollYProgress, { damping: 15, stiffness: 100 });

    // Initial "Hi There" animation
    // We combine scroll transforms with initial entry animation
    const hiOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
    const hiScale = useTransform(smoothProgress, [0, 0.15], [1, 1.5]);
    const hiBlur = useTransform(smoothProgress, [0, 0.15], ["blur(0px)", "blur(20px)"]);

    // "Looking for a Full Stack Career" animation
    // Entering: 0.15 -> 0.25 | Exiting: 0.35 -> 0.45
    const careerOpacity = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const careerScale = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0.8, 1, 1, 1.2]);
    const careerY = useTransform(smoothProgress, [0.15, 0.45], [100, -100]);

    // Main Title Animation (Original DHANUS MANI)
    const nameOpacity = useTransform(smoothProgress, [0.6, 0.8, 0.9, 1], [0, 1, 1, 0]);
    const nameY = useTransform(smoothProgress, [0.6, 0.8], [100, 0]);

    return (
        <div ref={containerRef} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

                {/* "Hi There" Text */}
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ opacity: hiOpacity, scale: hiScale, filter: hiBlur }}
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                >
                    <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-2xl text-center px-4">
                        Hi There
                    </h2>
                </motion.div>

                {/* "Looking for a Full Stack Career" Text */}
                <motion.div
                    style={{ opacity: careerOpacity, y: careerY, scale: careerScale }}
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl text-center px-4 leading-tight">
                        Looking for a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            Full Stack Career
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    style={{ opacity: nameOpacity, y: nameY }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
                >
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference">
                        DHANUS MANI
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl font-light text-white/80">
                        Full Stack Java Developer
                    </p>
                </motion.div>

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black text-white">
                        Loading Sequence...
                    </div>
                )}
            </div>
        </div>
    );
}
