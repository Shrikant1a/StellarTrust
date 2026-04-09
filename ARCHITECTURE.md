# Trustlance Architecture

Trustlance is a decentralized cross-border milestone escrow platform built on the Stellar network using Soroban smart contracts. It enables secure, trustless payments between a client and a freelancer, with an arbiter available in case of disputes.

## Smart Contract Design

The core of Trustlance is the `TrustlanceEscrowContract`, deployed on Stellar via Soroban. 
- **Contract ID:** `CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y`
- **Network:** Stellar Testnet
- **Explorer:** [View on Stellar.Expert](https://stellar.expert/explorer/testnet/contract/CBYNQF3RPZ2QNLUXS4BSGSC3CGXAXHPU32H7NMUIFJETYOR524SF6Y6Y)

### Data Structures

- **Project**: Represents a job contract between a client and a freelancer. It contains:
  - `id`: Unique identifier
  - `client`: Address of the client
  - `freelancer`: Address of the freelancer
  - `arbiter`: Address of a trusted third party capable of resolving disputes
  - `token`: The Stellar token asset used for payment (e.g., USDC)
  - `total_budget`: The total amount locked in the contract
  - `milestones`: A list of milestones representing individual deliverables and their corresponding payment amounts.
  - `status`: The current status of the project (Created, Funded, InProgress, Dispute, Resolved, Completed).

- **Milestone**: Represents a deliverable block. Contains:
  - `description`: Text description of the milestone.
  - `amount`: Token amount to be released upon completion.
  - `is_funded`: Whether funds have been allocated.
  - `is_approved`: Whether the client has approved the milestone.
  - `is_disputed`: Whether this milestone is currently under dispute.

### User Flow

1. **Project Creation** (`create_project`): The client initiates a project, specifying the freelancer, arbiter, the token to use, and a list of milestones with descriptions and amounts.
2. **Funding** (`deposit_funds`): The client deposits the `total_budget` into the smart contract. The project state shifts to `Funded`.
3. **Milestone Completion & Release** (`release_milestone`): As the freelancer delivers work, the client approves milestones. Approving a milestone releases its targeted `amount` directly to the freelancer. This turns the status into `InProgress`, and eventually `Completed` once all milestones are approved.
4. **Dispute Mechanism** (`raise_dispute`, `resolve_dispute`): If a disagreement occurs, either party can raise a dispute on a specific milestone. This flags `is_disputed = true`. The designated `arbiter` has the authority to resolve the dispute, choosing to either release the milestone funds to the freelancer (`resolve_to_freelancer = true`) or refund the client (`resolve_to_freelancer = false`).

### Access Control & Security

- Only the client can fund the total budget and release milestones.
- Anyone can raise a dispute, but only the designated `arbiter` can execute the resolution.
- Funds are tightly scoped to their associated milestone amounts, mitigating the risk of overdraws.
- `require_auth()` is used on the relevant Soroban SDK `Address` instances to enforce permissions at the protocol level.

## Frontend Next.js Application

The frontend is built with Next.js App Router and interacts with the Soroban smart contract. 
- **Wallet Connection**: Connects to Stellar wallets (like Freighter).
- **Dashboard**: Displays active, funded, or completed projects.
- **Project Detail**: Allows the client to release funds or raise disputes, and allows the freelancer to view the current status of the contract.
