<script lang="ts">
  import { browser } from "$app/env";
  import IntersectObs from "$lib/components/intersectionObserver.svelte";
  import Legend from "$src/lib/components/legend.svelte";
  import PngViewer from "$src/lib/components/pngViewer.svelte";
  import Table from "$src/lib/components/table.svelte";
  import { getRange, processCSV } from "$src/lib/loader";
  import { getNameFromPath } from "$src/lib/utils";
  import * as d3 from "d3";
  import { throttle } from "lodash-es";
  import { onMount } from "svelte";
  import c from "./xtrials0pos.json";
  import c1 from "./xtrials1pos.json";

  const imps = import.meta.globEager("./*.csv");
  const pngs = Object.values(import.meta.globEager("./pics/*.png")).map((x) => x.default);
  pngs.sort();
  let rng = 0;

  let corr: { seq?: Float32Array; scr?: Float32Array };
  console.log(pngs);

  let pos = 100;
  let pos_t = 100;

  const setPos = throttle((p: number) => (pos_t = p), 100);
  $: setPos(pos);

  if (browser) {
    corr = {};
    for (const [name, v] of Object.entries(imps)) {
      if (!name.startsWith("./out")) {
        console.log(v);

        corr[name.split("/")[1].slice(0, -4)] = () => processCSV(v.default);
      } else {
        corr.os = () => processCSV(v.default, false);
      }
    }
  }

  async function getData(url: string, idx: number[], p: number) {
    pos = Number(pos);
    const deped = await getRange(url, [idx[p], idx[p + 1] - 1]);
    return new Uint8Array(deped);
  }

  function play() {
    setTimeout(() => {
      if (rng < 200) {
        rng += 1;
        return play();
      }
      return;
    }, 1000 / 20);
  }
</script>

<div class="flex gap-x-6">
  <span>
    Neuron: <input type="number" bind:value={pos} class="ml-1 w-24 rounded border bg-neutral-50 py-1 px-2" />
  </span>
  <input class="flex-grow" type="range" bind:value={pos} min="0" max={c.idx.length - 1} step="1" />
</div>
<div class="h-5" />

<div class="flex justify-center">
  <div class="mt-4 flex flex-col">
    <h3 class="my-0 text-xl text-black">Firing consistent between trials.</h3>
    <p class="my-0">Higher local correlation in sequential trials.</p>
    <div class="flex items-end justify-between">
      Sequential
      <div><Legend title="Spikes (unit?)" minmax={[0, 5]} cmap={d3.interpolateMagma} legendAnchor="end" /></div>
    </div>
    <PngViewer data={getData("https://chaichontat-host.s3.amazonaws.com/movie/xtrials0.bin", c.idx, pos_t)} header={c} axes={{ y: true }} cmap={d3.interpolateMagma} />
    <div class="mt-2" />
    Scrambled
    <PngViewer data={getData("https://chaichontat-host.s3.amazonaws.com/movie/xtrials1.bin", c1.idx, pos_t)} header={c1} xlabel="Frame →" cmap={d3.interpolateMagma} />
    <p class="mt-2 text-xs text-neutral-600">Source: V1, GCaMP8f mouse L1-A4. 13 June 2022.</p>
  </div>
</div>
<hr class="w-screen" />

<h2>Highest correlation between frames.</h2>
<aside class="sticky top-8">
  Spikes averaged across all trials. Then, Spearman-correlate sequential/scrambled pairs and identify top-20 maximally correlated sequential frame given a scrambled frame.
</aside>

<div class="float-right"><Legend title="Spearman r" minmax={[-0.5, 0.5]} cmap={d3.interpolateRdBu} legendAnchor="end" /></div>

<div class="flex gap-x-5">
  <div>
    <span>Sequential Corr.</span>
    <PngViewer data={corr?.seqcorr()} diverging header={{ width: 600, height: 600 }} cmap={d3.interpolateRdBu} minmax={[-0.5, 0.5]} scale={1} />
  </div>

  <div>
    <span>Scrambled Corr.</span>
    <div class="group relative">
      <PngViewer data={corr?.scrcorr()} diverging header={{ width: 600, height: 600 }} cmap={d3.interpolateRdBu} minmax={[-0.5, 0.5]} scale={1} axes={{ x: true }} xlabel="Scrambled" />
      <div class="absolute top-0 left-0 z-50 hidden group-hover:inline">
        <PngViewer data={corr?.unscramcorrself()} scale={1} diverging header={{ width: 600, height: 600 }} cmap={d3.interpolateRdBu} axes={{}} minmax={[-0.5, 0.5]} />
      </div>
    </div>
  </div>
</div>

<h2>Unscramble</h2>

<IntersectObs>
  <div class="group relative flex gap-x-5">
    <PngViewer data={corr?.crosscorr()} diverging header={{ width: 600, height: 600 }} cmap={d3.interpolateRdBu} xlabel="Sequential" ylabel={"Scrambled"} minmax={[-0.5, 0.5]} />

    <div class="absolute top-0 left-0 z-50 hidden group-hover:inline">
      <PngViewer data={corr?.unscramcorr()} diverging header={{ width: 600, height: 600 }} cmap={d3.interpolateRdBu} axes={{}} minmax={[-0.5, 0.5]} />
    </div>
  </div>
</IntersectObs>

<h2>Argmax Correlation</h2>
<div class="font-medium">
  <div class="ml-4">Sorted max correlated sequential frame. →</div>
  ↓ Scrambled frame.
</div>
<IntersectObs>
  <!-- <Table data={corr?.os()} /> -->
</IntersectObs>

<img src={pngs[rng]} />
<input type="range" min="0" max="199" bind:value={rng} />
{rng}
<button on:click={play}>Hi</button>
