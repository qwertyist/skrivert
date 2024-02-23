<script lang="ts">
  let text;
</script>


<div class="h-full w-full">
    <div class="h-full gap-4 grid grid-cols-2">
      <div>
        <textarea class="doc" bind:value={text}/>
      </div>

      <div> 
        <textarea class="captions" cols=80 rows=4 bind:value={text} />
      </div>
    </div>
</div>

<style lang="postcss">
  .doc {
    width: 100%;
    height: 100%;
    color: black;
    padding: 1em;
    resize: none;
  }
  .captions {
    color: white;
    background-color: black;
    padding: 1em;
    resize: none;
    width: 100%;
  }
</style>
