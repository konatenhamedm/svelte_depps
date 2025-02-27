<script>

    export let showPopup = false;
    export let closePopup;
    export let forum = {}; // Forum à éditer

    export let data;
    let user = data?.user;
    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedForum = {
            ...forum,
            title: formData.get('title'),
            content: formData.get('content'),
            status: formData.get('status'),
        };
        console.log('Forum mis à jour :', updatedForum);
        closePopup();
    }
</script>

{#if showPopup}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 class="text-xl font-bold mb-4">Modifier le forum</h2>
            <form on:submit={handleSubmit}>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Titre</label>
                    <input type="text" name="title" value={forum.title} class="w-full px-3 py-2 border rounded" required />
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Contenu</label>
                    <textarea name="content" class="w-full px-3 py-2 border rounded" required>{forum.content}</textarea>
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
                    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
