<script>
  import { onMount } from "svelte";
  import InputLine from "$lib/components/captions/inputline.svelte";
  export let mode = "default";
  export let cols = 42;
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
    }
    setTimeout(() => {
      console.log(paragraphs[focused].value);
      paragraphs[e.detail].focus();
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
    const data = {
      session_id: "xjbups9rel7px8w",
      author_id: "bwxjyopbf07kc31",
      data: e.detail,
    };
    await pb.collection("messages").update("ec66spfzlgbtv60", data);
  };
  import { pb } from "$lib/pocketbase";
  onMount(async () => {
    pb.collection("messages")
      .subscribe(
        "ec66spfzlgbtv60",
        function (e) {
          if (mode != "interpreter") {
            console.log(`(${e.record.session_id}) event:\n${JSON.stringify(e.record.data)}`);
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
