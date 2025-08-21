import React, { useState, useCallback } from 'react';
import Toast from './Toast';
import type { ToastProps } from '../../types/Toast';
import { ToastContext } from '../../hooks/useToast';
import type { ToastContextType } from '../../hooks/useToast';

interface ToastProviderProps {
    children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);

    const showToast = useCallback<ToastContextType['showToast']>((
        type,
        title,
        message,
        duration
    ) => {
        const id = Date.now().toString();
        const newToast = { id, type, title, message, duration };

        setToasts(prev => [...prev, newToast]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={removeToast}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastProvider; 