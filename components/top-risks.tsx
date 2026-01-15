"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TopRisk } from "@/lib/schema";
import { getSeverityColor } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface TopRisksProps {
    topRisks: TopRisk[];
    recommendedActions: string[];
    onViewPage?: (page: number) => void;
    isLoading?: boolean;
}

export function TopRisks({
    topRisks,
    recommendedActions,
    onViewPage,
    isLoading,
}: TopRisksProps) {
    if (isLoading) {
        return (
            <Card className="glass border-white/10">
                <CardContent className="p-6">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse h-16 bg-muted rounded-lg" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {/* Top Risks */}
            <Card className="glass border-white/10">
                <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <h3 className="text-lg font-semibold">Top {topRisks.length} Risks</h3>
                    </div>

                    {topRisks.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                            No major risks identified
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {topRisks.map((risk, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`p-4 rounded-lg border ${getSeverityColor(
                                        risk.severity
                                    )} cursor-pointer hover:scale-[1.02] transition-transform`}
                                    onClick={() => onViewPage?.(risk.page)}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-semibold text-sm">
                                                    #{index + 1}
                                                </span>
                                                <h4 className="font-semibold">{risk.title}</h4>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {risk.reason}
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                                Page {risk.page}
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded border ${getSeverityColor(
                                                risk.severity
                                            )}`}
                                        >
                                            {risk.severity}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recommended Actions */}
            {recommendedActions.length > 0 && (
                <Card className="glass border-white/10">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">What You Should Do</h3>
                        <ul className="space-y-3">
                            {recommendedActions.map((action, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs font-semibold text-primary">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground flex-1">
                                        {action}
                                    </p>
                                </motion.li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
