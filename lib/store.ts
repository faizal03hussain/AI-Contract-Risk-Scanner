import { create } from "zustand";
import { ContractAnalysis, ChatMessage } from "./schema";

interface AppState {
    // PDF State
    pdfFile: File | null;
    pdfText: string;
    pdfPages: { page: number; text: string }[];
    currentPage: number;

    // Analysis State
    analysis: ContractAnalysis | null;
    isAnalyzing: boolean;
    analysisError: string | null;

    // Chat State
    chatMessages: ChatMessage[];
    isChatting: boolean;

    // UI State
    selectedClauseId: string | null;
    activeTab: string;

    // Actions
    setPdfFile: (file: File | null) => void;
    setPdfText: (text: string, pages: { page: number; text: string }[]) => void;
    setCurrentPage: (page: number) => void;
    setAnalysis: (analysis: ContractAnalysis | null) => void;
    setIsAnalyzing: (isAnalyzing: boolean) => void;
    setAnalysisError: (error: string | null) => void;
    addChatMessage: (message: ChatMessage) => void;
    setIsChatting: (isChatting: boolean) => void;
    setSelectedClauseId: (id: string | null) => void;
    setActiveTab: (tab: string) => void;
    reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    // Initial State
    pdfFile: null,
    pdfText: "",
    pdfPages: [],
    currentPage: 1,
    analysis: null,
    isAnalyzing: false,
    analysisError: null,
    chatMessages: [],
    isChatting: false,
    selectedClauseId: null,
    activeTab: "overview",

    // Actions
    setPdfFile: (file) => set({ pdfFile: file }),
    setPdfText: (text, pages) => set({ pdfText: text, pdfPages: pages }),
    setCurrentPage: (page) => set({ currentPage: page }),
    setAnalysis: (analysis) => set({ analysis }),
    setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
    setAnalysisError: (error) => set({ analysisError: error }),
    addChatMessage: (message) =>
        set((state) => ({ chatMessages: [...state.chatMessages, message] })),
    setIsChatting: (isChatting) => set({ isChatting }),
    setSelectedClauseId: (id) => set({ selectedClauseId: id }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    reset: () =>
        set({
            pdfFile: null,
            pdfText: "",
            pdfPages: [],
            currentPage: 1,
            analysis: null,
            isAnalyzing: false,
            analysisError: null,
            chatMessages: [],
            isChatting: false,
            selectedClauseId: null,
            activeTab: "overview",
        }),
}));
