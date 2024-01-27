<script lang="ts">
  import { onMount } from "svelte";
  import  Quill  from 'quill'
  //import Caption from "./formats/caption.js";
  import Keyboard from "./modules/keyboard.js";
  import { getFontSettings, getColorSettings } from "./formats/document.ts";
  const fontSettings = getFontSettings();
  const colors = getColorSettings();
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
  onMount(() => {
    console.log(skrivert)
    skrivert.focus();
    skrivert.scrollingContainer.style = colors.bg;
  }
  )
</script>

<svelte:head>
	<link href="quill.css" rel="stylesheet">
</svelte:head>
<main style:background-color={colors.bg}>
  <div class="editor" style="{fontSettings}" use:quill />
</main>

<style>
	main {
		padding: 1em;
		margin: 0 auto;
    height: 100vh;
	}


  .editor {
    max-height: 90%;
  }


</style>
