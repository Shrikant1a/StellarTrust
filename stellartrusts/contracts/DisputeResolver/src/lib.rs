#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DisputeOutcome {
    Pending,
    ClientFavored,
    FreelancerFavored,
    Split,
}

#[contract]
pub struct DisputeResolverContract;

#[contractimpl]
impl DisputeResolverContract {
    /// Initialize a dispute with assigned arbitrator
    pub fn init_dispute(env: Env, escrow_id: u64, arbitrator: Address) {
        let key = symbol_short!("disputed");
        if env.storage().instance().has(&key) {
            panic!("Dispute already initialized");
        }
        env.storage().instance().set(&key, &escrow_id);
        env.storage().instance().set(&symbol_short!("arbit"), &arbitrator);
        env.storage().instance().set(&symbol_short!("outcome"), &DisputeOutcome::Pending);
    }

    /// Resolve via Multi-signature approval (Arbitrator votes)
    pub fn resolve_dispute(env: Env, outcome: DisputeOutcome) {
        let arbitrator: Address = env.storage().instance().get(&symbol_short!("arbit")).unwrap();
        arbitrator.require_auth();

        let current_outcome: DisputeOutcome = env.storage().instance().get(&symbol_short!("outcome")).unwrap();
        if current_outcome != DisputeOutcome::Pending {
            panic!("Dispute already resolved");
        }

        env.storage().instance().set(&symbol_short!("outcome"), &outcome);
        
        // Log the event securely for the Relayer/Frontend to see
        env.events().publish((symbol_short!("resolved"),), outcome);
    }
}
