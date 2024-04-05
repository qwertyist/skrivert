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

  import X from "lucide-svelte/icons/x";
  import PanelRightClose from "lucide-svelte/icons/panel-right-close";
  import PanelRightOpen from "lucide-svelte/icons/panel-right-open";
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

  let n = 0;
  let sidebar = false;
  const closeSidebar = () => {
    sidebar = false;
  };
  const toggleSidebar = () => {
    if (n == 4) n = -1;
    n++;
    sidebar = !sidebar;
  };
  onMount(() => {
    document.addEventListener("keydown", (event) => {
      if (event.code == "F7") {
        event.preventDefault();
        toggleSidebar();
      }
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        //        console.log("User opened another tab");
      } else {
        //       console.log("User is on this tab");
      }
    });
  });
</script>

<div class="h-full w-full">
  <div class="w-full h-full flex flex-row">
    <div class="w-full flex flex-col">
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
          <!-- TODO: Skapa breakpoint w < 950px -->
          <div class="py-4 max-w-42">
            <div class="flex align-left">
              <div class="align-center border-r-2">
                <a href="#" class="px-2 text-slate-500 hover:text-slate-800"
                  >Hem</a
                >
              </div>
              <div class="align-center border-r-2">
                <a href="#" class="px-2 text-slate-500 hover:text-slate-800"
                  >Skriv</a
                >
              </div>
              <div class="align-center border-r-2">
                <a
                  href="#"
                  class="px-2 text-slate-500 hover:text-slate-800 border-slate-200"
                  >Ordlistor</a
                >
              </div>
              <div class="align-center border-r-2">
                <a
                  href="#"
                  class="px-2 text-slate-500 hover:text-slate-800 border-slate-200"
                  >Inställningar</a
                >
              </div>
              <div class="align-center">
                <a
                  href="#"
                  on:click={toggleSidebar}
                  class="px-2 text-slate-500 flex"
                >
                  {#if !sidebar}Öppna verktygslåda&nbsp;<PanelRightOpen />
                  {:else}Stäng verktygslåda&nbsp;<PanelRightClose />{/if}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <main>
        <slot />
      </main>
    </div>
    <div class={sidebar ? "" : "hidden"}>
      <div class="h-full border-l-2 py-2 px-2">
        <div class="space-y-1">
          <a href="#" on:click={closeSidebar}><X class="float-right" /></a>
          <h4 class="text-xl font-medium leading-none">Verktygslåda</h4>
          <p class="text-md text-muted-foreground">
            Manipulera verkligheten och bokstäverna med olika tillhyggen
          </p>
        </div>
        <Separator class="my-4" />
        {#if n == 4}
          <iframe
            width="346"
            height="315"
            src="https://www.youtube.com/embed/MZnXgxODfHg?si=QTtU_ne0-48m1vRQ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        {:else}
          <div class="flex items-center space-x-4">
            <Skeleton class="h-12 w-12 rounded-full" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[150px]" />
              <Skeleton class="h-4 w-[100px]" />
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
