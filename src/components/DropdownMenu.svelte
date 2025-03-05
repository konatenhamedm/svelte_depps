<script>
  import { EditOutline, EyeOutline, TrashBinSolid } from "flowbite-svelte-icons";
  import { openMenu } from "../menuStore"; // Store global pour gérer un seul menu ouvert

  export let item;
  export let onAction;
  let isOpen = false;
  let menuPosition = { top: "0px", left: "0px" };
  let buttonRef;

  const toggleMenu = (event) => {
    openMenu.update(current => {
      if (current === item.id) {
        isOpen = false;
        return null;
      } else {
        isOpen = true;
        setMenuPosition(event);
        return item.id;
      }
    });
  };

  const setMenuPosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    // Ajuster la position du menu
    menuPosition = {
      top: spaceBelow < 150 ? `${rect.top - 120}px` : `${rect.bottom + 5}px`, // 120px = approx. hauteur du menu
      left: `${rect.left}px`
    };
  };

  // Fermer le menu si un autre est ouvert
  $: openMenu.subscribe(id => {
    if (id !== item.id) {
      isOpen = false;
    }
  });
</script>

<div class="relative">
  <!-- Bouton déclencheur -->
  <button
    bind:this={buttonRef}
    class="p-2  rounded-full transition-colors list-none cursor-pointer"
    on:click={toggleMenu}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
    </svg>
  </button>

  {#if isOpen}
    <div class="menu-dropdown">
      <button class="menu-item  hover:text-white"
        on:click={() => {onAction('view', item); isOpen = false;}}>
        <EyeOutline size="sm" class="mr-2" /> Voir
      </button>
      
      <button class="menu-item  hover:text-white"
        on:click={() => {onAction('edit', item); isOpen = false;}}>
        <EditOutline size="sm" class="mr-2" /> Modifier
      </button>
      
      <button class="menu-item  hover:text-white"
        on:click={() => {onAction('delete', item); isOpen = false;}}>
        <TrashBinSolid size="sm" class="mr-2" /> Supprimer
      </button>
    </div>
  {/if}
</div>

<style>
  .menu-dropdown {
    position: fixed; /* Fixe le menu à l'écran */
    background: black;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000; /* Assure que le menu est bien au-dessus */
    top: var(--top);
    left: var(--left);
    width: 150px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 8px;
    width: 100%;
    color: white;
    cursor: pointer;
  }
</style>
