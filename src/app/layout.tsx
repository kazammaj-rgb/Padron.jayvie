import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayvie Padron | BS IT Portfolio",
  description:
    "Futuristic portfolio of Jayvie Padron — BS Information Technology student, web developer, UI/UX designer, musician, and creative leader.",
  keywords: [
    "Jayvie Padron",
    "Portfolio",
    "Information Technology",
    "Web Developer",
    "UI/UX",
    "Mobile Deveoper",
    "Musicians"
  ],
  authors: [{ name: "Jayvie Padron" }],
  openGraph: {
    title: "Jayvie Padron | Portfolio",
    description:
      "Premium AI-inspired portfolio — technology, innovation, and digital experiences.",
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
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
