<script lang="ts">
  import ArrowBack from "$src/lib/components/arrowBack.svelte";
  import { posts } from "$src/lib/slug";

  const tags = new Set(posts.map((post) => post.post.metadata.tags).flat());
</script>

<header class="prose flex items-center gap-x-3">
  <ArrowBack />
  <h1 class="text-neutral-800">Tags</h1>
</header>

<div class="mt-6 text-xl">
  {#each Array.from(tags) as tag}
    <a href={`/tags/${tag}`} data-sveltekit-prefetch class="prose flex flex-col gap-y-6 divide-y-2">
      <p class="text-lg font-medium">{tag}</p>
    </a>
  {/each}
</div>
