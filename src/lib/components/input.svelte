<script lang="ts">
  export let value: number;
  export let label: string;
  export let min = "";
  export let max = "";
  export let step = "";
</script>

<label class="w-fit text-sm group origin-[0] text-right text-gray-600 flex flex-col items-end group-focus:font-medium group-focus:text-blue-600 dark:text-gray-400 group-focus:dark:text-blue-500">
  {label}

  <input
    type="number"
    {min}
    {max}
    {step}
    class="w-36 border-0 border-b-2 border-gray-300 bg-transparent transition-colors px-0 pb-1 pt-1.5 text-right text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
    bind:value
  />
</label>
