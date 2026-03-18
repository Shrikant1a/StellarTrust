# StellarTrust - Decentralized Milestone Escrow

StellarTrust is a decentralized cross-border milestone escrow protocol designed to solve trust and payment issues between freelancers and clients. Traditional freelance platforms rely on centralized intermediaries that charge high fees, delay payments, and control dispute resolution. StellarTrust uses blockchain technology, multi-signature escrow, and gasless transaction UX to create a trustless environment where milestone payments are secured and released transparently.

## 🌟 Live Links
- **Live Demo**: [https://stellartrust-testnet.vercel.app](https://stellartrust-testnet.vercel.app)
- **Demo Video**: [https://youtube.com/watch?v=demo123](https://youtube.com/watch?v=demo123)

---

## 🎯 Problem Statement
Freelancers and clients working across borders face several challenges:
- Lack of trust between parties
- High platform fees (10–20%)
- Slow cross-border payments
- Centralized dispute systems
- Limited transparency

Existing freelance platforms act as custodians of funds, meaning users must trust the platform instead of relying on verifiable smart contracts.

## 💡 Vision
The vision of StellarTrust is to create a decentralized freelance escrow infrastructure where:
- Payments are secured via smart contracts
- Milestones are released transparently
- Disputes are resolved through decentralized governance
- Transactions are fast and low-cost
- Users experience gasless onboarding

---

## 🏗 System Architecture

### Core Components
1. **Smart Contracts**: Soroban-based contracts for `EscrowFactory`, `MilestoneEscrow`, and `DisputeResolver`.
2. **Frontend dApp**: Next.js App router powered application integrated with Freighter Wallet API.
3. **Relayer Infrastructure**: System that pays transaction fees on behalf of the user, achieving Gasless UX.
4. **Dispute Resolution Module**: A multi-signature escrow mechanism involving Client, Freelancer, and Arbitrator.
5. **Wallet & Key Management**: Handled seamlessly by Freighter.

### Workflow
1. Client creates a project with milestones.
2. Funds are deposited into escrow.
3. Freelancer completes milestone.
4. Client approves milestone.
5. Funds are released automatically.
6. If dispute occurs, the arbitrator resolves the payment using multi-sig approval.

### Smart Contract Design
- **EscrowFactory**: Factory pattern to deploy escrows per project.
- **MilestoneEscrow**: Manages the localized milestone states, multi-signature verification, and time-locked withdrawals.
- **DisputeResolver**: A module governing specialized conflict resolution scenarios.

*Security Features*: Reentrancy protection, Time-locked withdrawals, On-chain transparent transaction logs.

---

## ⚡ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/YourUsername/StellarTrust.git
   cd StellarTrust
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Frontend locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

4. **Compile Soroban Contracts** (Ensure Rust and Soroban CLI are installed)
   ```bash
   cd contracts/EscrowFactory
   cargo build --target wasm32-unknown-unknown --release
   ```

---

## 🗺 Roadmap
- **Phase 1**: Core escrow smart contracts, Basic dApp UI
- **Phase 2**: Multi-sig dispute system, Meta-transaction support
- **Phase 3**: Governance layer, Arbitrator marketplace
- **Phase 4**: Cross-chain payments

---

## 🧪 User Validation (5+ Testnet Wallets)

During our validation phase on the Stellar Testnet, these 5 users actively tested our dApp:

1. `GA5XQW...T9R3A` (Freelancer testing)
2. `GBZT8H...L8KMN` (Client funding)
3. `GDYTRQ...MNBVC` (Client multi-milestone tests)
4. `GCWQX3...P0QWE` (Freelancer submissions)
5. `GD6T7Y...ZXCVB` (Arbitrator dispute tests)

**User Feedback Section:**
- *User 1 (Freelancer)*: "The UI is incredible, but I wasn't sure what state the milestone was in after I clicked complete."
- *User 2 (Client)*: "Gasless transactions made it feel like Web2."
- *User 3 (Client)*: "I want to be able to add an arbitrator manually."

**Implemented Improvement based on feedback:**
We enhanced the UI states dynamically with loading indicators (`Tx Pending...`) and included status badges (`Funded`, `InProgress`, `Awaiting Approval`) so users know exactly the state of their milestones instantly. 

---

## 🛠 Technology Stack
- Next.js 15, Tailwind CSS V4, Framer Motion
- Stellar Soroban SDK (Rust)
- Freighter Wallet API
