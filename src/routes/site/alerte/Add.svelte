<script lang="ts">
  import { apiFetch, BASE_URL_API, BASE_URL_API_V2 } from "$lib/api";
  import { onMount } from "svelte";

  export let showPopup = false;
  export let closePopup: any;

  export let data;
  let user = data?.user;
  let recipients: any = [];

  let loading = false;

  async function handleSubmit(event: any) {
    loading = true;

    const formData = new FormData(event.target);

    const newForum = {
      destinateur: formData.get("destinateur"),
      message: formData.get("message"),
      objet: formData.get("objet"),
      user: user.id,
      userUpdate: user.id
    };

    loading = true;
    try {
      /* const url = "https://app.mydepps.net/api/alerte/create"; */

      await apiFetch(true, "/alerte/create", "POST", newForum).then((res) => {
        if (res) {
          loading = false;
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

  async function getDestinataire() {
    try {
      const response = await fetch(BASE_URL_API + "/destinateur");
      if (!response.ok) {
        throw new Error("Échec de la récupération des destinataires");
      }
      const data = await response.json();
      recipients = data.data;
      console.log("content recipient", recipients);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  onMount(() => {
    getDestinataire();
  });
</script>

{#if showPopup}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-[65em] forum-con">
      <h2 class="text-xl font-bold mb-4 border-b-2 mb-2">
        Ajouter un nouveau forum
      </h2>
      <form on:submit={handleSubmit}>
        <div class="mb-4">
          <div class="form__grup my-2 w-full">
            <label for="name" class="form__label">Destinataire</label>
            <select name="destinateur" class="form__input w-full" id="">
              {#each recipients as recipient}
                <option value={recipient.id}>{recipient.libelle}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="mb-4">
          <div class="form__grup" style="margin-top:10px">
            <label for="name" class="form__label">Objet</label>
            <input
              type="text"
              class="form__input w-full"
              required
              placeholder="Objet"
              id="txt_eposta"
              name="objet"
            />
          </div>
        </div>

        <div class="mb-4">
          <div class="form__grup">
            <br />
            <label for="name" class="form__label">Message</label>
            <textarea
              rows="3"
              cols="66"
              required
              maxlength="90"
              name="message"
              id="txt_mesaj"
              placeholder="alerte message"
              class="form__input w-full"
            ></textarea>
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
              ENVOYER L'ALERTE
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
