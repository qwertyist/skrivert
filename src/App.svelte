<script lang="ts">
  import TailwindCss from './lib/TailwindCSS.svelte';
  import { onMount } from "svelte";
  import  Quill  from 'quill'

  //import Caption from "./formats/caption.js";
  import Keyboard from "./modules/keyboard.js";
  import { getFontSettings, getColorSettings } from "./formats/document.ts";
  const fontSettings = getFontSettings();
  const colorSettings = getColorSettings();
  let skrivert;
  Quill.register("modules/keyboard", Keyboard, true)
  let fontSize = 36;
	function quill(node) {
		skrivert = new Quill(node, {
      modules: {
        toolbar: null,
        keyboard: {
          listIds: []
        }
      },
      placeholder: "...",
      theme: "snow" // or 'bubble'
			});
  }
  let titleVisible = true;
  onMount(() => {

    console.log(skrivert)
    skrivert.focus();
    skrivert.scrollingContainer.style = colorSettings.bg;
    skrivert.on("text-change", function(delta, oldDelta, source) {
      titleVisible = false;
    })
  })
</script>

<svelte:head>
	<link href="quill.css" rel="stylesheet">

</svelte:head>
<TailwindCss />
<main style:background-color={colorSettings.bg}>
  {#if titleVisible}
    <h1 class="text-3xl font-bold underline">
      Skrivert
    </h1>
  {/if}

  <div class="editor" style="{fontSettings}" use:quill k/>
</main>

<style lang="postcss">
	main {
		padding: 1em;
		margin: 0 auto;
    height: 100vh;
	}


  .editor {
    max-height: 90%;
  }


</style>
