<script lang="ts">
  import { db } from "../../db";
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
  let result;
  export let data: SuperValidated<Infer<AddShortformSchema>>
  const form = superForm(data, {
    validators: zodClient(addShortformSchema),
    onUpdate({form}) {
      result = form
      if(form.posted) {
        db.shortforms.add({shortform: result.data.shortform, phrase: result.data.phrase, used: new Date(0)})
      }
    }
  })

  const { form: formData, enhance,  } = form;
</script>
<SuperDebug data={$formData}/>
<form class="w-48" use:enhance method="POST">
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
  <Form.Button>Skapa</Form.Button>
</form>
