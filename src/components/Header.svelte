<script lang="ts">
  import { goto } from "$app/navigation";
  import { logoutKIte } from "$lib/auth";
  import type { User } from "../types";
 

  

  export let user:User[] =  [];

  async function logout() {
    await fetch('/auth/logout', { method: 'POST' });
    goto('/'); // Redirection après déconnexion
}

  let notificationCount = 0;
  
</script>


<div class="navigation-menu">
  <div class="inner">
    <div class="side-menu">
      <ul>
        
        <li><a href="/">Accueil</a></li>
        <li><a href="/site/about">A propos</a></li>
        <li><a href="#">E-DEPPS</a></li>
        <li><a href="/site/contact">Contactez-nous</a></li>
       
        {#if user }
          <li class="relative mr-4">
            <a href="/site/notification" class="text-blue-500 hover:text-blue-700">
              <i class="fas fa-bell text-3xl"></i>
                <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform -translate-y-1/2 translate-x-1/2">{notificationCount}</span>
            </a>
          </li>
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
  .navbar .main-menu ul li a::before {
  content: "\f0f3";
  
}
.fa-bell::before {
  content: "\f0f3" !important;
}
 /*  .navbar .logo a img {
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
  } */
  
</style>
