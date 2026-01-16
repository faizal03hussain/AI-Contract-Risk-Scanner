"use client";

import { motion } from "framer-motion";
import { Loader2, FileSearch, Brain, CheckCircle2, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisProgressProps {
    stage: "extracting" | "validating" | "analyzing" | "complete" | "error";
    progress: number;
    message?: string;
}

export function AnalysisProgress({ stage, progress, message }: AnalysisProgressProps) {
    const stages = {
        extracting: {
            icon: FileSearch,
            label: "Extracting Text",
            description: "Reading contract pages...",
            color: "text-blue-400",
        },
        validating: {
            icon: AlertTriangle,
            label: "Validating Document",
            description: "Checking document type...",
            color: "text-yellow-400",
        },
        analyzing: {
            icon: Brain,
            label: "Analyzing Contract",
            description: "AI is reviewing clauses and identifying risks...",
            color: "text-purple-400",
        },
        complete: {
            icon: CheckCircle2,
            label: "Analysis Complete",
            description: "Risk assessment ready!",
            color: "text-green-400",
        },
        error: {
            icon: AlertTriangle,
            label: "Error",
            description: message || "Something went wrong",
            color: "text-red-400",
        },
    };

    const currentStage = stages[stage];
    const Icon = currentStage.icon;

    return (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full p-8 bg-gradient-to-br from-purple-950/50 to-fuchsia-950/50 rounded-2xl border border-purple-500/30 shadow-2xl"
            >
                {/* Animated Icon */}
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={stage === "analyzing" ? {
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        } : {}}
                        transition={{
                            duration: 2,
                            repeat: stage === "analyzing" ? Infinity : 0,
                            ease: "easeInOut",
                        }}
                        className={`p-4 rounded-full bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 ${currentStage.color}`}
                    >
                        <Icon className="h-12 w-12" />
                    </motion.div>
                </div>

                {/* Status Text */}
                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {currentStage.label}
                    </h3>
                    <p className="text-muted-foreground">
                        {message || currentStage.description}
                    </p>
                </div>

                {/* Progress Bar */}
                {stage !== "error" && (
                    <div className="space-y-2">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{Math.round(progress)}%</span>
                            <span>
                                {stage === "extracting" && "Step 1 of 3"}
                                {stage === "validating" && "Step 2 of 3"}
                                {stage === "analyzing" && "Step 3 of 3"}
                                {stage === "complete" && "Done!"}
                            </span>
                        </div>
                    </div>
                )}

                {/* Animated Dots for Analyzing */}
                {stage === "analyzing" && (
                    <div className="flex justify-center gap-2 mt-6">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                                className="w-2 h-2 rounded-full bg-purple-500"
                            />
                        ))}
                    </div>
                )}

                {/* Time Estimate */}
                {stage === "analyzing" && (
                    <p className="text-center text-xs text-muted-foreground mt-4">
                        This usually takes 30-60 seconds
                    </p>
                )}
            </motion.div>
        </div>
    );
}
