<script lang="ts">
  import AddForumPopup from "./AddForumPopup.svelte";
  import EditForumPopup from "./EditForumPopup.svelte";
  import Header from "$components/_includes/new_site/Header.svelte";
  import Footer from "$components/_includes/new_site/Footer.svelte";
  import { apiFetch } from "$lib/api";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import Sub_header from "$components/_includes/new_site/Sub_header.svelte";

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
      const res = await apiFetch(true, `/forum/actif`);
      if (res) {
        forums = res.data;
        console.log("content main_data", forums);
      } else {
        console.error("Erreur de récupération:", res.statusText);
      }
      loading = false;
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
    currentPage * itemsPerPage,
  );

  // Calcul du nombre total de pages
  $: totalPages = Math.ceil(forums.length / itemsPerPage);

  // Fonction pour changer de page
  function goToPage(page: number) {
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

  function openEditPopup(forum: any) {
    selectedForum = forum;
    showEditPopup = true;
  }

  function closeEditPopup() {
    showEditPopup = false;
    selectedForum = null;
  }

  function addForum(newForum: any) {
    forums = [...forums, { ...newForum, id: forums.length + 1 }];
  }

  function updateForum(updatedForum: any) {
    forums = forums.map((f) => (f.id === updatedForum.id ? updatedForum : f));
  }

  $: if (showAddPopup == false || showEditPopup == false) {
    fetchData(user?.id);
  }
  function navigateToDashboard() {
    goto("/site/dashboard");
  }
  function formatDateForInput(dateString: any) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  function truncate(text: string, maxLength: number): string {
    return text.slice(0, maxLength);
  }
</script>

<Header {user} />
<Sub_header titre="Forum" subTitles={[{ title: "Forum", link: "/new_site/forum" }]}></Sub_header>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>

<main class="pb-32 bg-white px-6 md:px-20 pt-40">
  <section>
    <div class="container mx-auto mb-8">
      {#if loading}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
          {#each Array(3) as _}
            <div class="bg-gray-200 p-6 rounded-lg animate-pulse space-y-4">
              <div class="h-4 w-1/3 bg-gray-300 rounded"></div>
              <div class="h-3 w-1/4 bg-gray-300 rounded"></div>
              <div class="h-6 w-2/3 bg-gray-300 rounded"></div>
              <div class="h-3 w-3/4 bg-gray-300 rounded"></div>
              <div class="h-10 w-1/3 bg-gray-300 rounded"></div>
            </div>
          {/each}
        </div>

      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {#each paginatedForums as forum}
            <div
                    class="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition cursor-pointer" style="margin-right: 10px;margin-bottom: 10px;"
            >
              <div class="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>{formatDateForInput(forum.createdAt)}</span>
                <span>–</span>
                <span class="text-blue-600">
                  {#if forum.user.typeUser == "PROFESSIONNEL"}
                    {forum.user.personne.nom + " " + forum.user.personne.prenoms}
                  {:else}
                    {forum.user.email}
                  {/if}
                </span>
              </div>
              <h3 class="text-lg font-semibold text-gray-800 mb-2">
                {forum.titre}
              </h3>
              <p class="text-gray-600 mb-4">
                {truncate(forum.contenu, 80)} ...
              </p>
              <div class="text-center">
                <a
                        href="javascript:void(0);"
                        on:click={() => goto("/new_site/forum/details/" + forum.id)}
                        class="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
                >
                  Voir plus
                </a>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>

  <!-- Floating Add Button -->
  <div class="fixed bottom-9 right-9 z-50">
    <button
            on:click={openAddPopup}
            class="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transition"
    >
      <i class="fa fa-plus text-2xl"></i>
    </button>
  </div>

  <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
  />
</main>


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
<Footer />
