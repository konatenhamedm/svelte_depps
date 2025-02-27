<script>

    import AddForumPopup from "./AddForumPopup.svelte";
    import EditForumPopup from "./EditForumPopup.svelte";
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import Footer from "$components/Footer.svelte";

    let forums = [
        {id: 1, title: 'Forum 1', content: 'Contenu du forum 1', status: 'Actif'},
        {id: 2, title: 'Forum 2', content: 'Contenu du forum 2', status: 'Inactif'},
        // Ajoutez plus de forums ici
    ];

    export let data;
    let user = data?.user;

    let currentPage = 1;
    const itemsPerPage = 5;
    let showAddPopup = false;
    let showEditPopup = false;
    let selectedForum = null;

    // Calcul des forums paginés
    $: paginatedForums = forums.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calcul du nombre total de pages
    $: totalPages = Math.ceil(forums.length / itemsPerPage);

    // Fonction pour changer de page
    function goToPage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    // Fonctions pour gérer les popups
    function openAddPopup() {
        showAddPopup = true;
    }

    function closeAddPopup() {
        showAddPopup = false;
    }

    function openEditPopup(forum) {
        selectedForum = forum;
        showEditPopup = true;
    }

    function closeEditPopup() {
        showEditPopup = false;
        selectedForum = null;
    }

    function addForum(newForum) {
        forums = [...forums, {...newForum, id: forums.length + 1}];
    }

    function updateForum(updatedForum) {
        forums = forums.map((f) => (f.id === updatedForum.id ? updatedForum : f));
    }
</script>
<div id="">
    <Header {user} />
    <Slide {user} />
    <div class="container mx-auto p-4 main-div">
        <!-- Boutons en haut du tableau -->
        <div class="flex justify-between mb-4">
            <a href="forum/all-forums" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Accéder à tous les forums
            </a>
            <button on:click={openAddPopup} class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Ajouter
            </button>
        </div>

        <!-- Tableau -->
        <table class="min-w-full bg-white border border-gray-200">
            <thead>
            <tr class="bg-gray-100">
                <th class="py-2 px-4 border-b text-center">Contenu</th>
                <th class="py-2 px-4 border-b text-center">Status</th>
                <th class="py-2 px-4 border-b text-center">Titre</th>
                <th class="py-2 px-4 border-b text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {#each paginatedForums as forum}
                <tr class="hover:bg-gray-50">
                    <td class="py-2 px-4 border-b text-center">{forum.content}</td>
                    <td class="py-2 px-4 border-b text-center">
            <span class={`px-2 py-1 rounded ${forum.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {forum.status}
            </span>
                    </td>
                    <td class="py-2 px-4 border-b text-center">{forum.title}</td>
                    <td class="py-2 px-4 border-b text-center">
                        <!-- Bouton Modifier -->
                        <button on:click={() => openEditPopup(forum)} class="text-blue-500 hover:text-blue-700 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </button>

                        <!-- Bouton Supprimer -->
                        <button on:click={() => handleDelete(forum)} class="text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </td>
                </tr>
            {/each}
            </tbody>
        </table>

        <!-- Pagination avec icônes -->
        <div class="flex justify-end items-center mt-4">
            <button
                    on:click={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    class="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
            </button>

            <span class="mx-4 text-gray-700">{currentPage}</span>

            <button
                    on:click={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    class="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        <!-- Popup d'ajout -->
        <AddForumPopup bind:showPopup={showAddPopup} closePopup={closeAddPopup} on:submit={addForum} />

        <!-- Popup d'édition -->
        {#if selectedForum}
            <EditForumPopup bind:showPopup={showEditPopup} closePopup={closeEditPopup} forum={selectedForum} on:submit={updateForum} />
        {/if}
    </div>
    <Footer></Footer>
</div>

<style>
    .main-div {
        margin-top: 170px;
        margin-bottom: 150px;
        border: 1px solid #e5e7eb;
        background: white;
        border-radius: 10px;
        padding: 50px;
    }
</style>
