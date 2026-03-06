'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps) {
    return (
        <div
            className={cn("bg-[var(--card)] border border-[var(--border)] rounded-lg overflow-hidden", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className, ...props }: CardProps) {
    return (
        <div className={cn("px-5 py-4 border-b border-[var(--border)]", className)} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ children, className, ...props }: CardProps) {
    return (
        <div className={cn("px-5 py-4", className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ children, className, ...props }: CardProps) {
    return (
        <div className={cn("px-5 py-3 bg-white/[0.02] border-t border-[var(--border)]", className)} {...props}>
            {children}
        </div>
    );
}
