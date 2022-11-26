<!-- <script lang="ts">
  import { onMount } from "svelte";
  import embed, { type VisualizationSpec } from "vega-embed";
  export let spec: VisualizationSpec;

  const uid = Math.random().toString(36).substring(2);
  let vega: Awaited<ReturnType<typeof embed>>;
  onMount(async () => {
    vega = await embed(`#vis-${uid}`, spec, { renderer: "svg" });
  });
</script>

<br />
<aside class="inline-block"><slot /></aside>
<div class="not-prose flex w-full justify-evenly">
  <figure id={`vis-${uid}`} />
</div> -->
