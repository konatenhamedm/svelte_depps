<script>
  import {EditOutline, EyeOutline, TrashBinSolid} from 'flowbite-svelte-icons';
  import {openMenu} from '../menuStore'; // Store global pour gérer un seul menu ouvert
  import {Button} from 'flowbite-svelte';

  export let item;
  export let onAction;

  let isOpen = false;
  let menuPosition = {top: '0px', left: '0px'};
  let buttonRef;


  const setMenuPosition = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    // Ajuster la position du menu
    menuPosition = {
      top: spaceBelow < 150 ? `${rect.top - 120}px` : `${rect.bottom + 5}px`, // 120px = approx. hauteur du menu
      left: `${rect.left}px`,
    };
  };

  // Fermer le menu si un autre est ouvert
  $: openMenu.subscribe((id) => {
    if (id !== item.id) {
      isOpen = false;
    }
  });
</script>

<Button
  color="green"
  style="background-color: green"
  size="sm"
  class="gap-2 px-3 bg-green-800"
  on:click={() => {
    onAction('view', item);
    isOpen = false;
  }}
>
  <EyeOutline size="sm" />
</Button>

<Button
  color="blue"
  size="sm"
  style="background-color: blue"
  class="gap-2 px-3 bg-blue-600"
  on:click={() => {
    onAction('edit', item);
    isOpen = false;
  }}
>
  <EditOutline size="sm" />
</Button>

<Button
  color="red"
  size="sm"
  style="background-color: red"
  class="gap-2 px-3 bg-red-600"
  on:click={() => {
    onAction('delete', item);
    isOpen = false;
  }}
>
  <TrashBinSolid size="sm" />
</Button>