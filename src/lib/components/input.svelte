<script lang="ts">
  export let value: number;
  export let label: string;
  export let min = "";
  export let max = "";
  export let step = "";
</script>

<div class="">
  <label class="origin-[0] scale-90 transform text-right text-sm text-gray-500 duration-300 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
    {label}

    <input
      type="number"
      name="captureEff"
      {min}
      {max}
      {step}
      class="peer block border-0 border-b-2 border-gray-300 bg-transparent px-0 pb-1 pt-1.5 text-right text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
      bind:value
    />
  </label>
</div>
