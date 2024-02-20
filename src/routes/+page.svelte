<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  import { browser }from "$app/environment";
  import { onMount, onDestroy } from "svelte";

  export let options = { placeholder: "..." }
  export let html ="<p>Vad står det här då?</p>"
  let node;
  let skrivert;

  onMount(async () => {
    const { default: Quill }= await import("quill");
    const { default: Keyboard } = await import("../modules/keyboard.js");
    Quill.register("modules/keyboard", Keyboard, true)
    skrivert = new Quill(node, {
      modules: {
        toolbar: [],
        keyboard: {
          listIds: []
        }
      },
      themes: "snow",
      ...options
    });
  })
  function handleClick() {
    skrivert.focus();
  };
</script>

<div class="container mx-auto h-full w-full" on:click={handleClick}>
  <div class="editor" spellcheck=false bind:this={node} />
</div>

<style lang="postcss">
  .editor {
    max-height: 90%;
  }
</style>
