import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SeverityLevel } from "./schema";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getSeverityColor(severity: SeverityLevel): string {
    switch (severity) {
        case "LOW":
            return "text-green-500 bg-green-500/10 border-green-500/20";
        case "MEDIUM":
            return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
        case "HIGH":
            return "text-orange-500 bg-orange-500/10 border-orange-500/20";
        case "CRITICAL":
            return "text-red-500 bg-red-500/10 border-red-500/20";
    }
}

export function getRiskScoreColor(score: number): string {
    if (score >= 75) return "text-red-500";
    if (score >= 50) return "text-orange-500";
    if (score >= 25) return "text-yellow-500";
    return "text-green-500";
}

export function getRiskGradient(score: number): string {
    if (score >= 75) return "from-red-500 to-red-700";
    if (score >= 50) return "from-orange-500 to-red-500";
    if (score >= 25) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-500";
}

export function formatConfidence(confidence: number): string {
    return `${Math.round(confidence * 100)}%`;
}

export function formatClauseType(type: string): string {
    return type
        .split("_")
        .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
        .join(" ");
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error("Failed to copy:", error);
        return false;
    }
}
