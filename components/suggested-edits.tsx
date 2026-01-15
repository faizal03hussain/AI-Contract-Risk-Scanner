"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clause } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface SuggestedEditsProps {
    clauses: Clause[];
    isLoading?: boolean;
}

export function SuggestedEdits({ clauses, isLoading }: SuggestedEditsProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const { toast } = useToast();

    const handleCopy = async (text: string, id: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            setCopiedId(id);
            toast({
                title: "Copied to clipboard",
                description: "Suggested edit has been copied",
            });
            setTimeout(() => setCopiedId(null), 2000);
        } else {
            toast({
                title: "Failed to copy",
                description: "Please try again",
                variant: "destructive",
            });
        }
    };

    if (isLoading) {
        return (
            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle className="text-xl">Suggested Edits</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse space-y-2">
                                <div className="h-4 w-48 bg-muted rounded" />
                                <div className="h-20 w-full bg-muted rounded" />
                            </div>
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
                    <CardTitle className="text-xl">Suggested Edits</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center py-8">
                        No suggested edits available
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="glass border-white/10">
            <CardHeader>
                <CardTitle className="text-xl">Suggested Safer Alternatives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {clauses.map((clause, index) => {
                    const clauseId = `edit-${index}`;
                    return (
                        <motion.div
                            key={clauseId}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="space-y-3 p-4 rounded-lg border border-white/10 hover:border-primary/30 transition-all"
                        >
                            <div className="flex items-start justify-between">
                                <h4 className="font-semibold">{clause.title}</h4>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleCopy(clause.suggested_rewrite, clauseId)}
                                    className="gap-2"
                                >
                                    {copiedId === clauseId ? (
                                        <>
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                            </div>

                            {/* Current Version */}
                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-red-400 uppercase">
                                    Current (Risky):
                                </div>
                                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-sm">
                                    {clause.evidence.length > 0 ? (
                                        <span className="italic">&quot;{clause.evidence[0].excerpt}&quot;</span>
                                    ) : (
                                        <span className="text-muted-foreground">{clause.why_risky}</span>
                                    )}
                                </div>
                            </div>

                            {/* Suggested Version */}
                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-green-400 uppercase">
                                    Suggested (Safer):
                                </div>
                                <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-sm">
                                    {clause.suggested_rewrite}
                                </div>
                            </div>

                            {/* Negotiation Tip */}
                            <div className="space-y-2">
                                <div className="text-xs font-semibold text-blue-400 uppercase">
                                    Negotiation Tip:
                                </div>
                                <div className="p-3 rounded-md bg-blue-500/10 border border-blue-500/20 text-sm text-muted-foreground">
                                    {clause.negotiation_tip}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </CardContent>
        </Card>
    );
}
