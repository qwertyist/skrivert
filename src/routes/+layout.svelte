<script lang="ts">
	import '../app.postcss';
  import "../quill.css";
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="#"
					rel="noreferrer"
				>
				  Uppdrag
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="#"
					rel="noreferrer"
				>
				  Mottagarvy
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="#"
					rel="noreferrer"
          >
          Något annat
        </a>
			</svelte:fragment>
      SKRIVERT
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="#"
					rel="noreferrer"
				>
					Menyknapp
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="#"
					rel="noreferrer"
				>
					Inställningar
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="#"
					rel="noreferrer"
				>
				  Användare
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
