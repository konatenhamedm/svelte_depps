<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { apiFetch, BASE_URL_API, BASE_URL_API_UPLOAD } from "$lib/api";
  import Spinner from "$components/_skeletons/Spinner.svelte";
  export let data; // Les données retournées par `load()`

  
import { goto } from '$app/navigation';

async function logout() {
    await fetch('/auth/logout', { method: 'POST' });
    goto('/site/connexion'); // Redirection après déconnexion
}
  let user = data.user;

  let showModal = false;

  function confirmUpdate() {
    showModal = true;
  }

  function cancelUpdate() {
    showModal = false;
  }

  async function proceedUpdate() {
    showModal = false;
    await updateUser();
  }

  let user_data = {
    username: "",
    email: "",
    avatar: null as File | null, // Mieux vaut `null` que `""`
    password: "",
    newPassword: ""
  };

  let message = "";
  let cpte = 0;
  let avatarPreview =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  function handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      user_data.avatar = file;
      avatarPreview = URL.createObjectURL(file);
    }
  }
  let authenticating = false;
  async function updateUser() {
    authenticating = true;
    const formData = new FormData();
    formData.append("username", user_data.username);
    formData.append("email", user_data.email);
    formData.append("password", user_data.password);
    formData.append("newPassword", user_data.newPassword);

    if (user_data.avatar instanceof File) {
      // Vérifie que c'est bien un fichier
      formData.append("avatar", user_data.avatar);
    }

    formData.append("userUpdate", user?.id);

    try {
      fetch(BASE_URL_API + "/user/profil/update/" + user?.id, {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then(async (result) => {
          authenticating = false;
          if (result.errors && Object.keys(result.errors).length > 0) {
            authenticating = false;
            message = result.errors;

            cpte = cpte + 1;
          } else {
            message = "Votre enregistrement a bien été modifié avec succès!";
             await logout();
          }

          setTimeout(() => {
            message = ""; // Efface le message après 3 secondes
          }, 8000);
        })
        .catch((error) => {
          message = "Erreur : Échec de la modification.";
          authenticating = false;
        });
    } catch (error) {
      message = "Erreur de connexion au serveur.";
      authenticating = false;
    }
  }

  onMount(async () => {
    try {
      const result = await apiFetch(true, "/user/get/one/" + user?.id);

      if (result) {
        user_data.email = result.data.email;
        user_data.username = result.data.username;

    
      } else {
        message = `Erreur : ${result.message || "Échec de la modification."}`;
      }
    } catch (error) {
      console.log(error);
    }
    avatarPreview = user?.avatar
      ? BASE_URL_API_UPLOAD + user?.avatar
      : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";
  });

  function navigateToDashboard() {
    goto("/site/dashboard");
  }
</script>

<Header />
<Slide />

<!-- <section class="text-center pb-0 " style="padding-top:142px;">
  <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk "> Informations & Accès</h2>

</section> -->

<div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4" style="margin-bottom: 100px;">
  <button on:click={navigateToDashboard} class="flex items-center hover:text-blue-600">
    <!-- Icône SVG pour "Tableau de bord" -->
    <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
    >
      <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
      />
    </svg>
    Tableau de bord
  </button>
  <span>/</span>
  <span class="text-gray-800">Profil</span> <!-- Nom de la page actuelle -->
</div><br>

<main style="padding-top: 320px">
  <section class="iletisim-form-alani">
    <div class="tablo">
      <div class="tablo--1-ve-2">
        <!-- <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
         
        </h2> -->
        <form
        on:submit|preventDefault={confirmUpdate}
          class="form update_customer"
        >
          <div>
            <div class="dropify-wrapper">
              <input
                type="file"
                name="avatar"
                accept="image/*,application/pdf"
                on:change={handleFileUpload}
                class="hidden-input dropify"
              />
              <img src={avatarPreview} alt="Avatar" class="dropify-preview" />
            </div>
          </div>
          <br /><br />

          <div class="tablos flex grid grid-cols-1">
            <!--  <div> -->
            <div class="form__grup">
              <label class="form__label">Nom utilisateur</label>
              <input
                disabled
                type="text"
                class="form__input"
                bind:value={user_data.email}
                placeholder="Nom utilisateur"
              />
            </div>
          </div>
          <div class="tablos flex grid grid-cols-2">
            <!--  <div> -->
            <div class="form__grup">
              <label class="form__label">Ancien mot de passe</label>
              <input
                type="text"
                class="form__input"
                bind:value={user_data.password}
                placeholder="Nom utilisateur"
              />
            </div>
            <!--  </div> -->
            <div>
              <div class="form__grup">
                <label class="form__label">Nouveau mot de passe</label>
                <input
                  type="password"
                  class="form__input"
                  bind:value={user_data.newPassword}
                  placeholder="Mot de passe"
                />
              </div>
            </div>
          </div>

          <div class="form__grup">
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
                  <div>MODIFIER</div>
                </div>
              {:else}
                MODIFIER
              {/if}
            </button>

            <br />
            <br />

            {#if message !== "" && cpte > 0}
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Oups erreur!</strong>
                <span class="block sm:inline">{message}</span>
              </div>
            {:else if message !== ""}
              <div
                class="bg-red-100 border border-gray-400 text-black px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Success!</strong>
                <span class="block sm:inline">{message}</span>
              </div>
            {/if}

            <br />

         <!--    <a
              href="paiements"
              class="buton buton--kirmizi text-center"
              style="width:100%; background:black">HISTORIQUE DE PAIEMENT</a
            > -->
          </div>
        </form>
      </div>
    </div>
  </section>
</main>

<Footer />
{#if showModal}
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Confirmation</h2><br>
      <p><strong>Êtes-vous sûr de vouloir modifier vos informations car vous serez deconnecté apres la modification ?</strong> </p>
      <div class="modal-buttons">
        <button class="buton buton--kirmizi" on:click={proceedUpdate}>Oui, Modifier</button>
        <button class="buton buton--gris" on:click={cancelUpdate}>Annuler</button>
      </div>
    </div>
  </div>
{/if}


<style>
  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.buton--gris {
  background: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
  .form__grup {
    margin-bottom: 15px;
  }
  .buton {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  .dropify-preview {
    display: block;
    margin-top: 10px;
  }

  .dropify-wrapper {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    border:1px solid gray;
  }

  .dropify-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  .hidden-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

    .file-ariane {
    position: absolute;
    width: 100%;
    top: 112px;
    background: #4292cecc;
    padding: 22px;
    color: white;
    font-size: 14px;
  }

  .file-ariane span {
    color: white;
  }
</style>
