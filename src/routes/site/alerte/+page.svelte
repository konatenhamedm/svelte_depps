<script lang="ts">
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { onMount } from "svelte";
  import { apiFetch } from "$lib/api";
  import Add from "./Add.svelte";
  import Edit from "./Edit.svelte";
  import { EyeOutline } from "flowbite-svelte-icons";
  import { goto } from "$app/navigation";
  import Delete from "./Delete.svelte";

  let alertes: any[] = [];

export let data;
let user = data?.user;

let currentPage = 1;
const itemsPerPage = 3;
let showAddPopup = false;
let showEditPopup = false;
let showDeletePopup = false;
let selectedForum: any = null;
let loading = false;

async function fetchData(userId: number) {
    loading = true;
    try {
        const res = await apiFetch(true, `/alerte/get/all/Professionnel`);
        if (res) {
            alertes = res.data;
            console.log("content main_data", alertes);
        } else {
            console.error("Erreur de récupération:", res.statusText);
        }
    } catch (error) {
        console.error("Erreur API:", error);
    } finally {
        loading = false;
    }
}

onMount(async () => {
    await fetchData(user?.id);
});

// Calcul des alertes paginés
$: paginatedalertes = alertes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
);

// Calcul du nombre total de pages
export let totalPages = 10;

// Calcul du nombre total de pages
$: totalPages = Math.ceil(alertes.length / itemsPerPage);

// Fonction pour changer de page
function goToPage(page: any) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
    }
}


  function getPageNumbers() {
    let pages = [];
    if (totalPages <= 7) {
      // Affiche toutes les pages si <= 7 pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 3) pages.push(1, '...');
      for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...', totalPages);
    }
    return pages;
  }

// Fonctions pour gérer les popups
function openAddPopup() {
    showAddPopup = true;
}

function closeAddPopup() {
    showAddPopup = false;
}

function openEditPopup(forum: any) {
    selectedForum = forum;
    showEditPopup = true;
}

function openDeletePopup(forum: any) {
    selectedForum = forum;
    showDeletePopup = true;
}

function closeEditPopup() {
    showEditPopup = false;
    selectedForum = null;
}

function closeDeletePopup() {
    showDeletePopup = false;
    selectedForum = null;
}

function addForum(newForum: any) {
    alertes = [...alertes, { ...newForum, id: alertes.length + 1 }];
}

function updateForum(updatedForum: any) {
    alertes = alertes.map((f) => (f.id === updatedForum.id ? updatedForum : f));
}

$: if (showAddPopup == false || showEditPopup == false || showDeletePopup == false) {
    fetchData(user?.id);
}

function navigateToDashboard() {
    goto("/site/dashboard");
}
</script>

<Slide {user} /> <br /><br /><br /><br /><br /><br />


  <div
    class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-8"
  >
    <div class="flex items-center hover:text-blue-600 entete">
      <button
      on:click={navigateToDashboard}
      class="flex items-center hover:text-blue-600"
    >
      <!-- Icône SVG pour "Tableau de bord" -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        />
      </svg>
      Tableau de bord
    </button>
    <span>/</span>
    <span class="text-gray-800">Liste des arlertes</span>
    </div>
    <!-- Nom de la page actuelle -->
  </div><br><br><br /><br /><br />


