<script type="ts">
  import DotsHorizontal from "svelte-radix/DotsHorizontal.svelte";
  import ArrowRight from "svelte-radix/ArrowRight.svelte";
  import Trash from "svelte-radix/Trash.svelte";
  import Bell from "svelte-radix/Bell.svelte";
  import { Input } from "$lib/components/ui/input";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  export let sf;
  export let p;
  let use = new Date().toLocaleDateString();
</script>

<div
  class="grid grid-flow-col auto-cols-max px-2 gap-2.5 align-middle items-center"
>
  <div class="space-x-2">
    <Checkbox />
  </div>

  <Input class="max-w-24" bind:value={sf} placeholder="förkortning..." />
  <Input class="w-96" bind:value={p} placeholder="fras..." />
  <span class="">
    {use}
  </span>

  <DropdownMenu.Root>
    <DropdownMenu.Trigger
      class="rounded-md border border-slate-900 p-1 font-mono text-sm max-w-12"
      ><DotsHorizontal /></DropdownMenu.Trigger
    >
    <DropdownMenu.Content class="items-center">
      <DropdownMenu.Item class="space-x-2"
        ><Trash /><span>Ta bort</span></DropdownMenu.Item
      >
      <DropdownMenu.Item class="space-x-2"
        ><ArrowRight /><span>Flytta</span></DropdownMenu.Item
      >
      <DropdownMenu.Item class="space-x-2"
        ><Bell /><span>Påminn</span></DropdownMenu.Item
      >
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
