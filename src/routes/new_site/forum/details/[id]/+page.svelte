<script lang="ts">
  import Header from "$components/_includes/new_site/Header.svelte";
  import Footer from "$components/_includes/new_site/Footer.svelte";
  import { apiFetch, BASE_URL_API_UPLOAD } from "$lib/api";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import EditForumPopup from "../../EditForumPopup.svelte";
  import Delete from "../../Delete.svelte";
  import Sub_header from "$components/_includes/new_site/Sub_header.svelte";

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

<Header {user} />
<!--   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
 -->
<Sub_header titre="Liste des articles" subTitles={[{ title: "Liste des articles", link: "/new_site/forum" }]}></Sub_header>

<main class="py-8 px-4 sm:px-8 bg-gray-50">
  <section class="max-w-4xl mx-auto">
    {#if loadFetch}
      <p class="text-center text-gray-600">Chargement en cours...</p>
    {:else if topics.length > 0}
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-2">{topics[0].titre}</h3>
        <p class="text-sm text-gray-500">
          Éditeur : <b>{topics[0].nom}</b> – {formatDateForInput(topics[0].date)}
        </p>
        <p class="mt-4 text-gray-700 leading-relaxed">
          {topics[0].contenu}
        </p>
      </div>
    {:else}
      <p class="text-center text-gray-500">Aucun topic disponible.</p>
    {/if}

    <div class="mt-8">
      <h5 class="text-lg font-semibold text-gray-800">Commentaires</h5>
      <hr class="my-2 border-gray-300" />

      {#each comments as commentaire}
        <div class="bg-white rounded-lg shadow-sm p-4 mb-4 flex gap-4 items-start">
          <img
                  src={commentaire.avatarUrl}
                  alt="Photo de {commentaire.author}"
                  class="w-12 h-12 rounded-full border object-cover"
          />
          <div>
            <p class="text-sm text-gray-800 font-medium">
              Écrit par <strong>{commentaire.author}</strong>
              <span class="text-xs text-gray-500">le {formatDateForInput(commentaire.date)}</span>
            </p>
            <p class="mt-1 text-gray-700">{commentaire.contenu}</p>
          </div>
        </div>
      {/each}

      {#if comments.length === 0}
        <div class="bg-white p-4 rounded-lg shadow text-gray-600 text-sm mt-4">
          Aucun commentaire pour l'instant.
        </div>
      {/if}
    </div>

    <!-- Zone de commentaire -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <textarea
              bind:value={newComment}
              on:keydown={(e) => e.key === "Enter" && addComment()}
              rows="4"
              maxlength="300"
              placeholder="Laisser un commentaire..."
              class="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <div class="mt-4">
        <button
                on:click={addComment}
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          Ajouter le commentaire
        </button>
      </div>
    </div>

    <!-- Bouton de suppression / modification -->
    {#if user.id == dataUser}
      <div class="mt-8">
        <button
                on:click={() => openEditPopup(topics[0])}
                class="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded shadow flex items-center gap-2"
        >
          <i class="fa fa-trash"></i> Supprimer l'article
        </button>
      </div>
    {/if}
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
