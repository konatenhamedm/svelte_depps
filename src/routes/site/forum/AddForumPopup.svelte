<script lang="ts">
  import { apiFetch } from "$lib/api";

  export let showPopup = false;
  export let closePopup: any;
  let loading = false;

  export let data;
  let user = data?.user;

  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newForum = {
      titre: formData.get("title"),
      contenu: formData.get("content"),
      status: formData.get("status"),
      user: user.id
    };

    loading = true;
    try {
      /* const url = "https://app.mydepps.net/api/alerte/create"; */

      await apiFetch(true, "/forum/create", "POST", newForum).then((res) => {
        if (res) {
          loading = false;
          window.location.reload();
          closePopup();
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      loading = false;
      closePopup();
    } finally {
      loading = false;
    }
  }
</script>

{#if showPopup}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-[65em] forum-con">
      <h2 class="text-xl font-bold mb-4 border-b-2 mb-2">Ajouter un nouveau forum</h2>
      <form on:submit={handleSubmit}>

        <div class="mb-4">
          <div class="form__grup" style="margin-top:10px">
            <label for="name" class="form__label">Titre</label>
            <input
              type="text"
              class="form__input w-full"
              required
              placeholder="Titre"
              id="txt_eposta"
              name="title"
            />
          </div>
        </div>
        <div class="mb-4">
          <div class="form__grup" style="margin-top:10px">
            <label for="name" class="form__label">Contenu</label>
            <textarea rows="5" cols="66"   name="content" id="txt_mesaj" placeholder="Text de l'article" class="form__input w-full"></textarea>

          </div>
        </div>

        <div class="mb-4">
          <div class="form__grup my-2 w-full">
            <label for="name" class="form__label">Status</label>
            <select name="status" class="form__input w-full" id="">
              <option value="Actif">Actif</option>
              <option value="Inactif">Inactif</option>
            </select>
          </div>
        </div>

    
       
        <div class="flex justify-end">
          <button
            type="button"
            on:click={closePopup}
            class="bg-gray-500 text-white buton buton--kirmizi mr-2"
          >
            Annuler
          </button><br />
          {#if loading}
            <button type="submit" class="bg-green-500 buton buton--kirmizi">
              <div class="flex flex-row gap-2">
                <div
                  class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"
                ></div>
                <div
                  class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"
                ></div>
                <div
                  class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"
                ></div>
              </div>
            </button>
          {:else}
            <button type="submit" class="bg-green-500 buton buton--kirmizi">
             PUBLIER
            </button>
          {/if}
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  .forum-con {
    margin-top: 140px;
  }
</style>
