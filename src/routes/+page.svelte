<script lang="ts">
  import { parser } from "$lib/captions/main"
  const parserOptions= {
    lines: 2,
    chars: 37
  }
  let buffer = [
    { line: 1, content: "",}
  ]
  let text: string = "";
  let captions: string;
  let beforeInputEvent: any = {}
  function renderCaptions(content) {
    captions = "";
    const parsed = parser(parserOptions, content)
    parsed.blocks.forEach(block => {
      captions += block.lines.join("\n")
      captions += "\n\n"
    })
  }
  function updateBuffer() {
    buffer[0] = text;
    buffer.forEach(line => { 
      renderCaptions(line);
    })
      
  }
  function input(e) {
    beforeInputEvent = e.inputType + " ("+e.data+")";
    if(e.inputType == "insertText") {
      console.log("Insert Text", e.data)
      switch(e.data) {
        case " ": {
          updateBuffer()
          break
        }
      }
    }
    if(e.inputType == "insertLineBreak") {
    }
  }
</script>


<div class="h-full w-full">
    <div class="h-full gap-4 grid grid-cols-2">
      <div class="docContainer" id="docContainer" on:beforeinput={input}>
        <textarea bind:value={text}/>
      </div>

      <div> 
        <span class="debug">beforeinput: {beforeInputEvent}</span><br />
        <span class="debug">buffer: {buffer}</span><br />
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
