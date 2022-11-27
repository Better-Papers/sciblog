<script lang="ts">
  import Input from "$src/lib/components/input.svelte";
  import PlotElem from "$src/lib/components/plotElem.svelte";
  import { factorial, runNode } from "$src/lib/utils";
  import * as Plot from "@observablehq/plot";
  import * as d3 from "d3";
  import katex from "katex";
  import { clone, flatten, throttle } from "lodash-es";
  import { onMount } from "svelte";

  let gems = 1e5;
  let cost10x = 1500;
  let costPer1MRead = (6000 / 2e9) * 1e6;
  let captureEff = 0.5;

  let varyCells;
  let varyHashes: ReturnType<typeof genVals>["varyHashes"];
  let varyRpc: ReturnType<typeof genVals>["varyRpc"];
  let proportions: ReturnType<typeof genVals>["proportions"];
  let minCost: ReturnType<typeof genVals>["minCost"];

  const style = { background: "transparent", fontSize: 12 };

  function pmf(x: number, λ: number) {
    return (Math.pow(λ, x) * Math.exp(-λ)) / factorial(x);
  }

  function calc(nHash: number, cells: number, options: { lanes?: number; readsPerCell?: number; captureEff?: number } = {}) {
    const { lanes = 1, readsPerCell = 2e4, captureEff = 0.5 } = options;
    const effCells = cells * captureEff;
    const λ = effCells / (gems * lanes);
    const zero = pmf(0, λ);
    const nonzero = 1 - zero;

    // Zero-truncated Poisson
    // https://en.wikipedia.org/wiki/Zero-truncated_Poisson_distribution
    const expected = λ / (1 - Math.exp(-λ));
    const [one, two, three] = [1, 2, 3].map((n) => pmf(n, λ) / nonzero);
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
    if (captureEff <= 0 || captureEff > 1) {
      return;
    }
    varyCells = cells.map((nCells) => calc(1, nCells, { captureEff }));
    varyHashes = Array.from({ length: 8 }, (_, i) => 1 + i).flatMap((nHash) => cells.map((nCells) => calc(nHash, nCells, { captureEff })));
    varyRpc = Array.from({ length: 3 }, (_, i) => 2e4 * (i + 1)).map((readsPerCell) => cells.map((nCells) => calc(1, nCells, { readsPerCell, captureEff })));
    minCost = varyRpc.map((v) => clone(v).sort((a, b) => a.costPerCell - b.costPerCell)[0]).map((v) => ({ ...v, costPerCellStr: "$" + v.costPerCell.toFixed(2) }));
    varyRpc = flatten(varyRpc);

    proportions = [];
    for (const v of varyCells) {
      for (const s of ["singletGEM", "multipletGEM", "singletCell", "multipletCell"]) {
        proportions.push({ ...v, proportion: v[s], type: s, isCell: s.includes("Cell") });
      }
    }
    // return { varyCells, varyHashes, minCost, varyRpc: flatten(varyRpc), proportions };
  }

  const render = () => {
    d3.selectAll('[aria-label="x-axis"] > text').attr("dy", "0.4em"); // move x-axis labels down a bit
    d3.selectAll('[aria-label="y-axis"] > text').attr("dy", "-1em"); // move y-axis labels up a bit
  };

  function plotCostPerCell(svg: Node) {
    Plot.plot({
      color: { type: "diverging", pivot: 0.2, scheme: "BuRd" },
      x: { label: "Number of loaded cells per lane →" },
      y: { grid: true, label: "↑ Cost per singlet cell (USD)", tickFormat: "$,.2f" },

      marks: [
        Plot.line(varyRpc, { x: "nCells", y: "costPerCell", z: "readsPerCell", stroke: "readsPerCell", curve: "basis" }),
        Plot.text(varyRpc, Plot.selectLast({ x: "nCells", y: "costPerCell", z: "readsPerCell", text: (d) => d.readsPerCell.toLocaleString("en-US") + " reads per cell", textAnchor: "start", dx: 3 })),
        Plot.dot(minCost, { x: "nCells", y: "costPerCell", z: "readsPerCell", fill: "readsPerCell" }),
        Plot.text(minCost, { x: "nCells", y: "costPerCell", z: "readsPerCell", text: "costPerCellStr", fontSize: 10, dy: -12 }),
      ],
      style,
      insetBottom: 12,
      svg,
    });
  }

  function plotSinglets(svg: Node) {
    Plot.plot({
      color: { type: "diverging", pivot: 0.2, scheme: "BuRd" },
      x: { grid: true, label: "Number of loaded cells per lane →" },
      y: { grid: true, label: "↑ Number of recovered singlets" },
      marks: [Plot.line(varyRpc, { x: "nCells", y: "nSingleCell", filter: (v) => v.readsPerCell === 20000, curve: "basis" })],
      style,
      insetBottom: 12,
      svg,
    });
  }

  function plotUndiscerned(svg: Node) {
    Plot.plot({
      color: { scheme: "blues" },
      x: { label: "Number of loaded cells per lane →" },
      y: { type: "log", grid: true, label: "↑ Proportion of undiscernable GEMs", tickFormat: "5f" },

      marks: [
        Plot.line(varyHashes, { x: "nCells", y: "undiscernableGEM", z: "nHash", stroke: "nHash", curve: "basis", title: (d) => (d.nHash === 1 ? "No hashing" : toString(d.nHash) + " hashes") }),
        Plot.text(
          varyHashes,
          Plot.selectLast({ x: "nCells", y: "undiscernableGEM", z: "nHash", text: (d) => (d.nHash === 1 ? "No hashing" : toString(d.nHash) + " hashes"), textAnchor: "start", dx: 3 })
        ),
        Plot.ruleY([0.02]),
      ],
      style,
      insetBottom: 12,
      svg,
    });
  }

  function plotCost(svg: Node) {
    Plot.plot({
      width: 250,
      height: 250,
      color: { type: "diverging", pivot: 0.2, scheme: "BuRd" },
      x: { label: "Number of loaded cells →" },
      y: { grid: true, label: "↑ Total cost (USD)", tickFormat: "$,.2f" },

      marks: [
        Plot.line(varyRpc, { x: "nCells", y: "totalCost", z: "readsPerCell", stroke: "readsPerCell", curve: "basis" }),
        Plot.text(
          varyRpc,
          Plot.selectLast({
            x: "nCells",
            y: "totalCost",
            z: "readsPerCell",
            text: (d) => d.readsPerCell.toLocaleString("en-US") + " rpc",
            textAnchor: "start",
            dx: 6,
            fontSize: 10,
            fontWeight: 400,
          })
        ),
      ],
      style,
      insetBottom: 12,
      svg,
    });
  }

  function plotDoublets(svg: Node) {
    const combi = [];
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        const x = (i + 9).toString(36).toUpperCase();
        const y = (j + 9).toString(36).toUpperCase();
        combi.push({ x, y, xy: x + y, isSame: i === j });
      }
    }

    Plot.plot({
      height: 270,
      width: 280,
      color: { scheme: "PiYG" },
      // padding: 0,
      x: { axis: "top", label: "Hash of Cell 1" },
      y: { label: "Hash of Cell 2" },
      marks: [Plot.cell(combi, { x: "x", y: "y", fill: "isSame", inset: 0.5, rx: 26 }), Plot.text(combi, { x: "x", y: "y", text: "xy" })],
      style: { ...style, fontSize: 10 },
      svg,
    });
  }

  function plotProportions(node: Node) {
    Plot.plot({
      color: { scheme: "RdBu" },
      x: { label: "Number of loaded cells →" },
      y: { grid: true, label: "↑ Proportions", domain: [0, 1] },
      marks: [
        Plot.line(proportions, { x: "nCells", y: "proportion", z: "type", stroke: "isCell" }),
        Plot.text(proportions, Plot.selectLast({ x: "nCells", y: "proportion", z: "type", text: "type", textAnchor: "start", dx: 3, fontSize: 11 })),
      ],
      style,
      insetBottom: 12,
      svg: node,
    });
  }

  onMount(render);

  $: if (gems || cost10x || costPer1MRead || captureEff) genVals();
