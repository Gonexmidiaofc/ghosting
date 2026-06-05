"use client"

export function Footer() {
  return (
    <footer className="relative py-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-foreground">GHOSTING</span>
              <span className="text-primary">.ADS</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center">
            © 2026 GHOSTING.ADS — Infraestrutura para operações digitais de escala.
          </p>
        </div>
      </div>
    </footer>
  )
}
