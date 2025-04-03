<script lang="ts">
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { onMount } from "svelte";
  import { apiFetch } from "$lib/api";
  import { EyeOutline } from "flowbite-svelte-icons";
  import { goto } from "$app/navigation";
  import { formatDate } from "$lib/dateUtils.js";

  let paiementData: any[] = [];

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
      /* const res = await apiFetch(true, `/ValidationWorkflow/47`); */
      const res = await apiFetch(
        true,
        `/ValidationWorkflow/${user.personneId}`
      );
      if (res) {
        paiementData = res.data;
        console.log("content main_data", paiementData);
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

  // Calcul des paiementData paginés
  $: paginatedpaiementData = paiementData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
let totalPages = 10;
  // Calcul du nombre total de pages
  $: totalPages = Math.ceil(paiementData.length / itemsPerPage);

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

  $: if (
    showAddPopup == false ||
    showEditPopup == false ||
    showDeletePopup == false
  ) {
    fetchData(user?.id);
  }

  function navigateToDashboard() {
    goto("/site/dashboard");
  }
</script>

<Slide {user} /> <br /><br /><br /><br /><br /><br />

<div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-8">
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
    <span class="text-gray-800">Suivi documents</span>
  </div>
  <!-- Nom de la page actuelle -->
</div><br /><br /><br /><br /><br /><br />

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
      margin-bottom: 10px;

      /* border: 1px solid #e5e7eb; */
      background: transparent;
      border-radius: 10px;
      padding: 20rem 316px 10rem 10rem !important;
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
        {#if paginatedpaiementData.length > 0}
          {#each paginatedpaiementData as item, index}
            <div
              class="services-kutu2 project-image reveal-effect masker wow"
              style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 15px;"
            >
              <div class="row text-center">
                <div class="col-md-1">
                  <p style="margin-top: 16px;">
                    {index + 1}
                  </p>
                </div>
                <div class="col-md-2">
                  <p style="margin-top: 16px;">
                    {item.personne.nom}
                    {item.personne.prenoms}
                  </p>
                </div>
                <div class="col-md-3">
                  {item.etape}
                </div>
                <!--  <div class="col-md-3">
                  validé par :  {item.createdBy} 
                  </div> -->

                <div class="col-md-3">
                  le : {formatDate(item.createdAt)}
                </div>
                <div class="col-md-3">
                  motif : {item.raison}
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
        {#if paginatedpaiementData.length > itemsPerPage}
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
        <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br /> <br /><br /><br /><br /><br /><br />
        </div>
      </div>
    
  </section>
</main>

<Footer />
