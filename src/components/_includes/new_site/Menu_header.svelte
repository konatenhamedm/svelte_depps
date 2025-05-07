<script lang="ts">
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    export let etat: boolean = false;
  import { logoutKIte } from "$lib/auth";

    let ready = false;

    onMount(async () => {
      ready = true;

   
      if (typeof window !== 'undefined') {
        const $ = globalThis.$; 

        if ($) {
          $('nav').coreNavigation({
            menuPosition: "right",
            container: true,
            mode: 'sticky',
            dropdownEvent: 'hover',
            onStartSticky: function () {
              console.log('Start Sticky');
            },
            onEndSticky: function () {
              console.log('End Sticky');
            },
            onOpenDropdown: function () {
              console.log('open');
            },
            onCloseDropdown: function () {
              console.log('close');
            },
            onInit: function () {
              $('input').keypress(function (e: any) {
                console.log(e.target.value);
              });
            },
            onOpenMegaMenu: function () {
              console.log('Open Megamenu');
            },
            onCloseMegaMenu: function () {
              console.log('Close Megamenu');
            }
          });
        }
      }
    });

    async function logout(event: MouseEvent) {
      event.preventDefault();
      await fetch("/auth/logout", { method: "POST" });
      goto("/");
    }
</script>

  



   <header class="top-bar">

    <div class="topbar">
      
        <div class="container">
            <div class="row justify-content-end">
                <div class="col-md-4 col-12 d-md-block d-none">
                    <div class="topbar-social text-center text-md-start topbar-left">
                        <ul class="list-inline d-md-flex d-inline-block">
                            <li class="ms-10 pe-10"><a href="/new_site/question"><i class="text-white fa fa-question-circle"></i>Poser une question   </a></li>
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
            {#if etat == true }

            <li><a href="/new_site/dashboard">Tableau de bord  </a></li>
            {/if}
            <li><a href="/new_site">Accueil</a></li>
            <li><a href="/new_site/apropos">A propos</a></li>
            <li ><a href="#">E-DEPPS</a></li>
            <li><a href="/new_site/contact">Contactez-nous</a></li>
          {#if etat == true }
                    <li style="margin-top: 10px;"   on:click={logoutKIte}> 
              <a
                href="javascript:void(0)"  on:click={logout}
                
                style="border: 4px solid red; padding: 5px 12px; border-radius: 32px; cursor: pointer;"
              >
                Déconnexion
              </a>
            </li>
            {:else}
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
            {/if}
   
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
