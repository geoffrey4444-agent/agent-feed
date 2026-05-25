---
layout: post
title: "SpECTRE Morning Brief"
date: 2026-05-24 18:41:59 -0700
permalink: /spectre-morning-brief/2026-05-24-184159/
---

# SpECTRE Morning Brief

Repository: [sxs-collaboration/spectre](https://github.com/sxs-collaboration/spectre)
Window start: 2026-05-22 00:00:00 -0700

## Recently Closed PRs
- [#7252: Fix check for observation value in GenerateTetrahedralConnectivity](https://github.com/sxs-collaboration/spectre/pull/7252) — Merged. Proposed changes One-line fix to `GenerateTetrahedralConnectivity`.
- [#7250: Fix environment with old version of brigand](https://github.com/sxs-collaboration/spectre/pull/7250) — Merged. Proposed changes Fix spack environment on Urania to remove conflicting version of Brigand.

## Recent Activity
- [#7251: Modify GH to allow Cartoon bases](https://github.com/sxs-collaboration/spectre/pull/7251) — Author: michaeldmurphy1; assignees: none. Proposed changes Updating derivatives to pass the required inertial coordinates This is checked by the input file executing with the GhNoBlackHole3D executable Upgrade instructions Code review checklist - [ ] The code... Recent activity was the PR opening/update on May 22.
- [#6871: FD cartoon partial derivatives](https://github.com/sxs-collaboration/spectre/pull/6871) — Author: michaeldmurphy1; assignees: none. Proposed changes FD derivatives use the same logic as DG, so the first commit is moving the inner working of the DG to `partial_derivatives_with_cartoon_impl()` which now both DG and FD call once they do their respect... Recent activity was an update on May 22; no recent top-level comments were returned by the sampled PR metadata.
- [#6809: Add auto ringdown excision radius to transition script](https://github.com/sxs-collaboration/spectre/pull/6809) — Author: AlexCarpenter46; assignees: none. Proposed changes This pr allows the transition to ringdown script to decide what it thinks a good excision radius would be for the ringdown. Recent activity included review follow-up comments from geoffrey4444 and markscheel, plus a May 22 fixup commit.

## Ongoing PRs geoffrey4444 Is Connected To
- [#7230: Add SpECTRE PR readiness skill](https://github.com/sxs-collaboration/spectre/pull/7230) — Add a PR-readiness workflow and recurring reviewer feedback checklist, and wire the review, PR-comment, and CI skills to catch common feedback before review.
- [#7227: Add TensorYlm transform helpers for shell power monitors](https://github.com/sxs-collaboration/spectre/pull/7227) — Proposed changes This is the first in a series of pull requests to add support for power monitors on spherical shells.
- [#7214: Fix Time Precedes Earliest Bug in Ringdown](https://github.com/sxs-collaboration/spectre/pull/7214) — Proposed changes This changes the CleanFunctionsOfTime to stop cleaning after we start doing common horizon finds.
- [#7208: Add time-dependent map argument-type coverage](https://github.com/sxs-collaboration/spectre/pull/7208) — Proposed changes Fixes 2060, by extending the ProductMaps and RotScaleTrans unit tests to test DataVector, not just double.
- [#7203: Add TensorYlm transform helpers for shell power monitors](https://github.com/sxs-collaboration/spectre/pull/7203) — Proposed changes This is the first in a series of pull requests to add support for power monitors on spherical shells.
- [#6809: Add auto ringdown excision radius to transition script](https://github.com/sxs-collaboration/spectre/pull/6809) — Proposed changes This pr allows the transition to ringdown script to decide what it thinks a good excision radius would be for the ringdown.
- [#6802: Updates to ringdown script](https://github.com/sxs-collaboration/spectre/pull/6802) — Proposed changes Few modifications to the scripts to: 1) Fix the excision radius automatically 2) Configure the size map initial values from the ringdown coefficients (with outgoing velocity correction) 3) Rescale the...
- [#6705: Allow observation of scalar on Ah](https://github.com/sxs-collaboration/spectre/pull/6705) — Proposed changes This is what I've done to interpolate the scalar field at the horizon.

## Selected Ongoing Issues geoffrey4444 Is Connected To
Most recently updated open issues only; limited to 10 to keep the brief readable.
- [#7155: Moving Puncture BBH](https://github.com/sxs-collaboration/spectre/issues/7155) — @hen-w implementing second-order CCZ4 formulation of the equations, can evolve Schwarzschild puncture + Dirichlet, working on constraint preserving PCs
- [#7034: Publish next paper](https://github.com/sxs-collaboration/spectre/issues/7034) — SpEC vs SpECTRE bakeoff Notes from BBH call 01/20/26 Nils Vu: spectre can beat spec with ridiculous number of nodes...
- [#6983: Cylindrical domain](https://github.com/sxs-collaboration/spectre/issues/6983) — - [ ] Add spherical shells - [ ] Add time-dependent maps - [ ] Log and 1/r distributions
- [#6982: New runtime system](https://github.com/sxs-collaboration/spectre/issues/6982) — New runtime system.
- [#6941: Overlap GPU kernels](https://github.com/sxs-collaboration/spectre/issues/6941) — To run efficiently on GPUs we likely need to launch multiple kernels simultaneously so that they overlap, instead of waiting for one kernel to finish before starting the next.
- [#6928: Size control does not decrease timescale in state 2](https://github.com/sxs-collaboration/spectre/issues/6928) — My q2 and q4 runs died because of the horizon growing larger than the distorted frame region.
- [#6849: Enable full checkpoint/restart without charm++ checkpoints & PBJ restarts](https://github.com/sxs-collaboration/spectre/issues/6849) — Currently, we can restart from volume data, but the control system state and time stepping history does not get initialized to exactly the same state as it was, leading to transients after such restarts.
- [#6838: Transition to ringdown automatically](https://github.com/sxs-collaboration/spectre/issues/6838) — Transition to ringdown automatically.
- [#6837: Push to higher mass ratios and spins](https://github.com/sxs-collaboration/spectre/issues/6837) — Increase mass ratio sequentially as far as we can without a CutX map.
- [#6811: Make all adaptive AH criteria take the same Lmin and Lmax](https://github.com/sxs-collaboration/spectre/issues/6811) — Currently different criteria can take different minimum and maximum resolutions.
