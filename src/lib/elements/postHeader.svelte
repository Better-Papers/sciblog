<script lang="ts">
  import type { Post } from "$lib/slug";
  import type { Citation } from "../cite";
  import ArrowBack from "../components/arrowBack.svelte";

  export let metadata: Post["post"]["metadata"];
  export let citation: Citation | undefined = undefined;
  export let arrow = true;
</script>

<header class="not-prose flex gap-x-3">
  {#if arrow}
    <div class="translate-y-[6px]">
      <ArrowBack />
    </div>
  {/if}

  <div class="flex flex-col">
    {#if citation}
      <p class:text-2xl={arrow} class="text-xl font-medium">{metadata.title}</p>

      <p class="text-neutral-700">
        {@html citation.author
          .map((x) => `${x.given} <b>${x.family}</b>`)
          .slice(0, 2)
          .join(", ")}
      </p>
      <p class="text-neutral-800">
        <i>{citation["container-title"]}</i>
        ({citation.issued["date-parts"][0][0]})
      </p>
    {:else}
      <p class="text-3xl font-bold">{metadata.title ?? "Untitled"}</p>
      {#if metadata.subtitle ?? false}
        <p class="text-lg">{metadata.subtitle}</p>
      {/if}
      {#if metadata.date ?? false}
        <p class="font-light">{metadata.date}</p>
      {/if}
    {/if}

    {#if (metadata.tags?.length ?? 0) > 0}
      <p class="mt-0.5 text-sm font-medium text-gray-700">
        Tags:
        {#each metadata.tags as tag}
          <a class="text-neutral-800 hover:text-neutral-600" data-sveltekit-prefetch href={`/tags/${tag}`}>{tag}</a>
        {/each}
      </p>{/if}
  </div>
</header>
