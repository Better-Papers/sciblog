<script>
  // MDSveX does not support TS.
  // Most of the styling is in src/routes/posts/__layout.svelte.
  // @ts-ignore
  export let title;
  // @ts-ignore
  export let subtitle;
  // @ts-ignore
  export let date;
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<header class="not-prose flex gap-x-3">
  <a href="/">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 translate-y-[6px] stroke-blue-800" fill="none" viewBox="0 0 24 24" stroke-width="3">
      <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  </a>
  <div class="flex flex-col gap-y-1">
    <p class="text-3xl font-bold">{title ?? "Untitled"}</p>
    {#if subtitle ?? false}
      <p class="text-lg font-medium">{subtitle}</p>
    {/if}
    {#if date ?? false}
      <p class="text-lg">{date}</p>
    {/if}
  </div>
</header>

<slot />
