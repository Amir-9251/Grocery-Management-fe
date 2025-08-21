import { useState, useEffect } from 'react';

interface UseCounterProps {
    end: number;
    duration?: number;
    start?: number;
}

export const useCounter = ({ end, duration = 2000, start = 0 }: UseCounterProps) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Smooth easing function (easeOutCubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(start + (end - start) * easeOutCubic);

            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        // Reset to start value first
        setCount(start);

        // Small delay to ensure smooth start
        setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, 100);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration, start]);

    return count;
}; 