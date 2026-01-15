"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-mesh-light dark:bg-mesh-dark transition-colors duration-500">
            <nav className="border-b border-purple-200/30 dark:border-purple-500/20 backdrop-blur-xl bg-white/80 dark:bg-purple-950/30">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Shield className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold text-gradient-royal">
                            ContractLens AI
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <Card className="glass-light dark:glass-royal">
                    <CardHeader>
                        <CardTitle className="text-3xl text-gradient-royal">Privacy Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none space-y-6">
                        <p className="text-muted-foreground">
                            Last updated: January 16, 2026
                        </p>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Privacy by Design</h2>
                            <p className="text-muted-foreground">
                                ContractLens AI is built with privacy as a core principle. We
                                understand that your contracts contain sensitive business
                                information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">What We Store</h2>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>
                                    <strong>By default: Nothing.</strong> Your contract text is
                                    processed in memory and discarded after analysis.
                                </li>
                                <li>
                                    We store only the analysis results (risk scores, clause
                                    classifications) - not the raw contract text.
                                </li>
                                <li>
                                    Page count and metadata for rate limiting and abuse
                                    prevention.
                                </li>
                                <li>
                                    If you create an account (optional), we store your analysis
                                    history for your convenience.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">How We Process Data</h2>
                            <p className="text-muted-foreground mb-3">
                                Your contract is sent to OpenRouter API for AI analysis. The
                                processing happens server-side with the following safeguards:
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>Encrypted transmission (HTTPS)</li>
                                <li>No logging of contract content in server logs</li>
                                <li>Automatic redaction of sensitive data in error logs</li>
                                <li>
                                    Temporary processing only - documents are not retained by the
                                    AI provider
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
                            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                                <li>
                                    You can delete your analysis history at any time (if logged
                                    in)
                                </li>
                                <li>
                                    You control what data is uploaded - we never access files on
                                    your device without your action
                                </li>
                                <li>
                                    You can use the service without creating an account for
                                    maximum privacy
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Rate Limiting</h2>
                            <p className="text-muted-foreground">
                                We track IP addresses for rate limiting (10 requests per hour
                                by default) to prevent abuse. This data is stored temporarily
                                in memory and is not linked to your identity.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">Contact</h2>
                            <p className="text-muted-foreground">
                                If you have questions about how we handle your data, please
                                visit our GitHub repository or contact{" "}
                                <span className="text-gradient-royal font-semibold">Faizal Hussain</span>.
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
