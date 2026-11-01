"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ImageViewerProps {
  src: string;
  alt: string;
  className?: string;
  children: ReactNode;
}

export function ImageViewer({ src, alt, className, children }: ImageViewerProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <>
      <button ref={triggerRef} type="button" className={className} onClick={() => setOpen(true)}
        aria-label={`View image: ${alt}`} aria-haspopup="dialog">
        {children}
      </button>
      {open && createPortal(
        <dialog ref={dialogRef} className="image-viewer fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 p-4 text-white open:flex open:items-center open:justify-center"
          aria-label={alt} onCancel={(event) => { event.preventDefault(); setOpen(false); }}
          onClick={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <button type="button" className="image-viewer-close absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full"
            onClick={() => setOpen(false)} aria-label="Close image viewer" autoFocus>
            <X className="h-6 w-6" />
          </button>
          {/* Full-resolution originals stay unchanged in the viewer. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="max-h-[88dvh] max-w-[94vw] object-contain" />
        </dialog>, document.body
      )}
    </>
  );
}
