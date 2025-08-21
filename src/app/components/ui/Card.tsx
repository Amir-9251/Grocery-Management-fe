import React from 'react';
import { useCounter } from '../../hooks/useCounter';

interface CardProps {
    children: React.ReactNode;
    title: string;
    totalPrice: number;
    variant?: 'primary' | 'success' | 'warning' | 'info';
    subtitle?: string;
    priceUnit?: string;
}

const Card = ({ children, title, totalPrice, variant = 'primary', subtitle, priceUnit }: CardProps) => {
    // Animated counter for the number
    const animatedValue = useCounter({
        end: totalPrice,
        duration: 2500,
        start: 0
    });

    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return {
                    card: 'bg-white border border-gray-100 shadow-sm hover:shadow-md',
                    title: 'text-gray-600',
                    number: 'text-gray-900',
                    subtitle: 'text-green-600 bg-green-50 border-green-100',
                };
            case 'warning':
                return {
                    card: 'bg-white border border-gray-100 shadow-sm hover:shadow-md',
                    title: 'text-gray-600',
                    number: 'text-gray-900',
                    subtitle: 'text-amber-600 bg-amber-50 border-amber-100',
                };
            case 'info':
                return {
                    card: 'bg-white border border-gray-100 shadow-sm hover:shadow-md',
                    title: 'text-gray-600',
                    number: 'text-gray-900',
                    subtitle: 'text-blue-600 bg-blue-50 border-blue-100',
                };
            default:
                return {
                    card: 'bg-white border border-gray-100 shadow-sm hover:shadow-md',
                    title: 'text-gray-600',
                    number: 'text-gray-900',
                    subtitle: 'text-gray-600 bg-gray-50 border-gray-100',
                };
        }
    };

    const styles = getVariantStyles();

    return (
        <div className={`group ${styles.card} w-full rounded-2xl transition-all duration-300 hover:-translate-y-1 p-6 relative overflow-hidden`}>
            <div className="flex items-start justify-between">
                {/* Left side - Content */}
                <div className="flex flex-col space-y-4 flex-1">
                    <div className="space-y-2">
                        <h3 className={`${styles.title} text-sm font-medium uppercase tracking-wide`}>{title}</h3>
                        <div className="relative">
                            <p className={`${styles.number} text-3xl font-bold tracking-tight transition-all duration-150`}>
                                {animatedValue.toLocaleString()}
                            </p>
                            {priceUnit && (
                                <span className="absolute bottom-0 right-[215px] text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transform translate-x-1/2">
                                    {priceUnit}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Subtitle */}
                    {subtitle && (
                        <div className="flex items-center">
                            <span className={`${styles.subtitle} text-xs font-medium px-3 py-1.5 rounded-full border`}>
                                {subtitle}
                            </span>
                        </div>
                    )}
                </div>

                {/* Right side - Icon */}
                <div className="flex-shrink-0 ml-4">
                    {children}
                </div>
            </div>



            {/* Subtle background pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-gray-50/50 to-transparent rounded-2xl"></div>
        </div>
    )
}

export default Card