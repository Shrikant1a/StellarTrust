"use client";

import Link from "next/link";
import { useWallet } from "./WalletProvider";
import { Copy, LogOut, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const { address, connectWallet, disconnectWallet } = useWallet();

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="border-b border-border/50 bg-black/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(108,92,231,0.5)] group-hover:scale-105 transition-transform">
            ST
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-accent-light transition-colors">
            Stellar<span className="text-accent-light">Trust</span>
          </span>
        </Link>
        <div className="flex items-center gap-6">
          {address && (
            <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Dashboard
            </Link>
          )}
          {address ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-300">{shortenAddress(address)}</span>
              </div>
              <button
                onClick={disconnectWallet}
                className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-400/10"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={connectWallet}
              className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white font-medium rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(108,92,231,0.4)] transition-colors"
            >
              <Wallet size={18} />
              Connect Wallet
            </motion.button>
          )}
        </div>
      </div>
    </nav>
  );
}
