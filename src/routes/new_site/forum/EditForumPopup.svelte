<script lang="ts">
  import { apiFetch } from "$lib/api";


    export let showPopup = false;
    export let closePopup: any;

    interface Forum {
      id: number;
      titre: string;
      contenu: string;
      status: string;
    }
    
    export let forum: Forum = []; // Forum à éditer

    export let data;
    let loading = false;
    let user = data?.user;
    async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedForum = {
      ...forum,
      titre: formData.get("title"),
      contenu: formData.get("content"),
      status: formData.get("status"),
      user: user.id
    };
 
    loading = true;
    try {
      /* const url = "https://prodmydepps.leadagro.net/api/alerte/create"; */

      await apiFetch(true, "/forum/update/" +forum?.id, "POST", updatedForum).then((res) => {
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
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-[43em] forum-con">
            <h2 class="text-xl font-bold mb-4">Modifier le forum</h2>
            <form on:submit={handleSubmit}>
                
        <div class="mb-4">
          <div class="form__grup" style="margin-top:10px">
            <label for="name" class="form__label">Titre</label>
            <input
              type="text"
              class="form__input w-full"
              required
              value={forum.titre}
              placeholder="Titre"
              id="txt_eposta"
              name="titre"
            />
          </div>
        </div>
        <div class="mb-4">
          <div class="form__grup" style="margin-top:10px">
            <label for="name" class="form__label">Contenu</label>
            <textarea rows="5" cols="66"  value={forum.contenu} maxlength="90" name="contenu" id="txt_mesaj" placeholder="Text de l'article" class="form__input w-full"></textarea>

          </div>
        </div>

        <div class="mb-4">
          <div class="form__grup my-2 w-full">
            <label for="name" class="form__label">Status</label>
            <select name="destinateur" class="form__input w-full" id="">
              <option value="Actif" selected={forum.status === 'Actif'}>Actif</option>
              <option value="Inactif" selected={forum.status === 'Inactif'}>Inactif</option>
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
              
              
              
              
              
              
              
              
              
              
              <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Titre</label>
                    <input type="text" name="title" value={forum.titre} class="w-full px-3 py-2 border rounded" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Contenu</label>
                    <textarea name="content" class="w-full px-3 py-2 border rounded" required>{forum.contenu}</textarea>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Status</label>
                    <select name="status" class="w-full px-3 py-2 border rounded">
                        <option value="Actif" selected={forum.status === 'Actif'}>Actif</option>
                        <option value="Inactif" selected={forum.status === 'Inactif'}>Inactif</option>
                    </select>
                </div>
                <div class="flex justify-end">
                    <button type="button" on:click={closePopup} class="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600">
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
