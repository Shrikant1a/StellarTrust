import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "StellarTrust - Decentralized Milestone Escrow",
  description: "Secure, milestone-based payments for freelancers and clients on the Stellar Network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen text-foreground bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#110e20] via-black to-black">
        <WalletProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}
