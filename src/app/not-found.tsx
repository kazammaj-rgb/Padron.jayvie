import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <div className="mesh-bg fixed inset-0 -z-20" aria-hidden />
      <div className="noise-overlay fixed inset-0 -z-10 opacity-[0.03]" aria-hidden />

      <section className="glass-panel-strong w-full max-w-2xl p-8 text-center md:p-12">
        <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-400">
          Error 404
        </p>
        <h1 className="section-title mt-4">
          Page <span className="neon-text">Not Found</span>
        </h1>
        <p className="section-subtitle mx-auto">
          This URL is not handled by the app, or the resource you requested does
          not exist anymore.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="btn-primary premium-btn-glow">
            Return Home
          </Link>
          <a href="/cv.pdf" className="btn-outline premium-btn-glow">
            Open CV
          </a>
        </div>
      </section>
    </main>
  );
}
