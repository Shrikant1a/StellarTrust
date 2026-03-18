"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useWallet } from "@/components/WalletProvider";
import { getProjects, Project } from "@/lib/store";
import { motion } from "framer-motion";
import { Plus, Briefcase, ChevronRight, Clock, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const { address } = useWallet();
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"client" | "freelancer">("client");

  useEffect(() => {
    if (address) {
      setProjects(getProjects());
    }
  }, [address]);

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h2 className="text-3xl font-bold mb-4">You need to connect your wallet first</h2>
        <p className="text-gray-400">Join the decentralized escrow ecosystem to manage your projects.</p>
      </div>
    );
  }

  const clientProjects = projects.filter((p) => p.creator === address);
  const freelancerProjects = projects.filter((p) => p.freelancer === address);

  const displayedProjects = activeTab === "client" ? clientProjects : freelancerProjects;

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Your Dashboard</h1>
          <p className="text-gray-400">Manage your milestone-based payments securely.</p>
        </div>
        <Link
          href="/create-project"
          className="flex items-center gap-2 bg-accent hover:bg-accent-light px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 shadow-[0_4px_20px_rgba(108,92,231,0.3)]"
        >
          <Plus size={20} /> New Project
        </Link>
      </div>

      <div className="flex bg-card border border-border rounded-xl p-1 mb-8 w-max">
        <button
          onClick={() => setActiveTab("client")}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "client" ? "bg-accent text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          I am Hiring ({clientProjects.length})
        </button>
        <button
          onClick={() => setActiveTab("freelancer")}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === "freelancer" ? "bg-accent text-white shadow" : "text-gray-400 hover:text-white"
          }`}
        >
          I am Working ({freelancerProjects.length})
        </button>
      </div>

      {displayedProjects.length === 0 ? (
        <div className="text-center py-20 bg-card/30 border border-border/50 border-dashed rounded-3xl">
          <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-gray-500">
            {activeTab === "client"
              ? "Create a New Project to securely hire freelancers."
              : "Share your address with clients to get hired."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((p, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={p.id}
            >
              <Link href={`/project/${p.id}`} className="block group">
                <div className="bg-card border border-border hover:border-accent p-6 rounded-2xl transition-all hover:shadow-[0_10px_30px_rgba(108,92,231,0.1)] group-hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      p.status === "Funded" ? "border-green-500/30 text-green-400 bg-green-500/10" :
                      p.status === "Draft" ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/10" :
                      p.status === "Completed" ? "border-blue-500/30 text-blue-400 bg-blue-500/10" :
                      p.status === "Disputed" ? "border-red-500/30 text-red-400 bg-red-500/10" :
                      "border-accent/30 text-accent bg-accent/10"
                    }`}>
                      {p.status}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Clock size={12} /> {new Date(p.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-accent-light transition-all">
                    {p.title}
                  </h3>
                  
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Value (XLM)</span>
                      <span className="font-semibold text-white">{p.totalAmount}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-border pt-3">
                      <span className="text-gray-500">Milestones</span>
                      <span className="flex items-center gap-1 text-gray-300">
                        <CheckCircle size={14} className="text-accent" />
                        {p.milestones.filter(m => m.approved).length} / {p.milestones.length}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
