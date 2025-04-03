<script lang="ts">
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { apiFetch, BASE_URL_API_UPLOAD } from "$lib/api";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import EditForumPopup from "../../EditForumPopup.svelte";
  import Delete from "../../Delete.svelte";

  let showAddPopup = false;
  let showEditPopup = false;
  let selectedForum: any = null;

  function openEditPopup(forum: any) {
    selectedForum = forum;
    showEditPopup = true;
  }
  let forums: any[] = [];

  function closeEditPopup() {
    showEditPopup = false;
    selectedForum = null;
  }
  type Comment = {
    author: string;
    date: string;
    contenu: string;
    avatarUrl: string;
  };

  type Topic = {
    id: number;
    titre: string;
    author: string;
    date: string;
    contenu: string;
    avatarUrl: string;
    comments: Comment[];
  };

  export let data;
  let user = data?.user;
  let newComment = "";
  let response: any;

  let topics: any[] = []; // Utilisez `any[]` ou un type spécifique si vous avez une interface `Topic`
  let comments: any[] = [];

  let dataUser: any;

  let currentPage = 1;
  const itemsPerPage = 5;
  let loadFetch = false;
  let selectedTopic: any;

  async function fetchData() {
    loadFetch = true;
    try {
      const res = await fetch(
        `https://depps.leadagro.net/api/forum/get/one/${$page.params.id}`
      );
      const response = await res.json(); // Déclarer `response`

      if (response.code === 200 && response.data) {
        const forums = response.data;
        dataUser = forums.user.id;
        topics.push({
          id: forums.id,
          user: forums.user.id,
          titre: forums.titre,
          nom:
            forums.user.typeUser === "PROFESSIONNEL"
              ? `${forums.user.personne.nom} ${forums.user.personne.prenoms}`
              : forums.user.email,
          author: forums.user.email,
          contenu: forums.contenu,
          typeUser: forums.user.typeUser,
          date: forums.createdAt,
          avatarUrl: forums.user.avatar
            ? `${BASE_URL_API_UPLOAD}${forums.user.avatar.path}/${forums.user.avatar.alt}`
            : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
        });

        // Créer un tableau de commentaires
        if (forums.avis && Array.isArray(forums.avis)) {
          comments = forums.avis.map((avis) => ({
            author:
              avis.user.typeUser === "PROFESSIONNEL"
                ? `${avis.user.personne.nom} ${avis.user.personne.prenoms}`
                : avis.user.email, // Gérer les champs manquants
            date: avis.createdAt,
            contenu: avis.contenu || "Pas de contenu", // Gérer les champs manquants
            avatarUrl: avis.user?.avatar
              ? `${BASE_URL_API_UPLOAD}${avis.user.avatar.path}/${avis.user.avatar.alt}`
              : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
          }));
        }
        console.log("content Data", comments);
      } else {
        console.error(
          "Erreur lors de la récupération des données:",
          response.message
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      loadFetch = false;
    }
  }

  onMount(async () => {
    fetchData();
  });
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
  function navigateToDashboard() {
    goto("/site/dashboard");
  }

  let loading = false;
  async function addComment() {
    loading = true;

    try {
      const response = await fetch(
        "https://depps.leadagro.net/api/avis/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contenu: newComment,
            forum: String($page.params.id),
            userUpdate: String(user.id)
          })
        }
      );

      const result = await response.json();

      if (result.code === 200) {
        newComment = "";
        loading = false;

        await fetchData(); // Recharge les forums pour voir les nouveaux commentaires
        selectedTopic = $page.params.id || null;
      } else {
        console.error("Erreur lors de l'ajout du commentaire:", result.message);
        loading = false;
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire:", error);
      loading = false;
    }
  }
  function updateForum(updatedForum: any) {
    /*  goto("/site/forum"); */
  }
</script>

<Slide {user} /> <br /><br />
<!--   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
 -->
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
    <button
    on:click={()=>{
       goto("/site/forum")
    }}
    class="flex items-center hover:text-blue-black"
  >
    <!-- Icône SVG pour "Tableau de bord" -->
   
   Liste des articles
  </button>
    <span>/</span>
    <span class="text-gray-800">Détails du forum</span>
  </div>
  <!-- Nom de la page actuelle -->
