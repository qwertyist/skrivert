<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { goto } from "$app/navigation";
  import { Progress } from "$lib/components/ui/progress";
  export let progress = 0;
  function signOut() {
    setTimeout(() => {
      progress = 10;
      pb.authStore.clear();
      setTimeout(() => {
        progress = 80;
        goto("/user/login");
      }, 750);
    }, 250);
  }
  signOut();
</script>

<div class="space-y-1">
  Du loggas ut.
  <Progress {progress} max={100} />
</div>
<!--<SuperDebug data={$formData} />-->
