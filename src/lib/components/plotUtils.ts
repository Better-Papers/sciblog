import * as d3 from "d3";

export type FromPlot = {
  figure: Node;
  selection: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
  scales: Record<string, d3.AxisScale<[number, number]>>;
  axes: Record<string, d3.Axis<[number, number]>>;
  options: object;
};

export function updateYAxis({ selection, scales, axes }: FromPlot, { X }, transition = false) {
  let sel = selection.select('[aria-label="y-axis"]');

  if (transition) {
    sel = sel.transition(50);
  }

  const yOpt = axes.y;
  sel
    .call(
      d3
        .axisLeft(scales.y)
        .ticks(yOpt.ticks, yOpt.tickFormat)
        .tickSizeInner(yOpt.tickSize)
        .tickSizeOuter(0)
        .tickPadding(yOpt.tickPadding)
    )
    .select(".domain")
    .attr("stroke-width", 0);

  // Add extended grid lines
  const currX2 = selection.select('[aria-label="y-axis"]').select(".tick line:nth-of-type(2)").attr("x2");
  selection
    .select('[aria-label="y-axis"]')
    .selectAll(".tick line:only-of-type")
    .call((g) => g.clone(true).attr("stroke-opacity", 0.1).attr("x2", currX2));
}

type NumString = number | string;

export function updateLine(
  fromPlot: FromPlot,
  { X, Y, Z, I }: { X: number[]; Y: number[]; Z?: NumString[]; zDomain?: d3.InternSet<NumString>; I?: number[] },
  transition = false
) {
  const line = d3
    .line()
    .curve(d3.curveBasis)
    .x((i) => fromPlot.scales.x(X[i]))
    .y((i) => fromPlot.scales.y(Y[i]));

  let sel = fromPlot.selection
    .select('[aria-label = "line"]')
    .selectAll("path")
    .data(Z ? d3.group(I, (i) => Z[i]) : [[undefined, I]])
    .join("path");

  if (transition) {
    sel = sel.transition(50);
  }

  sel.attr("d", ([, I]) => {
    return line(I);
  });
}

export function updateTextLegend(
  { selection, scales }: FromPlot,
  { X, Y, Z, I }: { X: number[]; Y: number[]; Z?: NumString; zDomain?: d3.InternSet<NumString>; I },
  transition = false
) {
  let sel = selection
    .select('[aria-label = "text"]')
    .selectAll("text")
    .data(d3.group(I, (i) => Z[i]))
    .join("text");

  if (transition) {
    sel = sel.transition(50);
  }

  sel.attr("transform", (d) => `translate(${scales.x(X[d[1].at(-1)])},${scales.y(Y[d[1].at(-1)])})`);
}

export function update(fromPlot: FromPlot, data: object[], options: { x: string; y: string; z?: string }) {
  const X = data.map((d) => d[options.x]);
  const Y = data.map((d) => d[options.y]);
  const Z = options.z ? data.map((d) => d[options.z]) : undefined;

  const zDomain = Z ? new d3.InternSet(Z) : undefined;
  const I = Z ? d3.range(X.length).filter((i) => zDomain!.has(Z[i])) : d3.range(X.length);

  // Update Y-axis
  fromPlot.scales.y.domain([d3.min(Y), d3.max(Y)]);
  updateYAxis(fromPlot, { X, Y, Z, zDomain, I }, true);

  updateLine(fromPlot, { X, Y, Z, zDomain, I }, true);
  console.log(fromPlot.options);

  const marks = fromPlot.options.marks.map((m) => m.ariaLabel);
  if (marks.includes("text")) {
    updateTextLegend(fromPlot, { X, Y, Z, zDomain, I }, true);
  }
}
