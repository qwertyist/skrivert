<script lang="ts">
  import { onMount } from 'svelte';
  import { parser } from "$lib/captions/main"
  import { getCurrentWord } from "$lib/textarea/main"
  import { cacheShortforms, expandShortform } from "../modules/shortforms"
  const parserOptions= {
    lines: 2,
    chars: 37
  }
  let buffer = [
    { line: 1, content: "",}
  ]
  let textarea = null;
  onMount(() => {
    textarea = document.getElementById("doc");
    textarea.focus();
	});
  let text: string = "";
  let captions: string;
  let currentWord: string = "";
  let beforeInputEvent: any = {}
  let expandedPhrase: string = "";

  const shortforms = cacheShortforms()

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
      // console.log("Insert Text", e.data)
      switch(e.data) {
        case " ": {
          currentWord = getCurrentWord(textarea).trim();
          if(shortforms.has(currentWord)) {
            expandedPhrase = expandShortform(shortforms, currentWord);
          } else {
            expandedPhrase = "";
          }

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
        <textarea id="doc" bind:value={text}/>
      </div>

      <div> 
        <pre>
<span class="debug">currentword: {currentWord.length} {currentWord}</span><br />
<span class="debug">expanded: {expandedPhrase}</span><br />

<span class="debug">beforeinput: {beforeInputEvent}</span><br />
<span class="debug">buffer: {buffer}</span><br />
        </pre>
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
  .debug {
  }
</style>
