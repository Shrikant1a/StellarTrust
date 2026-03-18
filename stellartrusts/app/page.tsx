"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Globe, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/components/WalletProvider";

export default function Home() {
  const { address, connectWallet } = useWallet();

  const router = useRouter();

  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent-light" />,
      title: "Multi-Signature Escrow",
      desc: "Funds are securely locked in Soroban smart contracts. Release requires approvals from both parties."
    },
    {
      icon: <Layers className="w-8 h-8 text-accent-light" />,
      title: "Milestone-Based",
      desc: "Break down massive projects. Freelancers get paid per milestone completed, ensuring trust step-by-step."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent-light" />,
      title: "Gasless UX",
      desc: "No need for Stellar network fees. Relayers abstract the complexity so users just sign and go."
    },
    {
      icon: <Globe className="w-8 h-8 text-accent-light" />,
      title: "Decentralized Disputes",
      desc: "Impartial arbitration handled transparently on-chain. Fair resolution for any disagreements."
    }
  ];

  const handleCardClick = () => {
    if (address) {
      router.push("/dashboard");
    } else {
      connectWallet();
    }
  };

  return (
    <div className="flex flex-col items-center pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-sm font-medium text-accent-light tracking-wide">Live on Stellar Testnet</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8">
          Trustless <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">Escrow</span>
          <br className="hidden md:block" /> for the Future
        </h1>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Connect your Stellar wallet and create secure, milestone-based payments with freelancers or clients anywhere in the world.
        </p>

        <div className="flex items-center justify-center gap-6">
          {address ? (
            <Link href="/dashboard" className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all">
              <span className="relative z-10 flex items-center gap-2">
                Launch Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ) : (
            <button
              onClick={connectWallet}
              className="group relative px-8 py-4 bg-accent font-bold rounded-full overflow-hidden shadow-[0_0_30px_rgba(108,92,231,0.4)] hover:scale-105 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                Connect Wallet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
      >
        {features.map((feature, idx) => (
          <button
            key={idx}
            onClick={handleCardClick}
            className="p-8 rounded-2xl bg-card/60 border border-border/50 hover:border-accent/40 backdrop-blur-md transition-all hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(108,92,231,0.1)] group relative overflow-hidden text-left cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/20 transition-all" />
            <div className="mb-6 bg-black/50 w-16 h-16 rounded-xl flex items-center justify-center border border-border shadow-inner">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {feature.desc}
            </p>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
