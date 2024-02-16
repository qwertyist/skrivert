<script lang="ts">
	import '../app.postcss';
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
		<AppBar>
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
			</svelte:fragment>
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
