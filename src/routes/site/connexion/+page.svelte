<script lang="ts">
  import { goto } from "$app/navigation";
  import Notification from "$components/_includes/Notification.svelte";
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { login, loginUserFront } from "$lib/auth";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  let username = "";
  let password = "";
  let authenticating = false;
  let showPassword = false; // To toggle password visibility
  let message = "";
  let error = "";

  let passwordWarning = "";
  let isPasswordValid = false;

  async function handleSubmit(event: any) {
    authenticating = true;
    event.preventDefault();
    try {
      const success = await loginUserFront(username, password);

      if (success.token != null) {
        
        window.location.href = "/site/dashboard";
        /* goto(`http://localhost:5173/site/dashboard`); */
      } else {
        message = "Veuillez vérifier vos identifiants";
        authenticating = false;
      }
      authenticating = false;
    } catch (error) {
      authenticating = false;
      message = "Une erreur est survenue";
    }
  }
</script>

<div
  id="pointer-ring"
  style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(308px, 648px);"
></div>
<div
  id="pointer-dot"
  style="border-color: rgb(113, 88, 190); transform: translate(333px, 673px);"
></div>
<div id="">
  <Header />
  <Slide />
  <main style="padding-top:200px">
    <!--İletişim Form Alanı-->
    <section class="iletisim-form-alani">
      <div class="tablo">
        <div
          class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow animated"
          style="visibility: visible;"
        >
          <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">Connexion</h2>
          <form
            on:submit|preventDefault={handleSubmit}
            class="form login_customerh"
          >
          <!--   <input
              name="token"
              value="2ab526b357c8673cc0d716c6898de772e274bc93412f7c60044d360d7d4a497e43fcd594a96add98"
              type="hidden"
            /> -->
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
            <div class="form__grup">
              <label for="password" class="form_label">Mot de passe</label>
              <input
                type="password"
                bind:value={password}
                class="form__input"
                style="width:100%"
                placeholder="Mot de passe"
                id="txt_eposta"
                name="password"
              />
            </div>
            <!--<div class="g-recaptcha" data-sitekey="6LfdUvcUAAAAAOtLHGqdBIbmdxkTAidF5rRxPtGd"></div><br>-->
            <div class="form__grup">
              <br />
              <button
                class="buton buton--kirmizi"
                style="width:100%"
                id="login_customers">SE CONNECTER</button
              >
            </div>
            <br />

            {#if !authenticating && message !== ""}
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
<style>
	@keyframes spin {
	  from {
		transform: rotate(0deg);
	  }
	  to {
		transform: rotate(360deg);
	  }
	}
  </style>
  
  {#if showNotification}
	<Notification message={notificationMessage} type={notificationType} duration={5000} />
  {/if}
  