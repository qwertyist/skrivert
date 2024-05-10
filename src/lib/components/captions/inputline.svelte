<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  export let text = "";
  export let el;
  export let n;
  let cols = 42;
  const dispatch = createEventDispatcher();
  onMount(() => {
    el.addEventListener("focus", (e) => {
      dispatch("focus", n);
    });
    el.addEventListener("keydown", (e) => {
      //TODO: handle edge cases
      if (text.length >= cols) {
        dispatch("newline", n + 1)
        return
      }
      if (e.key == "Enter") {
        e.preventDefault();
        dispatch("newline", n + 1);
      }
    });
  });
</script>

<textarea rows="1" {cols} style="resize: none" bind:this={el} bind:value={text}
></textarea>
<br />

<style>
  textarea:focus {
    outline: none !important;
    border: 1px solid red;
    box-shadow: 0 0 10px #719ece;
  }
  textarea {
    position: relative;
    top: 1em;
    left: 2em;
    background-color: black;
    color: white;
    padding: 0.6em;
    font-size: 1.5em;
  }
</style>
