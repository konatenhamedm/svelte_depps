


<script lang="ts" >
  



  import "../app.css";
  import { page } from '$app/stores';
  import Side from "../components/_includes/Side.svelte";
  import Footer from "../components/_includes/Footer.svelte";
  import Header from "$components/_includes/Header.svelte";
 

  let { children,data } = $props();
  let currentYear = new Date().getFullYear();

</script>

<svelte:head>
  {#if $page.url.pathname.startsWith("/admin") || $page.url.pathname.startsWith("/login")}
    <!-- Styles pour admin/login -->
    <link rel="stylesheet" href="/css/vendors_css.css" />
    <script src="https://cdn.tailwindcss.com/"></script>
    <link rel="stylesheet" href="/css/tailwind.min.css" />
    <link rel="stylesheet" href="/icons/fontawesome/css/all.min.css">
    <link rel="stylesheet" href="/icons/line-awesome/css/line-awesome.min.css">
    <link rel="stylesheet" href="/icons/simple-line-icons/css/simple-line-icons.css">
    <link rel="stylesheet" href="/css/style.css" />
    <link rel="stylesheet" href="/css/skin_color.css" />
    <link rel="stylesheet" href="/css/custom.css" />

    <style>
      .theme-success.light-skin .sidebar-menu > li.treeview .treeview-menu li a {
    color: white !important;
}

.theme-primary .main-header {
    background: #343437 !important;
}


    .dark\:border-gray-600 {
        --tw-border-opacity: 1;
        background-color: white !important;
    }

p{
  font-size: 1.4rem !important;
}
h1, h2, h3, h4, h5, h6 {
  font-weight: 2.5rem !important;
}
.h-modal{
  z-index: 999;
}
.bg-gray-50 {
    background-color: white !important;
  }

li.dropdown.notifications-menu.inline-flex.rounded-md {
    display: none !important;
}


.highcharts-credits{
  display: none !important;
}
/* src/global.css */

@media (prefers-color-scheme: dark) {
  .dark\:text-white {
      --tw-text-opacity: 1;
      color: black !important ;
  }
}

body{
  background-color: #e5e7eb !important;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
}

.modale_general > div:first-child {
  background: rgb(79 157 217) !important;
}
.modale_general > div:first-child  h3  {
  color: white !important;
}

.text-gray-700 {
  color:white !important;
}

.modale_general > div:first-child button:hover {
  background-color: #55a1ff; /* Couleur gris clair */
}

/* Styles pour le mode sombre */
@media (prefers-color-scheme: dark) {
  .modale_general > div:first-child button {
      background-color: #1a202c; /* Couleur de fond par défaut en mode sombre */
  }

  /* État de survol en mode sombre */
  .modale_general > div:first-child button:hover {
      background-color: #4a5568; /* Couleur gris foncé */
  }
}

.title-faq {
    color: black !important;
}

.footerss p {
    display: flex;
    flex-wrap: wrap;
    justify-content: start !important;
    align-items: start !important;
}
h2.h2-baslik-footer.h-yazi-margin-kucuk,.footer__list,.footer__sosyal {
    display: flex;
    flex-wrap: wrap;
    justify-content: start !important;
    align-items: start !important;
}

    </style>
 
  {:else if $page.url.pathname.startsWith("/new_site")}


<!--   <link rel="icon" href="https://rhythm-admin-template.multipurposethemes.com/images/favicon.ico"> -->
  <link rel="shortcut icon" type="image/png" href="/site/img/favicon.png">
  <link href="https://unpkg.com/@mdi/font@7.4.47/css/materialdesignicons.min.css" rel="stylesheet">

<link rel="stylesheet" href="/new_site/css/vendors_css.css">
<link rel="stylesheet" href="/icons/fontawesome/css/all.min.css">
<link rel="stylesheet" href="/icons/line-awesome/css/line-awesome.min.css">
<link rel="stylesheet" href="/icons/simple-line-icons/css/simple-line-icons.css">
      
<!-- Revolution Slider -->		
<link rel="stylesheet" type="text/css" href="/new_site/revolution-slider/revolution/fonts/pe-icon-7-stroke/css/pe-icon-7-stroke.css">
<link rel="stylesheet" type="text/css" href="/new_site/revolution-slider/revolution/css/settings.css">
<link rel="stylesheet" type="text/css" href="/new_site/revolution-slider/revolution/css/layers.css">
<link rel="stylesheet" type="text/css" href="/new_site/revolution-slider/revolution/css/navigation.css">  
  
<!-- Style-->  
<link rel="stylesheet" href="/new_site/css/style.css">
<link rel="stylesheet" href="/new_site/css/skin_color.css">
<style type="text/css">.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;box-sizing: content-box;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}</style>
<script src="/new_site/js/nav.js"></script>

<style>
  html{
    height: $p100;
    font-size: 14px;
}
body{
    height: $p100;
    &.layout-boxed{
        height: $p100;
    }
}
.wrapper{
    height: $p100;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: transparent;
    position: relative;
    @include before-after-state{
        content: " ";
        display: table;
    }
}
body{
    overflow-x: hidden;
    overflow-y: auto;
	color:$dark;
	font-size: 1rem;
	font-style: normal;
	font-weight:400;
	font-family: $bodyfont;
	line-height:1.5;
	background-color: #fafbfd;
}

@include screen-lg {
    .container, .container-fluid, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl {
        padding: 0 ($default-gutter-width / 2) !important;
    }
}
@include screen-md-max {    
    .container, .container-fluid, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl {
        padding: 0 ($default-gutter-width / 2) !important;
    }
}

