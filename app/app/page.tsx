"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Upload as UploadIcon, Download, Settings, ArrowLeft } from "lucide-react";
import { UploadZone } from "@/components/upload-zone";
import { SimplePDFViewer } from "@/components/pdf-viewer";
import { RiskScoreCard } from "@/components/risk-score-card";
import { RiskBreakdown } from "@/components/risk-breakdown";
import { RisksTable } from "@/components/risks-table";
import { SuggestedEdits } from "@/components/suggested-edits";
import { TopRisks } from "@/components/top-risks";
import { ContractChat } from "@/components/contract-chat";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { ClauseType, SeverityLevel } from "@/lib/schema";

// Sample demo data
const DEMO_CONTRACT_DATA = {
    contract_title: "Software Development Agreement",
    language: "English",
    overall_risk_score: 68,
    risk_summary: {
        top_risks: [
            {
                title: "Unlimited Liability",
                severity: "CRITICAL" as SeverityLevel,
                reason: "No cap on liability could expose you to unlimited damages",
                page: 3,
            },
            {
                title: "Unilateral Termination",
                severity: "HIGH" as SeverityLevel,
                reason: "Client can terminate at any time without cause",
                page: 1,
            },
            {
                title: "Broad IP Transfer",
                severity: "HIGH" as SeverityLevel,
                reason: "You lose all rights to any work created, including pre-existing IP",
                page: 5,
            },
            {
                title: "Net 90 Payment Terms",
                severity: "MEDIUM" as SeverityLevel,
                reason: "Long payment window with no late fees specified",
                page: 2,
            },
            {
                title: "Non-Compete Clause",
                severity: "MEDIUM" as SeverityLevel,
                reason: "12-month non-compete may be overly restrictive",
                page: 6,
            },
        ],
        recommended_actions: [
            "Negotiate a liability cap at 2x the contract value",
            "Request 30-day termination notice requirement",
            "Limit IP transfer to work specifically created for this project",
            "Push for Net 30 terms with 2% late fees",
            "Narrow non-compete scope to direct competitors only",
        ],
    },
    clauses: [
        {
            clause_type: "LIABILITY" as ClauseType,
            title: "Unlimited Liability Exposure",
            severity: "CRITICAL" as SeverityLevel,
            confidence: 0.95,
            evidence: [
                {
                    page: 3,
                    excerpt:
                        "Contractor shall be liable for any and all damages arising from this agreement without limitation.",
                },
            ],
            why_risky:
                "This clause exposes you to potentially unlimited financial liability. If anything goes wrong, you could be sued for far more than youre being paid.",
            suggested_rewrite:
                "Contractor's total liability under this agreement shall not exceed the total fees paid in the 12 months preceding the claim.",
            negotiation_tip:
                "Industry standard is to cap liability at 1-2x the contract value. Push for this firmly - its non-negotiable for most consultants.",
        },
        {
            clause_type: "TERMINATION" as ClauseType,
            title: "Unilateral Termination Rights",
            severity: "HIGH" as SeverityLevel,
            confidence: 0.92,
            evidence: [
                {
                    page: 1,
                    excerpt:
                        "Client may terminate this agreement at any time, for any reason, with or without cause.",
                },
            ],
            why_risky:
                "The client can end the contract instantly without reason, leaving you without income and potentially mid-project.You have no protection or notice period.",
            suggested_rewrite:
                "Either party may terminate this agreement with 30 days written notice. Early termination without cause requires payment for work completed plus 50% of remaining contract value.",
            negotiation_tip:
                "Request at minimum a 30-day notice period and payment for work in progress. If they resist, ask for a kill fee.",
        },
        {
            clause_type: "IP" as ClauseType,
            title: "Overly Broad IP Assignment",
            severity: "HIGH" as SeverityLevel,
            confidence: 0.88,
            evidence: [
                {
                    page: 5,
                    excerpt:
                        "All work product, ideas, and inventions created during the term of this agreement, whether or not related to the project, shall be the sole property of Client.",
                },
            ],
            why_risky:
                "This clause claims ownership of EVERYTHING you create during the contract period, even unrelated side projects or pre-existing tools.",
            suggested_rewrite:
                "Client shall own all work product specifically created for and paid for under this agreement. Contractor retains all rights to pre-existing IP, tools, and any work unrelated to this project.",
            negotiation_tip:
                "This is a deal-breaker for most developers. Insist that only project-specific work is transferred. Keep a list of your pre-existing IP.",
        },
        {
            clause_type: "PAYMENT" as ClauseType,
            title: "Extended Payment Terms",
            severity: "MEDIUM" as SeverityLevel,
            confidence: 0.85,
            evidence: [
                {
                    page: 2,
                    excerpt: "Payment shall be made Net 90 days from invoice date.",
                },
            ],
            why_risky:
                "Waiting 90 days for payment strains cash flow. No penalties means they might delay even longer.",
            suggested_rewrite:
                "Payment shall be made Net 30 days from invoice date. Late payments incur 2% monthly interest and Client agrees to reimburse collection costs.",
            negotiation_tip:
                "Net 30 is standard for most contracts. If they insist on longer terms, request a partial upfront payment or milestone-based billing.",
        },
    ],
};

