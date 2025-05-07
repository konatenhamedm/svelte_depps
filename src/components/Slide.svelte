<script lang="ts">
  import { onMount, tick } from "svelte";
  import { goto } from "$app/navigation";
  import cookie from "cookie";
  import type { User } from "../types";
  import { logoutKIte } from "$lib/auth";

  export let user: User[] = [];

  async function logout() {
    await fetch("/auth/logout", { method: "POST" });
    goto("/"); // Redirection après déconnexion
    localStorage.clear();

  }

  let hasNotifications = false;
  let notificationCount = 0;

  /*async function checkNotifications() {
    const response = await fetch('/api/notifications');
    const data = await response.json();
    hasNotifications = data.hasNotifications;
    notificationCount = data.notificationCount;
  }*/
</script>

<header class="header">
  <nav class="navbar">
    <div class="inner">
      <div class="logo">
        <a href="accueil"><img src="/_files/logo-depps.png" alt="Image" /></a>
      </div>
      <div class="phone">
        <a href="tel:123456789"
          ><span class="numberp"> (225) 27 20 32 46 32 </span></a
        >
      </div>
      <div class="main-menu">
        <ul>
          {#if user}
            <li><a href="/site/dashboard">Tableau de bord</a></li>
          {/if}

          <li><a href="/">Accueil</a></li>
          <li><a href="/site/about">A propos</a></li>
          <li><a href="/site/depps">E-DEPPS</a></li>
          <li><a href="/site/contact">Contactez-nous</a></li>

          {#if user}
            <li
              style="border: 4px solid red;padding: 5px 17px;border-radius: 32px;"
              on:click={logoutKIte}
            >
              <a href="javascript:void(0)" on:click={logout}>Déconnexion</a>
            </li>
          {:else}
            <li
              style="border: 4px solid #ff9c09; padding: 5px 17px; border-radius: 32px;"
            >
              <a href="/site/inscription">Inscription</a>
            </li>
            <li
              style="border: 4px solid #4a9d2d; padding: 5px 17px; border-radius: 32px;"
            >
              <a href="/site/connexion">Connexion</a>
            </li>
          {/if}
        </ul>
      </div>
      <div class="hamburger-menu" id="hamburger-menu">
        <div class="burger">
          <svg
            id="burger-svg"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
          >
            <title>Show / Hide Navigation</title>
            <rect class="burger-svg__base" width="50" height="50" />
            <g class="burger-svg__bars">
              <rect
                class="burger-svg__bar burger-svg__bar-1"
                x="14"
                y="18"
                width="22"
                height="2"
              />
              <rect
                class="burger-svg__bar burger-svg__bar-2"
                x="14"
                y="24"
                width="22"
                height="2"
              />
              <rect
                class="burger-svg__bar burger-svg__bar-3"
                x="14"
                y="30"
                width="22"
                height="2"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </nav>
</header>

<style>
  .navbar .main-menu ul li a::before {
    content: "\f0f3";
  }
  .fa-bell::before {
    content: "\f0f3" !important;
  }
  .navbar .logo a img {
    height: 89px;
  }
  .navbar {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    z-index: 9;
    background: white;
    padding: 3px 15px;
  }
  .header .navbar {
    width: 100%;
    margin-bottom: 0;
    box-shadow: 0px 2px 10px #ddd;
  }
  .navbar .logo {
    margin-left: 54px;
  }
</style>
