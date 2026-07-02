## 2025-07-02 - Added Strict Content Security Policy (CSP)
**Vulnerability:** The static portfolio lacked a Content Security Policy (CSP), making it potentially vulnerable to Cross-Site Scripting (XSS) and data injection attacks.
**Learning:** For a purely static portfolio that does not fetch external assets (like external scripts, fonts, or images from CDNs), a strict CSP (`default-src 'self'`) is highly effective and simple to implement via a meta tag. It provides a strong defense-in-depth layer without breaking functionality.
**Prevention:** Always include a strict CSP for static sites by default, relaxing it only when absolutely necessary for explicitly required external dependencies.
