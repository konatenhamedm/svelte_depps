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
      const res = await apiFetch(true, `/forum/actif`);
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


<Slide {user} /> <br><br><br><br>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

<div class="container tablo">
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
</div><br>

<main class="pb-[120px]">
  <section class="">
    <br><br>
    <div class="h-yazi-ortalama h-yazi-margin-orta-3 wow fadeInUp container pb-8" >
       <!--  <h2 class="h2-baslik-hizmetler-2 wow fadeInUp"> &nbsp;&nbsp;FORUM</h2> -->
    </div><br>
    <div class="container">
        <div class="row">
          {#each paginatedForums as forum}
         <!--  id: forum.id,
          titre: forum.titre,
          author: forum.user.email, // L'API ne fournit pas d'auteur pour le topic
          contenu: forum.contenu, // L'API ne fournit pas d'auteur pour le topic
          date: forum.createdAt, // À adapter si l'API fournit une date -->
            <div class="col-md-4">
                <div class="post wow fadeInUp" data-wow-delay="0.60s"  style="cursor:pointer;">
                    <div class="datesection">
                        <span class="date">{formatDateForInput(forum.createdAt) }</span>&nbsp;<span class="tt">-</span>&nbsp;<span class="category">
                          
                          {#if forum.user.typeUser == "PROFESSIONNEL" }
                          {forum.user.personne.nom + " " + forum.user.personne.prenoms}
                          {:else}
                          {forum.user.email} 
                          {/if}
                          </span>
                    </div>
                    <h3 class="baslik-3 h-yazi-margin-kucuk">{forum.titre}</h3>
                    <p class="post-kutu--yazi">
                      {truncate(forum.contenu, 80)} ...
                    <div class="h-yazi-ortalama h-yazi-margin-4">
                        <a href="javascript:void(0);" on:click={()=>{
                          goto('/site/forum/details/' + forum.id);
                        }} class="buton buton--kirmizi buton--animasyon">Voir plus</a>
                    </div>
                </div>
            </div>
            {/each}
            <!-- Ajoutez d'autres articles ici si nécessaire -->
        </div>
    </div>
    <div class="alanb"></div>
    <br><br>
</section>


<div class="adminActions">
  <a class="adminButton" href="javascript:void(0);"  on:click={openAddPopup}><i style="font-size: 30px;color:#fff;" class="fa fa-plus"></i></a>
</div>
          
<style>
.post{
  margin-bottom:40px
}
.adminActions {
  position: fixed;
  bottom: 35px; right: 35px;
  z-index: 999;
  width:70px;
  background:#20aae1;
  height: 70px;
  border-radius:50%;
}
.adminActions a i {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

.file-ariane {
      position: absolute;
      width: 68%;
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
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
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
