"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clause } from "@/lib/schema";
import { getSeverityColor, formatConfidence, formatClauseType } from "@/lib/utils";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RisksTableProps {
    clauses: Clause[];
    onViewInPdf: (page: number) => void;
    isLoading?: boolean;
}

export function RisksTable({
    clauses,
    onViewInPdf,
    isLoading,
}: RisksTableProps) {
    const [sortField, setSortField] = useState<"severity" | "confidence">(
        "severity"
    );
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (isLoading) {
        return (
            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle className="text-xl">Detected Risks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse h-20 bg-muted rounded-lg" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (clauses.length === 0) {
        return (
            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle className="text-xl">Detected Risks</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                        No risky clauses detected
                    </p>
                </CardContent>
            </Card>
        );
    }

    const sortedClauses = [...clauses].sort((a, b) => {
        if (sortField === "severity") {
            const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
        }
        return b.confidence - a.confidence;
    });

    return (
        <Card className="glass border-white/10">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Detected Risks</CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant={sortField === "severity" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSortField("severity")}
                        >
                            Sort by Severity
                        </Button>
                        <Button
                            variant={sortField === "confidence" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSortField("confidence")}
                        >
                            Sort by Confidence
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {sortedClauses.map((clause, index) => {
                    const clauseId = `${clause.clause_type}-${index}`;
                    const isExpanded = expandedId === clauseId;

                    return (
                        <motion.div
                            key={clauseId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border border-white/10 rounded-lg overflow-hidden hover:border-primary/30 transition-all"
                        >
                            {/* Header */}
                            <div className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-semibold">{clause.title}</h4>
                                            <span
                                                className={`text-xs px-2 py-0.5 rounded border ${getSeverityColor(
                                                    clause.severity
                                                )}`}
                                            >
                                                {clause.severity}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {formatClauseType(clause.clause_type)} •{" "}
                                            {formatConfidence(clause.confidence)} confidence
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {clause.evidence.length > 0 && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => onViewInPdf(clause.evidence[0].page)}
                                            >
                                                <ExternalLink className="h-4 w-4 mr-1" />
                                                Page {clause.evidence[0].page}
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() =>
                                                setExpandedId(isExpanded ? null : clauseId)
                                            }
                                        >
                                            {isExpanded ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                {/* Quick Preview */}
                                {!isExpanded && (
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {clause.why_risky}
                                    </p>
                                )}
                            </div>

                            {/* Expanded Details */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-t border-white/10 bg-black/20"
                                    >
                                        <div className="p-4 space-y-4">
                                            <div>
                                                <h5 className="text-sm font-semibold mb-2 text-red-400">
                                                    Why It's Risky:
                                                </h5>
                                                <p className="text-sm text-muted-foreground">
                                                    {clause.why_risky}
                                                </p>
                                            </div>

                                            {clause.evidence.length > 0 && (
                                                <div>
                                                    <h5 className="text-sm font-semibold mb-2">
                                                        Evidence:
                                                    </h5>
                                                    <div className="space-y-2">
                                                        {clause.evidence.map((ev, i) => (
                                                            <div
                                                                key={i}
                                                                className="text-sm p-3 rounded-md bg-muted/20 border border-white/5"
                                                            >
                                                                <div className="text-xs text-muted-foreground mb-1">
                                                                    Page {ev.page}
                                                                </div>
                                                                <div className="italic">&quot;{ev.excerpt}&quot;</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <h5 className="text-sm font-semibold mb-2 text-green-400">
                                                    Suggested Rewrite:
                                                </h5>
                                                <p className="text-sm text-muted-foreground">
                                                    {clause.suggested_rewrite}
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="text-sm font-semibold mb-2 text-blue-400">
                                                    Negotiation Tip:
                                                </h5>
                                                <p className="text-sm text-muted-foreground">
                                                    {clause.negotiation_tip}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
