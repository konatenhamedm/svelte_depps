<script lang="ts">
  import { getAuthCookie, logout } from "$lib/auth";
  import { onMount } from "svelte";
  import type { User } from "../types";

  let user: User;
  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  onMount(async () => {
    user = getAuthCookie();
  });
</script>

<div class="navigation-menu">
  <div class="inner">
    <div class="side-menu">
      <ul>
        <li><a href="accueil">Accueil</a></li>
        <li><a href="a-propos">A propos</a></li>
        <li><a href="E-DEPPS">E-DEPPS</a></li>
        <li><a href="contactez-nous">Contactez-nous</a></li>
        <li><a href="/site/inscription">Inscription</a></li>
        <li><a href="connexion">Connexion</a></li>
      </ul>
    </div>
  </div>
</div>
<div class="sides"></div>

<header class="header">
  <nav class="navbar hide">
    <div class="inner">
      <div class="logo sticky">
        <a href="accueil"><img src="/_files/logo-depps.png" alt="Image" /></a>
      </div>
      <div class="phone">
        <a href="tel:123456789"
          ><span class="numberp"> (225) 27 20 32 46 32</span></a
        >
      </div>

      <div class="main-menu">
        <ul>
          {#if user}
            <li><a href="/site/dashboard">Dashboard</a></li>
          {/if}

          <li><a href="accueil">Accueil</a></li>
          <li><a href="a-propos">A propos</a></li>
          <li><a href="E-DEPPS">E-DEPPS</a></li>
          <li><a href="contactez-nous">Contactez-nous</a></li>

          {#if user}
            
            <li><a href="/site/dashboard">Dashboard</a></li>
          {:else}
            <li
              style="border: 4px solid #ff9c09;padding: 5px 17px;border-radius: 32px;"
            >
              <a href="/site/inscription">Inscription</a>
            </li>
            <li
              style="border: 4px solid #4a9d2d;padding: 5px 17px;border-radius: 32px;"
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
            <rect class="burger-svg__base" width="50" height="50"></rect>
            <g class="burger-svg__bars">
              <rect
                class="burger-svg__bar burger-svg__bar-1"
                x="14"
                y="18"
                width="22"
                height="2"
              ></rect>
              <rect
                class="burger-svg__bar burger-svg__bar-2"
                x="14"
                y="24"
                width="22"
                height="2"
              ></rect>
              <rect
                class="burger-svg__bar burger-svg__bar-3"
                x="14"
                y="30"
                width="22"
                height="2"
              ></rect>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </nav>
</header>

<style>
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
