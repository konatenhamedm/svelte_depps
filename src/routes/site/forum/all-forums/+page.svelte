<script lang="ts">
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { onMount } from "svelte";
  import { BASE_URL_API_UPLOAD } from "$lib/api";
  import {goto} from "$app/navigation";

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

  let topics: Topic[] = [];

  let selectedTopic: Topic | null = null;
  let newComment = "";

  function formatDateForInput(dateString: any) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // Charger les forums depuis l'API
  async function fetchForums() {
    try {
      const response = await fetch(
        "https://depps.leadagro.net/api/forum/actif"
      );
      const result = await response.json();

      if (result.code === 200 && Array.isArray(result.data)) {
        topics = result.data.map((forum) => ({
          id: forum.id,
          titre: forum.titre,
          author: forum.user.email, // L'API ne fournit pas d'auteur pour le topic
          contenu: forum.contenu, // L'API ne fournit pas d'auteur pour le topic
          date: forum.createdAt, // À adapter si l'API fournit une date
          avatarUrl: forum.user.avatar
            ? BASE_URL_API_UPLOAD +
              `${forum.user.avatar.path}/${forum.user.avatar.alt}`
            : "https://randomuser.me/api/portraits/men/1.jpg",
          comments: forum.avis.map((avis) => ({
            author: avis.user.email,
            date: avis.createdAt, // Modifier selon les besoins
            contenu: avis.contenu,
            avatarUrl: avis.user.avatar
              ? BASE_URL_API_UPLOAD +
                `${avis.user.avatar.path}/${avis.user.avatar.alt}`
              : "https://randomuser.me/api/portraits/men/1.jpg"
          }))
        }));
      }
    } catch (error) {
      console.error("Erreur lors du chargement des forums :", error);
    }
  }

  function selectTopic(topic: Topic) {
    selectedTopic = topic;
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("selectedTopic", JSON.stringify(topic));
    }
  }
  let loading = false;
  async function addComment() {
    loading = true;
    if (selectedTopic && newComment.trim() !== "") {
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
              forum: String(selectedTopic.id),
              userUpdate: String(user.id)
            })
          }
        );

        const result = await response.json();

        if (result.code === 200) {
          newComment = "";
          loading = false;

          await fetchForums(); // Recharge les forums pour voir les nouveaux commentaires
          selectedTopic =
            topics.find((topic) => topic.id === selectedTopic?.id) || null;
        } else {
          console.error(
            "Erreur lors de l'ajout du commentaire:",
            result.message
          );
          loading = false;
        }
      } catch (error) {
        console.error("Erreur lors de l'envoi du commentaire:", error);
        loading = false;
      }
    }
  }

  onMount(() => {
    fetchForums();
    console.log("content Data", user);
  });
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
  <button on:click={() => goto("/site/forum")} class="flex items-center hover:text-blue-600">
    Forum
  </button>
  <span>/</span>
  <span class="text-gray-800">Discussion forums</span> <!-- Nom de la page actuelle -->
</div><br>

<main class="mx-auto px-8 py-8 main-div" style="padding-top: 200px !important;">
  <!--<header class="bg-white py-6 px-4 shadow-sm pb-2">
    <h1 class="text-4xl font-bold text-forum-purple">Discussion Forum</h1>
  </header>-->

  <!-- Conteneur principal avec les sujets et les avis -->
  <div class="flex space-x-2 pt-2">
    <!-- Liste des sujets -->
    <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
      <div class="bg-forum-purple text-white rounded-t-lg py-4 px-6">
        <h2 class="text-xl font-semibold">Topics</h2>
      </div>

      <div class="bg-white h-[400px] overflow-y-auto">
        {#each topics as topic}
          <div
            class="flex items-center py-4 px-6 border-b border-gray-100 hover:bg-purple-50 transition-colors cursor-pointer topic {selectedTopic &&
            selectedTopic.titre === topic.titre
              ? 'selected'
              : ''}"
            on:click={() => selectTopic(topic)}
          >
            <div class="flex-shrink-0 mr-4">
              <img
                src={topic.avatarUrl}
                alt={topic.author}
                class="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div class="flex-grow">
              <h3 class="text-md font-semibold text-forum-purple">
                {topic.titre}
              </h3>
              <div class="text-sm text-gray-600">
                {formatDateForInput(topic.date)}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Affichage des avis -->
    {#if selectedTopic}
      <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
        <div class="bg-gray-100 text-black rounded-t-lg py-4 px-6">
          <h2 class="text-xl font-semibold">
            {selectedTopic.titre} rédigé par {selectedTopic.author}
          </h2>
          <p class="text-md text-gray-600">{selectedTopic.contenu}</p>
        </div>

        <div class="p-6 h-[300px] overflow-y-auto">
          {#each selectedTopic.comments as comment}
            <div class="flex items-start space-x-4 mb-4">
              <img
                src={comment.avatarUrl}
                alt={comment.author}
                class="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p class="text-md font-semibold">
                  {comment.author}
                  <span class="text-gray-500 text-sm"
                    >({formatDateForInput(comment.date)})</span
                  >
                </p>
                <p class="text-black">{comment.contenu}</p>
              </div>
            </div>
          {/each}

          {#if selectedTopic.comments.length === 0}
            <p class="text-gray-500 text-center">
              Aucun commentaire pour ce sujet.
            </p>
          {/if}
        </div>

        <!-- Champ pour ajouter un commentaire -->
        <div class="p-6 border-t bg-gray-50 grid">
          <textarea
            name="avis"
            id="avis"
            cols="30"
            rows="4"
            class="w-full border rounded-lg p-2"
            placeholder="Ajoutez un commentaire..."
            bind:value={newComment}
            on:keydown={(e) => e.key === "Enter" && addComment()}
          ></textarea>
          <button
            class="mt-2 bg-green-400 text-red-500 px-4 py-2 rounded-lg w-full"
            on:click={addComment}
          >


          {#if loading }
          <div class="flex flex-row gap-2">
            <div
              class="w-3 h-8 rounded-full bg-white animate-bounce [animation-delay:.7s]"
            ></div>
            <div
              class="w-3 h-8 rounded-full bg-white animate-bounce [animation-delay:.3s]"
            ></div>
            <div
              class="w-3 h-8 rounded-full bg-white animate-bounce [animation-delay:.7s]"
            ></div>
          </div>
          {:else }
          Publier
          {/if }
          </button>
        </div>
      </div>
    {:else}
      <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
        <div class="flex items-start space-x-4 mb-4">
          <div></div>
        </div>
        <p class="text-gray-500 text-center">Veillez choisir un sujet.</p>

        <!-- Champ pour ajouter un commentaire -->
      </div>
    {/if}
  </div>
</main>

<Footer />

<style>
  .main-div {
    margin-top: 30px;
    margin-bottom: 40px;
    border: 1px solid #e5e7eb;
    background: transparent;
    border-radius: 10px;
    padding: 10rem 232px 0rem !important;
  }

  .selected {
    background-color: #3498db;
    color: white;
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