<main style="background-color: #fff" class="pb-20">
  <style>
      .entete {
    width: 80% !important;
  }
    .tablo:not(:last-child) {
      margin-bottom: 35px;
    }
    .dropify-wrapper .dropify-message p {
      text-align: center;
    }
    .dropify-wrapper .dropify-message span.file-icon {
      font-size: 50px;
      color: #ccc;
      display: none;
    }
    .dropify-wrapper {
      height: 100px !important;
    }
    .col-md-3 {
      margin-top: 15px !important;
    }
    .iletisim-form-alani {
      padding: 20rem 157px 10rem !important;

      background-color: #fff;
    }
    .main-div {
      margin-top: -10px;
      margin-bottom: 130px;
      /* border: 1px solid #e5e7eb; */
      background: transparent;
      border-radius: 10px;
      padding: 20rem 316px 10rem !important;
    }

    .file-ariane {
      position: absolute;
      width: 100%;
      top: 96px;
      background: #4292cecc;
      padding: 22px;
      color: white;
      font-size: 14px;
      justify-content: center;
      align-items: center;
    }

    .file-ariane span {
      color: white;
      margin: 0 5px;
    }
    .pagination-controls {
      /* display: flex; */
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    .pagination-controls button {
      margin: 0 10px;
      padding: 5px 10px;
      background-color: #f57f30;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .pagination-controls button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .pagination-controls span {
      margin: 0 10px;
    }

    
   
  </style>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
    integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <section class="hakkimizda-bolumu-anasayfa1 iletisim-form-alani" style="padding-top:120px">
    <div class="container">
      <div class="masqueur à effet de révélation d'image de projet wow">
        <button on:click={openAddPopup} class="buton buton--kirmizi">
          <small>ENVOYER UNE ALERTE</small> <i class="fa fa-plus"></i>
        </button>
        <br /><br />

        {#if paginatedalertes.length > 0}
          {#each paginatedalertes as forum, index}
            <div
              class="services-kutu2 project-image reveal-effect masker wow"
              style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 15px;"
            >
              <div class="row">
                <div class="col-md-1">
                  <i
                    style="font-size: 25px; margin-top: 12px; color: #f57f30;"
                    class="fa fa-bell"
                  ></i>
                </div>
                <div class="col-md-6">
                  <p style="margin-top: 12px;">
                    {forum.objet} : {forum.message}
                  </p>
                </div>
                <div class="col-md-3">
                  Destinataire : {forum?.destinateur?.libelle}
                </div>
                <div class="col-md-2 d-none d-sm-block">
                  <form action="#" class="delete_alerte">
                    <button
                      style="height: 50px; width: 50px; background: #43af41 !important; padding: 0;"
                      class="buton buton--kirmizi"
                      id="three_customer"
                      on:click={() => openEditPopup(forum)}
                    >
                      <i class="fa fa-edit"></i>
                    </button>
                    <button
                      on:click={() => openDeletePopup(forum)}
                      style="height: 50px; width: 50px; background: red !important; padding: 0;"
                      class="buton buton--kirmizi"
                      id="three_customer"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div
            class="services-kutu2 project-image reveal-effect masker wow"
            style="cursor: pointer; visibility: visible; width: 100%;"
          >
            <div class="row">
              <div class="col-md-12 text-center">
                <p style="margin: auto; text-align: center;">
                  Aucune alerte pour l'instant
                </p>
              </div>
            </div>
          </div>
        {/if}

        <!-- Contrôles de pagination -->
        {#if alertes.length > itemsPerPage}
        <div class="pagination-controls">
        
          <button on:click={() => goToPage(1)} disabled={currentPage === 1}>
             Premier
          </button>
          <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
             Précédent
          </button> 
          {#each getPageNumbers() as page}
            {#if page === '...'}
              <span class="dots">...</span>
            {:else}
              <button
                on:click={() => goToPage(page)}
                class:active={page === currentPage}
              >
                {page}
              </button>
            {/if}
          {/each}
          <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Suivant 
          </button>
        
 
          <button on:click={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
            Dernier 
          </button>
        </div>
        
        {/if}
        <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br />
      </div>
    </div>
  </section>
</main>
<Add
  {data}
  bind:showPopup={showAddPopup}
  closePopup={closeAddPopup}
  on:submit={addForum}
/>

<!-- Popup d'édition -->
{#if selectedForum}
  <Edit
    {data}
    bind:showPopup={showEditPopup}
    closePopup={closeEditPopup}
    forum={selectedForum}
    on:submit={updateForum}
  />

  <Delete
    {data}
    bind:showPopup={showDeletePopup}
    closePopup={closeDeletePopup}
    forum={selectedForum}
    on:submit={updateForum}
  />
{/if}

<Footer />
