<script lang="ts">
  import { currentUser, pb } from "$lib/pocketbase";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { Progress } from "$lib/components/ui/progress";
  import { _userSchema } from "./+page";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import SuperDebug from "sveltekit-superforms";

  export let data: SuperValidated<Infer<typeof _userSchema>>;
  export let submitting = false;
  export let progress = 100;
  const form = superForm(data, {
    SPA: true,
    validators: zodClient(_userSchema),
    dataType: "json",
    onUpdate({ form }) {
      if (form.valid) {
        signUp(form.data);
      }
    },
  });

  const { form: formData, enhance } = form;
  async function signUp(userData) {
    try {
      submitting = true;
      const {
        name: username,
        password,
        confirmPassword: passwordConfirm,
        email,
      } = userData;
      console.log("Sign up with:", userData);
      const createdUser = await pb
        .collection("users")
        .create({ username, password, passwordConfirm, email });
      console.log("successfully created user:", createdUser);
    } catch (err) {
      submitting = false;
      console.error("Signup failed:", err);
    }
  }
</script>

<form class="w-72" method="POST" use:enhance>
  <Form.Field {form} name="name">
    <Form.Control let:attrs>
      <Form.Label>Användarnamn</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
    </Form.Control>
    <Form.Description>Det här använder du för att logga in</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Field {form} name="email">
    <Form.Control let:attrs>
      <Form.Label>E-postadress</Form.Label>
      <Input type="email" {...attrs} bind:value={$formData.email} />
    </Form.Control>
    <Form.Description
      >E-postadressen används om du vill ändra eller återställa ditt lösenord.</Form.Description
    >
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
  <Form.Field {form} name="confirmPassword">
    <Form.Control let:attrs>
      <Form.Label>Bekräfta lösenord</Form.Label>
      <Input
        type="password"
        {...attrs}
        bind:value={$formData.confirmPassword}
      />
    </Form.Control>
    <Form.Description></Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  {#if submitting}
    <Progress {progress} max={100} class="w-72" />
  {:else}
    <Form.Button>Submit</Form.Button>
  {/if}
</form>
<br />
<br />
<SuperDebug data={$formData} />
