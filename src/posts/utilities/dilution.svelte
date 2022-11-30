<script lang="ts">
  import { clone } from "lodash-es";

  const fields = ["mass", "mw", "mole", "concMole", "concG", "volume"] as const;
  const template = { mass: "40nM", mw: "", mole: "", concMole: "", concG: "", volume: "", want: "mole" };
  let values = [clone(template)];

  const PREFIXES = {
    p: 1e-12,
    n: 1e-9,
    u: 1e-6,
    m: 1e-3,
    k: 1e3,
    M: 1e6,
    G: 1e9,
  };

  const re = /^([+\-]?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+\-]?\d+)?)\s*([a-zA-Z])?(.*)/; // https://stackoverflow.com/a/658662

  function extractValue(str: string) {
    const match = str.match(re);
    if (!match) return NaN;
    const [, value, prefix, unit] = match;
    return parseFloat(value) * (PREFIXES[prefix] || 1);
  }

  function format(v: number) {
    if (Number.isNaN(v)) return "";
    if (v < 1e-9) return `${(v * 1e12).toPrecision(4)} p`;
    if (v < 1e-6) return `${(v * 1e9).toPrecision(4)} n`;
    if (v < 1e-3) return `${(v * 1e6).toPrecision(4)} u`;
    if (v < 1) return `${(v * 1e3).toPrecision(4)} m`;
    if (v < 1e3) return `${v.toPrecision(4)}`;
    if (v < 1e6) return `${(v / 1e3).toPrecision(4)} k`;
    if (v < 1e9) return `${(v / 1e6).toPrecision(4)} M`;
    return `${v / 1e9}GM`;
  }

  function getMole(i: number) {
    const v = values[i];
    if (v.mass && v.mw) return extractValue(v.mass) / extractValue(v.mw);
    if (v.concMole && v.volume) return extractValue(v.concMole) * extractValue(v.volume);
    if (v.concG && v.mw && v.volume) return (extractValue(v.concG) / extractValue(v.mw)) * extractValue(v.volume);
    return NaN;
  }

  function getMW(i: number) {
    const v = values[i];
    if (v.mass && v.mole) return extractValue(v.mass) / extractValue(v.mole);
    if (v.concG && v.concMole) return extractValue(v.concG) / extractValue(v.concMole);
    return NaN;
  }

  function getMass(i: number) {
    const v = values[i];
    if (v.mw && v.mole) return extractValue(v.mw) * extractValue(v.mole);
    if (v.concG && v.volume) return extractValue(v.concG) * extractValue(v.volume);
    if (v.concMole && v.mw && v.volume) return extractValue(v.concMole) * extractValue(v.mw) * extractValue(v.volume);
    return NaN;
  }

  function handleType(e: Event, type: typeof fields[number], i: number) {
    const mass = extractValue(values[i].mass);
    const mw = extractValue(values[i].mw);
    const mole = extractValue(values[i].mole);
    const concMole = extractValue(values[i].concMole);
    const concG = extractValue(values[i].concG);
    const volume = extractValue(values[i].volume);
    const want = values[i].want;

    if (want === "mass") {
      values[i].mass = format(getMass(i)) + "g";
    } else if (want === "mw") {
      values[i].mw = format(getMW(i)) + "Da";
    } else if (want === "mole") {
      values[i].mole = format(getMole(i)) + "mol";
    } else if (want === "concMole") {
      values[i].concMole = format(mole / volume) + "mol/L";
    } else if (want === "concG") {
      values[i].concG = format(mass / volume) + "g/L";
    } else if (want === "volume") {
      values[i].volume = format(mass / (concG || concMole)) + "L";
    }
  }
  // function handleTouch(e: Event, type: string, i: number) {
  // 	const touch = lastTouch[i];
  // 	const idx = touch.findIndex((v) => v == type);
  // 	if (idx !== -1) {
  // 		touch.splice(idx, 1);
  // 	}
  // 	touch.push(type);
  // 	lastTouch[i] = touch;
  // 	console.log(touch);
  // }
</script>

<div class="w-16">
  <table class="table-auto">
    <thead>
      <tr class="text-base">
        <th>Name</th>
        <th>Mass</th>
        <th>MW</th>
        <th>Mole</th>
        <th>Conc (mol)</th>
        <th>Conc (g)</th>
        <th>Volume</th>
      </tr>
    </thead>
    <tbody>
      {#each values as line, i}
        <tr>
          <td>
            <input type="text" />
          </td>

          {#each Object.keys(line) as key}
            {#if key !== "want"}
              <td>
                <input
                  class=""
                  class:bg-yellow-200={line.want === key}
                  type="text"
                  bind:value={line[key]}
                  on:input={(e) => handleType(e, key, i)}
                  on:dblclick={() => (line.want = key)}
                />
              </td>
            {/if}
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<button
  class="rounded-lg bg-blue-600 text-white shadow shadow-blue-500 hover:bg-blue-700 w-8 p-2"
  on:click={() => {
    values.push(clone(template));
    values = values;
  }}
>
  <!-- Add row button -->
  Add row
</button>

<style lang="postcss">
  th {
    @apply pl-3;
  }

  th:first-child {
    @apply pl-1;
  }

  input {
    @apply w-36 rounded border border-gray-300 text-sm focus:border-sky-600 focus:outline-none;
  }
</style>
