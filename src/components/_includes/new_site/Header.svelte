<script lang="ts">
    import { goto } from "$app/navigation";
    import type { User } from "../../../types";
    import Menu_header from "$components/_includes/new_site/Menu_header.svelte";
    export let user: User | null = null;

   
    /*    async function logout() {
    await fetch("/auth/logout", { method: "POST" });
    goto("/"); // Redirection après déconnexion
  } */
</script>

<!-- The social media icon bar -->
<div class="icon-bar-sticky">
    <a
        href="https://facebook.com"
        class="waves-effect waves-light btn btn-social-icon btn-facebook"
        aria-label="Facebook"><i class="fa fa-facebook"></i></a
    >
    <a
        href="https://twitter.com"
        class="waves-effect waves-light btn btn-social-icon btn-twitter"
        aria-label="Twitter"><i class="fa fa-twitter"></i></a
    >
    <a
        href="https://linkedin.com"
        class="waves-effect waves-light btn btn-social-icon btn-linkedin"
        aria-label="LinkedIn"><i class="fa fa-linkedin"></i></a
    >
    <a
        href="https://youtube.com"
        class="waves-effect waves-light btn btn-social-icon btn-youtube"
        aria-label="YouTube"><i class="fa fa-youtube-play"></i></a
    >
</div>
    {#if user?.id}
        <Menu_header etat={true} />
    {:else}
        <Menu_header etat={false} />
    {/if}

<!-- { JSON.stringify(user) } -->
<!--Slider Here-->
<!--Slider Here-->
<!--Slider Here-->

<!--  <header class="top-bar">

          <nav hidden class="nav-white nav-transparent">
              <div class="nav-header">
                  <a href="index.html" class="brand">
                      <img src="/_files/logo-depps.png" alt="Image" class="img-fluid" />
                  </a>
                  <button class="toggle-bar">
                      <span class="ti-menu"></span>
                  </button>	
              </div>								
              <ul class="menu">
                  {#if user }
                      <li><a href="/site/dashboard">Tableau de bord</a></li>
                  {/if}
                  <li><a href="/">Accueil</a></li>
                  <li><a href="/new_site/about">A propos</a></li>
                  <li><a href="/new_site/depps">E-DEPPS</a></li>
                  <li><a href="/new_site/contact">Contactez-nous</a></li>
              </ul>
              <ul class="attributes">
                  <li><a href="#" class="toggle-search-fullscreen"><span class="ti-search"></span></a></li>				
              </ul>				
              <div class="wrap-search-fullscreen">
                  <div class="container">
                      <button class="close-search"><span class="ti-close"></span></button>
                      <input type="text" placeholder="Search..." />
                  </div>
              </div>
          </nav>
      </header> -->

<!--Slider Here-->
<!--Slider Here-->
