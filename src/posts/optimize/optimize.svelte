<script lang="ts">
  import * as Plot from "@observablehq/plot";
  import Poisson from "@stdlib/stats/base/dists/poisson";
  import { clone, flatten } from "lodash-es";
  import { onMount } from "svelte";

  let div: HTMLDivElement;

  let gems = 1e5;
  let cost10x = 1500;
  let costPer1MRead = (6000 / 2e9) * 1e6;
  let captureEff = 0.5;

  function calc(nHash: number, cells: number, options: { lanes?: number; readsPerCell?: number; captureEff?: number } = {}) {
    const { lanes = 1, readsPerCell = 2e4, captureEff = 0.5 } = options;
    const effCells = cells * captureEff;
    const λ = effCells / (gems * lanes);
    const zero = Poisson.pmf(0, λ);
    const nonzero = 1 - zero;

    // Zero-truncated Poisson
    // https://en.wikipedia.org/wiki/Zero-truncated_Poisson_distribution
    const expected = λ / (1 - Math.exp(-λ));
    const [one, two, three] = [1, 2, 3].map((n) => Poisson.pmf(n, λ) / nonzero);
    // The support is positive so the expectation is a sum of positive numbers.
    const moreThan4 = expected - one - 2 * two - 3 * three;

    // Upper-bound proportion of diagonals.
    const undiscernableGEM = two / nHash + three / nHash ** 2 + moreThan4 / nHash ** 3;
    const totalReads = effCells * readsPerCell;

    const nSingleCell = (effCells * one) / expected;
    const totalCost = (costPer1MRead / 1e6) * totalReads + cost10x * lanes;
    const costPerCell = totalCost / nSingleCell;
    return {
      nCells: cells,
      nHash,
      totalCost,
      costPerCell,
      undiscernableGEM,
      singletCell: one / expected,
      multipletCell: (expected - one) / expected,
      singletGEM: one,
      multipletGEM: 1 - one,
      nSingleCell,
      lanes,
      readsPerCell,
    };
  }

  const cells = Array.from({ length: 32 }, (_, i) => 5000 + 2500 * i);

  function genVals() {
    const varyCells = cells.map((nCells) => calc(1, nCells, { captureEff }));
    const varyHashes = Array.from({ length: 8 }, (_, i) => 1 + i).flatMap((nHash) => cells.map((nCells) => calc(nHash, nCells, { captureEff })));
    const varyRpc = Array.from({ length: 3 }, (_, i) => 2e4 * (i + 1)).map((readsPerCell) => cells.map((nCells) => calc(1, nCells, { readsPerCell, captureEff })));
    const minCost = varyRpc.map((v) => clone(v).sort((a, b) => a.costPerCell - b.costPerCell)[0]).map((v) => ({ ...v, costPerCellStr: "$" + v.costPerCell.toFixed(2) }));

    const proportions: typeof varyCells = [];
    for (const v of varyCells) {
      for (const s of ["singletGEM", "multipletGEM", "singletCell", "multipletCell"]) {
        proportions.push({ ...v, proportion: v[s], type: s });
      }
    }
    return { varyCells, varyHashes, minCost, varyRpc: flatten(varyRpc), proportions };
  }

  function render() {
    if (!div) return;
    while (div.firstChild) div.removeChild(div.firstChild);
    const { varyHashes, varyRpc, proportions, minCost } = genVals();
    div.appendChild(
      Plot.plot({
        color: {
          scheme: "BuRd",
        },
        y: {
          grid: true,
          label: "↑ Proportions",
          //   tickFormat: ".3f",
          domain: [0, 1],
        },
        x: {
          label: "Number of loaded cells per lane →",
        },

        marks: [
          Plot.line(proportions, { x: "nCells", y: "proportion", z: "type", stroke: "type" }),
          Plot.text(
            proportions,
            Plot.selectLast({
              x: "nCells",
              y: "proportion",
              z: "type",
              text: "type",
              textAnchor: "start",
              dx: 3,
            })
          ),
        ],
        style: {
          background: "transparent",
        },
        insetBottom: 12,
      })
    );

    div.appendChild(
      Plot.plot({
        color: {
          scheme: "blues",
        },
        y: {
          type: "log",
          grid: true,
          label: "↑ Proportion of undiscernable GEMs",
          tickFormat: "5f",
        },
        x: {
          label: "Number of loaded cells per lane →",
        },

        marks: [
          Plot.line(varyHashes, { x: "nCells", y: "undiscernableGEM", z: "nHash", stroke: "nHash", curve: "basis" }),
          Plot.text(
            varyHashes,
            Plot.selectLast({
              x: "nCells",
              y: "undiscernableGEM",
              z: "nHash",
              text: "nHash",
              textAnchor: "start",
              dx: 3,
            })
          ),
          Plot.ruleY([0.02]),
        ],
        style: {
          background: "transparent",
        },
        insetBottom: 12,
      })
    );

    div.appendChild(
      Plot.plot({
        color: {
          type: "diverging",
          pivot: 0.2,
          scheme: "BuRd",
        },
        y: {
          grid: true,
          label: "↑ Cost per singlet cell (USD)",
          tickFormat: "$,.2f",
          //   domain: [0, 0.5],
        },
        x: {
          label: "Number of loaded cells per lane →",
        },

        marks: [
          Plot.line(varyRpc, { x: "nCells", y: "costPerCell", z: "readsPerCell", stroke: "readsPerCell", curve: "basis" }),
          Plot.text(
            varyRpc,
            Plot.selectLast({
              x: "nCells",
              y: "costPerCell",
              z: "readsPerCell",
              text: "readsPerCell",
              textAnchor: "start",
              dx: 3,
            })
          ),
          Plot.dot(minCost, { x: "nCells", y: "costPerCell", z: "readsPerCell", fill: "readsPerCell" }),
          Plot.text(minCost, { x: "nCells", y: "costPerCell", z: "readsPerCell", text: "costPerCellStr", fontSize: 10, dy: -12 }),
        ],
        style: {
          background: "transparent",
        },
        insetBottom: 12,
      })
    );

    div.appendChild(
      Plot.plot({
        color: {
          type: "diverging",
          pivot: 0.2,
          scheme: "BuRd",
        },
        y: {
          grid: true,
          label: "↑ Total cost (USD)",
          tickFormat: "$,.2f",
          //   domain: [0, 0.5],
        },
        x: {
          label: "Number of loaded cells per lane →",
        },

        marks: [
          Plot.line(varyRpc, { x: "nCells", y: "totalCost", z: "readsPerCell", stroke: "readsPerCell", curve: "basis" }),
          Plot.text(
            varyRpc,
            Plot.selectLast({
              x: "nCells",
              y: "totalCost",
              z: "readsPerCell",
              text: "readsPerCell",
              textAnchor: "start",
              dx: 3,
            })
          ),
          //   Plot.dot(minCost, { x: "nCells", y: "costPerCell", z: "readsPerCell", fill: "readsPerCell" }),
          //   Plot.text(minCost, { x: "nCells", y: "costPerCell", z: "readsPerCell", text: "costPerCellStr", fontSize: 10, dy: -12 }),
        ],
        style: {
          background: "transparent",
        },
        insetBottom: 12,
      })
    );

    div.appendChild(
      Plot.plot({
        color: {
          type: "diverging",
          pivot: 0.2,
          scheme: "BuRd",
        },
        y: {
          grid: true,
          label: "↑ Number of singlet cells",
        },
        x: {
          grid: true,
          label: "Number of loaded cells per lane →",
        },

        marks: [Plot.line(varyRpc, { x: "nCells", y: "nSingleCell", filter: (v) => v.readsPerCell === 20000, curve: "basis" })],
        style: {
          background: "transparent",
        },
        insetBottom: 12,
      })
    );
  }

  onMount(render);
  $: if (gems || cost10x || costPer1MRead || captureEff) render();
</script>

<aside class="">
  <input type="number" bind:value={captureEff} min="0" step="0.01" max="1" />
</aside>

<div bind:this={div} class="flex flex-col gap-y-4 overflow-visible" />

<aside>
  <input type="number" bind:value={cost10x} min="0" step="100" />
  <input type="number" bind:value={costPer1MRead} min="0" step="0.1" />
</aside>

<style lang="postcss">
  div :global(*) {
    @apply overflow-visible;
  }
</style>
