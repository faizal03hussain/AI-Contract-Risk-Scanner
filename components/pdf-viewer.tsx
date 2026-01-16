"use client";

import { FileText } from "lucide-react";

interface SimplePDFViewerProps {
    fileUrl: string | null;
}

export function SimplePDFViewer({ fileUrl }: SimplePDFViewerProps) {
    if (!fileUrl) {
        return (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-950/20 to-fuchsia-950/20 rounded-lg border-2 border-dashed border-purple-500/30">
                <div className="text-center p-8">
                    <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="text-muted-foreground text-lg">No PDF loaded</p>
                    <p className="text-sm text-muted-foreground/70 mt-2">
                        Upload a contract to view it here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full bg-gradient-to-br from-purple-950/10 to-fuchsia-950/10 rounded-lg overflow-hidden border border-purple-500/20">
            <iframe
                src={fileUrl}
                className="w-full h-full"
                title="PDF Viewer"
            />
        </div>
    );
}