</div>
<br />
<main>
  <section class="hizmetler-detay-sayfasi-alani">
    <div class="h-yazi-ozel h-yazi-margin-ozel"></div>
    <div class="tablohizmetlerdetay">
      <!-- Hizmetler Detay Yazı Alanı -->
      {#if loadFetch}
        <p>Chargement en cours...</p>
      {:else if topics.length > 0}
        <h3 class="baslik-3-1 h-yazi-margin-kucuk">{topics[0].titre}</h3>
        <p>
          Editeur : <b>{topics[0].nom}</b>
          {formatDateForInput(topics[0].date)}<br /><br />
        </p>
        <p class="paragraf">
          {topics[0].contenu}
        </p>
      {:else}
        <p>Aucun topic disponible.</p>
      {/if}
      <div class="container">
        <h5>Commentaires</h5>
        <hr />
        <!-- Commentaire 1 -->

        {#each comments as commentaire}
          <div
            class="services-kutu2 project-image reveal-effect masker wow"
            style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 10px;"
          >
            <div class="row align-items-center">
              <!-- Ajout de la photo de profil -->
              <div class="col-auto">
                <img
                  src={commentaire.avatarUrl}
                  alt="Photo de {commentaire.author}"
                  class="rounded-circle border-raidus-circle modal-contente"
                  style="width: 50px; height: 50px; object-fit: cover;border: 1px solid gray;"
                />
              </div>
              <div class="col">
                <p style="margin: auto; text-align: start; font-weight: bold;">
                  Ecrit par : <strong>{commentaire.author}</strong> le
                  <small>{formatDateForInput(commentaire.date)}</small>
                </p>
                <p style="margin: auto; text-align: start;">
                  {commentaire.contenu}
                </p>
                <!--  <p style="margin: auto; text-align: start;">
                <small>{formatDateForInput(commentaire.date)}</small>
              </p> -->
              </div>
            </div>
          </div>
        {/each}

        {#if comments.length === 0}
          <div
            class="services-kutu2 project-image reveal-effect masker wow"
            style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 10px;"
          >
            <div class="row">
              <div class="col-md-12">
                <p style="margin: auto; text-align: start;">
                  Aucun commentaire pour l'instant
                </p>
              </div>
            </div>
          </div>
        {/if}
      </div>
      <br />
      <div class="container">
        <div class="col-md-8">
          <div class="form add_commentaire">
            <div class="form__grup">
              <textarea
                bind:value={newComment}
                on:keydown={(e) => e.key === "Enter" && addComment()}
                rows="10"
                cols="66"
                required
                maxlength="300"
                name="commentaire"
                id="txt_mesaj"
                placeholder="Laisser un commentaire"
                class="form__input w-full"
              ></textarea>
            </div>
            <div class="form__grup">
              <br />
              <button
                on:click={addComment}
                class="buton buton--kirmizi"
                id="add_commentaire">AJOUTER LE COMMENTAIRE</button
              >
            </div>
            <br />
          </div>
        </div>
      </div>

      {#if user.id == dataUser}
        <div class="container">
          <div class="delete_article">
            <input type="hidden" name="id" value="1" />
            <button
              on:click={() => openEditPopup(topics[0])}
              style="background: red !important; margin-top: 30px;"
              class="buton buton--kirmizi"
              id="delete_article"
            >
              SUPPRIMER L'ARTICLE <i class="fa fa-trash"></i></button
            >
          </div>
        </div>
      {/if}

      <!-- Hizmet Detay 2 -->
      <div class="h-yazi-ozel h-yazi-margin-ozel"></div>
    </div>
  </section>
</main>
{#if selectedForum}
  <Delete
    {data}
    bind:showPopup={showEditPopup}
    closePopup={closeEditPopup}
    forum={selectedForum}
    on:submit={updateForum}
  />
{/if}
<Footer />

<style>
  .entete {
    width: 75% !important;
  }
  .modal-contente {
    border-radius: 8px;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); */
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
