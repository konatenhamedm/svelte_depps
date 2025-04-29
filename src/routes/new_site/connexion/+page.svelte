<script lang="ts">
  import Sub_header from '$components/_includes/new_site/Sub_header.svelte';
  import Header from "$components/_includes/new_site/Header.svelte";
  import Footer from "$components/_includes/new_site/Footer.svelte";
  import { onMount } from "svelte";
  import { loginloginUserFront } from '$lib/auth.js';

  export let data;
  let user = data?.user;

  let showPassword = false; // State to toggle password visibility

  onMount(() => {
    if (!window.location.href.includes('reloaded=true')) {
      window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'reloaded=true';
    }
  });

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  let username = "";
  let password = "";
  let authenticating = false;
  $: message = "";



  async function handleSubmit(event: any) {
    authenticating = true;
    event.preventDefault();
    try {
      const success = await loginloginUserFront(username, password);

      if (success.token != null) {
        window.location.href = "/new_site/dashboard";
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

<Header user={user}></Header>

<Sub_header titre="Connexion" subTitles={[{ title: "connectez vous", link: "/new_site/connexion" }]}></Sub_header>

<section class="py-50">
  <div class="container">
    <div class="row justify-content-center g-0">
      <div class="col-lg-4 col-md-4 col-12">
        <div class="box box-body">
          <div class="content-top-agile pb-0 pt-20 justify-center">
            <h2 class="text-primary">Connectez-vous</h2>
            <p class="mb-0 item-center justify-center" style="text-align:center !important">
                Connectez-vous pour continuer vers votre espace.
            </p>
          </div>
          <div class="p-40">
            <form   on:submit|preventDefault={handleSubmit}>
              <div class="form-group">
                <div class="input-group mb-15">
                  <span class="input-group-text bg-transparent"><i class="fa fa-user"></i></span>
                  <input  bind:value={username} type="text" class="form-control ps-15 bg-transparent" placeholder="E-mail">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group mb-15">
                  <span class="input-group-text bg-transparent"><i class="fa fa-lock"></i></span>
                  <input  bind:value={password}
                    type={showPassword ? "text" : "password"}
                    class="form-control ps-15 bg-transparent"
                    placeholder="Mot de passe"
                  >
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    on:click={() => (showPassword = !showPassword)}
                    style="border: none; background: transparent; cursor: pointer;"
                    aria-label="Toggle password visibility"
                  >
                    <i class={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <!-- <div class="checkbox ms-5">
                    <input type="checkbox" id="basic_checkbox_1">
                    <label for="basic_checkbox_1" class="form-label">Remember Me</label>
                  </div> -->
                </div>
                <div class="col-6">
                  <div class="fog-pwd text-end">
                    <a href="/new_site/reset_password" class="hover-warning"><i class="fa fa-locked"></i> Mot de passe oublié ?</a><br>
                  </div>
                </div>
                <div class="col-12 text-center">
                  <button disabled={authenticating } type="submit" class="btn btn-info w-p100 mt-15">{authenticating ? "CONNEXION..." : "SE CONNECTER"}</button>
                </div>
              </div>
            </form><br><br>
            
            {#if authenticating == false && message !== ""}
              <div
                      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      role="alert"
              >
                <strong class="font-bold">Oups erreur!</strong>
                <span class="block sm:inline">{message}</span>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<Footer></Footer>

<style>
  input.form-control.ps-15.bg-transparent {
    width: 90%;
  }

  button.btn.btn-outline-secondary.s-KuO4HJeldt-u {
    position: absolute;
    right: 0;
  }

  .btn-outline-secondary:hover {
    background: none !important;
    color: black;
    background-color: #6c757d;
    border-color: #6c757d;
    box-shadow: none !important;
  }

  button.btn.btn-outline-secondary.s-KuO4HJeldt-u {
    border-style: none !important;
  }
</style>
