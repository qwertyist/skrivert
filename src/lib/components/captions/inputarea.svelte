<script>
  import { onMount } from "svelte";
  import InputLine from "$lib/components/captions/inputline.svelte";
  let lines = 1;
  let paragraphs = [];

  function newline(e) {
    console.log("newline", e.detail);
    lines++;
    setTimeout(() => {
      paragraphs[e.detail].focus();
    }, 25);
  }
  function focus(e) {
    console.log("focus", e.detail);
  }

  onMount(() => {
    paragraphs[0].focus();
  });
</script>

<div>
  {#each { length: lines } as _, i}
    <InputLine
      n={i}
      on:focus={focus}
      on:newline={newline}
      text="rad {i + 1}"
      bind:el={paragraphs[i]}
    />
    <br />
  {/each}
</div>
