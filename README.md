# Trustlance

Trustlance is a decentralized cross-border milestone escrow platform built on the Stellar network. It provides a trustless payment system addressing the limitations of current solutions by offering secure, fast, and low-cost transactions for freelancers and clients using Soroban smart contracts.

## 🔗 Project Links

- **GitHub Repository:** [Shrikant1a/StellarTrust](https://github.com/Shrikant1a/StellarTrust)
- **Live Demo:** [**Click here to view the Live Demo**](https://stellar-trust.vercel.app/)
- **Demo Video:** [Insert Link to Demo Video showing MVP functionality here]

## 📐 Architecture
Please refer to our [Architecture Document](ARCHITECTURE.md) for a detailed overview of the system design, smart contracts, and user flow.

## 🚀 Features
- **Web3 Wallet Connection:** Seamlessly connect Freighter or other Stellar-compatible wallets.
- **Trustless Escrow:** Funds are locked in a robust Soroban smart contract upon project creation.
- **Milestone-Based Payments:** Release funds progressively as deliverables are completed.
- **Dispute Resolution Mechanism:** Assign a trusted arbiter to handle disputes effectively.

---

## 👥 User Validation & Feedback

We have successfully tested the Trustlance MVP with real testnet users to validate our core assumptions.

### 📝 User Feedback Document
- **Google Form:** [User Feedback Form](https://docs.google.com/forms/d/e/1FAIpQLSepMqJtazGZSnUZBheIrc317sPruttgwyP5c3iMeTjFKcLtyw/viewform?usp=publish-editor)
- **Feedback & Data Export:** [View Responses Spreadsheet](https://docs.google.com/spreadsheets/d/1wr7b252FqYko6AESycVgpgv7OYiuJQPdF-OaDy-LFe0/edit?usp=sharing)
> *Note for evaluator: We created a Google Form to collect user details (wallet address, email, name, and product rating/feedback) and exported the responses to the linked sheet above.*

### 💼 Testnet Users
Here are the wallet addresses of our 5+ real testnet users who tested the platform (verifiable on the Stellar testnet explorer):
1. `[GBEWS3QTQ77BZ7BLHMX4FCWESQC4HJDMVA4EJE6WS5DHQRVTMURHPBKL]`
2. `[GA66G2UVQRHIBVMNH4HKSNNPBOLI2AX3DCHVAZT64VWWGKRNSW3V47BO]`
3. `[GDGM3GIZDK4XHLKI3HWAL67MK534S5ALM7ISCTUZFXC5BJFNHWNIRW7F]`
4. `[GAXANWWLD63QHBEG3E7I32GS33DVYBPRCZSITAWDDBIH6M37V6WL7ZGP]`
5. `[GD4NBNKTFVHKDHJO6ZMQXELUPAY6WLSAJTHXKMETQUFWTDMRODFGBLQD]`
6.`[GD4NBNKTFVHKDHJO6ZMQXELUPAY6WLSAJTHXKMETQUFWTDMRODFGBLQD]`

### 🛠 Improvements & Next Phases
Based on the collected user feedback, here is how we plan to improve and evolve the project in the next phase:

1. **UX/UI Improvements:** Users found the overall design needed more intuitive cues for interactions. We plan to continuously streamline the frontend components in upcoming phases.
   - Example Recent Update: [Add User Roles System Documentation](https://github.com/Shrikant1a/StellarTrust/commit/cb5b12d)
2. **Enhanced Dispute Dashboard:** Freelancers requested better visibility on dispute mechanisms and locked funds. We are iterating on clearer dashboards.
   - Example Recent Update: [Add DisputeResolver & Enhanced Contracts](https://github.com/Shrikant1a/StellarTrust/commit/96a72b2)
3. **Milestone Revisions (Next Phase):** Adding the ability to modify milestones dynamically before full funding occurs based on direct feedback from our testnet cohort.

---

## 💻 Running Locally

### Prerequisites
- Node.js
- Stellar CLI & Freighter Wallet
- Rust (for Soroban Contracts)

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd trustlance
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The app will be accessible at [http://localhost:3000](http://localhost:3000).
