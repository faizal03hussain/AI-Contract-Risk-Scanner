"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface UploadZoneProps {
    onFileSelected: (file: File) => void;
    onLoadDemo?: () => void;
    isProcessing?: boolean;
}

const MAX_FILE_SIZE_MB = parseInt(process.env.NEXT_PUBLIC_MAX_PDF_MB || "5", 10);
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

export function UploadZone({
    onFileSelected,
    onLoadDemo,
    isProcessing,
}: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { toast } = useToast();

    const validateFile = (file: File): string | null => {
        if (!file.type.includes("pdf")) {
            return "Only PDF files are supported";
        }
        if (file.size > MAX_FILE_SIZE) {
            return `File size must be less than ${MAX_FILE_SIZE_MB}MB`;
        }
        return null;
    };

    const handleFile = useCallback(
        (file: File) => {
            const error = validateFile(file);
            if (error) {
                setError(error);
                toast({
                    title: "Invalid file",
                    description: error,
                    variant: "destructive",
                });
                return;
            }

            setError(null);
            setUploadProgress(0);

            // Simulate upload progress
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(interval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 100);

            onFileSelected(file);

            setTimeout(() => {
                clearInterval(interval);
                setUploadProgress(100);
            }, 1000);
        },
        [onFileSelected, toast]
    );

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);

            const file = e.dataTransfer.files[0];
            if (file) {
                handleFile(file);
            }
        },
        [handleFile]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                handleFile(file);
            }
        },
        [handleFile]
    );

    return (
        <Card className="glass border-white/10">
            <CardContent className="p-6 space-y-6">
                {/* Drag & Drop Zone */}
                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-12 transition-all duration-300",
                        isDragging
                            ? "border-primary bg-primary/10 scale-[1.02]"
                            : "border-white/20 hover:border-primary/50",
                        isProcessing && "opacity-50 pointer-events-none"
                    )}
                >
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className={cn(
                            "w-16 h-16 rounded-full flex items-center justify-center transition-all",
                            isDragging ? "bg-primary/20 scale-110" : "bg-primary/10"
                        )}>
                            <Upload className="h-8 w-8 text-primary" />
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">
                                {isDragging ? "Drop your contract here" : "Upload Contract PDF"}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Drag and drop or click to browse
                                <br />
                                <span className="text-xs">Max {MAX_FILE_SIZE_MB}MB, PDF only</span>
                            </p>
                        </div>

                        <input
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileInput}
                            className="hidden"
                            id="file-input"
                            disabled={isProcessing}
                        />

                        <div className="flex flex-col sm:flex-row gap-3">
                            <label htmlFor="file-input">
                                <Button asChild size="lg">
                                    <span className="cursor-pointer">
                                        <FileText className="mr-2 h-4 w-4" />
                                        Choose File
                                    </span>
                                </Button>
                            </label>

                            {onLoadDemo && (
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={onLoadDemo}
                                    disabled={isProcessing}
                                >
                                    Try Demo Contract
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Upload Progress */}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="absolute bottom-4 left-4 right-4">
                            <Progress value={uploadProgress} className="h-2" />
                            <p className="text-xs text-muted-foreground text-center mt-2">
                                Uploading... {uploadProgress}%
                            </p>
                        </div>
                    )}
                </div>

                {/* Error Display */}
                {error && (
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm text-destructive font-medium">{error}</p>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setError(null)}
                            className="h-6 w-6 p-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* Privacy Note */}
                <div className="p-4 rounded-lg bg-muted/20 border border-white/10">
                    <p className="text-xs text-muted-foreground text-center">
                        🔒 Your contract is processed securely and not stored by default.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
