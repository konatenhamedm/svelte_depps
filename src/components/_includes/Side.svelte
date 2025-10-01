<script>
	import ComptableMenu from './menu/ComptableMenu.svelte';
  import AdminMenu from "./menu/AdminMenu.svelte";
  import InstructeurProfMenu from './menu/InstructeurProfMenu.svelte';
  import InstructeurEtabMenu from './menu/InstructeurEtabMenu.svelte';
  import DirecteurMenu from './menu/DirecteurMenu.svelte';
  import InstructeurSecondProfMenu from './menu/InstructeurSecondProfMenu.svelte';
//   import InstructeurSecondEtabMenu from './menu/InstructeurSecondEtabMenu.svelte';
  import InspecteurMenu from './menu/inspecteurMenu.svelte';
  import SousDirecteurMenuSecondProf from './menu/SousDirecteurMenuSecondProf.svelte';
  import SousDirecteurMenuSecondEtab from './menu/SousDirecteurMenuSecondEtab.svelte';

export let user;
</script>

<aside class="main-sidebar">
	<!-- sidebar-->
	{#if user.type == "ADMINISTRATEUR" }
	<AdminMenu/>
	{:else if user.type == "DIRECTEUR" }
	<DirecteurMenu/>
	{:else if user.type == "SOUS-DIRECTEUR-ETAB" }
	<SousDirecteurMenuSecondEtab/>
	{:else if user.type == "SOUS-DIRECTEUR-PROF" }
	<SousDirecteurMenuSecondProf/>
	{:else if user.type == "INSPECTEUR-ETAB" }
	<InspecteurMenu/>
	{:else if user.type == "INSTRUCTEUR-PROF" }
	<InstructeurProfMenu/>
	{:else if user.type == "INSTRUCTEUR-ETAB" }
	<InstructeurEtabMenu/>
	{:else if user.type == "INSTRUCTEUR-SECOND-PROF" }
	<InstructeurSecondProfMenu/>
	<!-- {:else if user.type == "INSTRUCTEUR-SECOND-ETAB" }
	<InstructeurSecondEtabMenu/> -->
	{:else }
	<ComptableMenu/>
	{/if}


</aside>