<script lang="ts">
  import { onMount } from "svelte";
  import "../app.pcss";
  import "../app.postcss";
  import Activity from "lucide-svelte/icons/activity";
  import ArrowUpRight from "lucide-svelte/icons/arrow-up-right";
  import CircleUser from "lucide-svelte/icons/circle-user";
  import CreditCard from "lucide-svelte/icons/credit-card";
  import DollarSign from "lucide-svelte/icons/dollar-sign";
  import Menu from "lucide-svelte/icons/menu";
  import Package2 from "lucide-svelte/icons/package-2";
  import Search from "lucide-svelte/icons/search";
  import Users from "lucide-svelte/icons/users";

  import Keyboard from "svelte-radix/Keyboard.svelte";

  import { Badge } from "$lib/components/ui/badge/index";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index";
  import { Button } from "$lib/components/ui/button/index";
  import * as Card from "$lib/components/ui/card/index";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index";
  import { Input } from "$lib/components/ui/input/index";
  import * as Pagination from "$lib/components/ui/pagination/index";
  import { Progress } from "$lib/components/ui/progress/index";
  import { Separator } from "$lib/components/ui/separator/index";
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { Skeleton } from "$lib/components/ui/skeleton/index";
  import * as Table from "$lib/components/ui/table/index";
  import * as Tabs from "$lib/components/ui/tabs/index";
  import * as Tooltip from "$lib/components/ui/tooltip/index";

  let sidebar = false;
  const toggleSidebar = () => {
    sidebar = !sidebar;
  };
  onMount(() => {
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        //        console.log("User opened another tab");
      } else {
        //       console.log("User is on this tab");
      }
    });
  });
</script>

<div class="min-h-screen w-full flex-col">
  <div class="grid grid-cols-12">
    <div class={sidebar ? "col-span-10" : "col-span-12"}>
      <div class="sticky top-0 h-16 border-b bg-background px-4 md:px-6">
        <nav
          class="flex md:flex md:flex-grow flex-row space-x-1 justify-between"
        >
          <a href="#" class="py-4 px-2">
            <div
              class="grid grid-cols-2 text-slate-500 hover:text-slate-800 font-bold"
            >
              <Keyboard />Skrivert
            </div>
          </a>
          <div class="py-4 px-2 flex">
            <div>
              <a
                href="#"
                class="py-4 px-2 text-slate-500 hover:text-slate-800 border-r-2"
                >Hem</a
              >
              <a
                href="#"
                class="py-4 px-2 text-slate-500 hover:text-slate-800 border-r-2 border-slate-200"
                >Skriv</a
              >
              <a
                href="#"
                class="py-4 px-2 text-slate-500 hover:text-slate-800 border-r-2 border-slate-200"
                >Ordlistor</a
              >
              <a
                href="#"
                class="py-4 px-2 text-slate-500 hover:text-slate-800 border-r-2 border-slate-200"
                >Inställningar</a
              >
              <a
                href="#"
                on:click={toggleSidebar}
                class="py-4 px-2 text-slate-500">Öppna/stäng verktygslåda</a
              >
            </div>
          </div>
        </nav>
      </div>

      <main>
        <slot />
      </main>
    </div>
    <div class={"col-span-2 " + (sidebar ? "": "hidden")}>
      <div class="border-l-2 py-2 px-2">
        <div class="space-y-1">
          <h4 class="text-xl font-medium leading-none">Verktygslåda</h4>
          <p class="text-md text-muted-foreground">
            Manipulera verkligheten och bokstäverna med olika tillhyggen
          </p>
        </div>
        <Separator class="my-4" />
        <div class="flex items-center space-x-4">
          <Skeleton class="h-12 w-12 rounded-full" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-[150px]" />
            <Skeleton class="h-4 w-[100px]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
