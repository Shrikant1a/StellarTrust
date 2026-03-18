"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useWallet } from "@/components/WalletProvider";
import { getProjects, updateProject, Project, Milestone } from "@/lib/store";
import { CheckCircle, AlertTriangle, ShieldAlert, ArrowLeft, Send } from "lucide-react";
import { use } from "react";

export default function ProjectDetails(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const { address } = useWallet();
  const [project, setProject] = useState<Project | null>(null);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  useEffect(() => {
    const proj = getProjects().find((p) => p.id === params.id);
    if (proj) setProject(proj);
  }, [params.id]);

  if (!project) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  const isClient = project.creator === address;
  const isFreelancer = project.freelancer === address;
  const isArbitrator = project.arbitrator === address;

  const handleCompleteMilestone = async (mId: string) => {
    if (!isFreelancer) return;
    setLoadingAction(`complete_${mId}`);
    await new Promise(r => setTimeout(r, 1500)); // Simulate tx
    
    const updated = {
      ...project,
      milestones: project.milestones.map((m) =>
        m.id === mId ? { ...m, completed: true } : m
      ),
    };
    
    // Auto update status if first milestone completed
    if (updated.status === "Funded") {
      updated.status = "InProgress";
    }

    updateProject(updated);
    setProject(updated);
    setLoadingAction(null);
  };

  const handleApproveMilestone = async (mId: string) => {
    if (!isClient) return;
    setLoadingAction(`approve_${mId}`);
    await new Promise(r => setTimeout(r, 1500)); // Simulate tx

    const updated = {
      ...project,
      milestones: project.milestones.map((m) =>
        m.id === mId ? { ...m, approved: true } : m
      ),
    };

    // Check if all approved
    const allApproved = updated.milestones.every(m => m.approved);
    if (allApproved) {
      updated.status = "Completed";
    }

    updateProject(updated);
    setProject(updated);
    setLoadingAction(null);
  };

  const handleDispute = async () => {
    const confirm = window.confirm("Are you sure you want to raise a dispute? Escrow funds will be locked.");
    if (!confirm) return;
    setLoadingAction("dispute");
    await new Promise(r => setTimeout(r, 1500));

    const updated = { ...project, status: "Disputed" as const };
    updateProject(updated);
    setProject(updated);
    setLoadingAction(null);
  };

  const handleResolveDispute = async (refundClient: boolean) => {
    setLoadingAction("resolve");
    await new Promise(r => setTimeout(r, 1500));

    // Arbitrator logic
    const updated = { ...project, status: refundClient ? "Completed" as const : "Completed" as const };
    updateProject(updated);
    setProject(updated);
    setLoadingAction(null);
    alert(`Dispute resolved. Funds ${refundClient ? "returned to Client" : "sent to Freelancer"}.`);
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-card border border-border/50 rounded-3xl p-8 backdrop-blur-md mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2">{project.title}</h1>
            <p className="text-gray-400 text-sm">{project.description}</p>
          </div>
          <div className={`px-4 py-2 rounded-full font-bold text-sm border flex items-center gap-2 ${
            project.status === "Funded" ? "border-green-500/30 text-green-400 bg-green-500/10" :
            project.status === "InProgress" ? "border-blue-500/30 text-blue-400 bg-blue-500/10" :
            project.status === "Completed" ? "border-purple-500/30 text-purple-400 bg-purple-500/10" :
            project.status === "Disputed" ? "border-red-500/30 text-red-400 bg-red-500/10" :
            "border-accent/30 text-accent bg-accent/10"
          }`}>
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {project.status.toUpperCase()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/30 p-4 rounded-xl border border-border">
            <h4 className="text-xs text-gray-500 font-medium mb-1 uppercase">Client</h4>
            <div className="font-mono text-sm text-gray-300 break-all">{project.creator}</div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-border">
            <h4 className="text-xs text-gray-500 font-medium mb-1 uppercase">Freelancer</h4>
            <div className="font-mono text-sm text-gray-300 break-all">{project.freelancer}</div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-border">
            <h4 className="text-xs text-gray-500 font-medium mb-1 uppercase">Total Escrow</h4>
            <div className="font-bold text-xl text-accent">{project.totalAmount} XLM</div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-3xl p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Milestones Tracking</h2>
          {(isClient || isFreelancer) && project.status !== "Completed" && project.status !== "Disputed" && (
            <button 
              onClick={handleDispute}
              disabled={loadingAction === "dispute"}
              className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 border border-red-400/30 bg-red-400/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              {loadingAction === "dispute" ? "Processing..." : <><ShieldAlert size={14} /> Raise Dispute</>}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {project.milestones.map((m, index) => (
            <div key={m.id} className="p-5 border border-border bg-black/40 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-accent/20 text-accent text-xs font-bold px-2 py-0.5 rounded">M{index + 1}</span>
                  <h3 className="font-semibold text-lg">{m.description}</h3>
                </div>
                <div className="text-gray-400 text-sm font-medium">{m.amount} XLM</div>
              </div>

              <div className="flex items-center gap-3">
                {m.approved ? (
                  <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-4 py-2 rounded-xl font-medium border border-green-400/20">
                    <CheckCircle size={18} /> Released
                  </div>
                ) : m.completed ? (
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 text-sm flex items-center gap-1 font-medium bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/20">
                      <AlertTriangle size={14} /> Awaiting Approval
                    </span>
                    {isClient && project.status !== "Disputed" && (
                      <button
                        disabled={loadingAction === `approve_${m.id}`}
                        onClick={() => handleApproveMilestone(m.id)}
                        className="bg-accent hover:bg-accent-light text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                      >
                        {loadingAction === `approve_${m.id}` ? "Signing..." : "Approve & Release"}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500 text-sm font-medium border border-gray-700 bg-gray-900 px-3 py-1.5 rounded-lg">Pending Start</span>
                    {isFreelancer && project.status !== "Disputed" && (
                      <button
                        onClick={() => handleCompleteMilestone(m.id)}
                        disabled={loadingAction === `complete_${m.id}`}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-white/10 flex items-center gap-2"
                      >
                       <Send size={14} /> {loadingAction === `complete_${m.id}` ? "Tx Pending..." : "Mark Complete"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {project.status === "Disputed" && isArbitrator && (
           <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl">
             <h3 className="text-xl font-bold text-red-400 mb-2">Arbitrator Dashboard</h3>
             <p className="text-gray-300 text-sm mb-4">You have been assigned to review this dispute. Decide which party receives the locked funds.</p>
             <div className="flex gap-4">
                <button
                  onClick={() => handleResolveDispute(true)}
                  disabled={loadingAction === "resolve"}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium"
                >
                  Refund Client
                </button>
                <button
                  onClick={() => handleResolveDispute(false)}
                  disabled={loadingAction === "resolve"}
                  className="px-4 py-2 bg-red-400/20 border border-red-400 text-red-400 rounded-xl font-medium"
                >
                  Release to Freelancer
                </button>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
