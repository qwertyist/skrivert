<script lang="ts">
  import { PUBLIC_DUMP_LIST } from "$env/static/public"
  import { db } from "../../db";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";

  import {
    addShortformSchema,
    checkForExistingShortform,
    type AddShortformSchema,
  } from "./schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import SuperDebug from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  let result;
  export let data: SuperValidated<Infer<AddShortformSchema>>;
  export let status = "";
  export let existing = { id: null, message: "" };
  const form = superForm(data, {
    validators: zodClient(addShortformSchema),
    async onChange() {
      const exists = await checkForExistingShortform($formData.shortform);
      existing = exists
        ? {
            id: exists.id,
            message: `${$formData.shortform} existerar som ${exists.phrase}`,
          }
        : { id: null, message: "" };
    },
    async onUpdate({ form }) {
      result = form;
      if (form.posted) {
        try {
          /*
            Use DUMP list as target during devel
          */
          const list = PUBLIC_DUMP_LIST;
          console.log("PUBLIC DUMP LIST ID:", list);

          if (!existing.id) {
            const record = await db.createShortform({
              shortform: result.data.shortform,
              phrase: result.data.phrase,
              used: new Date(0),
              list: list,
            });
          } else {
            await db.shortforms.update(existing.id, {
              phrase: result.data.phrase,
              used: new Date(0),
            });
            db.shortforms
              .get(existing.id)
              .then((sf) => {
                sf.log();
              })
              .catch((err) => {
                console.error(`get shortform after update failed ${err}`);
              });
          }
        } catch (err) {
          status = err;
        }
      }
    },
  });

  const { form: formData, enhance } = form;
</script>

<SuperDebug data={$formData} />
<form class="w-48" use:enhance method="POST">
  <Form.Field {form} name="shortform">
    <Form.Control let:attrs>
      <Form.Label>Förkortning</Form.Label>
      <Input {...attrs} bind:value={$formData.shortform} />
      <Form.Description>{existing.message}</Form.Description>
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
{status}
