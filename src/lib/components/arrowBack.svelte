<script lang="ts">
  import { page } from "$app/stores";
</script>

<a class="plain" data-sveltekit-prefetch href={$page.url.pathname.substring(0, $page.url.pathname.lastIndexOf("/")) + "/"}>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-blue-600 hover:stroke-blue-800" fill="none" viewBox="0 0 24 24" stroke-width="3">
    <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
</a>
