import React from 'react';

interface CardProps {
    children: React.ReactNode;
    title: string;
    totalPrice: number;
    variant?: 'primary' | 'success' | 'warning' | 'info';
    subtitle?: string;
}

const Card = ({ children, title, totalPrice, variant = 'primary', subtitle }: CardProps) => {
    const getVariantStyles = () => {
        switch (variant) {
            case 'success':
                return {
                    card: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl',
                    icon: 'bg-emerald-500 text-white',
                    title: 'text-gray-600',
                    number: 'text-gray-900',
                    subtitle: 'text-emerald-600',
                    trend: 'text-emerald-600',
                    iconColor: '#ffffff',
                    borderAccent: 'border-l-4 border-l-emerald-500'
                };
            case 'warning':
                return {
                    card: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl',
                    icon: 'bg-amber-500 text-white',
                    title: 'text-gray-600',
                    number: 'text-gray-900',
                    subtitle: 'text-amber-600',
                    trend: 'text-amber-600',
                    iconColor: '#ffffff',
                    borderAccent: 'border-l-4 border-l-amber-500'
                };
            case 'info':
                return {
                    card: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl',
                    icon: 'bg-blue-500 text-white',
                    title: 'text-gray-600',
                    number: 'text-gray-900',
                    subtitle: 'text-blue-600',
                    trend: 'text-blue-600',
                    iconColor: '#ffffff',
                    borderAccent: 'border-l-4 border-l-blue-500'
                };
            default:
                return {
                    card: 'bg-white border border-gray-200 shadow-lg hover:shadow-xl',
                    icon: 'bg-slate-500 text-white',
                    title: 'text-gray-600',
                    number: 'text-gray-900',
                    subtitle: 'text-slate-600',
                    trend: 'text-slate-600',
                    iconColor: '#ffffff',
                    borderAccent: 'border-l-4 border-l-slate-500'
                };
        }
    };

    const styles = getVariantStyles();

    // Clone children and apply variant color
    const iconWithColor = React.isValidElement(children)
        ? React.cloneElement(children, { color: styles.iconColor } as React.HTMLAttributes<HTMLElement>)
        : children;

    return (
        <div className={`group ${styles.card} ${styles.borderAccent} w-80 rounded-xl transition-all duration-300 hover:-translate-y-1 h-36 px-6 py-5 mb-4 relative overflow-hidden`}>
            <div className="flex items-start justify-between h-full">
                {/* Left side - Content */}
                <div className="flex flex-col justify-between h-full flex-1">
                    <div>
                        <h3 className={`${styles.title} text-sm font-semibold uppercase tracking-wide mb-2`}>{title}</h3>
                        <p className={`${styles.number} text-3xl font-bold tracking-tight`}>{totalPrice.toLocaleString()}</p>
                    </div>

                    {/* Subtitle or trend indicator */}
                    <div className="flex items-center space-x-3">
                        {subtitle && (
                            <span className={`${styles.subtitle} text-xs font-medium bg-gray-100 px-3 py-1 rounded-full`}>{subtitle}</span>
                        )}
                        <div className={`${styles.trend} text-xs font-semibold flex items-center bg-gray-100 px-3 py-1 rounded-full`}>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                            </svg>
                            +12.5%
                        </div>
                    </div>
                </div>

                {/* Right side - Icon */}
                <div className={`flex items-center justify-center w-14 h-14 ${styles.icon} rounded-xl shadow-md transition-all duration-300 group-hover:scale-110`}>
                    <div className="text-current">
                        {iconWithColor}
                    </div>
                </div>
            </div>

            {/* Subtle corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-transparent to-gray-100/30 rounded-bl-xl"></div>
        </div>
    )
}

export default Card