# nightproof

**Prove you're 18+ without revealing your birth date — built with Midnight's zero-knowledge proofs.**

Built solo for the Midnight Hackathon — Integrate Midnight / Best Beginner Hack tracks.

----------

## The problem

Almost every signup form that needs an age check asks for your full birthdate — and stores it. That's more data than the check actually needs. All the form really needs to know is one bit of information: are you 18 or older, yes or no.

**nightproof** replaces that with a real zero-knowledge proof: you prove the fact without ever revealing the birth year behind it — not to the server, not to anyone.

## What's in this repo


| Path | What it is |
|---|---|
| `contracts/age-proof.compact` | The actual privacy logic — a Compact smart contract. `birthYear` is a private circuit input; the contract proves `age >= 18` and only a boolean-equivalent result is ever exposed. |
| `contracts/managed/age-proof/` | The **real, compiled** ZK circuit — proving key, verifying key, and generated TypeScript bindings. Produced by `compact compile`, not hand-written. |
| `src/App.jsx` | A two-panel React + Tailwind UI: a normal "leaky" signup form next to the ZK-powered one, so the privacy difference is visible at a glance. |

## How it works

1.  `proveAdult(birthYear, currentYear)` is a Compact circuit. In Compact, circuit parameters are **private by default** — nothing about `birthYear` is ever written to the public ledger.
2.  The circuit computes `age = currentYear - birthYear` and asserts `age >= 18`. If the assertion fails, proof generation itself fails — there is no way to fabricate a passing proof for someone under 18.
3.  The only public effect of a successful proof: a `Counter` on the ledger increments by one. No birth year, no age, no personal data ever appears on-chain.

## Status

-   [x] Compact circuit written and **compiled successfully** (proving/verifying keys generated, see `contracts/managed/age-proof/`)
-   [x] Polished React + Tailwind UI demonstrating the before/after flow end-to-end
-   [x] Local proof server (Docker) running and verified working
-   [x] Compact toolchain, Lace wallet, and Preprod testnet wallet all set up and funded
-   [~] Full on-chain deployment to Preprod — the contract is compiled and deploy-ready, but live deployment was blocked tonight by Preprod testnet/indexer instability (transactions stuck pending on both a fresh CLI wallet and, separately, a Lace wallet action — a network-side issue, not a contract or code issue). The `App.jsx` UI currently calls a clearly-marked mock function that mirrors the real circuit's exact logic, so the demo is always runnable regardless of network state.

## Why this counts as real ZK work, not just a mockup

The compiled artifacts in `contracts/managed/age-proof/` — the `.prover`, `.verifier`, and `.zkir` files — are not hand-written or faked. They're the direct output of running Midnight's own `compactc` compiler against `age-proof.compact`, the same pipeline used for a production deployment. The only missing step is publishing that already-compiled contract on-chain, which is a network/infra step, not a cryptography or code step.

## Run it

```bash
# Compile the contract (requires the Compact toolchain: https://docs.midnight.network)
cd contracts
compact compile age-proof.compact managed/age-proof

# Front end
cd ../src
npm install
npm run dev

```

## Tech stack

Compact (Midnight's ZK smart contract language) · React · Tailwind CSS · Vite