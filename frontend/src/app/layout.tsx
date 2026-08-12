import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import AIChatWidget from "@/components/ai-chat-widget";
import { AuthProvider } from "@/contexts/AuthContext";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      <body className={`${plusJakarta.variable} ${inter.variable} font-sans antialiased text-slate-800 bg-white`}>
        {/* Tricolor stripe — Brand Gradient */}
        <div className="tricolor-stripe" aria-hidden="true" />

        <AuthProvider>
          <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <AIChatWidget />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
