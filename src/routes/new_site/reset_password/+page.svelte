<script lang="ts">
	import Sub_header  from '$components/_includes/new_site/Sub_header.svelte';
    import Footer from '$components/_includes/new_site/Footer.svelte';
    import Header from '$components/_includes/new_site/Header.svelte';
    import { apiFetch } from '$lib/api.js';

    let showNotification = false;
    let notificationMessage = "";
    let notificationType = "info";
  
    let email = "";
    let authenticating = false;
    let showPassword = false;
    $: message = "";
    export let data;
    let user = data?.user;
  
  
    async function handleSubmit(event: any) {

        
      authenticating = true;
      event.preventDefault();
      try {
        await apiFetch(true, "/resetpassword/reset/email", "POST", {email: email}).then((res) => {
        if (res) {
            authenticating = false;
        
            if (res.code == 200) {
              notificationMessage = "Un email a été envoyé à votre adresse";
              notificationType = "success";
              showNotification = true;
                setTimeout(() => {
                    window.location.href = "/site/connexion";
                }, 3000);
             
            } else {
              message = res.message;
              notificationMessage = res.message;
              notificationType = "error";
              showNotification = true;
            }
        }
      });
      
        authenticating = false;
      } catch (error) {
        authenticating = false;
        message = "Une erreur est survenue";
      }
    }

</script>

<Header user={user}></Header>

<Sub_header titre="Mot de passe oublié" subTitles={[{ title: "Réinitialisez votre mot de passse", link: "/new_site/reset_password" }]}></Sub_header>


<section class="py-50">
    <div class="container">
        <div class="row justify-content-center g-0">
            <div class="col-lg-4 col-md-4 col-12">
                <div class="box box-body mb-0">
                    <div class="content-top-agile pb-0 pt-20">
                        <h2 class="text-primary">Récupérer le mot de passe</h2>							
                    </div>
                    <div class="p-40">
                        <form  on:submit|preventDefault={handleSubmit}>
                            <div class="form-group">
                                <div class="input-group mb-15">
                                    <span class="input-group-text bg-transparent"><i class="fa fa-envelope"></i></span>
                                    <input  bind:value={email} type="email" class="form-control ps-15 bg-transparent" placeholder="Votre Email">
                                </div>
                            </div>
                              <div class="row">
                                <div class="col-12 text-center">
                                 <!--  <button type="submit" class="btn btn-info w-p100 mt-15">Soumettre</button> -->
                                <button disabled={authenticating } type="submit" class="btn btn-info w-p100 mt-15">{authenticating ? "Soumettre..." : "Soumettre"}</button>
                                </div>
                              </div>
                        </form>	<br>
                        {#if authenticating == false && message !== ""}
                        <div
                                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                role="alert"
                        >
                          <strong class="font-bold">Oups erreur!</strong>
                          <span class="block sm:inline">{message}</span>
                        </div>
                      {/if}
                      {#if authenticating == false && notificationMessage !== ""}
                        <div
                                class="bg-green-500 border border-green text-black px-4 py-3 rounded relative"
                                role="alert"
                        >
                          <strong class="font-bold">Bravo!</strong>
                          <span class="block sm:inline">{notificationMessage}</span>
                        </div>
                      {/if}	
                    </div>
                </div>		
            </div>
        </div>
    </div>
</section>	
<Footer></Footer>

