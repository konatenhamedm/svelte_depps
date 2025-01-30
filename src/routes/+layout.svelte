<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Header from "../components/_includes/Header..svelte";
  import Side from "../components/_includes/Side.svelte";
  import Footer from "../components/_includes/Footer.svelte";
 

  let { children } = $props();
  let currentYear = new Date().getFullYear();
  

</script>

{#if $page.url.pathname != "/" && $page.url.pathname != "/login/mot_passe_oublie" && $page.url.pathname != "/login/confirmation"}
  <div class="wrapper">
    <div id="loader"></div>

    <Header />
    <Side />
    <div class="content-wrapper">
      {@render children()}
      
    </div>
    <Footer />
  </div>
{:else}
  <!-- <main> pppp-->
 
    {@render children()}
 
  <!-- </main> -->
{/if}