</script>

<figure>
  <h4 class="pb-1.5">Hashing reduces undiscernable multiplets</h4>
  <PlotElem
    options={{
      color: { interpolate: (t) => d3.interpolatePuBu(0.7 * t + 0.3) },
      x: { label: "Number of loaded cells per lane →" },
      y: { type: "log", grid: true, label: "↑ Proportion of undiscernable GEMs", tickFormat: "5f" },
      marks: [
        Plot.line(varyHashes, { x: "nCells", y: "undiscernableGEM", z: "nHash", stroke: "nHash", curve: "basis", title: "nHash" }),
        Plot.text(
          varyHashes,
          Plot.selectLast({ x: "nCells", y: "undiscernableGEM", z: "nHash", text: (d) => (d.nHash === 1 ? "No hashing" : `${d.nHash} hashes`), textAnchor: "start", dx: 3, fontSize: 11 })
        ),
        Plot.ruleY([0.02]),
      ],
      insetBottom: 12,
    }}
    props={{ varyHashes }}
    update={throttle((obj, props) => {
      console.log(obj);

      const X = props.varyHashes.map((d) => d.nCells);
      const Y = props.varyHashes.map((d) => d.undiscernableGEM);
      const Z = props.varyHashes.map((d) => d.nHash);
      const zDomain = new d3.InternSet(Z);
      const I = d3.range(X.length).filter((i) => zDomain.has(Z[i]));

      const line = d3
        .line()
        .curve(d3.curveBasis)
        .x((i) => obj.scales.x(X[i]))
        .y((i) => obj.scales.y(Y[i]));

      obj.scales.y.domain([d3.min(Y), d3.max(Y)]);

      obj.selection
        .select('[aria-label="y-axis"]')
        .transition(100)
        .call(d3.axisLeft(obj.scales.y).ticks(obj.axes.y.ticks, obj.axes.y.tickFormat).tickSizeInner(obj.axes.y.tickSize).tickSizeOuter(0).tickPadding(obj.axes.y.tickPadding));

      obj.selection
        .select('[aria-label = "line"]')
        .selectAll("path")
        .data(d3.group(I, (i) => Z[i]))
        .join("path")
        // .attr("stroke", (d) => d3.interpolatePuBu(d.nHash / 8))
        .transition(100)
        .attr("d", ([, I]) => line(I));

      console.log(zDomain, Z, I);

      obj.selection
        .select('[aria-label = "text"]')
        .selectAll("text")
        .data(d3.group(I, (i) => Z[i]))
        .join("text")
        .transition(100)
        .attr("transform", (d) => `translate(${obj.scales.x(X[d[1].at(-1)])},${obj.scales.y(Y[d[1].at(-1)])})`);
    }, 16)}
  />
