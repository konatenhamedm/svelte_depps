<script lang="ts">
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { onMount } from "svelte";
  import { apiFetch } from "$lib/api";
  import Add from "./Add.svelte";
  import Edit from "./Edit.svelte";
  import { EyeOutline } from "flowbite-svelte-icons";

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
      const res = await apiFetch(true, `/alerte/get/all/${userId}`);
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

  function openEditPopup(forum:any) {
    selectedForum = forum;
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
</script>




<Header {user} />
<Slide {user} />

<main class="mx-auto px-8 py-8 main-div" style="">
  <!-- <section class="iletisim-form-alani"> -->
    <div id="">
      <div class="container mx-auto p-4 ">
        <!-- Boutons en haut du tableau -->
        <div class="flex justify-between mb-4">
          <div> <p class="text-3xl font-semibold text-gray-800">Liste des alertes</p></div>
          <button
            on:click={openAddPopup}
            class="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-400"
          >
            Ajouter
          </button>
        </div>

        <!-- Tableau -->
        <table
          class="min-w-full bg-white border border-gray-200 border-collapse"
        >
          <thead>
            <tr class="bg-gray-100">
              <th
                class="border border-gray-300 py-2 px-4 border-b text-center w-1"
                >N</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Destinataire</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Objet</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Message</th
              >
              <th
                class="border border-gray-300 py-2 px-4 border-b text-center"
                style="width: 50px;">Actions</th
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
              {#each paginatedForums as forum, index}
                <tr class="hover:bg-gray-50">
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                    >{index + 1}</td
                  >
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                    >{forum?.destinateur?.libelle}</td
                  >
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                  >
                    {forum.objet}
                  </td>
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                    >{forum.message}</td
                  >
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                  >
                    <!-- Bouton Modifier -->
                    <button
                      on:click={() => openEditPopup(forum)}
                      class="text-blue-500 hover:text-blue-700 mr-2"
                      style="color: blue !important;"
                    >
                    <EyeOutline size="md" class="mr-2" />
                    </button>

                    
                  </td>
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

        <!-- Popup d'ajout -->
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
        {/if}
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
    margin-top: -10px;
    margin-bottom: 130px;
    /* border: 1px solid #e5e7eb; */
    background: transparent;
    border-radius: 10px;
    padding: 20rem 316px 10rem !important;
  }

 
</style>
