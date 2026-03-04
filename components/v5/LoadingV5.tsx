"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingV5() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Automatically hide the loading screen after a delay
        // 2200ms gives enough time for the intro animation to play, stay visible, and then exit
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-100%" }}
                    transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} // Cinematic sweeping exit
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111] overflow-hidden"
                >
                    <motion.img
                        src="/logos/logo.svg"
                        alt="Don Diego Logo"
                        initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{
                            duration: 1.4,
                            ease: "easeOut",
                            delay: 0.2,
                        }}
                        className="w-full max-w-[280px] md:max-w-[400px] px-8"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
