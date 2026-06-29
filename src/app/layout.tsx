import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import AIChatWidget from "@/components/ai-chat-widget";
import { SiteChrome } from "@/components/site-chrome";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VidhiSahayak | AI-Powered Legal Copilot Platform",
    template: "%s | VidhiSahayak",
  },
  description:
    "VidhiSahayak — India's AI-powered legal assistance copilot. Get legal guidance, generate ready-to-print documents, and consult verified lawyers in any Indian language.",
  keywords: [
    "legal assistant",
    "India",
    "legal documents",
    "lawyer consultation",
    "affidavit",
    "rental agreement",
    "AI legal help",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {/* Skip to main content — keyboard/screen-reader accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#0E1116] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>

        <div className="flex min-h-screen flex-col bg-white">
          <SiteChrome navbar={<Navbar />} footer={<Footer />} widget={<AIChatWidget />}>
            {children}
          </SiteChrome>
        </div>
      </body>
    </html>
  );
}
