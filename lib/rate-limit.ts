// In-memory rate limiting (use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const MAX_REQUESTS_PER_HOUR = parseInt(process.env.RATE_LIMIT_PER_HOUR || "10", 10);
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(identifier, {
            count: 1,
            resetTime: now + WINDOW_MS,
        });
        return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - 1 };
    }

    if (record.count >= MAX_REQUESTS_PER_HOUR) {
        return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - record.count };
}

export function getRateLimitInfo(identifier: string): { remaining: number; resetTime: number } {
    const record = rateLimitMap.get(identifier);
    if (!record || Date.now() > record.resetTime) {
        return { remaining: MAX_REQUESTS_PER_HOUR, resetTime: Date.now() + WINDOW_MS };
    }
    return {
        remaining: MAX_REQUESTS_PER_HOUR - record.count,
        resetTime: record.resetTime,
    };
}
