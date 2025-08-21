import React, { useState, useEffect } from 'react';
import { IconCheck, IconX, IconExclamationMark, IconInfoCircle } from '@tabler/icons-react';
import type { ToastProps } from '../../types/Toast';

const Toast: React.FC<ToastProps> = ({
    id,
    type,
    title,
    message,
    duration = 5000,
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300); // Wait for fade out animation
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-green-50 border-green-200',
                    icon: 'text-green-600',
                    iconBg: 'bg-green-100',
                    title: 'text-green-800',
                    message: 'text-green-600'
                };
            case 'error':
                return {
                    bg: 'bg-red-50 border-red-200',
                    icon: 'text-red-600',
                    iconBg: 'bg-red-100',
                    title: 'text-red-800',
                    message: 'text-red-600'
                };
            case 'warning':
                return {
                    bg: 'bg-yellow-50 border-yellow-200',
                    icon: 'text-yellow-600',
                    iconBg: 'bg-yellow-100',
                    title: 'text-yellow-800',
                    message: 'text-yellow-600'
                };
            case 'info':
                return {
                    bg: 'bg-blue-50 border-blue-200',
                    icon: 'text-blue-600',
                    iconBg: 'bg-blue-100',
                    title: 'text-blue-800',
                    message: 'text-blue-600'
                };
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <IconCheck size={20} />;
            case 'error':
                return <IconX size={20} />;
            case 'warning':
                return <IconExclamationMark size={20} />;
            case 'info':
                return <IconInfoCircle size={20} />;
        }
    };

    const styles = getToastStyles();

    return (
        <div
            className={`
                max-w-sm w-full ${styles.bg} border rounded-lg shadow-lg p-4
                transform transition-all duration-300 ease-in-out
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
        >
            <div className="flex items-start">
                <div className={`flex-shrink-0 p-1 rounded-full ${styles.iconBg}`}>
                    <div className={styles.icon}>
                        {getIcon()}
                    </div>
                </div>
                <div className="ml-3 flex-1">
                    <h3 className={`text-sm font-medium ${styles.title}`}>
                        {title}
                    </h3>
                    {message && (
                        <p className={`mt-1 text-sm ${styles.message}`}>
                            {message}
                        </p>
                    )}
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(() => onClose(id), 300);
                    }}
                    className={`ml-3 flex-shrink-0 ${styles.icon} hover:opacity-70`}
                >
                    <IconX size={16} />
                </button>
            </div>
        </div>
    );
};

export default Toast; 