import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScamGPT | Cyber Intelligence Platform",
  description: "Cognitive AI security platform for real-time scam detection and analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased flex min-h-screen bg-[#060910] overflow-hidden font-sans selection:bg-primary/30 selection:text-white">
        {/* Cybersecurity Overlays */}
        <div className="scanline" />
        <div className="fixed inset-0 pointer-events-none radar-grid z-0 opacity-20" />

        <Sidebar />

        <main className="flex-1 min-w-0 relative h-screen overflow-y-auto custom-scrollbar z-10">
          <div className="relative w-full min-h-full">
            {children}
          </div>
        </main>

        {/* Decorative Data Flows */}
        <div className="data-flow left-[10%] opacity-10" style={{ animationDelay: '0s' }} />
        <div className="data-flow left-[85%] opacity-10" style={{ animationDelay: '1.5s' }} />
      </body>
    </html>
  );
}
