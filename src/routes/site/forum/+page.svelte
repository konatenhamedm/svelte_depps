<script lang="ts">
  import AddForumPopup from "./AddForumPopup.svelte";
  import EditForumPopup from "./EditForumPopup.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { apiFetch } from "$lib/api";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

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

<Slide {user} /> <br /><br /><br /><br />
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
  crossorigin="anonymous"
/>

<div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4">
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
    <span class="text-gray-800">Liste des articles</span>
    <!-- Nom de la page actuelle -->
  </div>
</div>
<br /><br /><br /><br /><br />

<br />

<main class="pb-[120px] iletisim-form-alani">
  <section class="">
    <br /><br />
    <div
      class="h-yazi-ortalama h-yazi-margin-orta-3 wow fadeInUp container pb-8"
    >
      <!--  <h2 class="h2-baslik-hizmetler-2 wow fadeInUp"> &nbsp;&nbsp;FORUM</h2> -->
    </div>
    <br />
    <div class="container">
      <div class="row">
        {#if loading}
         <!--  <div class="loader"> -->
            {#each Array(3) as _}
              <!-- Afficher 3 éléments skeleton -->
              <div class="col-md-4 skeleton">
                <div class="post">
                  <div class="datesection">
                    <span class="skeleton-date"></span>
                    <span class="skeleton-category"></span>
                  </div>
                  <div class="skeleton-title"></div>
                  <div class="skeleton-text"></div>
                  <div class="skeleton-btn"></div>
                </div>
              </div>
            {/each}
       <!--    </div> -->
        {:else}
          {#if paginatedForums.length > 0}
            {#each paginatedForums as forum}
              <div class="col-md-4">
                <div
                        class="post wow fadeInUp"
                        data-wow-delay="0.60s"
                        style="cursor:pointer;"
                >
                  <div class="datesection">
                  <span class="date">{formatDateForInput(forum.createdAt)}</span
                  >&nbsp;<span class="tt">-</span>&nbsp;<span class="category">
                    {#if forum.user.typeUser == "PROFESSIONNEL"}
                      {forum.user.personne.nom +
                      " " +
                      forum.user.personne.prenoms}
                    {:else}
                      {forum.user.email}
                    {/if}
                  </span>
                  </div>
                  <h3 class="baslik-3 h-yazi-margin-kucuk">{forum.titre}</h3>
                  <p class="post-kutu--yazi">
                    {truncate(forum.contenu, 80)} ...
                  </p>
                  <div class="h-yazi-ortalama h-yazi-margin-4">
                    <a
                            href="javascript:void(0);"
                            on:click={() => {
                      goto("/site/forum/details/" + forum.id);
                    }}
                            class="buton buton--kirmizi buton--animasyon">Voir plus</a
                    >
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
                    Aucun articles pour l'instant
                  </p>
                </div>
              </div>
            </div>
          {/if}


        {/if}
      </div>
    </div>
    <div class="alanb"></div>
    <br /><br />
  </section>

  <div class="adminActions">
    <a class="adminButton" href="javascript:void(0);" on:click={openAddPopup}
      ><i style="font-size: 30px;color:#fff;" class="fa fa-plus"></i></a
    >
  </div>

  <style>
    .post {
      margin-bottom: 40px;
    }
    .iletisim-form-alani {
      padding: 20rem 157px 10rem !important;

      background-color: #fff;
    }
    .adminActions {
      position: fixed;
      bottom: 35px;
      right: 35px;
      z-index: 999;
      width: 70px;
      background: #20aae1;
      height: 70px;
      border-radius: 50%;
    }
    .adminActions a i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .entete {
      width: 80% !important;
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

    .loader .skeleton {
    background-color: #e0e0e0;
    height: 200px;
    margin-bottom: 20px;
    border-radius: 8px;
    position: relative;
  }

  .skeleton-title, .skeleton-text, .skeleton-date, .skeleton-category, .skeleton-btn {
    background-color: #d0d0d0;
    border-radius: 5px;
  }

  .skeleton-title {
    width: 80%;
    height: 24px;
    margin: 10px 0;
  }

  .skeleton-text {
    width: 60%;
    height: 15px;
    margin-bottom: 10px;
  }

  .skeleton-date, .skeleton-category {
    width: 40%;
    height: 12px;
  }

  .skeleton-btn {
    width: 30%;
    height: 35px;
    margin-top: 15px;
  }

  /* Animation pour l'effet de squelette */
  .skeleton {
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f5f5f5;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
  </style>
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
