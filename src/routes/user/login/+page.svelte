<script lang="ts">
  import { currentUser, pb } from "$lib/pocketbase";
  import { Input } from "$lib/components/ui/input";
  import * as Form from "$lib/components/ui/form";

  let username: string;
  let password: string;

  async function login() {
    const user = await pb
      .collection("users")
      .authWithPassword(username, password);
    console.log(user);
  }
  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: username,
      };
      const createdUser = await pb.collection("users").create(data);
      console.log(createdUser);
      await login();
    } catch (err) {
      console.error(err);
    }
  }
  function signOut() {
    pb.authStore.clear();
  }
</script>

{#if $currentUser}
  <p>
    Inloggad som {$currentUser.username}
    <button on:click={signOut}>Logga ut</button>
  </p>
{:else}
  <form class="w-48" on:submit|preventDefault>
        <Form.Field>
        <Form.Control>
        <Form.Label>Användarnamn</Form.Label>
        <Input placeholder="Användarnamn" type="text" bind:value={username} />
        </Form.Control>
        </Form.Field>
    <Input placeholder="Lösenord" type="password" bind:value={password} />
    <button on:click={signUp}>Skapa användare</button>
    <button on:click={login}>Logga in</button>
  </form>
{/if}
