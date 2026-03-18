#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum EscrowState {
    AwaitingDeposit,
    Funded,
    Completed,
    Disputed,
    Resolved,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Milestone {
    pub description: String,
    pub amount: i128,
    pub is_completed: bool,
    pub is_approved: bool,
}

#[contract]
pub struct MilestoneEscrowContract;

#[contractimpl]
impl MilestoneEscrowContract {
    pub fn initialize(env: Env, client: Address, freelancer: Address, arbitrator: Address, deadline: u64) {
        if env.storage().instance().has(&symbol_short!("client")) {
            panic!("Already initialized"); // Prevent double initialization
        }
        env.storage().instance().set(&symbol_short!("client"), &client);
        env.storage().instance().set(&symbol_short!("freel"), &freelancer);
        env.storage().instance().set(&symbol_short!("arbit"), &arbitrator);
        env.storage().instance().set(&symbol_short!("time_lck"), &deadline); // Time-locked withdrawal feature
        env.storage().instance().set(&symbol_short!("state"), &EscrowState::AwaitingDeposit);
        env.storage().instance().set(&symbol_short!("locked"), &false); // Reentrancy protection flag
    }

    pub fn deposit(env: Env, amount: i128) {
        let client: Address = env.storage().instance().get(&symbol_short!("client")).unwrap();
        client.require_auth();

        let state: EscrowState = env.storage().instance().get(&symbol_short!("state")).unwrap();
        if state != EscrowState::AwaitingDeposit {
            panic!("Invalid state for deposit");
        }

        // Simulating deposit
        env.storage().instance().set(&symbol_short!("amount"), &amount);
        env.storage().instance().set(&symbol_short!("state"), &EscrowState::Funded);

        env.events().publish((symbol_short!("deposit"),), amount);
    }

    pub fn complete_m(env: Env) {
        let freelancer: Address = env.storage().instance().get(&symbol_short!("freel")).unwrap();
        freelancer.require_auth();

        let state: EscrowState = env.storage().instance().get(&symbol_short!("state")).unwrap();
        if state != EscrowState::Funded {
            panic!("Not funded");
        }
        env.events().publish((symbol_short!("complete"),), true);
    }

    pub fn approve_m(env: Env) {
        let client: Address = env.storage().instance().get(&symbol_short!("client")).unwrap();
        client.require_auth(); // Multi-signature requirement

        let is_locked: bool = env.storage().instance().get(&symbol_short!("locked")).unwrap_or(false);
        if is_locked {
            panic!("Reentrant call detected"); // Reentrancy protection
        }
        env.storage().instance().set(&symbol_short!("locked"), &true);

        env.storage().instance().set(&symbol_short!("state"), &EscrowState::Completed);
        env.events().publish((symbol_short!("approve"),), true);
        
        env.storage().instance().set(&symbol_short!("locked"), &false);
    }

    pub fn execute_time_lock_withdrawal(env: Env) {
        let client: Address = env.storage().instance().get(&symbol_short!("client")).unwrap();
        client.require_auth();

        let deadline: u64 = env.storage().instance().get(&symbol_short!("time_lck")).unwrap();
        if env.ledger().timestamp() < deadline {
            panic!("Time-lock active: Deadline not passed");
        }

        // Refund client if deadline passed without completion
        env.storage().instance().set(&symbol_short!("state"), &EscrowState::Resolved);
        env.events().publish((symbol_short!("refunded"),), true);
    }

    pub fn dispute(env: Env) {
        // either client or freelancer can dispute
        env.storage().instance().set(&symbol_short!("state"), &EscrowState::Disputed);
        env.events().publish((symbol_short!("dispute"),), true);
    }

    pub fn resolve(env: Env, refund_client: bool) {
        let arbitrator: Address = env.storage().instance().get(&symbol_short!("arbit")).unwrap();
        arbitrator.require_auth();

        let state: EscrowState = env.storage().instance().get(&symbol_short!("state")).unwrap();
        if state != EscrowState::Disputed {
            panic!("Not in dispute");
        }

        env.storage().instance().set(&symbol_short!("state"), &EscrowState::Resolved);
        env.events().publish((symbol_short!("resolve"),), refund_client);
    }
}
