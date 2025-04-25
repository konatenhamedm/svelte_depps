<script lang="ts">

    import type {User} from "../../../types";

    export let user: User[] = [];
</script>

	<!-- The social media icon bar -->
<div class="icon-bar-sticky">
    <a href="#" class="waves-effect waves-light btn btn-social-icon btn-facebook"><i class="fa fa-facebook"></i></a>
    <a href="#" class="waves-effect waves-light btn btn-social-icon btn-twitter"><i class="fa fa-twitter"></i></a>
    <a href="#" class="waves-effect waves-light btn btn-social-icon btn-linkedin"><i class="fa fa-linkedin"></i></a>
    <a href="#" class="waves-effect waves-light btn btn-social-icon btn-youtube"><i class="fa fa-youtube-play"></i></a>
</div>
<header class="top-bar">
    <div class="topbar">
        <div class="container">
            <div class="row justify-content-end">
                <div class="col-md-4 col-12 d-md-block d-none">
                    <div class="topbar-social text-center text-md-start topbar-left">
                        <ul class="list-inline d-md-flex d-inline-block">
                            <li class="ms-10 pe-10"><a href="#"><i class="text-white fa fa-question-circle"></i>Poser une question</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-12">
                    <div class="topbar-social text-center text-md-right">
                        <ul class="list-inline d-md-flex justify-content-end">
                            <li class="ms-10 pe-10"><a href="#"><i class="text-white fa fa-envelope"></i>secretariatdeps2@gmail.com</a></li>
                            <li class="ms-10 pe-10"><a href="#"><i class="text-white fa fa-phone"></i> (225) 27 20 32 46 32</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <nav hidden class="nav-white nav-transparent">
        <div class="nav-header">
            <a href="index.html" class="brand">
                <img src="/_files/logo-depps.png" alt="Image" class="img-fluid"/>
            </a>
            <button class="toggle-bar">
                <span class="ti-menu"></span>
            </button>
        </div>
        <ul class="menu">

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
</header>

<!--Slider Here-->
<!--Slider Here-->
<!--Slider Here-->

      <header class="top-bar">

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
                  {#if user}
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
      </header>

      <!--Slider Here-->
  	<!--Slider Here-->
