<script>
  import InputArea from "$lib/components/captions/inputarea.svelte";
</script>

<div class="container flex gap-10 justify-between">
  <div>
    <h4>Tolk</h4>
    <InputArea mode="interpreter" cols=80 />
  </div>
  <div>
    <h4>Tolkanvändare</h4>
    <InputArea mode="viewer" cols=42 />
  </div>
</div>
