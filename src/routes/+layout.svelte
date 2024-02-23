<script lang="ts">
  import "../app.pcss";
  import "../app.postcss";
  import "../quill.css";
  import { Button } from "$lib/components/ui/button";
</script>

<div class="h-[calc(100vh-78px)]">
  <div class="flex flex-wrap items-center justify-between mx-auto p-4">
    <div>
      <Button>Texta</Button>
      <Button>Ändra</Button>
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
