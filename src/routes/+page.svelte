<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
  let text;
</script>


<div class="container mx-auto h-full w-full">
  <div contentEditable />

  <div style="color: black;">
    <textarea cols=80 rows=4 bind:value={text}/>
  </div>

  <div style="color: red;">
    <textarea cols=80 rows=4 bind:value={text} />
  </div>
</div>

<style lang="postcss">
  .editor {
    max-height: 90%;
  }
</style>
