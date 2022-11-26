<script lang="ts">
  import Preview from "$src/lib/elements/preview.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<Preview post={data.post} />
