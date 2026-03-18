"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/components/WalletProvider";
import { Project, Milestone, saveProject } from "@/lib/store";
import { motion } from "framer-motion";
import { Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react";

export default function CreateProject() {
  const router = useRouter();
  const { address } = useWallet();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [freelancer, setFreelancer] = useState("");
  const [arbitrator, setArbitrator] = useState("");
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "m1", description: "", amount: 0, completed: false, approved: false },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = milestones.reduce((sum, m) => sum + Number(m.amount), 0);

  const handleAddMilestone = () => {
    setMilestones([
      ...milestones,
      { id: `m${Date.now()}`, description: "", amount: 0, completed: false, approved: false },
    ]);
  };

  const handleRemoveMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const handleChange = (id: string, field: keyof Milestone, value: any) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert("Connect wallet first!");

    setIsSubmitting(true);
    
    // Simulating Gasless UX Escrow Deposit Transaction
    await new Promise((resolve) => setTimeout(resolve, 2500)); 

    const project: Project = {
      id: `proj_${Date.now()}`,
      creator: address,
      freelancer,
      arbitrator: arbitrator || "GASLESS_RELAYER_ARBITRATOR_ADDRESS",
      title,
      description: desc,
      totalAmount,
      milestones,
      status: "Funded",
      createdAt: Date.now(),
    };

    saveProject(project);
    setIsSubmitting(false);
    router.push(`/project/${project.id}`);
  };

  if (!address) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Please Connect your Wallet to create a project</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-card border border-border/50 rounded-3xl p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <h1 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Create New Project
        </h1>
        <p className="text-gray-500 mb-8">Deploy a multi-signature smart contract escrow.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Project Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. DApp Dashboard Development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Freelancer Wallet Address</label>
              <input
                required
                type="text"
                value={freelancer}
                onChange={(e) => setFreelancer(e.target.value)}
                className="w-full bg-black border border-border rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="G..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Arbitrator Address (Optional)</label>
              <input
                type="text"
                value={arbitrator}
                onChange={(e) => setArbitrator(e.target.value)}
                className="w-full bg-black border border-border rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="G..."
              />
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Milestones</h3>
              <button
                type="button"
                onClick={handleAddMilestone}
                className="flex items-center gap-1 text-sm text-accent hover:text-accent-light transition-colors"
              >
                <Plus size={16} /> Add 
              </button>
            </div>

            <div className="space-y-4">
              {milestones.map((m, index) => (
                <div key={m.id} className="flex gap-4 items-start p-4 bg-black/40 border border-border/80 rounded-2xl relative group">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button type="button" onClick={() => handleRemoveMilestone(m.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex-grow space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Milestone {index + 1} Name</label>
                      <input
                        required
                        type="text"
                        value={m.description}
                        onChange={(e) => handleChange(m.id, "description", e.target.value)}
                        className="w-full bg-transparent border-b border-border px-0 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                        placeholder="e.g. Design Wireframes"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Amount (XLM)</label>
                      <input
                        required
                        type="number"
                        min="0"
                        value={m.amount}
                        onChange={(e) => handleChange(m.id, "amount", Number(e.target.value))}
                        className="w-full bg-transparent border-b border-border px-0 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center bg-accent/5 p-4 rounded-xl border border-accent/20">
              <span className="font-medium text-gray-300">Total Escrow Amount:</span>
              <span className="text-2xl font-bold text-accent">{totalAmount} XLM</span>
            </div>
          </div>

          <div className="pt-8">
             <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-accent hover:bg-accent-light text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Deploying Escrow (Gasless)...
                </>
              ) : (
                "Fund Escrow & Create Project"
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
}
