<script lang="ts" >
  import "../app.css";
  import { page } from '$app/stores';
  import Header from "../components/_includes/Header..svelte";
  import Side from "../components/_includes/Side.svelte";
  import Footer from "../components/_includes/Footer.svelte";
 

  let { children } = $props();
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
  {:else}
    <!-- Styles pour le site normal -->
    <link href="https://fonts.googleapis.com/css?family=Poppins:100,300,400,700,900" rel="stylesheet">
    <link rel="stylesheet" href="/site/css/icon-font.css">
    <link rel="stylesheet" href="/site/css/style.css">
    <link rel="stylesheet" href="/site/css/animate.min.css">
    <link rel="stylesheet" href="/site/css/fancybox.min.css">
    <link rel="stylesheet" href="/site/css/odometer.min.css">
    <link rel="stylesheet" href="/site/css/BeerSlider.css">
    <link rel="stylesheet" href="/site/css/BeerSlider.unmin.css">
    <link rel="stylesheet" href="/site/css/accordion.css">
    <link rel="shortcut icon" type="image/png" href="/site/img/favicon.png">
    <link rel="stylesheet" href="/site/css/odometer.min.css">
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
{:else }
  <!-- <main> pppp-->
 
    {@render children()}
 
  <!-- </main> -->
{/if}
