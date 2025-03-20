<script lang="ts">
  import AddForumPopup from "./AddForumPopup.svelte";
  import EditForumPopup from "./EditForumPopup.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { apiFetch } from "$lib/api";
  import { onMount } from "svelte";
  import {goto} from "$app/navigation";

  let forums: any[] = [];

  export let data;
  let user = data?.user;

  let currentPage = 1;
  const itemsPerPage = 5;
  let showAddPopup = false;
  let showEditPopup = false;
  let selectedForum: any = null;
  let loading = false;

  async function fetchData(userId: number) {
    loading = true;
    try {
      const res = await apiFetch(true, `/forum/forum/by/user/${userId}`);
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
  function goToPage(page) {
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

  function openEditPopup(forum) {
    selectedForum = forum;
    showEditPopup = true;
  }

  function closeEditPopup() {
    showEditPopup = false;
    selectedForum = null;
  }

  function addForum(newForum) {
    forums = [...forums, { ...newForum, id: forums.length + 1 }];
  }

  function updateForum(updatedForum) {
    forums = forums.map((f) => (f.id === updatedForum.id ? updatedForum : f));
  }

  $: if (showAddPopup == false || showEditPopup == false) {
    fetchData(user?.id);
  }
  function navigateToDashboard() {
    goto("/site/dashboard");
  }
</script>

<Header {user} />
<Slide {user} />
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
  <span class="text-gray-800">Liste des forums</span> <!-- Nom de la page actuelle -->
</div><br>
<main class="mx-auto px-8 py-8 main-div" style="padding-top: 200px">
  <section class="iletisim-form-alani">
    <div id="">
      <div class="container mx-auto p-4 main-div">
        <!-- Boutons en haut du tableau -->
        <div class="flex justify-between mb-4">
          <a
            href="forum/all-forums"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Accéder à tous les forums
          </a>
          <button
            on:click={openAddPopup}
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-500"
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
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Titre</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Contenu</th
              >
              <th class="border border-gray-300 py-2 px-4 border-b text-center"
                >Status</th
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
                <td colspan="4" class="text-center p-4 text-gray-500">
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
                <td colspan="4" class="text-center p-4 text-gray-500">
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
              {#each paginatedForums as forum}
                <tr class="hover:bg-gray-50">
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-left"
                    >{forum.titre}</td
                  >
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-left"
                    >{forum.contenu}</td
                  >
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                  >
                    <span
                      class={`px-2 py-1 rounded ${forum.status === "Actif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {forum.status}
                    </span>
                  </td>
                  <td
                    class="border border-gray-300 py-2 px-4 border-b text-center"
                  >
                    <!-- Bouton Modifier -->
                    <button
                      on:click={() => openEditPopup(forum)}
                      class="text-blue-500 hover:text-blue-700 mr-2"
                      style="color: blue !important;"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                        />
                      </svg>
                    </button>

                    <!-- Bouton Supprimer -->
                    <button
                      on:click={() => handleDelete(forum)}
                      class="text-red-500 hover:text-red-700"
                      style="color: red !important;"
                    >


                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
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
        <AddForumPopup
          {data}
          bind:showPopup={showAddPopup}
          closePopup={closeAddPopup}
          on:submit={addForum}
        />

        <!-- Popup d'édition -->
        {#if selectedForum}
          <EditForumPopup
            {data}
            bind:showPopup={showEditPopup}
            closePopup={closeEditPopup}
            forum={selectedForum}
            on:submit={updateForum}
          />
        {/if}
      </div>
    </div>
  </section>
</main>
<Footer></Footer>

<style>
  .iletisim-form-alani {
    padding: 20rem 226px 10rem !important;

    background-color: transparent !important;
  }
  .main-div {
    margin-top: 10px;
    margin-bottom: 50px;
    border: 1px solid #e5e7eb;
    background: transparent;
    border-radius: 10px;
    padding: -10px 0px 0px 0px;
  }

  .file-ariane {
    position: absolute;
    width: 100%;
    top: 112px;
    background: #4292cecc;
    padding: 22px;
    color: white;
    font-size: 14px;
  }

  .file-ariane span {
    color: white;
  }
</style>
