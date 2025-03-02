<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { apiFetch, BASE_URL_API, BASE_URL_API_UPLOAD } from "$lib/api";
  import Spinner from "$components/_skeletons/Spinner.svelte";
  export let data; // Les données retournées par `load()`
  let user = data.user;

  let user_data = {
    username: "",
    email: "",
    avatar: null as File | null, // Mieux vaut `null` que `""`
    password: ""
  };

  let message = "";
  let cpte = 0;
  let avatarPreview =
    "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

  function handleFileUpload(event:any) {
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

    if (user_data.avatar instanceof File) {
      // Vérifie que c'est bien un fichier
      formData.append("avatar", user_data.avatar);
    }

    formData.append("userUpdate", user?.id);

    try {
      fetch(BASE_URL_API + "/user/profil/update/"+user?.id, {
        method: "POST",
        body: formData
      })
        .then((response) => response.json())
        .then((result) => {
          authenticating = false;
          if (result.errors && Object.keys(result.errors).length > 0) {
            authenticating = false;
            message = result.errors;

            cpte = cpte + 1;
          } else {
            message = "Modification réussie !";
          }

          setTimeout(() => {
          message = ""; // Efface le message après 3 secondes
        }, 3000);
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
      const result = await apiFetch(true, "/user/get/one/" + user?.id );

      if (result) {
        user_data.email = result.data.email;
        user_data.username = result.data.username;

        
        
      } else {
        
        message = `Erreur : ${result.message || "Échec de la modification."}`;
      }
    } catch (error) {
      console.log(error);
    }
    avatarPreview =user?.avatar ? BASE_URL_API_UPLOAD + user?.avatar : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg';
  });
</script>

<Header />
<Slide />

<main style="padding-top: 200px">
  <section class="iletisim-form-alani">
    <div class="tablo">
      <div class="tablo--1-ve-2">
        <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
          Informations & Accès
        </h2>
        <form
          on:submit|preventDefault={updateUser}
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
                <img
                  src={avatarPreview}
                  alt="Avatar"
                  class="dropify-preview"
                />
              </div>
          </div>
          <br /><br />

          <div class="tablos flex grid grid-cols-2">
            <!--  <div> -->
            <div class="form__grup">
              <label class="form__label">Nom utilisateur</label>
              <input
                type="text"
                class="form__input"
                bind:value={user_data.email}
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
                  bind:value={user_data.password}
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

            <br>
            <br>

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
                class="bg-red-100 border border-green-400 text-green-400 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Success!</strong>
                <span class="block sm:inline">{message}</span>
              </div>
            {/if}

            <br />

            <a
              href="paiements"
              class="buton buton--kirmizi text-center"
              style="width:100%; background:black">HISTORIQUE DE PAIEMENT</a
            >
          </div>
        </form>
      </div>
    </div>
  </section>
</main>

<Footer />

<style>
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
</style>
