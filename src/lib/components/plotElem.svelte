<script lang="ts">
  import * as Plot from "@observablehq/plot";
  import type * as d3 from "d3";
  import { runNode } from "../utils";

  export let style = { background: "transparent", fontSize: 12 };

  let obj: {
    figure: Node;
    selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
    scales: Record<string, d3.AxisScale<[number, number]>>;
    axes: Record<string, d3.Axis<[number, number]>>;
  };

  export let data: object[];
  export let plotOptions: object = {};
  export let updateOptions: object = {};
  export let update: (d: typeof obj, data: object[], options: object) => void = () => {};

  function runPlot(svg: Node) {
    obj = Plot.plot({ svg, style, ...plotOptions });
  }

  $: if (obj && data) update(obj, data, updateOptions);
</script>

<svg use:runNode={runPlot} />
