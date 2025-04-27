<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
  
    export let etat: boolean = false;
  
    let ready = false;
  
    onMount(() => {
      ready = true;
    });
  
    async function logout(event: MouseEvent) {
      event.preventDefault(); // empêcher le lien de faire n'importe quoi
      await fetch("/auth/logout", { method: "POST" });
      goto("/");
    }
  </script>
  


{#if etat == true }
   <header class="top-bar">

    <div class="topbar">
        <div class="container">
            <div class="row justify-content-end">
                <div class="col-md-4 col-12 d-md-block d-none">
                    <div class="topbar-social text-center text-md-start topbar-left">
                        <ul class="list-inline d-md-flex d-inline-block">
                            <li class="ms-10 pe-10"><a href="/new_site/question"><i class="text-white fa fa-question-circle"></i>Poser une question</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-12">
                    <div class="topbar-social text-center text-md-right">
                        <ul class="list-inline d-md-flex justify-content-end">
                            <li class="ms-10 pe-10"><a href="mailto:secretariatdeps2@gmail.com"><i class="text-white fa fa-envelope"></i>secretariatdeps2@gmail.com</a></li>
                            <li class="ms-10 pe-10"><a href="tel:+2252720324632"><i class="text-white fa fa-phone"></i> (225) 27 20 32 46 32</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav hidden class="nav-white nav-transparent">
        <div class="nav-header">
            <a href="index.html" class="brand">
                <img src="/_files/logo-depps.png" alt="Logo DEPPs" class="img-fluid"/>
            </a>
            <button class="toggle-bar" aria-label="Toggle navigation menu">
                <span class="ti-menu"></span>
            </button>
        </div>
            
        <ul class="menu">
            <!-- {#if etat == true } -->

            <li><a href="/new_site/dashboard">Tableau de bord   </a></li>
            <!-- {/if} -->
            <li><a href="/new_site">Accueil</a></li>
            <li><a href="/new_site/apropos">A propos</a></li>
            <li><a href="/new_site/depps">E-DEPPS</a></li>
            <li><a href="/new_site/contact">Contactez-nous</a></li>
          <!--   <li style="margin-top: 10px;"><a style="border: 4px solid #ff9c09;padding: 5px 12px;border-radius: 32px;" href="/new_site/inscription">Inscription</a></li> -->
            <!-- {#if ready && etat} -->
            <li style="margin-top: 10px;">
              <a
                href="#" 
                
                style="border: 4px solid red; padding: 5px 12px; border-radius: 32px; cursor: pointer;"
              >
                Déconnexion
              </a>
            </li>
         <!--  {/if} -->
            <!-- <li style="margin-top: 10px;"><a on:click={logout} style="border: 4px solid red;padding: 5px 12px;border-radius: 32px;" href="javascript:void(0)">Déconnexion</a></li> -->
            <!-- <li
            style="border: 4px solid red;padding: 5px 17px;border-radius: 32px;"
            on:click={logoutKIte}
          >
            <a href="javascript:void(0)" >Déconnexion</a>
          </li> -->

        </ul>
    </nav>

   
</header>

{:else}

<header class="top-bar">

    <div class="topbar">
        <div class="container">
            <div class="row justify-content-end">
                <div class="col-md-4 col-12 d-md-block d-none">
                    <div class="topbar-social text-center text-md-start topbar-left">
                        <ul class="list-inline d-md-flex d-inline-block">
                            <li class="ms-10 pe-10"><a href="/new_site/question"><i class="text-white fa fa-question-circle"></i>Poser une question</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-12">
                    <div class="topbar-social text-center text-md-right">
                        <ul class="list-inline d-md-flex justify-content-end">
                            <li class="ms-10 pe-10"><a href="mailto:secretariatdeps2@gmail.com"><i class="text-white fa fa-envelope"></i>secretariatdeps2@gmail.com</a></li>
                            <li class="ms-10 pe-10"><a href="tel:+2252720324632"><i class="text-white fa fa-phone"></i> (225) 27 20 32 46 32</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav hidden class="nav-white nav-transparent">
        <div class="nav-header">
            <a href="index.html" class="brand">
                <img src="/_files/logo-depps.png" alt="Logo DEPPs" class="img-fluid"/>
            </a>
            <button class="toggle-bar" aria-label="Toggle navigation menu">
                <span class="ti-menu"></span>
            </button>
        </div>
            
        <ul class="menu">
          
            <li><a href="/new_site">Accueil</a></li>
            <li><a href="/new_site/apropos">A propos</a></li>
            <li><a href="/new_site/depps">E-DEPPS</a></li>
            <li><a href="/new_site/contact">Contactez-nous</a></li>
            <li style="margin-top: 10px;"><a style="border: 4px solid #ff9c09;padding: 5px 12px;border-radius: 32px;" href="/new_site/inscription">Inscription</a></li>
            <!-- {#if ready && etat} -->
            <li style="margin-top: 10px;">
              <a
                href="/new_site/connexion" 
                
                style="border: 4px solid red; padding: 5px 12px; border-radius: 32px; cursor: pointer;"
              >
                Connexion
              </a>
            </li>
        </ul>
    </nav>

   
</header>

{/if}







