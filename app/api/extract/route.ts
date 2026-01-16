import { NextRequest, NextResponse } from "next/server";
import pdfParse from "pdf-parse";

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

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Parse PDF
        const data = await pdfParse(buffer);

        // Validate document type before processing
        const { validateDocumentType } = await import("@/lib/ai-client");
        const firstPageText = data.text.substring(0, 2000);
        const validation = await validateDocumentType(firstPageText);

        if (!validation.isValid) {
            return NextResponse.json(
                {
                    error: "Invalid document type",
                    details: "This doesn't appear to be a legal contract or bond document. Please upload contracts or bonds only.",
                    reason: validation.reason
                },
                { status: 400 }
            );
        }

        // Split text into pages (approximation based on page count)
        const textPerPage = data.text.length / data.numpages;
        const pages = [];

        for (let i = 0; i < data.numpages; i++) {
            const start = Math.floor(i * textPerPage);
            const end = Math.floor((i + 1) * textPerPage);
            const pageText = data.text.substring(start, end).trim();

            pages.push({
                page: i + 1,
                text: pageText || `Page ${i + 1} content`,
            });
        }

        return NextResponse.json({
            success: true,
            fullText: data.text,
            pages,
            totalPages: data.numpages,
            pagesProcessed: data.numpages,
        });
    } catch (error: any) {
        console.error("PDF extraction error:", error);
        return NextResponse.json(
            { error: "Failed to extract text from PDF", details: error.message },
            { status: 500 }
        );
    }
}
