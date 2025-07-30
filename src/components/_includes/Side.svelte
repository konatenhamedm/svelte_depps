<script>
	import ComptableMenu from './menu/ComptableMenu.svelte';
  import AdminMenu from "./menu/AdminMenu.svelte";
  import InstructeurMenu from './menu/InstructeurMenu.svelte';
  import DirecteurMenu from './menu/DirecteurMenu.svelte';

export let user;
</script>

<aside class="main-sidebar">
	<!-- sidebar-->
	{#if user.type == "ADMINISTRATEUR" }
	<AdminMenu/>
	{:else if user.type == "SOUS-DIRECTEUR" }
	<DirecteurMenu/>
	{:else if user.type == "INSTRUCTEUR" }
	<InstructeurMenu/>
	{:else }
	<ComptableMenu/>
	{/if}


</aside>