<script lang="ts">
  import { liveQuery }from "dexie";
  import { db } from "../../db"

  $: shortforms = liveQuery(async() => {
    const shortforms = await db.shortforms.toArray();
    return shortforms;
  })

  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import AddShortform from "./addshortform.svelte";
  let addshortform: any;
  export let data: PageData;
  onMount(() => {
  })
</script>
<AddShortform data={data.form}/>

<pre>{JSON.stringify($shortforms)}</pre>
<ul>
  {#if $shortforms}
    {#each $shortforms as shortform (shortform.id)}
      <li>{shortform.shortform} {shortform.phrase}</li>
    {/each}
  {/if}
</ul>
