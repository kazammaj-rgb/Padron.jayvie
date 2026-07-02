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
      priority
      onError={() => setSrc(FALLBACK)}
    />
  );
}
