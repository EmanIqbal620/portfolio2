import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import dynamic from "next/dynamic";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const Chatbot = dynamic(() => import("@/components/chat/Chatbot").then((m) => ({ default: m.Chatbot })), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor").then((m) => ({ default: m.CustomCursor })), { ssr: false });

const siteUrl = 'https://emaniqbal.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Eman Iqbal — Agentic AI & Fullstack Developer",
  description: "Agentic AI Developer & Fullstack Engineer. Building autonomous AI systems and scalable web applications — multi-agent workflows, RAG pipelines, and production-ready fullstack apps.",
  keywords: ["Agentic AI", "Fullstack Developer", "AI Engineer", "Next.js", "React", "TypeScript", "FastAPI", "RAG", "Portfolio"],
  authors: [{ name: "Eman Iqbal", url: siteUrl }],
  creator: "Eman Iqbal",
  openGraph: {
    title: "Eman Iqbal — Agentic AI & Fullstack Developer",
    description: "Building autonomous AI systems and scalable web applications.",
    url: siteUrl,
    siteName: "Eman Iqbal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eman Iqbal — Agentic AI & Fullstack Developer",
    description: "Building autonomous AI systems and scalable web applications.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

const criticalCSS = `
body { background: #000; color: #fff; margin: 0; }
#init-splash {
  position: fixed; inset: 0; z-index: 999999;
  display: flex; align-items: center; justify-content: center;
  background: #000;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
#init-splash.hidden { opacity: 0; visibility: hidden; pointer-events: none; }
#init-splash h1 {
  font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 900;
  color: #fff; margin: 0; letter-spacing: -0.03em;
}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link rel="preconnect" href="https://vercel.live" />
      </head>
      <body className="antialiased">
        <div id="init-splash">
          <h1>EMAN IQBAL</h1>
        </div>
        <div className="grain-overlay" />
        <div className="vignette" />
        <div className="atmos-glow" />
        <ScrollProgress />
        {children}
        <Chatbot />
        <CustomCursor />
      </body>
    </html>
  );
}
