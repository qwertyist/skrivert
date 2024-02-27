<script lang="ts">
  import {onMount } from "svelte";
  import type { PageData } from "./$types";
  import AddShortform from "./addshortform.svelte";
  let addshortform: any;
  export let data: PageData;
  onMount(() => {
    console.log("Page Settings mounted")
  })
</script>

<AddShortform data={data.form}/>
