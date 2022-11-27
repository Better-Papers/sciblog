<script lang="ts">
  import { genUid } from "../utils";

  export let value: number;
  export let label: string;
  export let min = "";
  export let max = "";
  export let step = "";

  const uid = genUid();
</script>

<div class="w-fit text-sm mb-1">
  <input
    name={uid}
    type="number"
    {min}
    {max}
    {step}
    class="peer mt-3 w-36 border-0 border-b-2 border-gray-300 bg-transparent transition-colors px-0 pb-1 pt-1.5 text-right text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
    bind:value
  />

  <label
    for={uid}
    class="h-0 -translate-y-[50px] origin-[0] text-right text-gray-600 flex flex-col items-end group-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
  >
    {label}
  </label>
</div>
