import { z } from "zod";

// Enum types
export const SeverityLevel = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]);
export type SeverityLevel = z.infer<typeof SeverityLevel>;

export const ClauseType = z.enum([
    "TERMINATION",
    "PAYMENT",
    "LIABILITY",
    "INDEMNITY",
    "IP",
    "CONFIDENTIALITY",
    "JURISDICTION",
    "DATA_PRIVACY",
    "WARRANTY",
    "NON_COMPETE",
    "INSURANCE",
    "DISPUTE_RESOLUTION",
    "OTHER",
]);
export type ClauseType = z.infer<typeof ClauseType>;

// Evidence schema
export const EvidenceSchema = z.object({
    page: z.number().int().min(1),
    excerpt: z.string(),
});
export type Evidence = z.infer<typeof EvidenceSchema>;

export const TopRiskSchema = z.object({
    title: z.string(),
    severity: SeverityLevel,
    reason: z.string(),
    page: z.number().int().min(1),
});
export type TopRisk = z.infer<typeof TopRiskSchema>;

// Risk summary schema
export const RiskSummarySchema = z.object({
    top_risks: z.array(TopRiskSchema),
    recommended_actions: z.array(z.string()),
});
export type RiskSummary = z.infer<typeof RiskSummarySchema>;

// Clause schema
export const ClauseSchema = z.object({
    clause_type: ClauseType,
    title: z.string(),
    severity: SeverityLevel,
    confidence: z.number().min(0).max(1),
    evidence: z.array(EvidenceSchema),
    why_risky: z.string(),
    suggested_rewrite: z.string(),
    negotiation_tip: z.string(),
});
export type Clause = z.infer<typeof ClauseSchema>;

// Contract analysis schema
export const ContractAnalysisSchema = z.object({
    contract_title: z.string(),
    language: z.string(),
    overall_risk_score: z.number().int().min(0).max(100),
    risk_summary: RiskSummarySchema,
    clauses: z.array(ClauseSchema),
});
export type ContractAnalysis = z.infer<typeof ContractAnalysisSchema>;

// Chat message schema
export const ChatMessageSchema = z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
    citations: z.array(EvidenceSchema).optional(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;
