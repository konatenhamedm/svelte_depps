<!-- DropdownMenu.svelte -->
<script>
  import { EditOutline, EyeOutline, TrashBinSolid } from "flowbite-svelte-icons";

    export let item;
    export let onAction;
    let isOpen = false;
  
    const toggleMenu = () => {
      isOpen = !isOpen;
    };
  </script>
  
  <div class="relative">
    <!-- Bouton déclencheur du menu -->
    <button
      class="p-2 hover:bg-gray-200 rounded-full transition-colors list-none cursor-pointer"
      on:click={toggleMenu}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
    </button>
  
    {#if isOpen}
      <div class="absolute right-0 top-full mt-2 w-32 bg-black border border-gray-300 rounded-md shadow-lg z-20">
        <div class="py-1">
          <!-- Bouton Voir -->
          <button
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-800"
            on:click={() => onAction('view', item)}
          >
            <EyeOutline size="sm" class="mr-2" />
            Voir
          </button>
          
          <!-- Bouton Modifier -->
          <button
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800"
            on:click={() => onAction('edit', item)}
          >
            <EditOutline size="sm" class="mr-2" />
            Modifier
          </button>
          
          <!-- Bouton Supprimer -->
          <button
            class="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-800"
            on:click={() => onAction('delete', item)}
          >
            <TrashBinSolid size="sm" class="mr-2" />
            Supprimer
          </button>
        </div>
      </div>
    {/if}
  </div>
  
  <style>
    /* Styles supplémentaires pour améliorer l'apparence */
    button {
      transition: background-color 0.3s, color 0.3s;
    }
  
    .absolute {
      position: absolute;
    }
  
    .top-full {
      top: 100%;
    }
  
    .mt-2 {
      margin-top: 0.5rem;
    }
  
    .z-20 {
      z-index: 20; /* Utiliser un z-index plus petit pour éviter le problème de défilement */
    }
  
    /* Fond et texte plus visible pour les options */
    .bg-white {
      background-color: #ffffff;
    }
  
    .text-gray-700 {
      color: #4a4a4a;
    }
  
    .hover\:bg-green-100:hover {
      background-color: #0be44e;
    }
  
    .hover\:text-green-800:hover {
      color: #166534;
    }
  
    .hover\:bg-blue-100:hover {
      background-color: #1c7dfb;
    }
  
    .hover\:text-blue-800:hover {
      color: #1e40af;
    }
  
    .hover\:bg-red-100:hover {
      background-color: #7f1d1d;
    }
  
    .hover\:text-red-800:hover {
      color: #7f1d1d;
    }
  
    /* Ombre légère pour rendre le dropdown plus distinct */
    .shadow-lg {
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
  </style>
  