function AppContent() {
    const searchParams = useSearchParams();
    const isDemoMode = searchParams?.get("demo") === "true";

    const {
        pdfFile,
        currentPage,
        analysis,
        isAnalyzing,
        chatMessages,
        isChatting,
        activeTab,
        setPdfFile,
        setCurrentPage,
        setAnalysis,
        setIsAnalyzing,
        addChatMessage,
        setIsChatting,
        setActiveTab,
        setPdfText,
    } = useAppStore();

    const { toast } = useToast();
    const [showUpload, setShowUpload] = useState(true);

    useEffect(() => {
        if (isDemoMode && !analysis) {
            handleLoadDemo();
        }
    }, [isDemoMode]);

    const handleFileSelected = async (file: File) => {
        setPdfFile(file);
        setShowUpload(false);
        setIsAnalyzing(true);

        try {
            // Simulate PDF text extraction
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const demoPages = Array.from({ length: 8 }, (_, i) => ({
                page: i + 1,
                text: `Page ${i + 1} content...`,
            }));

            setPdfText("Demo contract text", demoPages);

            // Simulate analysis
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setAnalysis(DEMO_CONTRACT_DATA);

            toast({
                title: "Analysis Complete",
                description: "Your contract has been analyzed successfully",
            });
        } catch (error) {
            toast({
                title: "Analysis Failed",
                description: "Please try again",
                variant: "destructive",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleLoadDemo = async () => {
        setShowUpload(false);
        setIsAnalyzing(true);

        // Create a fake File object for demo
        const demoFile = new File(
            ["demo content"],
            "SampleEmploymentAgreement.pdf",
            { type: "application/pdf" }
        );
        setPdfFile(demoFile);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const demoPages = Array.from({ length: 8 }, (_, i) => ({
                page: i + 1,
                text: `Page ${i + 1} content from demo contract...`,
            }));

            setPdfText("Demo contract text", demoPages);
            setAnalysis(DEMO_CONTRACT_DATA);

            toast({
                title: "Demo Loaded",
                description: "Explore the features with this sample analysis",
            });
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSendMessage = async (message: string) => {
        addChatMessage({ role: "user", content: message });
        setIsChatting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Demo response
            const demoResponse = {
                role: "assistant" as const,
                content: `Based on your contract, ${message.toLowerCase().includes("terminate")
                    ? "the client can terminate at any time without cause (see Page 1). This is unfavorable - you should negotiate for at least 30 days notice."
                    : message.toLowerCase().includes("ip") || message.toLowerCase().includes("intellectual")
                        ? "you transfer ALL intellectual property rights, including pre-existing IP (see Page 5). This is highly risky - you should limit it to project-specific work only."
                        : "I found relevant information in your contract. Check the citations for details."}`,
                citations: [
                    {
                        page: message.toLowerCase().includes("terminate") ? 1 : 5,
                        excerpt: message.toLowerCase().includes("terminate")
                            ? "Client may terminate this agreement at any time, for any reason..."
                            : "All work product, ideas, and inventions created during the term...",
                    },
                ],
            };

            addChatMessage(demoResponse);
        } finally {
            setIsChatting(false);
        }
    };

    const handleViewInPdf = (page: number) => {
        setCurrentPage(page);
        setActiveTab("overview");
    };

    const getRiskCategories = () => {
        if (!analysis) return [];

        const categoryMap = new Map<ClauseType, { severity: SeverityLevel; count: number }>();

        analysis.clauses.forEach((clause) => {
            const existing = categoryMap.get(clause.clause_type);
            if (!existing || clause.severity > existing.severity) {
                categoryMap.set(clause.clause_type, {
                    severity: clause.severity,
                    count: (existing?.count || 0) + 1,
                });
            } else {
                categoryMap.set(clause.clause_type, {
                    ...existing,
                    count: existing.count + 1,
                });
            }
        });

        return Array.from(categoryMap.entries()).map(([category, data]) => ({
            category,
            severity: data.severity,
            count: data.count,
            maxSeverity: 0,
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Navigation */}
            <nav className="border-b border-white/10 glass-dark sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-primary" />
                        <span className="text-lg font-bold text-gradient">ContractLens AI</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        {analysis && (
                            <>
                                <Button variant="outline" size="sm">
                                    <Download className="h-4 w-4 mr-2" />
                                    Export Report
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowUpload(true)}
                                >
                                    <UploadIcon className="h-4 w-4 mr-2" />
                                    New Upload
                                </Button>
                            </>
                        )}
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-6">
                {showUpload || !pdfFile ? (
                    /* Upload View */
                    <div className="max-w-3xl mx-auto">
                        <UploadZone
                            onFileSelected={handleFileSelected}
                            onLoadDemo={handleLoadDemo}
                            isProcessing={isAnalyzing}
                        />

                        {isAnalyzing && (
                            <div className="mt-6 text-center">
                                <div className="inline-flex items-center gap-3 p-4 rounded-lg glass border border-primary/30">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                                    <span className="text-sm">Analyzing contract...</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* 3-Panel Layout */
                    <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
                        {/* Left Sidebar */}
                        <div className="col-span-3 space-y-4 overflow-y-auto">
                            {analysis && (
                                <>
                                    <RiskScoreCard score={analysis.overall_risk_score} isLoading={isAnalyzing} />
                                    <RiskBreakdown categories={getRiskCategories()} isLoading={isAnalyzing} />
                                </>
                            )}
                        </div>

                        {/* Center - PDF Viewer */}
                        <div className="col-span-5">
                            <SimplePDFViewer
                                pdfFile={pdfFile}
                                currentPage={currentPage}
                                totalPages={8}
                                onPageChange={setCurrentPage}
                            />
                        </div>

                        {/* Right - Insights Panel */}
                        <div className="col-span-4 overflow-y-auto">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="risks">Risks</TabsTrigger>
                                    <TabsTrigger value="edits">Edits</TabsTrigger>
                                    <TabsTrigger value="chat">Chat</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-4 mt-4">
                                    {analysis && (
                                        <TopRisks
                                            topRisks={analysis.risk_summary.top_risks}
                                            recommendedActions={analysis.risk_summary.recommended_actions}
                                            onViewPage={handleViewInPdf}
                                            isLoading={isAnalyzing}
                                        />
                                    )}
                                </TabsContent>

                                <TabsContent value="risks" className="mt-4">
                                    {analysis && (
                                        <RisksTable
                                            clauses={analysis.clauses}
                                            onViewInPdf={handleViewInPdf}
                                            isLoading={isAnalyzing}
                                        />
                                    )}
                                </TabsContent>

                                <TabsContent value="edits" className="mt-4">
                                    {analysis && (
                                        <SuggestedEdits clauses={analysis.clauses} isLoading={isAnalyzing} />
                                    )}
                                </TabsContent>

                                <TabsContent value="chat" className="mt-4 h-[calc(100%-60px)]">
                                    <ContractChat
                                        messages={chatMessages}
                                        onSendMessage={handleSendMessage}
                                        onViewPage={handleViewInPdf}
                                        isLoading={isChatting}
                                        disabled={!analysis}
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AppPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
                    <p className="text-muted-foreground">Loading...</p>
                </div>
            </div>
        }>
            <AppContent />
        </Suspense>
    );
}

