import { NextRequest, NextResponse } from "next/server";
import { analyzeRisk } from "@/lib/openrouter";
import { ContractAnalysis, ContractAnalysisSchema } from "@/lib/schema";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const rateLimitResult = checkRateLimit(ip);

        if (!rateLimitResult.allowed) {
            return NextResponse.json(
                {
                    error: "Rate limit exceeded. Please try again in an hour.",
                    remaining: rateLimitResult.remaining,
                },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { fullText, pages } = body;

        if (!fullText || !pages) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Call OpenRouter API
        console.log("Starting contract analysis...");
        const analysis: ContractAnalysis = await analyzeRisk(fullText, pages);

        // Validate response
        const validated = ContractAnalysisSchema.parse(analysis);

        return NextResponse.json({
            success: true,
            analysis: validated,
        });
    } catch (error: any) {
        console.error("Analysis error:", error);
        return NextResponse.json(
            {
                error: "Failed to analyze contract",
                details: error.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}
