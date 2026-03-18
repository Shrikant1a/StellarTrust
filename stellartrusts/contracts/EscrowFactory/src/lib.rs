#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, symbol_short};

#[contract]
pub struct EscrowFactoryContract;

#[contractimpl]
impl EscrowFactoryContract {
    pub fn create_escrow(env: Env, client: Address, freelancer: Address, arbitrator: Address, amount: i128) -> String {
        client.require_auth();
        // MVP: Instead of dynamically deploying an instance (which requires Wasm hash), we just log the event.
        // A full implementation would use `env.deployer().with_current_contract(wasm_hash).deploy(...)`
        env.events().publish((symbol_short!("created"), client.clone()), (freelancer, arbitrator, amount));
        
        // Return a mock ID for the MVP
        String::from_str(&env, "ESCROW_1234")
    }
}
