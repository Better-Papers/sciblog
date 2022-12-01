<script lang="ts">
  import Preview from "$src/lib/elements/preview.svelte";
  /** @type {import('./$types').PageData */
  export let data;

  let { post } = data;
</script>

<Preview {post} />