</figure>

<h2 class="mt-3">Expected number of recovered singlets</h2>

<aside class=" top-16 z-50 bg-slate-50/90 backdrop-blur-lg">
  <div class="flex flex-col items-end w-24">
    <Input min="0.01" max="1" step="0.01" label="Capture Efficiency" bind:value={captureEff} />
    <Input min="0" step="100" label="Cost per 10x lane" bind:value={cost10x} />
    <Input min="0" step="0.1" label="Cost per 1M reads" bind:value={costPer1MRead} />
  </div>
</aside>

<p>
  First, we assume that <b>{100 * captureEff}%</b>
  of cells are captured into droplets. On average, for a given GEM bead, there are
  {@html katex.renderToString("λ = \\frac{n_\\mathrm{cell}}{n_\\mathrm{GEM}}", { throwOnError: false })} cells and is distributed as a Poisson distribution. However, we care about cells, not empty droplets.
  Therefore, we're going to ignore all empty droplets and use the
  <a href="https://en.wikipedia.org/wiki/Zero-truncated_Poisson_distribution">zero-truncated Poisson distribution</a>
  to calculate the expected recovery of singlets.
</p>

<figure class="mt-3">
  <h4 class="pb-1.5">Proportion of cells in multiplet droplets scale faster than GEMs</h4>
  <svg use:runNode={plotProportions} />
</figure>

<p>
  Note that as the proportion of multiplet <em>GEMs</em>
  increases, the proportion of
  <em>cells</em>
  in multiplet droplets increases more quickly. This is due to the fact that a multiplet takes up multiple cells, and we must normalize to the
  <em>expected value</em>
  and not the probability of this distribution.
</p>

<figure class="mt-5 ml-1.5">
  <svg use:runNode={plotSinglets} />
</figure>

<aside>
  <figure>
    <div class="w-full flex">
      <svg class="align-center" use:runNode={plotDoublets} />
    </div>
    <figcaption>
      For doublets, we expect
      {@html katex.renderToString(String.raw`\frac{1}{n^2}(n^2 - n) = 1 - \frac{1}{n}`, { displayMode: true })}
      undiscernable doublets for a given cell, where {@html katex.renderToString("n")} is the number of hashes. This pattern continues with higher-order multiplets.
    </figcaption>
  </figure>
</aside>

<h2>Costs</h2>
<p>
  With the ability to clearly detect most of the multiplets, we can load more cells into a single lane. However, as we load more cells, the proportion of discarded reads scales as the number of
  multiplet cells in the first figure. With constant sequencing cost, there is a point in which the sequencing cost dominates and we do not get any more savings from loading more cells.
</p>
<p>
  We assume that a lane of Chromium costs $
  <b>{cost10x.toLocaleString("en-US")}</b>
  and that sequencing costs $
  <b>{costPer1MRead.toFixed(2)}</b>
  per million reads.
</p>

<aside>
  <figure class="mt-16 w-full flex">
    <svg class="align-center" use:runNode={plotCost} />
  </figure>
</aside>

<figure class="mt-3">
  <h4 class="pb-1.5">Superloading is constrained by the cost of discarded reads</h4>
  <svg use:runNode={plotCostPerCell} />
</figure>

<p>
  At higher cell loads, we must turn to
  <a href="https://www.nature.com/articles/s41592-021-01153-z">scifi-RNA-Seq</a>
  which, instead of introducing hashing reads, avoids discarding reads by hashing the actual polyA+ RNA molecule.
</p>

<style lang="postcss">
  div :global(*),
  aside :global(*),
  figure :global(*) {
    @apply overflow-visible;
  }

  svg {
    @apply overflow-visible;
  }

  b {
    @apply text-sky-800;
  }
</style>
