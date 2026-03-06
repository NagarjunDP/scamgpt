"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RiskMeterProps {
    score: number; // 0 to 1
    className?: string;
}

export default function RiskMeter({ score, className }: RiskMeterProps) {
    const percentage = Math.min(Math.max(score * 100, 0), 100);

    let color = "bg-emerald-500";
    let label = "Low Risk";

    if (percentage > 70) {
        color = "bg-red-500";
        label = "Critical Risk";
    } else if (percentage > 30) {
        color = "bg-amber-500";
        label = "Medium Risk";
    }

    return (
        <div className={cn("w-full space-y-3", className)}>
            <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-gray-400">Fraud Risk Score</span>
                <span className={cn("text-lg font-bold", color.replace('bg-', 'text-'))}>{percentage.toFixed(0)}%</span>
            </div>

            <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden border border-gray-700 p-[2px]">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full rounded-full shadow-lg", color)}
                />
            </div>

            <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                <span>Safe</span>
                <span>{label}</span>
                <span>Dangerous</span>
            </div>
        </div>
    );
}
