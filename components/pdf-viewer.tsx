"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimplePDFViewerProps {
    pdfFile: File | null;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    highlights?: { page: number; text: string }[];
}

export function SimplePDFViewer({
    pdfFile,
    currentPage,
    totalPages,
    onPageChange,
    highlights = [],
}: SimplePDFViewerProps) {
    const [zoom, setZoom] = useState(100);

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

    if (!pdfFile) {
        return (
            <Card className="glass border-white/10 h-full flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                    <FileText className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">
                        Upload a PDF to view it here
                    </p>
                </div>
            </Card>
        );
    }

    return (
        <Card className="glass border-white/10 h-full flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage <= 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                        Page  {currentPage} / {totalPages}
                    </span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage >= totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm w-16 text-center">{zoom}%</span>
                    <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* PDF Viewer */}
            <ScrollArea className="flex-1">
                <div className="p-8 min-h-full flex items-center justify-center bg-muted/10">
                    <div
                        className={cn(
                            "bg-white rounded-lg shadow-2xl transition-transform",
                            "min-h-[600px] w-full max-w-3xl p-12 relative"
                        )}
                        style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
                    >
                        {/* Placeholder - In production, this would render actual PDF */}
                        <div className="space-y-4">
                            <div className="text-gray-800">
                                <h1 className="text-2xl font-bold mb-4">
                                    {pdfFile.name}
                                </h1>
                                <p className="text-sm text-gray-600 mb-6">
                                    Page {currentPage} of {totalPages}
                                </p>

                                <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                                    <p>
                                        This is a simplified PDF viewer for demonstration purposes.
                                        In production, this would use react-pdf to render the actual PDF content.
                                    </p>

                                    {highlights.filter(h => h.page === currentPage).length > 0 && (
                                        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-4">
                                            <p className="font-semibold text-yellow-800">Highlighted Risk:</p>
                                            {highlights.filter(h => h.page === currentPage).map((h, i) => (
                                                <p key={i} className="text-sm text-yellow-700 mt-2">
                                                    &quot;{h.text}&quot;
                                                </p>
                                            ))}
                                        </div>
                                    )}

                                    <p>
                                        The full implementation would extract and render PDF pages,
                                        overlay highlights on risky clauses, and allow clicking
                                        highlighted text to see detailed risk information.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </Card>
    );
}
