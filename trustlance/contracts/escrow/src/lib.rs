#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, String, token, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ProjectStatus {
    Created,
    Funded,
    InProgress,
    Dispute,
    Resolved,
    Completed,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Milestone {
    pub description: String,
    pub amount: i128,
    pub is_funded: bool,
    pub is_approved: bool,
    pub is_disputed: bool,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Project {
    pub id: u64,
    pub client: Address,
    pub freelancer: Address,
    pub arbiter: Address,
    pub token: Address,
    pub total_budget: i128,
    pub milestones: Vec<Milestone>,
    pub status: ProjectStatus,
}

#[contracttype]
pub enum DataKey {
    Project(u64),
    ProjectCount,
}

#[contract]
pub struct TrustlanceEscrowContract;

#[contractimpl]
impl TrustlanceEscrowContract {
    /// Initialize a new project with its milestones.
    pub fn create_project(
        env: Env,
        client: Address,
        freelancer: Address,
        arbiter: Address,
        token: Address,
        total_budget: i128,
        milestones: Vec<Milestone>,
    ) -> u64 {
        client.require_auth();

        let mut count: u64 = env.storage().instance().get(&DataKey::ProjectCount).unwrap_or(0);
        count += 1;

        let project = Project {
            id: count,
            client,
            freelancer,
            arbiter,
            token,
            total_budget,
            milestones,
            status: ProjectStatus::Created,
        };

        env.storage().persistent().set(&DataKey::Project(count), &project);
        env.storage().instance().set(&DataKey::ProjectCount, &count);

        count
    }

    /// Client deposits the total budget for the project into the contract.
    pub fn deposit_funds(env: Env, project_id: u64) {
        let mut project: Project = env.storage().persistent().get(&DataKey::Project(project_id)).unwrap();
        project.client.require_auth();

        let token_client = token::Client::new(&env, &project.token);
        token_client.transfer(&project.client, &env.current_contract_address(), &project.total_budget);

        project.status = ProjectStatus::Funded;
        env.storage().persistent().set(&DataKey::Project(project_id), &project);
    }

    /// Client releases a specific milestone payment to the freelancer.
    pub fn release_milestone(env: Env, project_id: u64, milestone_index: u32) {
        let mut project: Project = env.storage().persistent().get(&DataKey::Project(project_id)).unwrap();
        project.client.require_auth();

        let mut milestone = project.milestones.get(milestone_index).unwrap();
        if milestone.is_approved {
            panic!("Milestone already approved");
        }
        if milestone.is_disputed {
            panic!("Milestone is under dispute");
        }

        milestone.is_approved = true;

        let token_client = token::Client::new(&env, &project.token);
        token_client.transfer(&env.current_contract_address(), &project.freelancer, &milestone.amount);

        project.milestones.set(milestone_index, milestone);
        project.status = ProjectStatus::InProgress;

        // Check if all milestones are approved
        let mut all_approved = true;
        for m in project.milestones.iter() {
            if !m.is_approved {
                all_approved = false;
                break;
            }
        }

        if all_approved {
            project.status = ProjectStatus::Completed;
        }

        env.storage().persistent().set(&DataKey::Project(project_id), &project);
    }

    /// Raise a dispute for a specific milestone. Can be called by anyone (client/freelancer)
    pub fn raise_dispute(env: Env, project_id: u64, milestone_index: u32) {
        let mut project: Project = env.storage().persistent().get(&DataKey::Project(project_id)).unwrap();
        
        project.status = ProjectStatus::Dispute;
        let mut milestone = project.milestones.get(milestone_index).unwrap();
        milestone.is_disputed = true;
        project.milestones.set(milestone_index, milestone);

        env.storage().persistent().set(&DataKey::Project(project_id), &project);
    }

    /// Arbiter resolves the dispute. Sends funds to freelancer if true, refunds client if false.
    pub fn resolve_dispute(env: Env, project_id: u64, milestone_index: u32, resolve_to_freelancer: bool) {
        let mut project: Project = env.storage().persistent().get(&DataKey::Project(project_id)).unwrap();
        project.arbiter.require_auth();

        let mut milestone = project.milestones.get(milestone_index).unwrap();
        if !milestone.is_disputed {
            panic!("Milestone not disputed");
        }

        let token_client = token::Client::new(&env, &project.token);
        milestone.is_disputed = false;

        if resolve_to_freelancer {
            milestone.is_approved = true;
            token_client.transfer(&env.current_contract_address(), &project.freelancer, &milestone.amount);
        } else {
            // Refund to client
            token_client.transfer(&env.current_contract_address(), &project.client, &milestone.amount);
        }

        project.milestones.set(milestone_index, milestone);
        project.status = ProjectStatus::Resolved;

        env.storage().persistent().set(&DataKey::Project(project_id), &project);
    }

    /// Read-only accessor to get a project's state
    pub fn get_project(env: Env, project_id: u64) -> Project {
        env.storage().persistent().get(&DataKey::Project(project_id)).unwrap()
    }
}
