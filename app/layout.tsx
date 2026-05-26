import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Chatbot } from "@/components/chat/Chatbot";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eman Iqbal — Agentic AI & Fullstack Developer",
  description: "Automate Intelligent Workflows. Bridging Sociology research with Agentic AI development. Final Year Student building the future of human-AI collaboration.",
  keywords: ["Agentic AI", "Fullstack Developer", "n8n", "RAG", "React", "Next.js", "Sociology"],
  authors: [{ name: "Eman Iqbal" }],
  openGraph: {
    title: "Eman Iqbal — Agentic AI & Fullstack Developer",
    description: "Automate Intelligent Workflows",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <div className="grain-overlay" />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
