<script lang="ts">
    import { goto } from "$app/navigation";
    import Notification from "$components/_includes/Notification.svelte";
    import Spinner from "$components/_skeletons/Spinner.svelte";
    import Footer from "$components/Footer.svelte";
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import { apiFetch } from "$lib/api.js";
    import { loginloginUserFront } from "$lib/auth";
  
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
  
  <div id="">
    <Header {user} />
    <Slide {user} />
    <section class="text-center pb-0 " style="padding-top:142px;">
      <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk ">Reinitialisation de mot de passe</h2>
    </section>
    <main style="padding-top:250px;padding-bottom:142px;" class="bg-white">
      <section class="iletisim-form-alani" style="background-color: white !important">
        <div class="tablo">
          <div
                  class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow animated"
                  style="visibility: visible;"
          >
            <form
                    on:submit|preventDefault={handleSubmit}
                    class="form login_customerh"
            >
              <div class="grid grid-cols-1 gap-4">
                <div class="form__grup">
                  <label for="email" class="form_label">E-mail</label>
                  <input
                          type="text"
                          bind:value={email}
                          class="form__input"
                          style="width:100%"
                          placeholder="E-mail"
                          id="txt_isim"
                          name="login"
                  />
                </div>
              </div>
  
              <div class="form__grup">
                <br />
                <button
                        class="buton buton--kirmizi"
                        style="width:100%"
                        id="login_customers"
                >
                  {#if authenticating}
                    <div class="grid grid-cols-3">
                      <div class="col-span-1">
                        <Spinner />
                      </div>
                      <div>SOUMETTRE</div>
                    </div>
                  {:else}
                  SOUMETTRE
                  {/if}
                </button>
              </div>
              <br />
  
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
            </form>
          </div>
        </div>
      </section>
    </main>
  
    <style>
      .footerss p {
        display: flex;
        flex-wrap: wrap;
        justify-content: start !important;
        align-items: start !important;
      }
      h2.h2-baslik-footer.h-yazi-margin-kucuk,
      .footer__list,
      .footer__sosyal {
        display: flex;
        flex-wrap: wrap;
        justify-content: start !important;
        align-items: start !important;
      }
    </style>
    <Footer />
  </div>
  
  {#if showNotification}
    <Notification
            message={notificationMessage}
            type={notificationType}
            duration={5000}
    />
  {/if}
  
  <style>
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  
    svg.h-5.w-5.text-gray-500.s-P4zVNG06VzHr {
      margin-top: 25px !important;
    }
  </style>