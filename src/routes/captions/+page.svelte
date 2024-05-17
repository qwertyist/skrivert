<script>
  import { onMount } from "svelte";
  import InputArea from "$lib/components/captions/inputarea.svelte";
  let n = 0;
  onMount(async () => {
  });
</script>

<div class="container flex gap-10 justify-between">
  {n}
  <div>
    <h4>Tolk</h4>
    <InputArea mode="interpreter" cols=80 />
  </div>
  <div>
    <h4>Tolkanvändare</h4>
    <InputArea mode="viewer" cols=42 />
  </div>
</div>
