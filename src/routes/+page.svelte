<script lang="ts">
  // https://mdsvex.pngwn.io/docs#frontmatter-1
  import { posts } from "$lib/slug";
  import { onMount } from "svelte";
  import tippy from "tippy.js";

  onMount(() => {
    // for (const el of document.getElementsByClassName("link")) {
    //   tippy(el, {
    //     content: `
    //     <iframe class="w-full h-full" src="previews/${el.getAttribute("href")!.slice(6)}" onload="document.getElementById('temp').style.display='none';"></iframe>
    //     <div class="absolute -z-10" id="temp">Loading...</div>
    //     `,
    //     theme: "light-border",
    //     allowHTML: true,
    //     arrow: true,
    //     placement: "auto",
    //     animation: "fade",
    //     duration: [200, 250],
    //     interactive: true,
    //     interactiveBorder: 5,
    //   });
    // }
  });
</script>

<section class="prose mx-auto max-w-5xl md:prose-lg">
  <h1>Welcome</h1>

  <div class="flex flex-col">
    {#each Object.entries(posts) as [path, post]}
      <p class="md:my-3">
        {#if post.post.metadata.date ?? false}
          <span class="float-right">{post.post.metadata.date}</span>
        {/if}
        <a class="link mr-6" data-sveltekit-prefetch href={`posts/${post.slug}`}>{post.post.metadata.title}</a>
      </p>
    {/each}
  </div>
</section>
