'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
}

export function Badge({
    children,
    className,
    variant = 'neutral',
    ...props
}: BadgeProps) {
    const variants = {
        primary: 'bg-[var(--primary)]/10 border-[var(--primary)]/20 text-[var(--primary)]',
        success: 'bg-[var(--success)]/10 border-[var(--success)]/20 text-[var(--success)]',
        warning: 'bg-[var(--warning)]/10 border-[var(--warning)]/20 text-[var(--warning)]',
        danger: 'bg-[var(--danger)]/10 border-[var(--danger)]/20 text-[var(--danger)]',
        neutral: 'bg-white/5 border-white/10 text-zinc-400',
    };

    return (
        <span
            className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
