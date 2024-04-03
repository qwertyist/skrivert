<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  export let name;
  export let type;
  export let id;
</script>

<div
  class="w-96 rounded-md border grid py-2 grid-cols-6 place-items-start align-middle bg-slate-800 hover:bg-slate-600"
>
  <p
    class="col-start-1 col-end-5 font-mono text-sm px-3 py-1 truncate max-w-82"
  >
    {name}
  </p>
  <!--  <span class="font-mono text-sm px-3 py-1 max-w-32">{type}</span>-->

  <DropdownMenu.Root>
    <DropdownMenu.Trigger
      class="col-start-6 col-end-6 rounded-md border px-3 py-1 font-mono text-sm max-w-24"
      >...</DropdownMenu.Trigger
    >
    <DropdownMenu.Content>
      <DropdownMenu.Item>Öppna lista</DropdownMenu.Item>

      <DropdownMenu.Item>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Sammanfoga med...</DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>En lista</DropdownMenu.Item>
          <DropdownMenu.Item>En annan lista</DropdownMenu.Item>
          <DropdownMenu.Item>En tredje lista</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      </DropdownMenu.Item>
      <DropdownMenu.Item>Exportera lista</DropdownMenu.Item>
      <DropdownMenu.Item>Dela lista</DropdownMenu.Item>
      <DropdownMenu.Item>Ta bort lista</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</div>
