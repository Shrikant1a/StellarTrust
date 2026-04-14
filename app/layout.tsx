import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono, Outfit } from "next/font/google";
import "./globals.css";
import DashboardLayout from "../components/DashboardLayout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trustlance | Secure Milestone Escrow on Stellar",
  description: "The premier decentralized cross-border milestone escrow platform built on Stellar Soroban. Secure, fast, and trustless payments for freelancers and clients.",
  keywords: ["Stellar", "Soroban", "Escrow", "Freelancing", "Smart Contracts", "Web3", "Blockchain"],
  authors: [{ name: "Trustlance Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col m-0 overflow-hidden" style={{ fontFamily: 'var(--font-outfit), var(--font-inter), sans-serif' }}>
        <DashboardLayout>
          {children}
        </DashboardLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
