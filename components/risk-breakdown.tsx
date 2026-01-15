"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ClauseType, SeverityLevel } from "@/lib/schema";
import { getSeverityColor, formatClauseType } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryRisk {
    category: ClauseType;
    severity: SeverityLevel;
    count: number;
    maxSeverity: number;
}

interface RiskBreakdownProps {
    categories: CategoryRisk[];
    isLoading?: boolean;
}

const severityToNumber = (severity: SeverityLevel): number => {
    switch (severity) {
        case "LOW":
            return 25;
        case "MEDIUM":
            return 50;
        case "HIGH":
            return 75;
        case "CRITICAL":
            return 100;
    }
};

export function RiskBreakdown({ categories, isLoading }: RiskBreakdownProps) {
    if (isLoading) {
        return (
            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle className="text-xl">Risk Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="animate-pulse space-y-2">
                            <div className="h-4 w-32 bg-muted rounded" />
                            <div className="h-2 w-full bg-muted rounded" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    if (categories.length === 0) {
        return (
            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle className="text-xl">Risk Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                        No risks detected
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="glass border-white/10">
            <CardHeader>
                <CardTitle className="text-xl">Risk Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                {categories.map((cat, index) => {
                    const value = severityToNumber(cat.severity);
                    return (
                        <motion.div
                            key={cat.category}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-2"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        {formatClauseType(cat.category)}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        ({cat.count} clause{cat.count !== 1 ? "s" : ""})
                                    </span>
                                </div>
                                <span
                                    className={`text-sm px-2 py-1 rounded-md border ${getSeverityColor(
                                        cat.severity
                                    )}`}
                                >
                                    {cat.severity}
                                </span>
                            </div>
                            <div className="relative">
                                <Progress value={value} className="h-2" />
                                <motion.div
                                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-transparent"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${value}%` }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    style={{
                                        background:
                                            value >= 75
                                                ? "linear-gradient(to right, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.6))"
                                                : value >= 50
                                                    ? "linear-gradient(to right, rgba(249, 115, 22, 0.3), rgba(249, 115, 22, 0.6))"
                                                    : value >= 25
                                                        ? "linear-gradient(to right, rgba(234, 179, 8, 0.3), rgba(234, 179, 8, 0.6))"
                                                        : "linear-gradient(to right, rgba(34, 197, 94, 0.3), rgba(34, 197, 94, 0.6))",
                                    }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
