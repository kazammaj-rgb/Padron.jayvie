import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-scene relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <span className="not-found-number" aria-hidden="true">404</span>

      <section className="glass-panel-strong w-full max-w-2xl p-8 text-center md:p-12">
        <p className="font-mono text-sm uppercase tracking-[0.35em] text-accent">
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
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <a href="/cv.pdf" className="btn-outline">
            Open CV
          </a>
        </div>
      </section>
    </main>
  );
}
