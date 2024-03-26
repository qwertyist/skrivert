<script lang="ts">
  const debug = {
    timers: false,
    sendQueue: false,
    sendInfo: false,
  }
  const sendTimeOffset = 0;
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  let textarea: any = null;
  let text: string;
  let started = false;
  let startTime = new Date();
  let inputType = "";
  let lastChar = "";
  $: sendQueue = [];
  $: sendTimes = [];
  onMount(() => {
    if (browser) {
      textarea = document.getElementById("doc");
      textarea.focus();
    }
  });

  function sendYoutubeCC(text) {
    const now = new Date(new Date().getTime() + sendTimeOffset).toISOString().slice(0,-1);
    console.log(`${now}\n${text.trim()}`);
    
  }
  function prepareSendCC() {
    const interval = sendTimes.shift() ;
    if (interval == undefined) {
      if(debug.timers) {
        console.log("No send interval ⏱ - stopping");
      }
      if(debug.sendQueue) {
        console.log("sendQueue content:", sendQueue);
      }
      return;
    }
    let now = new Date();
    const words = sendQueue.shift();
    if(debug.sendInfo) {
      console.log(`Sending:\n${interval}\n${words}`);*/
    }
    if (words != "empty") {
      sendYoutubeCC(words)
    }
    setTimeout(prepareSendCC, interval)
  }

  let active = false;
  const emptySendFrequency = 2500;
  let emptySendTimer = emptySendFrequency;
  let tick = 10;

  let sendTimer = 0;
  function resetSendTimer() {
    sendTimer = 0;
  }
  function resetEmptySendTimer() {
    emptySendTimer = emptySendFrequency;
  }

  function change() {
    if (!started) {
      startTime = new Date();
      started = true;
      setTimeout(prepareSendCC, 5000);
      setInterval(() => {(emptySendTimer -= tick)|| insertEmptySend()}, tick)
      setInterval(() => {sendTimer += tick}, tick)
    }
  }
  
  function insertEmptySend() {
    if(debug.timers) {
      console.log(`${emptySendFrequency}ms passed, insert empty send`);
    }
    sendQueue.push("empty")
    sendTimes.push(emptySendFrequency)
    sendTimer -= emptySendFrequency;
    resetEmptySendTimer()
  }

  function input(e: InputEvent) {
    inputType = e.inputType;
    if (
      e.inputType == "deleteContentBackward" ||
      e.inputType == "deleteWordBackward"
    ) {
      lastChar = text.slice(-2);
      if (/[,.!?] /.test(lastChar)) {
        lastChar = "Remove last chunk from sendQueue";
        sendQueue.pop();
      }
    }

    if (e.inputType == "insertText") {

      const key = e.data || "";
      if (/[\n\.,!?]/.test(key)) {
        sendQueue.push(text.split(/[\n\.,!?]/).pop() + `${key}`);
        sendTimes.push(sendTimer)
        resetEmptySendTimer();
      }
    }
    if (e.inputType == "insertLineBreak") {
        let block = text.split(/[\n\.,!?]/).pop()
        if(block != "")  {
          sendQueue.push(block);
          sendTimes.push(sendTimer)
          resetSendTimer();
          resetEmptySendTimer();
        }
    }

    if(debug.sendQeue) {
      console.log(sendQueue);
    }
  }

</script>

<div>

  <div class="docContainer" role="application" id="docContainer">
    <textarea
      id="doc"
      rows="4"
      on:keyup={change}
      on:beforeinput={input}
      bind:value={text}
    />
  </div>
  <div class="debug">
    <h2>Debug</h2>
    <pre>
inputType: {inputType}
lastChar: {lastChar}
emptySendTimer: {emptySendTimer}
sendqueue: 
</pre>
    <span>
      {#each sendQueue as chunk, index}
        {index} - {chunk}
      {/each}
    </span>
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
  .debug {
    background-color: white;
    color: black;
  }
</style>
