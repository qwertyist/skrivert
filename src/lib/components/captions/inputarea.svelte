<script>
  import { onMount } from "svelte";
  import InputLine from "$lib/components/captions/inputline.svelte";
  let lines = [""];
  let paragraphs = [];
  let focused = 0;
  function newline(e) {
    console.log("newline", e.detail);
    if (focused == lines.length - 1) {
      lines = [...lines, ""];
    } else {
      const linesLeft = lines.slice(0, focused+1)
      const linesRight = lines.slice(focused+1, lines.length)
      lines = [...linesLeft, "", ...linesRight]
    }
    setTimeout(() => {
      console.log(paragraphs[focused].value);
      paragraphs[e.detail].focus();
    }, 25);
  }
  function focus(e) {
    console.log("focus", e.detail);
    focused = e.detail;
  }
  function input(e) {
    console.log(`input within container ${focused}`);
  }
  onMount(() => {
    paragraphs[0].focus();
  });
</script>

<div on:beforeinput={input}>
  {#each { length: lines.length } as _, i}
    <InputLine
      n={i}
      on:focus={focus}
      on:newline={newline}
      bind:text={lines[i]}
      bind:el={paragraphs[i]}
    />
    <br />
  {/each}
  {lines}
</div>
