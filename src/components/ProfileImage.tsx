"use client";

import Image from "next/image";
import { useState } from "react";

const PRIMARY = "/img/jvprofile.png";
const FALLBACK = "/profile-placeholder.svg";

export function ProfileImage({ className }: { className?: string }) {
  const [src, setSrc] = useState(PRIMARY);

  return (
    <Image
      src={src}
      alt="Jayvie Padron"
      fill
      className={className}
      sizes="(max-width: 767px) 280px, (max-width: 1199px) 30vw, 410px"
      priority
      onError={() => setSrc(FALLBACK)}
    />
  );
}
