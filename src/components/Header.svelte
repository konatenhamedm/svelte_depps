<script lang="ts">
  import { getAuthCookie, logoutKIte } from "$lib/auth";
  import { onMount } from "svelte";
  import type { User } from "../types";

  let user: User | null;
  function handleLogout() {
    logoutKIte();
    /* window.location.href = "/"; */
  }

  onMount( async() => {
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
       
        {#if user != null }
            
        <li style="border: 4px solid red;padding: 5px 17px;border-radius: 32px;"><a href="javascript:void(0)" on:click={handleLogout} >Déconnexion</a></li>
        {:else}
        <li><a href="/site/inscription">Inscription</a></li>
        <li><a href="/site/connexion">Connexion</a></li>

        {/if}
      </ul>
    </div>
  </div>
</div>
<div class="sides"></div>



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
