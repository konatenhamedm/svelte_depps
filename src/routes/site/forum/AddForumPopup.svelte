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
      /* const url = "https://depps.leadagro.net/api/alerte/create"; */

      await apiFetch(true, "/forum/create", "POST", newForum).then((res) => {
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
</script>

{#if showPopup}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-[43em] forum-con">
      <h2 class="text-xl font-bold mb-4">Ajouter un nouveau forum</h2>
      <form on:submit={handleSubmit}>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Titre</label>
          <input
            type="text"
            name="title"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Contenu</label>
          <textarea
            name="content"
            class="w-full px-3 py-2 border rounded"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Status</label>
          <select name="status" class="w-full px-3 py-2 border rounded">
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
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
              Ajouter
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
