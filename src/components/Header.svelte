<script lang="ts">
  import { goto } from "$app/navigation";
  import { logoutKIte } from "$lib/auth";
  import type { User } from "../types";
 

  

  export let user:User[] =  [];

  async function logout() {
    await fetch('/auth/logout', { method: 'POST' });
    goto('/'); // Redirection après déconnexion
}
  
</script>


<div class="navigation-menu">
  <div class="inner">
    <div class="side-menu">
      <ul>
        
        <li><a href="/">Accueiliooo</a></li>
        <li><a href="/site/about">A propos</a></li>
        <li><a href="#">E-DEPPS</a></li>
        <li><a href="/site/contact">Contactez-nous</a></li>
       
        {#if user }
            
        <li style="border: 4px solid red;padding: 5px 17px;border-radius: 32px;" on:click={logoutKIte()}><a href="javascript:void(0)" on:click={logout} >Déconnexion</a></li>
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
