'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface NotificationInfo {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'success' | 'alert' | 'info';
    read: boolean;
}

interface NotificationContextType {
    notifications: NotificationInfo[];
    addNotification: (notification: Omit<NotificationInfo, 'id' | 'read' | 'time'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
    unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<NotificationInfo[]>([
        {
            id: 'init-1',
            title: 'ScamGPT Active',
            message: 'Global threat monitoring is online.',
            time: new Date().toISOString(),
            type: 'info',
            read: false
        }
    ]);

    const addNotification = (notif: Omit<NotificationInfo, 'id' | 'read' | 'time'>) => {
        const newNotif: NotificationInfo = {
            ...notif,
            id: Math.random().toString(36).substr(2, 9),
            time: new Date().toISOString(),
            read: false,
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, markAllAsRead, unreadCount }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
