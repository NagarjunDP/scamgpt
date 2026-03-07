import type { Metadata } from "next";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { NotificationProvider } from "@/lib/NotificationContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScamGPT | Cybersecurity AI Platform",
  description:
    "Enterprise-grade cognitive AI security platform for real-time scam detection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased flex h-screen bg-[#0B0F19] overflow-hidden">
        <NotificationProvider>
          {/* Strict SaaS Layout Shell */}
          <Sidebar />

          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 overflow-y-auto scrollbar-thin bg-neural-grid">
              <div className="w-full h-full max-w-[1600px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
