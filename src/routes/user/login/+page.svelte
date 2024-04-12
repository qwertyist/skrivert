<script lang="ts">
  import { currentUser, pb } from "$lib/pocketbase";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Progress } from "$lib/components/ui/progress";

  import { goto } from "$app/navigation";
  import { _userLoginSchema } from "./+page";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import SuperDebug from "sveltekit-superforms";

  export let data: SuperValidated<Infer<typeof _userLoginSchema>>;
  export let username: string;
  export let password: string;
  export let submitting = false;
  export let failedLogin =  false;
  let progress = 0;
  const form = superForm(data, {
    SPA: true,
    validators: zodClient(_userLoginSchema),
    dataType: "json",
    onUpdate({ form }) {
      if (form.valid) {
        progress = 13;
        login(form.data);
        setTimeout(() => {
          progress = 45;
          setTimeout(() => {
            progress = 85;
            goto("/");
          }, 450);
        }, 450);
      }
    },
  });
  const { form: formData, enhance } = form;

  async function login(form) {
    try {
      const user = await pb
        .collection("users")
        .authWithPassword(form.username, form.password);
    } catch (err) {
      console.error("failed login:", err);
      failedLogin = true;
    }
  }
  function signOut() {
    pb.authStore.clear();
  }
</script>

<svelte:head>
  <title>Skrivert | Logga in</title>
</svelte:head>
<div class="space-y-1">
  <div>
    {#if $currentUser}
      <Progress {progress} max={100} />
      <p>Du är inloggad som {$currentUser.username}</p>
      <p>
        <br />
        <Button on:click={signOut}>Logga ut</Button>
      </p>
    {:else}
      {#if failedLogin}
        Ditt användarnamn eller lösenord är felaktigt.
      {/if}
      <form class="w-72" method="POST" use:enhance>
        <Form.Field {form} name="username">
          <Form.Control let:attrs>
            <Form.Label>Användarnamn</Form.Label>
            <Input {...attrs} bind:value={$formData.username} />
          </Form.Control>
          <Form.Description></Form.Description>
          <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="password">
          <Form.Control let:attrs>
            <Form.Label>Lösenord</Form.Label>
            <Input type="password" {...attrs} bind:value={$formData.password} />
          </Form.Control>
          <Form.Description></Form.Description>
          <Form.FieldErrors />
        </Form.Field>
        {#if submitting}
          <Progress {progress} max={100} class="w-72" />
        {:else}
          <Form.Button>Logga in</Form.Button>
        {/if}
      </form>
      <Separator class="my-4" />
      <div class="flex space-x-2 h-5 items-center space-x-4 text-sm">
        Är du ny Skrivert-användare?<br />
        <a href="/user/register">Registrera dig här!</a>
      </div>
    {/if}
  </div>
</div>
<!--<SuperDebug data={$formData} />-->
