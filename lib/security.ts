// Security utilities for protecting the application

// List of known malicious bot user agents
const BLOCKED_BOT_PATTERNS = [
  /curl/i,
  /wget/i,
  /python-requests/i,
  /scrapy/i,
  /httpclient/i,
  /java\//i,
  /libwww/i,
  /lwp-/i,
  /php\//i,
  /go-http-client/i,
  /node-fetch/i,
  /axios/i,
  /postman/i,
  /insomnia/i,
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /gobuster/i,
  /dirbuster/i,
  /wpscan/i,
  /burpsuite/i,
  /owasp/i,
  /acunetix/i,
  /nessus/i,
  /openvas/i,
  /metasploit/i,
  /hydra/i,
  /medusa/i,
  /patator/i,
]

// Suspicious path patterns that might indicate attacks
const SUSPICIOUS_PATHS = [
  /\.\.\//, // Path traversal
  /\.env/i, // Environment files
  /\.git/i, // Git directory
  /wp-admin/i, // WordPress admin
  /wp-login/i, // WordPress login
  /wp-content/i, // WordPress content
  /phpmy/i, // phpMyAdmin
  /phpmyadmin/i,
  /adminer/i,
  /\.php$/i, // PHP files
  /\.asp$/i, // ASP files
  /\.aspx$/i, // ASPX files
  /\.jsp$/i, // JSP files
  /shell/i, // Shell access attempts
  /cmd=/i, // Command injection
  /exec=/i, // Exec injection
  /eval\(/i, // Eval injection
  /base64/i, // Base64 encoded payloads
  /union.*select/i, // SQL injection
  /select.*from/i, // SQL injection
  /insert.*into/i, // SQL injection
  /drop.*table/i, // SQL injection
  /delete.*from/i, // SQL injection
  /<script/i, // XSS
  /javascript:/i, // XSS
  /onerror=/i, // XSS
  /onload=/i, // XSS
]

// Security headers configuration
export const SECURITY_HEADERS = {
  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",
  // Enable XSS protection
  "X-XSS-Protection": "1; mode=block",
  // Control referrer information
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Permissions Policy
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "interest-cohort=()",
  ].join(", "),
  // Strict Transport Security
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
}

// Check if user agent is a known malicious bot
export function isMaliciousBot(userAgent: string | null): boolean {
  if (!userAgent) return false // Allow requests without user agent in dev
  return BLOCKED_BOT_PATTERNS.some((pattern) => pattern.test(userAgent))
}

// Check if the path contains suspicious patterns
export function isSuspiciousPath(path: string): boolean {
  return SUSPICIOUS_PATHS.some((pattern) => pattern.test(path))
}

// Check if the request has suspicious headers
export function hasSuspiciousHeaders(headers: Headers): boolean {
  // Check for common attack patterns in headers
  const suspiciousHeaderValues = [
    /<script/i,
    /javascript:/i,
    /union.*select/i,
    /\.\.\//,
  ]

  for (const [, value] of headers.entries()) {
    if (suspiciousHeaderValues.some((pattern) => pattern.test(value))) {
      return true
    }
  }

  return false
}

// Simple in-memory rate limiter for edge middleware
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  ip: string,
  limit: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = ip

  let record = rateLimitStore.get(key)

  // Clean up expired entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (v.resetTime < now) {
        rateLimitStore.delete(k)
      }
    }
  }

  // Reset if window expired
  if (!record || record.resetTime < now) {
    record = { count: 1, resetTime: now + windowMs }
    rateLimitStore.set(key, record)
    return { allowed: true, remaining: limit - 1, resetTime: record.resetTime }
  }

  record.count++
  
  // Be more lenient - only block after 2x the limit
  if (record.count > limit * 2) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  return { allowed: true, remaining: Math.max(0, limit - record.count), resetTime: record.resetTime }
}

// Get client IP from request
export function getClientIP(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim()
  }
  
  const realIP = request.headers.get("x-real-ip")
  if (realIP) {
    return realIP
  }

  return "unknown"
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

// Generate a CSRF token
export function generateCSRFToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("")
}

// Validate password strength
export function isStrongPassword(password: string): { valid: boolean; message: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" }
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one uppercase letter" }
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one lowercase letter" }
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" }
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { valid: false, message: "Password must contain at least one special character" }
  }
  return { valid: true, message: "Password is strong" }
}
