import { createContext, useContext } from 'react';
import type { ToastType } from '../types/Toast';

export interface ToastContextType {
    showToast: (type: ToastType, title: string, message?: string, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}; 