/*---basic---*/
a {
    color: $dark;
}
a{
    @include hover-state{
        outline: 0;
        text-decoration: none;   
    }
}
h1,h2,h3,h4,h5,h6,.h1, .h2, .h3, .h4, .h5, .h6 {
	
	font-family: $headingfont;
    font-weight: 400;
    line-height: 1.2;
}
h1 small, h2 small, h3 small, h4 small, h5 small, h6 small, .h1 small, .h2 small, .h3 small, .h4 small, .h5 small, .h6 small {
    font-size: 65%;
}
h4, .h4, h5, .h5, h6, .h6 {
    margin-bottom: 0.7142857143rem;
}
.h1, h1 {
    font-size: 2.5714285714285716rem;
}

.h2, h2 {
    font-size: 2.142857142857143rem !important; 
}

.h3, h3 {
    font-size: 1.7142857142857142rem;
}

.h4, h4 {
    font-size: 1.2857142857142858rem;
}

.h5, h5 {
    font-size: 1.1428571428571428rem;
}

.h6, h6 {
    font-size: 1rem;
}
h1, h2, h3, .h1, .h2, .h3 {
    margin-top: 0.7142857143rem;
    margin-bottom: 0.7142857143rem;
}
img {
    max-width: $p100;
}
.img-fluid{
	width: $p100;
}
.align-sub {
    vertical-align: sub;
}
.base-font{font-family: $bodyfont !important; }
.heading-font{font-family: $headingfont !important; }
</style>

{:else}

 <!-- Styles pour le site normal -->
 <link href="https://fonts.googleapis.com/css?family=Poppins:100,300,400,700,900" rel="stylesheet">
 <link rel="stylesheet" href="/site/css/icon-font.css">
 <link rel="stylesheet" href="/site/css/style.css">
 <link rel="stylesheet" href="/site/css/animate.min.css">
 <link rel="stylesheet" href="/site/css/fancybox.min.css">
 <link rel="stylesheet" href="/site/css/BeerSlider.css">
 <link rel="stylesheet" href="/site/css/BeerSlider.unmin.css">
 <link rel="stylesheet" href="/site/css/accordion.css">
 <link rel="shortcut icon" type="image/png" href="/site/img/favicon.png">
 <link rel="stylesheet" href="/site/css/odometer.min.css">

 <style>

  p{
    font-size: 1.4rem !important;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 2.5rem !important;
  }
  .h-modal{
    z-index: 999;
  }
  .bg-gray-50 {
      background-color: white !important;
    }
  
  li.dropdown.notifications-menu.inline-flex.rounded-md {
      display: none !important;
  }
  
  
  .highcharts-credits{
    display: none !important;
  }
  /* src/global.css */
  
  @media (prefers-color-scheme: dark) {
    .dark\:text-white {
        --tw-text-opacity: 1;
        color: black !important ;
    }
  }
  
  body{
    background-color: #e5e7eb !important;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif !important;
  }
  
  .modale_general > div:first-child {
    background: rgb(79 157 217) !important;
  }
  .modale_general > div:first-child  h3  {
    color: white !important;
  }
  
  .text-gray-700 {
    color:white !important;
  }
  
  .modale_general > div:first-child button:hover {
    background-color: #55a1ff; /* Couleur gris clair */
  }
  
  /* Styles pour le mode sombre */
  @media (prefers-color-scheme: dark) {
    .modale_general > div:first-child button {
        background-color: #1a202c; /* Couleur de fond par défaut en mode sombre */
    }
  
    /* État de survol en mode sombre */
    .modale_general > div:first-child button:hover {
        background-color: #4a5568; /* Couleur gris foncé */
    }
  }
  
  .title-faq {
      color: black !important;
  }
  
  .footerss p {
      display: flex;
      flex-wrap: wrap;
      justify-content: start !important;
      align-items: start !important;
  }
  h2.h2-baslik-footer.h-yazi-margin-kucuk,.footer__list,.footer__sosyal {
      display: flex;
      flex-wrap: wrap;
      justify-content: start !important;
      align-items: start !important;
  }
  
      </style>


  {/if}
</svelte:head>


{#if $page.url.pathname.startsWith("/admin") }
  <div class="wrapper">
    <div id="loader"></div>

    <Header />
    <Side />
    <div class="content-wrapper">
      {@render children()}
      
      
    </div>
    <Footer />
  </div>
{:else if $page.url.pathname.startsWith("/new_site") }
  <!-- <main> pppp-->
 
    {@render children()}


    <script src="/new_site/js/vendors.min.js"></script>	

<script src="/new_site/corenav-master/coreNavigation-1.1.3.js"></script>
<script src="/new_site/vendor_components/OwlCarousel2/dist/owl.carousel.js"></script>
<script src="/new_site/vendor_components/bootstrap-select/dist/js/bootstrap-select.js"></script>


<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/jquery.themepunch.tools.min.js"></script>
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/jquery.themepunch.revolution.min.js"></script>

 <!-- <script src="https://cdn.jsdelivr.net/gh/ThemePunch/revslider-releases/revslider/public/assets/js/jquery.themepunch.tools.min.js"></script>
 <script src="https://cdn.jsdelivr.net/gh/ThemePunch/revslider-releases/revslider/public/assets/js/jquery.themepunch.revolution.min.js"></script>
  -->
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.actions.min.js"></script>
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.carousel.min.js"></script>
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.kenburn.min.js"></script>
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.layeranimation.min.js"></script>
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.migration.min.js"></script>
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.navigation.min.js"></script>
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.parallax.min.js"></script> 
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
<script type="text/javascript" src="/new_site/revolution-slider/revolution/js/extensions/revolution.extension.video.min.js"></script>
<script src="/new_site/js/revolution-slider.js" type="text/javascript"></script>



<script src="/new_site/js/template.js"></script>
    
    <!-- </main> -->
    {:else}
    {@render children()}

    
{/if}
