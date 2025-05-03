<script lang="ts">
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { onMount } from "svelte";
  import type { User } from "../../../types";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { BASE_URL_API_UPLOAD } from "$lib/api";

  function handleLogout() {
    logout();
    window.location.href = "/";
  }
  let hasNotifications = false;
  let notificationCount = 0;

  export let data;
  let user = data?.user;
  let cards:any = [];

  async function logout() {
    await fetch("/auth/logout", { method: "POST" });
    goto("/");
  }

  if(user.type == "PROFESSIONNEL"){
     cards = [
    { icon: 'fas fa-folder-open', text: 'Mise à jour du dossier', link: 'dossiers' },
    { icon: 'fas fa-bell', text: 'Alertes', link: 'alerte' },
    { icon: 'fas fa-tasks', text: 'suivi de mon dossier', link: 'suivi' },/* 
    { icon: 'fas fa-comments', text: 'MyDEPPS chat', link: 'chatbox' }, */
    { icon: 'fas fa-book', text: 'Historique paiements', link: 'paiements' },
    { icon: 'fas fa-file-pdf', text: "Documenthèque", link: "guide-utilisateur" },
    { icon: 'fas fa-users', text: 'Forum', link: 'forum' }
  ];
  }else{
     cards = [
    { icon: 'fas fa-folder-open', text: 'Mise à jour du dossier', link: 'dossiers_etablissement' },
    { icon: 'fas fa-bell', text: 'Alertes', link: 'alerte' },
    { icon: 'fas fa-tasks', text: 'suivi de mon dossier', link: 'suivi' },
    /* { icon: 'fas fa-comments', text: 'MyDEPPS chat', link: 'chatbox' }, */
    { icon: 'fas fa-book', text: 'Historique paiements', link: 'paiements' },
    { icon: 'fas fa-file-pdf', text: "Documenthèque", link: "guide-utilisateur" },
    { icon: 'fas fa-users', text: 'Forum', link: 'forum' }
  ];
  }


  async function fetchData() {
        try {
            const response = await fetch(`https://app.mydepps.net/api/notification/nombre/${user.id}`);
            if (response.ok) {
                const result = await response.json();
                if (result.code === 200 && result.data) {
                  notificationCount = result.data.length;
                  
                } else {
                    console.error("Erreur dans la réponse de l'API:", result.message);
                }
            } else {
                console.error("Erreur de récupération:", response.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        }finally {
          
        }
    }

    onMount(async () => {
        await fetchData();
    });
 
</script>

<!-- <div
        id="pointer-ring"
        style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(203px, 610px);"
></div>
<div
        id="pointer-dot"
        style="border-color: rgb(113, 88, 190); transform: translate(228px, 635px);"
></div> -->
<div id="">
  
  <Slide user={user} /><br><br><br><br><br><br>
  <style>
    .tablo:not(:last-child) {
      margin-bottom: 35px;
    }
    .blinking_live {
      animation: blink-live 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    @keyframes blink-live {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    .container-div {
      position: relative;
      width: 100%;
      height: 300px;
      background-size: cover;
      background-position: center;
      display: flex;
      border-radius: 20px;
      justify-content: center;
      align-items: center;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background: #092962b5;
      z-index: 1;
    }

    .text {
      position: absolute;
      bottom: 20px;
      left: 20px;
      color: white;
      font-size: 38px;
      z-index: 2;
    }
    .col-md-4 {
      margin-bottom: 20px;
    }
    .row > * {
      flex-shrink: 0;
      width: 100%;
      max-width: 100%;
      padding-right: 20px;
      padding-left: calc(var(--bs-gutter-x) * 0.5);
      margin-top: var(--bs-gutter-y);
    }

    @media only screen and (max-width: 600px) {
      .hakkimizda-bolumu-anasayfa1 {
        padding-top: 150px;
      }
    }

    @media only screen and (min-width: 600px) {
      .hakkimizda-bolumu-anasayfa1 {
        padding-top: 20px;
      }
    }
    @keyframes blink {
      0% {
        background-color: red;
      }
      50% {
        background-color: transparent;
      }
      100% {
        background-color: red;
      }
    }

    .badge-blink {
      animation: blink 1s infinite;
      padding: 5px 10px;
      border-radius: 10px;
      color: white;
      font-weight: bold;
    }
  </style>
  <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossorigin="anonymous"
  />
  <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
  />
  <section class="hakkimizda-bolumu-anasayfa1 py-5">
    <div class="container">
      <div class="tablo--1-ve-2 masqueur effet-revelation wow animated" style="visibility: visible;">
        <div class="row align-items-center">
          <div class="col-lg-8 col-md-12 text-center text-lg-start">
            <h1 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk fw-bold">
              Bienvenue sur la<br />
              plateforme MyDEPPS
            </h1>
          </div>
          
          <div class="col-lg-4 col-md-8 mx-auto p-3 shadow-sm border rounded bg-light cursor-pointer" >
            <div class="grid grid-cols-5">
            <!--   <li class="relative mr-4"> -->
              <a href="/site/notification" class="relative text-blue-500 hover:text-blue-700 flex items-center">
                <i class="fas fa-bell text-5xl"></i>
                {#if notificationCount > 0}
                  <span 
                    class="absolute  inline-flex items-center justify-center px-2 py-1 
                           text-xs font-bold text-white bg-red-600 rounded-full transform -translate-y-1/2 translate-x-1/2">
                    {notificationCount}
                  </span>
                {/if}
              </a>
             <!--  </li> -->

              <div class="d-flex align-items-center col-span-4" on:click={()=>{
                goto('/site/profil')
              }}>
                <div class="flex-grow-1">
                  <h4 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk my-2">
                    {user?.nom}
                  </h4>
                  <p class="fs-5 text-secondary">
                    {#if user?.type == "PROFESSIONNEL"}
                    PROFESSIONNEL DE SANTE
                    {:else}
                    ETABLISSEMENT DE SANTE
                    {/if}
                  </p>
                </div>
                <div class="ms-3">
                  <div class="avatar rounded-circle shadow-sm"
                    style="width: 80px; height: 80px; background-size: cover; background-position: center;
                    background-image: url({user?.avatar ? BASE_URL_API_UPLOAD + user?.avatar : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'});">
                  </div>
                </div>
              </div>
            </div>
         
          </div>
        </div>
  
        <br />
  
        <div class="row g-4">
          {#each cards as { icon, text, link }}
          <div class="col-lg-4 col-md-6 col-sm-12">
            <a href={link} class="text-decoration-none">
              <div class="card card-custom hover:bg-blue-100 hover:text-white">
                <i class={icon}></i>
                <div class="card-text">{text}</div>
              </div>
            </a>
          </div>
          {/each}
        </div>
      </div>
    </div>
  </section>
  
  <style>
    /* Conteneurs adaptatifs */
    .container {
      max-width: 1200px;
    }
  
    /* Cartes adaptatives */
    .card-custom {
      transition: transform 0.3s ease, background-color 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid blue;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
      height: 200px;
    }
  
    .card-custom:hover {
      transform: scale(1.05);
    }
  
    .card-custom i {
      font-size: 4rem;
      margin-bottom: 10px;
    }
  
    .card-custom .card-text {
      font-size: 1.2rem;
      font-weight: bold;
      text-overflow: ellipsis;
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
  
    /* Avatar */
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  
    /* Responsive ajustements */
    @media (max-width: 768px) {
      .h2-baslik-anasayfa-ozel {
        font-size: 2.5rem;
      }
  
      .card-custom {
        height: auto;
        padding: 15px;
      }
  
      .card-custom i {
        font-size: 3rem;
      }
    }
  </style>
  
  <Footer />
</div>

