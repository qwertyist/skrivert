<script lang="ts">
  import { onMount } from "svelte";
  import "../app.pcss";
  import "../app.postcss";
  import { Button } from "$lib/components/ui/button";
  onMount(() => {
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        console.log("User opened another tab");
      } else {
        console.log("User is on this tab");
      }
    });
  });
</script>

<div class="h-[calc(100vh-78px)]">
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
    <div>
      <Button href="/youtube">Texta</Button>
      <Button href="/settings">Förkortningar</Button>
      <Button>Välja</Button>
    </div>
    <div>
      <Button>Skapa</Button>
      <Button>Dela</Button>
      <Button>Sluta</Button>
    </div>
  </div>
  <div class="h-full">
    <slot />
  </div>
</div>
