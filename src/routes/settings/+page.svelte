<script lang="ts">
  import { liveQuery }from "dexie";
  import { db } from "../../db"

  $: shortforms = liveQuery(async() => {
    const shortforms = await db.shortforms.toArray();
    return shortforms;
  })

  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import ListComponent from "$lib/components/shortforms/listcomponent.svelte"
  import AddShortform from "./addshortform.svelte";
  let addshortform: any;
  export let data: PageData;
  onMount(() => {
  })
</script>
<h4>Standardlistor</h4>
<ListComponent name="Standardlista" type="standard" id=0 />
<ListComponent name="Engelska" type="standard" id=2 />
<br /> 
<h4>Ämneslistor</h4>
<ListComponent name="För och efterled i svenska ortsnamn" type="ämneslista" id=255 />
<br />
<hr />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<AddShortform data={data.form}/>

<pre>{JSON.stringify($shortforms)}</pre>
<ul>
  {#if $shortforms}
    {#each $shortforms as shortform (shortform.id)}
      <li>{shortform.shortform} {shortform.phrase}</li>
    {/each}
  {/if}
</ul>
