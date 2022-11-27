---
title: On Loading a 10x Genomics Chromium Lane
subtitle: When 10x means 10x markup
date: Nov 25, 2022
---

<script lang="ts">
    import Optimize from "./optimize.svelte";
    const captureEff = 0.5

</script>

<Optimize />

<!-- First, we assume that {captureEff}%
of cells are captured into droplets.
On average, for a given GEM bead, there are
$λ = \frac{n_\mathrm{cell}}{n_\mathrm{GEM}}$
cells and is distributed as a Poisson distribution.
However, we care about cells, not empty droplets.
Therefore, we're going to ignore all empty droplets and use the
[zero-truncated Poisson distribution](https://en.wikipedia.org/wiki/Zero-truncated_Poisson_distribution)
to calculate the expected recovery of singlets. -->
