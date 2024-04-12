<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { parser } from "$lib/captions/main";
  import {
    getCurrentWord,
    insertExpandedPhrase,
    insertText,
  } from "$lib/textarea/main";
  import { cacheShortforms, expandShortform } from "../modules/shortforms";
  import { defaultExpanders } from "../modules/keyboard";
  const parserOptions = {
    lines: 2,
    chars: 37,
  };
  let captionBuffer = [{ line: 1, content: "" }];
  let sendBlock = { timestampe: new Date(), wordIndexes: [0] }
  let sendQueue : Array<sendBlock> = [];

  let youtubeBlocks = [];
  let textarea: any = null;
  let capitalizeNext = true;
  let startTime = new Date();
  let started = false;
  let delay = 4000;

  function sendYoutubeCC() {
  }

  onMount(() => {
    if (browser) {
      textarea = document.getElementById("doc");
      textarea.focus();

      setInterval(sendYoutubeCC, delay);
    }
  });
  let text: string = "";
  let captions: string;
  let currentWord: string = "";
  let beforeInputEvent: any = {};
  let expandedPhrase: string = "";

  const shortforms = cacheShortforms();

  function renderCaptions(content: string) {
    captions = "";
    const parsed = parser(parserOptions, content);
    parsed.blocks.forEach((block) => {
      captions += block.lines.join("\n");
      captions += "\n\n";
    });
  }

  function updateBuffers() {
    if (!started) {
      started = true;
      startTime = new Date();
    } 
    captionBuffer[0] = { line: 0, content: text };
    captionBuffer.forEach((line) => {
      renderCaptions(line.content);
    });
  }

  function hotkeyHandler(e: KeyboardEvent) {
    if (e.keyCode == 115) {
      textarea.value = "";
    }
  }

  function expand(e: InputEvent) {
    const expander = e.data as string;
    // console.log("expander:", expander);
    if (defaultExpanders.has(expander)) {
      const expanderRules = defaultExpanders.get(expander)!;
      currentWord = getCurrentWord(textarea).trim();
      expandedPhrase = expandShortform(shortforms, currentWord);
      if (expanderRules.fullstop) {
        // console.log("should capitalize next");
        capitalizeNext = true;
      }
      if (expandedPhrase != "") {
        insertExpandedPhrase(
          textarea,
          expander,
          currentWord.length,
          expandedPhrase,
        );
        e.preventDefault();
      }
    }
  }

  function change() {
    if (textarea.value.length == 0) {
      capitalizeNext = true;
    }
  }

  function input(e: InputEvent) {
    beforeInputEvent = e.inputType + " (" + e.data + ")";
    if (e.inputType == "insertText") {
      const key = e.data || "";
      if (capitalizeNext && !defaultExpanders.has(key)) {
        insertText(textarea, key.toUpperCase());
        capitalizeNext = false;
        e.preventDefault();
      }
      expand(e);
      console.log(beforeInputEvent)
      if (e.data == null) { return }
      if (/[\. ,!?]/.test(e.data)) {
        const sendblock = { timestamp: new Date() - started, wordIndexes: [-1] }
        sendQueue.push(sendblock);
        updateBuffers();
      }
    }
    if (e.inputType == "insertLineBreak") {
    }
  }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div class="h-full w-full" role="application" on:keyup={hotkeyHandler}>
  <div class="h-full gap-4 grid grid-cols-2">
    <div>
      <div
        class="docContainer"
        role="application"
        id="docContainer"
        on:keyup={change}
        on:beforeinput={input}
      >
        <textarea id="doc" rows="4" bind:value={text} />
      </div>
    </div>

    <div>
      <textarea class="captions" cols="80" rows="4" bind:value={captions} />
      <pre>
<span class="debug">currentword: {currentWord.length} {currentWord}</span><br />
<span class="debug">expanded: {expandedPhrase}</span><br />
<span class="debug">capitalize: {capitalizeNext}</span><br />

<span class="debug">beforeinput: {beforeInputEvent}</span><br />
<span class="debug">youtubeBlocks: {youtubeBlocks}</span><br />
        </pre>
    </div>
  </div>
</div>

<style lang="postcss">
  .docContainer {
    width: 100%;
  }
  .docContainer textarea {
    width: 100%;
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
  .debug {
  }
</style>
