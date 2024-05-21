<script>
  import { onMount } from "svelte";
  import InputLine from "$lib/components/captions/inputline.svelte";
  export let mode = "default";
  export let cols = 42;
  export let delay = 5000;
  const queue = "9knweuancubgsu0";
  let lines = [""];
  let paragraphs = [];
  let focused = 0;
  function newline(e) {
    console.log("newline", e.detail);
    if (focused == lines.length - 1) {
      lines = [...lines, ""];
    } else {
      const linesLeft = lines.slice(0, focused + 1);
      const linesRight = lines.slice(focused + 1, lines.length);
      lines = [...linesLeft, "", ...linesRight];
      handleTick({
        n: e.detail.n - 1,
        text: e.detail.text,
        delay: e.detail.delay,
      });
    }
    setTimeout(() => {
      console.log("Focus next line");
      paragraphs[e.detail.n + 1].focus();
    }, 25);
  }
  function focus(e) {
    console.log("focus", e.detail);
    focused = e.detail;
  }
  function input(e) {
    //    console.log(`input within container ${focused}`);
  }
  const handleTick = async (e) => {
    const message = {
      session_id: "xjbups9rel7px8w",
      author_id: "bwxjyopbf07kc31",
      data: e.detail,
    };
    const created = await pb.collection("messages").create(message);
    const record = await pb.collection("queue").getOne(queue);
    const updatedQueue = {
      messages: [...record.messages, created.id],
      session_id: message.session_id,
    };
    await pb.collection("queue").update(queue, updatedQueue);
  };
  const messageHandler = async (n) => {
    pb.collection("queue")
      .getOne(queue, { expand: "messages", requestKey: null })
      .then((data) => {
        console.log(
          `${data.expand.messages[n].data.n}: ${data.expand.messages[n].data.text}`,
        );
        lines[data.expand.messages[n].data.n] =
          data.expand.messages[n].data.text;
        n++;
        setTimeout(() => {
          messageHandler(n);
        }, data.expand.messages[n].data.delay);
      })
      .catch((err) => {
        console.error(`Couldn't get message queue ${err}`);
      });
  };
  import { pb } from "$lib/pocketbase";
  onMount(async () => {
    let started = false;
    await pb
      .collection("queue")
      .subscribe(
        queue,
        function (e) {
          if (mode != "interpreter" && !started) {
            started = true;
            messageHandler(0);
          }
        },
        {
          /* other options like expand, custom headers, etc. */
        },
      )
      .catch((e) => {
        console.error(`subscribe failed: ${e}`);
      });

    if (mode == "interpreter") {
      paragraphs[0].focus();
    }
  });
</script>

<div class="captions" on:beforeinput={input}>
  {#each { length: lines.length } as _, i}
    <InputLine
      n={i}
      {cols}
      focused={focused == i}
      {mode}
      on:focus={focus}
      on:newline={newline}
      on:tick={handleTick}
      bind:text={lines[i]}
      bind:el={paragraphs[i]}
    />
    {#if (i - 1) % 2 == 0}
      <br />
      <br />
    {/if}
  {/each}
</div>

<style>
  captions:nth-child(even) .line {
    border: 5px solid blue;
    bottom: 0.3em;
  }
</style>
