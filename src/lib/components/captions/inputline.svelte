<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";
  export let text = "";
  export let el;
  export let n;
  const dispatch = createEventDispatcher();
  onMount(() => {
    el.addEventListener("focus", (e) => {
      dispatch("focus", n);
    })
    el.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        dispatch("newline", n+1);
      }
    });
  });
</script>

<textarea bind:this={el} bind:value={text}></textarea>
