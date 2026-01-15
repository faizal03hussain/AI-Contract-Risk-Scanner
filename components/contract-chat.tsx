"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/lib/schema";
import { Send, Loader2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContractChatProps {
    messages: ChatMessage[];
    onSendMessage: (message: string) => void;
    onViewPage?: (page: number) => void;
    isLoading?: boolean;
    disabled?: boolean;
}

const SUGGESTED_QUESTIONS = [
    "Can they terminate the contract anytime?",
    "Who owns the intellectual property?",
    "What are the payment terms?",
    "What happens if there's a dispute?",
    "Are there any liability caps?",
];

export function ContractChat({
    messages,
    onSendMessage,
    onViewPage,
    isLoading,
    disabled,
}: ContractChatProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim() && !isLoading && !disabled) {
            onSendMessage(input.trim());
            setInput("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestedQuestion = (question: string) => {
        if (!isLoading && !disabled) {
            onSendMessage(question);
        }
    };

    return (
        <Card className="glass border-white/10 h-full flex flex-col">
            <CardHeader>
                <CardTitle className="text-xl">Ask Questions</CardTitle>
                <p className="text-sm text-muted-foreground">
                    Get answers with citations from your contract
                </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 p-4 overflow-hidden">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {messages.length === 0 && !disabled && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground text-center py-4">
                                Try asking a question about your contract
                            </p>
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-muted-foreground">
                                    Suggested questions:
                                </p>
                                {SUGGESTED_QUESTIONS.map((question, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestedQuestion(question)}
                                        className="w-full text-left p-3 rounded-lg border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all text-sm"
                                        disabled={isLoading}
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {disabled && messages.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-8">
                            Upload and analyze a contract first to start chatting
                        </p>
                    )}

                    <AnimatePresence>
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className={cn(
                                    "flex",
                                    message.role === "user" ? "justify-end" : "justify-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "max-w-[80%] rounded-lg p-4 space-y-2",
                                        message.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                    )}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                                    {/* Citations */}
                                    {message.citations && message.citations.length > 0 && (
                                        <div className="space-y-2 pt-2 border-t border-white/10">
                                            <p className="text-xs font-semibold opacity-70">
                                                Citations:
                                            </p>
                                            {message.citations.map((citation, i) => (
                                                <div
                                                    key={i}
                                                    className="text-xs p-2 rounded bg-black/20 space-y-1"
                                                >
                                                    <button
                                                        onClick={() => onViewPage?.(citation.page)}
                                                        className="flex items-center gap-1 hover:text-primary transition-colors"
                                                    >
                                                        <ExternalLink className="h-3 w-3" />
                                                        <span>Page {citation.page}</span>
                                                    </button>
                                                    <p className="italic opacity-70 line-clamp-2">
                                                        &quot;{citation.excerpt}&quot;
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Loading Indicator */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start"
                        >
                            <div className="bg-muted rounded-lg p-4 flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">Thinking...</span>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                    <Input
                        placeholder="Ask about your contract..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading || disabled}
                        className="flex-1"
                    />
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading || disabled}
                        size="icon"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
