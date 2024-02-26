<script lang="ts">
  import { parser } from "$lib/captions/main"
  const parserOptions= {
      lines: 2,
      chars: 37
  }
  let text: string;
  let captions: string;
  function input(e) {
      if(e.inputType == "insertLineBreak") {
          captions = "";
          const parsed = parser(parserOptions, text)
          parsed.blocks.forEach(block => {
              captions += block.lines.join("\n")
              captions += "\n"
          })
      }
  }
</script>


<div class="h-full w-full">
    <div class="h-full gap-4 grid grid-cols-2">
      <div class="docContainer" id="docContainer" on:beforeinput={input}>
        <textarea bind:value={text}/>
      </div>

      <div> 
        <textarea class="captions" cols=80 rows=4 bind:value={captions} />
      </div>
    </div>
</div>

<style lang="postcss">
  .docContainer {
    width: 100%;
    height: 100%;
  }
  .docContainer textarea {
    width: 100%;
    height: 100%;
    color: red;
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
