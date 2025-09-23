<script>
  import { EditOutline, EyeOutline, TrashBinSolid } from "flowbite-svelte-icons";
  import { openMenu } from "../menuStore"; // Store global pour gérer un seul menu ouvert
  import { Button } from "flowbite-svelte";
 
  export let user ;
  export let item;
  export let onAction;
  let isOpen = false;
  let menuPosition = { top: "0px", left: "0px" };
  let buttonRef;

 console.log("UUUUU",user); 

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


 
      
      <Button  color="green"
  style="background-color:#318ce7 "
  size="sm"
  class="gap-2 px-3 bg-green-800"
        on:click={() => {onAction('view', item); isOpen = false;}}>
        <EyeOutline size="sm" class="mr-2" /> voir
      </Button>
 
     
  


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
