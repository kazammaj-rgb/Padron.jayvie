"use client";

import { ReactNode, useEffect, useState } from "react";
import { X } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
  children: ReactNode;
}

export function ImageViewer({ src, alt, className, children }: ImageViewerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
        aria-label={`View image: ${alt}`}
      >
        {children}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#292722] text-white transition-colors hover:bg-[#423b34] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d97757]"
            onClick={() => setOpen(false)}
            aria-label="Close image viewer"
            autoFocus
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[88vh] max-w-[94vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
