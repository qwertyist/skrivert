<script lang="ts">
  /* 
    Referenser:
    "Live Caption Vendor info"
    - https://support.google.com/youtube/answer/6077032?&ref_topic=2853697 
  */
  const debug = {
    timers: false,
    sendQueue: false,
    sendInfo: false,
    postReq: true,
    postRes: false,
  };
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
  $: result = "";
  $: sendTimeOffset = -2500;
  let endpoint = "";
  let seq = 0;
  onMount(() => {
    if (browser) {
      textarea = document.getElementById("doc");
      textarea.focus();
    }
  });

  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  function createPOSTRequest(word) {
    if (/[\s]+/.test(word)) return;
    const now = new Date(new Date().getTime() + sendTimeOffset)
      .toISOString()
      .slice(0, -1);
    if (debug.postReq) {
      console.log(`${now}\n${word.trim()}\n`);
    }
    fetch(endpoint + "&seq=" + seq, {
      mode: "no-cors",
      method: "POST",
      body: `${now}\n${word}\n`,
    })
      .then(() => {
        seq += 1;
      })
      .catch((err) => {
        console.error("post to youtube failed", err);
      });
  }

  async function sendYoutubeCC(text) {
    //TODO: Skicka ord för ord. Fixa POST-request
    if (endpoint == "") return;
    const words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
      createPOSTRequest(words[i]);
      const wait = Math.floor(Math.random() * (450 - 150 + 1)) + 150;
      console.log("And wait:", wait, "ms");
      await timer(wait);
    }
    /*
    const res = fetch(endpoint + "&seq=" + seq, {
      mode: "no-cors",
      method: "POST",
      body: `${now}\n${text}\n`,
    });
    seq += 1;
    */
  }

  function prepareSendCC() {
    const interval = sendTimes.shift();
    if (interval == undefined) {
      if (debug.timers) {
        console.log("No send interval ⏱ - stopping");
      }
      if (debug.sendQueue) {
        console.log("sendQueue content:", sendQueue);
      }
      return;
    }
    const words = sendQueue.shift();
    if (debug.sendInfo) {
      console.log(`Sending:\n${interval}\n${words}`);
    }
    if (words != "empty") {
      sendYoutubeCC(words);
    }
    setTimeout(prepareSendCC, interval);
  }

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
      setInterval(() => {
        (emptySendTimer -= tick) || insertEmptySend();
      }, tick);
      setInterval(() => {
        sendTimer += tick;
      }, tick);
    }
  }

  function insertEmptySend() {
    if (debug.timers) {
      console.log(`${emptySendFrequency}ms passed, insert empty send`);
    }
    sendQueue.push("empty");
    sendTimes.push(emptySendFrequency);
    sendTimer -= emptySendFrequency;
    resetEmptySendTimer();
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
        const block = text.split(/[\n\.,!?]/).pop() + `${key}`;
        sendQueue.push(block);
        sendTimes.push(sendTimer);
        resetSendTimer();
        resetEmptySendTimer();
      }
    }
    if (e.inputType == "insertLineBreak") {
      let block = text.split(/[\n\.,!?]/).pop();
      if (block != undefined && block != "") {
        sendQueue.push(block);
        sendTimes.push(sendTimer);
        resetSendTimer();
        resetEmptySendTimer();
      }
    }

    if (debug.sendQeue) {
      console.log(sendQueue);
    }
  }
</script>

<div>
  <div class="docContainer" role="application" id="docContainer">
    <textarea
      id="doc"
      rows="5"
      on:keyup={change}
      on:beforeinput={input}
      bind:value={text}
    />
  </div>
  <div class="settings">
    <div class="inputs">
      <label class="label" for="endpoint">POST Endpoint</label><br />
      <input
        name="endpoint"
        placeholder="http://upload.youtube.com/closedcaption?sparams=..."
        style="width: 60%"
        type="text"
        bind:value={endpoint}
      />
      <br />
      <label class="label" for="seq">Seq #</label><br />
      <input name="seq" type="number" min="0" bind:value={seq} />
      <br />
      <label class="label" for="offset">Tidsjustering</label><br />
      <input name="offset" type="number" bind:value={sendTimeOffset} />
      <button style="padding: 0.6em; outline: 1px solid black;">Anslut</button>
    </div>
  </div>
  <hr style="border: 1px solid black;margin-bottom: 0.2em;" />
  <div class="debug">
    <h2>Debug</h2>
    <pre>
inputType: {inputType}
lastChar: {lastChar}
emptySendTimer: {emptySendTimer}
currentSendTimer: {sendTimer}
lastSendTime: {sendTimes[sendTimes.length - 1]}
result: {result}
</pre>
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
    outline: none;
  }
  .docContainer textarea:focus {
    outline: none;
  }
  .settings {
    background-color: white;
    color: black;
    padding: 1em;
  }
  .settings .label {
    margin-top: 0.3em;
  }
  .settings .inputs {
    width: 60%;
  }
  .settings input {
    border: 1px solid black;
    padding: 0.6em;
  }
  .debug {
    background-color: white;
    color: black;
  }
</style>
