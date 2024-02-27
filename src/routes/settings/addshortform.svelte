<script lang="ts">
  import * as Form from "$lib/components/ui/form"
  import { Input } from "$lib/components/ui/input"
  import { addShortformSchema, type AddShortformSchema } from "./schema"
  import {
    type SuperValidated,
    type Infer,
    superForm
  } from "sveltekit-superforms"
  import SuperDebug from 'sveltekit-superforms';
  import { zodClient } from "sveltekit-superforms/adapters"

  export let data: SuperValidated<Infer<AddShortformSchema>>
  const form = superForm(data, {
    validators: zodClient(addShortformSchema)
  })

  const { form: formData, enhance } = form;
</script>

<SuperDebug data={$formData}/>
<form class="w-48" method="POST" use:enhance>
  <Form.Field {form} name="shortform">
  <Form.Control let:attrs>
    <Form.Label>Förkortning</Form.Label>
    <Input {...attrs} bind:value={$formData.shortform} />
    <Form.Description>tillåter a-ö och siffror</Form.Description>
    <Form.FieldErrors />
  </Form.Control>
  </Form.Field>
  <Form.Field {form} name="phrase">
  <Form.Control let:attrs>
    <Form.Label>Fras</Form.Label>
    <Input {...attrs} bind:value={$formData.phrase} />
    <Form.FieldErrors />
  </Form.Control>
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
