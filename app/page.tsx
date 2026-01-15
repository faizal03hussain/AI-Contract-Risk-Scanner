"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Shield,
    FileText,
    Zap,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Lock,
    FileSearch,
    MessageSquare,
} from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-mesh-light dark:bg-mesh-dark transition-colors duration-500">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

            {/* Navigation */}
            <nav className="relative z-10 border-b border-purple-200/30 dark:border-purple-500/20 backdrop-blur-xl bg-white/80 dark:bg-purple-950/30">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-gradient-royal">
                            ContractLens AI
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/privacy">
                            <Button variant="ghost" size="sm">
                                Privacy
                            </Button>
                        </Link>
                        <Link href="/terms">
                            <Button variant="ghost" size="sm">
                                Terms
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
                <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-sm">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">
                            AI-Powered Contract Analysis
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Understand Your{" "}
                        <span className="text-gradient-royal">Contract Risks</span>
                        <br />
                        in 30 Seconds
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                        Upload a contract → get instant risk scores, clause analysis, and
                        safer alternatives. No legal jargon.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/app">
                            <Button size="lg" className="text-lg px-8 py-6 group">
                                Upload Contract
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                        <Link href="/app?demo=true">
                            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                                Try Demo Contract
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Citations Included</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-green-500" />
                            <span>Private by Design</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span>No Storage by Default</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="relative z-10 container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Everything You Need to{" "}
                        <span className="text-gradient-royal">Negotiate Better</span>
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <Card className="glass border-white/10 hover:border-primary/30 transition-all hover:scale-105 duration-300">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <FileSearch className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Risk Score 0-100</h3>
                                <p className="text-muted-foreground">
                                    Get an instant overall risk score and category breakdown for
                                    termination, liability, IP, and more.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 2 */}
                        <Card className="glass border-white/10 hover:border-primary/30 transition-all hover:scale-105 duration-300">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Clause Highlights</h3>
                                <p className="text-muted-foreground">
                                    See risky clauses highlighted in the PDF with explanations
                                    and suggested safer alternatives.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 3 */}
                        <Card className="glass border-white/10 hover:border-primary/30 transition-all hover:scale-105 duration-300">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Suggested Edits</h3>
                                <p className="text-muted-foreground">
                                    Get rewritten clauses that protect you better, plus
                                    negotiation tips for each risk.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 4 */}
                        <Card className="glass border-white/10 hover:border-primary/30 transition-all hover:scale-105 duration-300">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Chat with Contract</h3>
                                <p className="text-muted-foreground">
                                    Ask questions like "Can they terminate anytime?" and get
                                    answers with page citations.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 5 */}
                        <Card className="glass border-white/10 hover:border-primary/30 transition-all hover:scale-105 duration-300">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Shield className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Executive Summary</h3>
                                <p className="text-muted-foreground">
                                    Top 5 risks, what to negotiate, and what can go wrong if you
                                    sign as-is.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Feature 6 */}
                        <Card className="glass border-white/10 hover:border-primary/30 transition-all hover:scale-105 duration-300">
                            <CardContent className="p-6 space-y-4">
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold">Export Report</h3>
                                <p className="text-muted-foreground">
                                    Download comprehensive PDF or Markdown report with all risks,
                                    suggestions, and evidence.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 container mx-auto px-4 py-20">
                <Card className="glass-light dark:glass-royal border-primary/40 max-w-4xl mx-auto">
                    <CardContent className="p-12 text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Ready to Analyze Your Contract?
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Upload your PDF or try our demo contract right now.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/app">
                                <Button size="lg" className="text-lg px-8 py-6">
                                    Get Started Now
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-purple-200/30 dark:border-purple-500/20 mt-20 backdrop-blur-xl bg-white/60 dark:bg-purple-950/20">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span>© 2026 ContractLens AI. For informational purposes only.</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-primary transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-purple-200/20 dark:border-purple-500/10 text-center">
                        <p className="text-xs text-muted-foreground">
                            Crafted with excellence by{" "}
                            <span className="text-gradient-royal font-semibold">Faizal Hussain</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
