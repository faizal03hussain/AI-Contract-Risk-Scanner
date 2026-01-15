"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getRiskScoreColor, getRiskGradient } from "@/lib/utils";
import { motion } from "framer-motion";

interface RiskScoreCardProps {
    score: number;
    isLoading?: boolean;
}

export function RiskScoreCard({ score, isLoading }: RiskScoreCardProps) {
    if (isLoading) {
        return (
            <Card className="glass border-white/10">
                <CardContent className="p-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-32 w-32 mx-auto rounded-full bg-muted" />
                        <div className="h-4 w-24 mx-auto bg-muted rounded" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    const riskLevel =
        score >= 75
            ? "Critical Risk"
            : score >= 50
                ? "High Risk"
                : score >= 25
                    ? "Medium Risk"
                    : "Low Risk";

    return (
        <Card className="glass border-white/10 overflow-hidden">
            <CardContent className="p-8">
                <div className="flex flex-col items-center gap-6">
                    {/* Animated Score Circle */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="relative"
                    >
                        <svg className="w-40 h-40 transform -rotate-90">
                            {/* Background circle */}
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="none"
                                className="text-muted opacity-20"
                            />
                            {/* Animated progress circle */}
                            <motion.circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="url(#riskGradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 70}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                                animate={{
                                    strokeDashoffset: 2 * Math.PI * 70 * (1 - score / 100),
                                }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop
                                        offset="0%"
                                        className={`text-${getRiskScoreColor(score).split("-")[1]}-500`}
                                        style={{
                                            stopColor: score >= 75 ? "#ef4444" : score >= 50 ? "#f97316" : score >= 25 ? "#eab308" : "#22c55e",
                                        }}
                                    />
                                    <stop
                                        offset="100%"
                                        className={`text-${getRiskScoreColor(score).split("-")[1]}-700`}
                                        style={{
                                            stopColor: score >= 75 ? "#dc2626" : score >= 50 ? "#ea580c" : score >= 25 ? "#ca8a04" : "#16a34a",
                                        }}
                                    />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Score Number */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className={`text-5xl font-bold ${getRiskScoreColor(score)}`}
                            >
                                {score}
                            </motion.div>
                            <div className="text-sm text-muted-foreground">out of 100</div>
                        </div>
                    </motion.div>

                    {/* Risk Level Label */}
                    <div className="text-center">
                        <div className={`text-2xl font-semibold ${getRiskScoreColor(score)}`}>
                            {riskLevel}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            {score >= 75
                                ? "Immediate legal review recommended"
                                : score >= 50
                                    ? "Significant risks detected - negotiate carefully"
                                    : score >= 25
                                        ? "Some concerns - review recommended clauses"
                                        : "Looks relatively safe - still consult legal if needed"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
