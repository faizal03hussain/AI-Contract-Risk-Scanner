"use client";

import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingChatProps {
    onSendMessage: (message: string) => void;
    messages: Array<{ role: "user" | "assistant"; content: string }>;
    isLoading: boolean;
    disabled?: boolean;
}

export function FloatingChat({
    onSendMessage,
    messages,
    isLoading,
    disabled = false,
}: FloatingChatProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim() || disabled) return;
        onSendMessage(input);
        setInput("");
    };

    const suggestedQuestions = [
        "What are the payment terms?",
        "What are the termination clauses?",
        "Are there any liability caps?",
    ];

    return (
        <>
            {/* Floating Button */}
            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow relative"
                    disabled={disabled}
                >
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <>
                            <MessageSquare className="h-6 w-6" />
                            {messages.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                    {messages.length}
                                </span>
                            )}
                        </>
                    )}
                </Button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-background/95 backdrop-blur-lg border shadow-2xl rounded-lg flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Ask About Contract</h3>
                            </div>
                            {disabled && (
                                <p className="text-xs text-muted-foreground mt-1">
                                    Upload and analyze a contract first
                                </p>
                            )}
                        </div>

                        {/* Messages */}
                        <ScrollArea className="flex-1 p-4">
                            {messages.length === 0 ? (
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Try asking:
                                    </p>
                                    {suggestedQuestions.map((q, i) => (
                                        <Button
                                            key={i}
                                            variant="outline"
                                            size="sm"
                                            className="w-full justify-start text-xs"
                                            onClick={() => {
                                                setInput(q);
                                            }}
                                            disabled={disabled}
                                        >
                                            {q}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-lg px-3 py-2 ${msg.role === "user"
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted"
                                                    }`}
                                            >
                                                <p className="text-sm whitespace-pre-wrap">
                                                    {msg.content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-muted rounded-lg px-3 py-2">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                                                    <div
                                                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                                        style={{ animationDelay: "0.1s" }}
                                                    />
                                                    <div
                                                        className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                                                        style={{ animationDelay: "0.2s" }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </ScrollArea>

                        {/* Input */}
                        <div className="p-4 border-t">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Ask a question..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    disabled={disabled || isLoading}
                                    className="flex-1"
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={!input.trim() || disabled || isLoading}
                                    size="icon"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
