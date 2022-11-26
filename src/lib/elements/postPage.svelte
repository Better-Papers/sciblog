<script lang="ts">
  import { onMount } from "svelte";
  import tippy from "tippy.js";
  import { getCitation } from "../cite";
  import type { Post } from "../slug";
  import PostHeader from "./postHeader.svelte";

  export let post: Post;
  export let arrow = true;
  export let toc = true;

  const metadata = post.post.metadata;
  const citation = metadata.citekey ? getCitation(metadata.citekey) : undefined;
  const uid = Math.random().toString(36).substring(2);

  function makeLiteralLinks(bibs: HTMLDivElement) {
    let csl: HTMLDivElement;
    const url = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    for (csl of bibs.getElementsByClassName("csl-entry")) {
      csl.innerHTML = csl.innerHTML.replace(url, "<a href='$&'>$&</a>");
    }
  }

  // inline citation
  function getBibEntry(citekey: string): string {
    const bibNode = document.getElementById(`bib-${citekey}`);
    return bibNode?.innerHTML ?? "";
  }

  // Useful when writing.
  onMount(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const node = document.getElementById(`post-${uid}`)!;

    const bibs = node.getElementsByClassName("references")[0] as HTMLDivElement | null;
    if (bibs) makeLiteralLinks(bibs);

    let el: HTMLDivElement;
    for (el of node.getElementsByClassName("citation")) {
      const bibEntry = `<div><div>${el.getAttribute("id")?.split("--").slice(1, -1).map(getBibEntry).join("</div><div>")}</div></div>`;
      // const bibEntry = getBibEntry(el);

      // const newNode = document.createElement("aside");
      // newNode.innerHTML = bibEntry;
      // el.parentNode?.parentNode?.insertBefore(newNode, el.parentNode);

      tippy(el, {
        content: bibEntry,
        theme: "light-border",
        allowHTML: true,
        arrow: true,
        animation: "fade",
        duration: [200, 250],
        interactive: true,
      });
    }

    if (!toc) {
      node.getElementsByClassName("toc")[0].remove();
    }

    if (metadata.citekey) {
      const div = document.createElement("div");
      div.innerHTML = citation.html;
      makeLiteralLinks(div);
      node.getElementsByClassName("toc")[0].appendChild(div);
    }
  });
</script>

<svelte:head>
  <title>{metadata.title}</title>
</svelte:head>

<div id={`post-${uid}`}>
  <PostHeader {metadata} {citation} {arrow} />
  <div class="h-6" />
  <article class="prose max-w-none leading-normal md:leading-relaxed">
    <svelte:component this={post.post.default} />
  </article>
</div>

<style lang="postcss">
  .sidebar {
    @apply float-right clear-right text-sm text-gray-600 md:w-[25%] lg:w-[30%];
  }

  /* Styles */
  article :global(.citation) {
    @apply text-blue-900;
  }

  article :global(.references) {
    @apply pl-8 -indent-8 text-xs text-gray-600 sm:text-sm;
  }

  article :global(h2 a) {
    @apply text-black no-underline;
  }

  article :global(h3 a) {
    @apply text-black no-underline;
  }

  @media (max-width: 768px) {
    article :global(aside) {
      @apply float-left clear-both mb-4 block w-full rounded bg-gray-100 px-4 py-2;
      vertical-align: baseline;
    }
  }

  /* Asides */
  article :global(aside) {
    @apply sidebar;
  }

  article :global(aside > p) {
    @apply my-1;
  }

  article :global(aside > figure) {
    @apply mx-auto max-w-[90%] -translate-y-4;
  }

  article :global(aside img) {
    @apply max-w-[200px] rounded-lg;
  }

  article :global(aside a) {
    @apply font-normal text-gray-800;
  }

  article > :global(:not(aside, header, .references)) {
    /* Move away */
    @apply w-full md:w-[65%] lg:w-[60%];
  }

  article > :global(.no-aside) {
    /* Move away */
    @apply w-full md:w-[100%] lg:w-[100%];
  }

  /* TOC */

  article :global(.toc) {
    @apply sidebar z-50 ml-2 mb-2 hidden w-full border-b border-b-neutral-300 bg-neutral-50/90 pb-3 font-serif text-sm backdrop-blur-sm lg:sticky lg:top-8;
  }

  article :global(.toc .toc-item) {
    @apply font-medium leading-relaxed text-gray-700;
  }

  article :global(.toc a) {
    @apply font-medium underline-offset-2 hover:underline;
  }

  article :global(.toc .toc-item-h2) {
    @apply pt-1;
  }

  article :global(.toc .toc-item-h3) {
    @apply pl-4 text-xs font-normal;
  }

  /* Citation and tippy */
  article :global(.citation) {
    @apply cursor-help;
  }

  article :global(.references) {
    @apply flex flex-col gap-y-2 overflow-x-hidden;
  }
</style>
