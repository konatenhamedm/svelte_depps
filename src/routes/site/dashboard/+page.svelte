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

  export let data;
  let user = data?.user;

  async function logout() {
    await fetch("/auth/logout", { method: "POST" });
    goto("/");
  }
  let cards = [
    { icon: 'fas fa-folder-open', text: 'Mise à jour du dossier', link: 'profil' },
    { icon: 'fas fa-bell', text: 'Alertes', link: 'alerte' },
    { icon: 'fas fa-comments', text: 'MyDEPPS chat', link: 'chatbox' },
    { icon: 'fas fa-book', text: 'profil', link: 'profil' },
    { icon: 'fas fa-file-pdf', text: "Guide utilisateur (PDF)", link: "/_files/GUIDE-D'UTILISATION.pdf" },
    { icon: 'fas fa-users', text: 'Forum', link: '#' }
  ];
</script>

<div
        id="pointer-ring"
        style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(203px, 610px);"
></div>
<div
        id="pointer-dot"
        style="border-color: rgb(113, 88, 190); transform: translate(228px, 635px);"
></div>
<div id="">
  <Header user={user} />
  <Slide user={user} />
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

  <section class="hakkimizda-bolumu-anasayfa1">
    <div class="container">
      <div
              class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow animated"
              style="visibility: visible;"
      >
        <div class="row">
          <div class="col-md-8">
            <h1
                    style="font-size: 3.5rem;text-transform: none;"
                    class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"
            >
              Bienvenue sur la<br />
              plateforme MyDEPPS <br />
            </h1>
          </div>
          <div
                  class="col-md-4 row"
                  style="box-shadow: 8px 8px 6px #bababa;padding: 8px;border: 1px solid #bababa6b;border-radius: 10px;"
          >
            <div class="col-md-8">
              <h4
                      class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"
                      style="margin: 0px !important;margin-top:10px !important"
              >
                {user?.username}
              </h4>
              <p style="font-size:20px">
                {#if user?.type == "PROFESSIONNEL"}
                  PROFESSIONNEL DE SANTE
                {:else}
                  ETABLISSEMENT DE SANTE
                {/if}
              </p>
            </div>
            <div class="col-4">
              {#if user?.avatar != null}
                <div
                        style="width: 100px;height: 100px;border-radius:50%;background-image:url({BASE_URL_API_UPLOAD +
                    user?.avatar});background-size:cover"
                ></div>
              {:else}
                <div
                        style="width: 100px;height: 100px;border-radius:50%;background-image:url('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg');background-size:cover"
                ></div>
              {/if}
            </div>
          </div>
        </div>
        <br />
        <!-- <div class="alert alert-danger" style="font-size:18px">
          Bienvenue! Veuillez payer votre adhésion pour activer votre compte! <b
            ><u><a href="paiements" style="color:#58151c">Cliquez ici</a></u></b
          >
        </div> -->
        <!-- <div class="alert alert-info" style="font-size:18px">
                  <i>Vous avez obtenu un avis favorable d'inscription au registre de la profession Pharmacie.<br>Veuillez vous rendre à la DEPPS pour le retrait de votre autorisation d'exercice</i>
              </div> -->
        <br />
        <div class="row g-4">
          {#each cards as { icon, text, link }}
            <div class="col-md-4 col-sm-6 ">
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
    .footerss p {
      display: flex;
      flex-wrap: wrap;
      justify-content: start !important;
      align-items: start !important;
    }
    h2.h2-baslik-footer.h-yazi-margin-kucuk,
    .footer__list,
    .footer__sosyal {
      display: flex;
      flex-wrap: wrap;
      justify-content: start !important;
      align-items: start !important;
    }





    .card-custom:hover {

      transform: scale(1.05);  /* Effet de zoom léger */
    }

    .card-custom {
      transition: background-color 0.3s ease, transform 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      border-radius: 10px;
      border: 1px solid blue;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
      overflow: hidden; /* Empêche le contenu de dépasser */
      height: 200px; /* Ajuste la hauteur pour un meilleur rendu */
    }

    .card-custom i {
      font-size: 5rem; /* Agrandit les icônes */
      margin-bottom: 10px;
    }

    .card-custom .card-text {
      font-size: 1.2rem;
      font-weight: bold;
      white-space: nowrap; /* Empêche le texte de se casser */
      overflow: hidden; /* Empêche le texte de déborder */
      text-overflow: ellipsis; /* Ajoute des "..." si le texte est trop long */
      max-width: 100%;
    }

  </style>
  <Footer />
</div>

