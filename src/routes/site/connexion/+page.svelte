<script lang="ts">
  import { goto } from "$app/navigation";
  import Notification from "$components/_includes/Notification.svelte";
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { loginloginUserFront } from "$lib/auth";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  let username = "";
  let password = "";
  let authenticating = false;
  let showPassword = false;
  $: message = "";
  export let data;
  let user = data?.user;


  async function handleSubmit(event: any) {
    authenticating = true;
    event.preventDefault();
    try {
      const success = await loginloginUserFront(username, password);

      if (success.token != null) {
        window.location.href = "/site/dashboard";
      } else {
        message = "Veuillez vérifier vos identifiants";
        notificationMessage = "Veuillez vérifier vos identifiants";
        showNotification = true;

        setTimeout(() => {
          message = "";
        }, 3000);
      }
      authenticating = false;
    } catch (error) {
      authenticating = false;
      message = "Une erreur est survenue";
    }
  }

  function redirectToForgotPassword() {
    window.location.href = "/site/connexion/reset_password";
  }
</script>

<div id="">
  <Header {user} />
  <Slide {user} />
  <section class="text-center pb-0 " style="padding-top:142px;">
    <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk ">Connexion</h2>
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
                        bind:value={username}
                        class="form__input"
                        style="width:100%"
                        placeholder="E-mail"
                        id="txt_isim"
                        name="login"
                />
              </div>
              <div class="form__grup relative">
                <label for="password" class="form_label">Mot de passe</label>
                <input
                        type={showPassword ? 'text' : 'password'}
                        bind:value={password}
                        class="form__input w-full" style="width:100%"
                        placeholder="Mot de passe"
                        id="txt_eposta"
                        name="password"
                />
                <button
                        type="button"
                        on:click={() => showPassword = !showPassword}
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {#if showPassword}
                    <svg class="h-7 w-7 mt-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0l-3.59-3.59" />
                    </svg>
                  {:else}
                    <svg class="h-7 w-7 mt-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  {/if}
                </button>
              </div>

              <!-- Lien Mot de passe oublié -->
              <div class="text-right">
                <a
                        href="/site/connexion/mot_de_passe_oublie"
                        class="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        on:click|preventDefault={redirectToForgotPassword}
                >
                  Mot de passe oublié ?
                </a>
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
                    <div>SE CONNECTER</div>
                  </div>
                {:else}
                  SE CONNECTER
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