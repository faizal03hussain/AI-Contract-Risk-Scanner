import { NextRequest, NextResponse } from "next/server";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

// Configure PDF.js worker
if (typeof window === "undefined") {
    // @ts-ignore - worker module doesn't have types
    const workerSrc = await import("pdfjs-dist/legacy/build/pdf.worker.mjs");
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
}

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        if (!file.type.includes("pdf")) {
            return NextResponse.json(
                { error: "File must be a PDF" },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB from env)
        const maxSize = parseInt(process.env.MAX_PDF_MB || "5") * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: `File size must be less than ${process.env.MAX_PDF_MB || 5}MB` },
                { status: 400 }
            );
        }

        // Convert file to array buffer
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const pdfDocument = await loadingTask.promise;

        const maxPages = parseInt(process.env.MAX_PAGES || "10");
        const numPages = Math.min(pdfDocument.numPages, maxPages);

        // Extract text from each page
        const pages = [];
        for (let i = 1; i <= numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const text = textContent.items
                .map((item: any) => item.str)
                .join(" ");

            pages.push({
                page: i,
                text: text.trim(),
            });
        }

        // Combine all text
        const fullText = pages.map((p) => p.text).join("\n\n");

        return NextResponse.json({
            success: true,
            fullText,
            pages,
            totalPages: pdfDocument.numPages,
            pagesProcessed: numPages,
        });
    } catch (error: any) {
        console.error("PDF extraction error:", error);
        return NextResponse.json(
            { error: "Failed to extract text from PDF", details: error.message },
            { status: 500 }
        );
    }
}
