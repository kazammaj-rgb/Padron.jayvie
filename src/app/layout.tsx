import type { Metadata } from "next";
import "./globals.css";
import "./sections.css";
import "./motion.css";

export const metadata: Metadata = {
  title: "Jayvie Padron | BS IT Portfolio",
  description:
    "Portfolio of Jayvie Padron — BS Information Technology student, web developer, UI/UX designer, musician, and creative leader.",
  keywords: [
    "Jayvie Padron",
    "Portfolio",
    "Information Technology",
    "Web Developer",
    "UI/UX",
    "Mobile Developer",
    "Musicians"
  ],
  authors: [{ name: "Jayvie Padron" }],
  openGraph: {
    title: "Jayvie Padron | Portfolio",
    description:
      "Jayvie Padron — developer, designer, musician, and creative thinker. Explore my work, skills, and story.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark smooth-ui scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/syne-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('light',t==='light');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){}})()` }} />
        {children}
      </body>
    </html>
  );
}
