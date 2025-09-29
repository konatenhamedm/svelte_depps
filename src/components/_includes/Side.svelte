<script>
	import ComptableMenu from './menu/ComptableMenu.svelte';
  import AdminMenu from "./menu/AdminMenu.svelte";
  import InstructeurMenu from './menu/InstructeurMenu.svelte';
  import DirecteurMenu from './menu/DirecteurMenu.svelte';
  import InstructeurSecondMenu from './menu/InstructeurSecondMenu.svelte';
  import InspecteurMenu from './menu/inspecteurMenu.svelte';
  import DirecteurMenuSecond from './menu/DirecteurMenuSecond.svelte';

export let user;
</script>

<aside class="main-sidebar">
	<!-- sidebar-->
	{#if user.type == "ADMINISTRATEUR" }
	<AdminMenu/>
	{:else if user.type == "SOUS-DIRECTEUR" }
	<DirecteurMenu/>
	{:else if user.type == "SOUS-DIRECTEUR-SECOND" }
	<DirecteurMenuSecond/>
	{:else if user.type == "INSPECTEUR" }
	<InspecteurMenu/>
	{:else if user.type == "INSTRUCTEUR" }
	<InstructeurMenu/>
	{:else if user.type == "INSTRUCTEUR-SECOND" }
	<InstructeurSecondMenu/>
	{:else }
	<ComptableMenu/>
	{/if}


</aside>