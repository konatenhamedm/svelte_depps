<script lang="ts">
  import { apiFetch, BASE_URL_API } from "$lib/api";
  import { onMount } from "svelte";

  export let showPopup = false;
  export let closePopup: any;
  let recipients: any = [];

  export let forum = {}; // Forum à éditer

  export let data;
  let loading = false;

  let user = data?.user;
  async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedForum = {
      ...forum,
      objet: formData.get("objet"),
      message: formData.get("message"),
      destinateur: formData.get("destinateur"),
      userUpdate: user.id,
      user: forum.user.id
    };

    try {
      /* const url = "https://depps.leadagro.net/api/alerte/create"; */

      console.log(updatedForum);

      await apiFetch(
        true,
        "/alerte/update/" + forum?.id,
        "POST",
        updatedForum
      ).then((res) => {
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

    console.log(forum);
  });
</script>

{#if showPopup}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-[43em] forum-con">
      <h2 class="text-xl font-bold mb-4">Modifier le forum</h2>
      <form on:submit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Objet</label>
          <input
            type="text"
            name="objet"
            value={forum.objet}
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            class="w-full px-3 py-2 border rounded"
            required>{forum.message}</textarea
          >
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Destinateur</label>
          <!--  <select name="destinateur" class="w-full px-3 py-2 border rounded">
                        <option value="Actif" selected={forum.status === 'Actif'}>Actif</option>
                        <option value="Inactif" selected={forum.status === 'Inactif'}>Inactif</option>
                    </select> -->

          <select class="w-full px-3 py-2 border rounded" name="destinateur">
            {#each recipients as recipient}
              <option
                value={recipient.id}
                selected={forum.destinateur.id === recipient.id}
                >{recipient.libelle}</option
              >
            {/each}
          </select>
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            on:click={closePopup}
            class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
          >
            Annuler
          </button>
          {#if loading}
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
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
            <button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Modifier
            </button>
          {/if}
        </div>
      </form>
    </div>
  </div>
{/if}
