<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  export let mode = "default";
  export let text = "";
  export let el;
  export let n;
  export let cols = 42;
  export let focused = false;
  const dispatch = createEventDispatcher();
  const emptySendFrequency = 850;
  const tick = 10;

  let emptySendTimer = emptySendFrequency;

  const resetEmptySendTimer = () => {
    emptySendTimer = emptySendFrequency;
  };

  const insertEmptySend = () => {
    if (mode == "interpreter" && focused) {
      dispatch("tick", { n, text, delay: emptySendFrequency - emptySendTimer});
    }
    resetEmptySendTimer();
  };

  onMount(() => {
    setInterval(() => {
      (emptySendTimer -= tick) || insertEmptySend();
    }, tick);
    el.addEventListener("focus", (e) => {
      dispatch("focus", n);
    });
    el.addEventListener("keydown", (e) => {
      //TODO: handle edge cases
      if (text.length >= cols) {
        dispatch("newline", n + 1);
        return;
      }
      if (e.key == "Enter") {
        e.preventDefault();
        dispatch("newline", n + 1);
        return;
      }
      if (e.key.match(/\W/)) {
        dispatch("tick", { n, text, delay: emptySendFrequency -  emptySendTimer });
        resetEmptySendTimer();
      }
    });
  });
</script>

<textarea rows="1" {cols} style="resize: none" bind:this={el} bind:value={text}
></textarea><br />
<div style="position: relative; top: 2em;">
  Focused: {focused}
  <br />
  {emptySendTimer}
</div>
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
    background-color: black;
    color: white;
    padding: 0.6em;
    font-size: 1.5em;
  }
</style>
