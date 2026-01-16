import { NextRequest, NextResponse } from "next/server";
import { answerQuestion } from "@/lib/ai-client";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { question, pages } = body;

        if (!question) {
            return NextResponse.json(
                { error: "Missing question field" },
                { status: 400 }
            );
        }

        if (!pages || !Array.isArray(pages) || pages.length === 0) {
            return NextResponse.json(
                { error: "Missing or invalid pages data. Please upload a contract first." },
                { status: 400 }
            );
        }

        // Call OpenRouter for RAG-based Q&A
        const answer = await answerQuestion(question, pages);

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
