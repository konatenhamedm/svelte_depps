<script lang="ts">
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { onMount } from "svelte";
  import { apiFetch } from "$lib/api";
  import { EyeOutline } from "flowbite-svelte-icons";
  import {goto} from "$app/navigation";

  let forums: any[] = [];

  export let data;
  let user = data?.user;

  let currentPage = 1;
  const itemsPerPage = 5;
  let showAddPopup = false;
  let showEditPopup = false;
  let selectedForum :any = null;
  let loading = false;

  async function fetchData(userId: number) {
    loading = true;
    try {
      const res = await apiFetch(true, `/paiement/historique/${userId}`);
    
      if (res) {
        forums = res.data;
        console.log("content main_data", forums);
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

  // Calcul des forums paginés
  $: paginatedForums = forums.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calcul du nombre total de pages
  $: totalPages = Math.ceil(forums.length / itemsPerPage);

  // Fonction pour changer de page
  function goToPage(page:any) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }

  // Fonctions pour gérer les popups
  function openAddPopup() {
    showAddPopup = true;
  }

  function closeAddPopup() {
    showAddPopup = false;
  }

  function openEditPopup(item:any) {
    selectedForum = item;
    showEditPopup = true;
  }

  function closeEditPopup() {
    showEditPopup = false;
    selectedForum = null;
  }

  function addForum(newForum:any) {
    forums = [...forums, { ...newForum, id: forums.length + 1 }];
  }

  function updateForum(updatedForum:any) {
    forums = forums.map((f) => (f.id === updatedForum.id ? updatedForum : f));
  }

  $: if (showAddPopup == false || showEditPopup == false) {
    fetchData(user?.id);
  }
  function navigateToDashboard() {
    goto("/site/dashboard");
  }
</script>





<Slide {user} />
<link
rel="stylesheet"
href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
crossorigin="anonymous"
/>

  <div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4">
    <button on:click={navigateToDashboard} class="flex items-center hover:text-blue-600">
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
    <span class="text-gray-800">Liste des paiements</span> <!-- Nom de la page actuelle -->
  </div>
<br>

<main class="mx-auto px-8 py-8 main-div" style="">
  <!-- <section class="iletisim-form-alani"> -->
    <div id="" class="table-responsive government-table">
      <div class="container mx-auto p-4 ">
        <!-- Boutons en haut du tableau -->
        <div class="flex justify-between mb-4">
          <!-- <div> <p class="text-3xl font-semibold text-gray-800">Liste des paiements</p></div>
            <button
             on:click={openAddPopup}
             class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-400"
           >
             Ajouter
           </button> -->
        </div>

        <!-- Tableau -->
      
          <table class="table table-bordered">
          <thead>
            <tr class="bg-gray-100">
              <th
                class="border border-gray-300 py-2 px-4 border-b text-center w-1"
                >N</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Email</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Montant</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Reference</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Canal</th
              >
             
            </tr>
          </thead>
          <tbody>
            {#if loading && paginatedForums.length === 0}
              <tr
                class="hover:bg-gray-50 text-center items-center p-4 text-gray-500 border border-gray-300"
              >
                <td colspan="5" class="text-center p-4 text-gray-500">
                  <div class="flex flex-row gap-2 items-center justify-center">
                    <div
                      class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                    ></div>
                    <div
                      class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                    ></div>
                    <div
                      class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                    ></div>
                  </div>
                </td>
              </tr>
            {:else if paginatedForums.length === 0}
              <tr
                class="hover:bg-gray-50 text-center items-center p-4 text-gray-500 border border-gray-300"
              >
                <td colspan="5" class="text-center p-4 text-gray-500">
                  <div class="flex flex-row items-center justify-center">
                    <div class="grid grid-cols-1">
                     
                      <img
                        src="/search_notfound.svg"
                        alt="Aucun résultat trouvé"
                      /><br />
                      <h1 class="text-2xl font-bold">Aucun résultat</h1>
                    </div>
                  </div>
                </td>
              </tr>
            {:else}
              {#each paginatedForums as item, index}
                <tr class="hover:bg-gray-50">
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                    >{index + 1}</td
                  >
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                    >{item?.user.email}</td
                  >
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                  >
                    {item.montant}
                  </td>
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                    >{item.reference}</td
                  >
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                    >{item.channel}</td
                  >
                  
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>

        <!-- Pagination avec icônes -->
        <div class="flex justify-end items-center mt-4">
          <button
            on:click={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            class="bg-blue-500 px-3 py-2 text-white rounded hover:bg-blue-500 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <span class="mx-4 text-black">{currentPage}</span>

          <button
            on:click={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            class="bg-blue-500 px-3 py-2 rounded hover:bg-blue-500 text-white disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

       
      </div>
    </div>
    <!--  </section> -->
  </main>
  <Footer></Footer>

<style>
  .iletisim-form-alani {
    padding: 20rem 226px 10rem !important;

    background-color: #fff;
  }
  .main-div {
    margin-top: -30px;
    margin-bottom: 180px;
  
    background: transparent;
    border-radius: 10px;
    padding: 20rem 0px 0rem !important;
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

 
</style>
