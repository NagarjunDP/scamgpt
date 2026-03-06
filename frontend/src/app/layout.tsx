import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shield AI | Cognitive Cyber Defense",
  description: "Advanced AI-powered platform to detect phishing, scams, and fraud.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased flex min-h-screen bg-background overflow-hidden font-sans">
        <div className="scan-line" />
        <Sidebar />
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
