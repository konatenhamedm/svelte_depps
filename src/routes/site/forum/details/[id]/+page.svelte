<script lang="ts">
    
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
  </script>
  
  
  <Slide {user} /> <br><br>
<!--   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
 -->
  <div class="container">
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
      <span class="text-gray-800">Détails du forum</span> <!-- Nom de la page actuelle -->
    </div><br>
  </div>
  <main>
    <section class="hizmetler-detay-sayfasi-alani">
      <div class="h-yazi-ozel h-yazi-margin-ozel"></div>
      <div class="tablohizmetlerdetay">
          <!-- Hizmetler Detay Yazı Alanı -->
          <div class="tablo--1-ve-1 wow fadeInUp">
              <h3 class="baslik-3-1 h-yazi-margin-kucuk">Titre de l'article</h3>
              <p>Editeur : <b>John Doe</b> 10 Octobre 2023<br><br></p>
              <p class="paragraf">
                  Ceci est le texte de l'article. Il est affiché ici de manière statique.
                  Vous pouvez remplacer ce texte par le contenu réel de l'article.
              </p>
          </div>
      </div>
      <div class="container">
          <h5>Commentaires</h5>
          <hr>
          <!-- Commentaire 1 -->
          <div class="services-kutu2 project-image reveal-effect masker wow" style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 10px;">
              <div class="row">
                  <div class="col-md-12">
                      <p style="margin: auto; text-align: start;">Jane Doe</p>
                      <p style="margin: auto; text-align: start;">Ceci est un commentaire exemple.</p>
                      <p style="margin: auto; text-align: start;"><small>11 Octobre 2023</small></p>
                  </div>
              </div>
          </div>
          <!-- Commentaire 2 -->
          <div class="services-kutu2 project-image reveal-effect masker wow" style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 10px;">
              <div class="row">
                  <div class="col-md-12">
                      <p style="margin: auto; text-align: start;">John Smith</p>
                      <p style="margin: auto; text-align: start;">Un autre commentaire statique.</p>
                      <p style="margin: auto; text-align: start;"><small>12 Octobre 2023</small></p>
                  </div>
              </div>
          </div>
          <!-- Aucun commentaire -->
          <div class="services-kutu2 project-image reveal-effect masker wow" style="cursor: pointer; visibility: visible; width: 100%; margin-bottom: 10px;">
              <div class="row">
                  <div class="col-md-12">
                      <p style="margin: auto; text-align: start;">Aucun commentaire pour l'instant</p>
                  </div>
              </div>
          </div>
      </div><br>
      <div class="container">
          <div class="col-md-8">
              <form action="add_commentaire" class="form add_commentaire" method="post">
                  <div class="form__grup">
                     
                      <textarea rows="10" cols="66" required maxlength="40" name="commentaire" id="txt_mesaj" placeholder="Laisser un commentaire" class="form__input w-full"></textarea>
                  </div>
                  <div class="form__grup">
                      <br>
                      <button class="buton buton--kirmizi" id="add_commentaire">AJOUTER LE COMMENTAIRE</button>
                  </div>
                  <br>
              </form>
          </div>
      </div>
      <div class="container">
          <form action="delete_article" class="delete_article">
              <input type="hidden" name="id" value="1">
              <button style="background: red !important; margin-top: 30px;" class="buton buton--kirmizi" id="delete_article"> SUPPRIMER L'ARTICLE <i class="fa fa-trash"></i></button>
          </form>
      </div>
      <!-- Hizmet Detay 2 -->
      <div class="h-yazi-ozel h-yazi-margin-ozel"></div>
  </section>
  </main>
  <Footer />
  <style>
    
    .file-ariane {
      position: absolute;
      width: 80%;
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