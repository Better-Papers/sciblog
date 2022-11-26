<script lang="ts">
  import PostPage from "$src/lib/elements/postPage.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<PostPage post={data} />
