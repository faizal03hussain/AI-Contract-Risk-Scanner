import { NextRequest, NextResponse } from "next/server";
import { answerQuestion } from "@/lib/openrouter";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { question, contractText, pages } = body;

        if (!question || !contractText) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Call OpenRouter for RAG-based Q&A
        const answer = await answerQuestion(question, pages || []);

        return NextResponse.json({
            success: true,
            answer,
        });
    } catch (error: any) {
        console.error("Chat error:", error);
        return NextResponse.json(
            { error: "Failed to answer question", details: error.message },
            { status: 500 }
        );
    }
}
