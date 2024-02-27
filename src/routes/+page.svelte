<script lang="ts">
  import { onMount } from 'svelte';
  import { parser } from "$lib/captions/main"
  import { getCurrentWord, insertExpandedPhrase, insertText } from "$lib/textarea/main"
  import { cacheShortforms, expandShortform } from "../modules/shortforms"
  import { defaultExpanders } from "../modules/keyboard"
  const parserOptions= {
    lines: 2,
    chars: 37
  }
  let buffer = [
    { line: 1, content: "",}
  ]
  let textarea = null;
  let capitalizeNext = true;
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

  function expand(e) {
    const expander = e.data;
    console.log("expander:", expander)
    if(defaultExpanders.has(expander)) {
      const expanderRules = defaultExpanders.get(expander)
      currentWord = getCurrentWord(textarea).trim();
      expandedPhrase = expandShortform(shortforms, currentWord);
      if(expanderRules.fullstop) { 
        console.log("should capitalize next");
        capitalizeNext = true; 
      }
      if (expandedPhrase != "") {
        insertExpandedPhrase(textarea, expander, currentWord.length, expandedPhrase) 
        e.preventDefault();
      }
    }
  }
  function change() {
    if(textarea.value.length == 0) { 
      capitalizeNext = true;
    }
  }
  function input(e) {
    beforeInputEvent = e.inputType + " ("+e.data+")";
    if(e.inputType == "insertText") {
      if(capitalizeNext && !defaultExpanders.has(e.data)) {
        insertText(textarea, e.data.toUpperCase()) 
        capitalizeNext = false;
        e.preventDefault();
      }
      expand(e)
      updateBuffer()
    }
    if(e.inputType == "insertLineBreak") {

    }
  }
</script>


<div class="h-full w-full">
    <div class="h-full gap-4 grid grid-cols-2">
      <div class="docContainer" id="docContainer" on:keyup={change} on:beforeinput={input}>
        <textarea id="doc" bind:value={text}/>
      </div>

      <div> 
        <pre>
<span class="debug">currentword: {currentWord.length} {currentWord}</span><br />
<span class="debug">expanded: {expandedPhrase}</span><br />
<span class="debug">capitalize: {capitalizeNext}</span><br />

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
