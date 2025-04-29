<script lang="ts">
    import Header from "$components/_includes/new_site/Header.svelte";
    import Footer from "$components/_includes/new_site/Footer.svelte";
    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api";
    import Add from "./Add.svelte";
    import Edit from "./Edit.svelte";
    import { EyeOutline } from "flowbite-svelte-icons";
    import { goto } from "$app/navigation";
    import Delete from "./Delete.svelte";
    import Sub_header from "$components/_includes/new_site/Sub_header.svelte";

    let alertes: any[] = [];

    export let data;
    let user = data?.user;

    let currentPage = 1;
    const itemsPerPage = 3;
    let showAddPopup = false;
    let showEditPopup = false;
    let showDeletePopup = false;
    let selectedForum: any = null;
    let loading = false;

    async function fetchData(userId: number) {
        loading = true;
        try {
            const res = await apiFetch(true, `/alerte/get/all/Professionnel`);
            if (res) {
                alertes = res.data;
                console.log("content main_data", alertes);
            } else {
                console.error("Erreur de récupération:", res.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        await fetchData(user?.id);
    });

    // Calcul des alertes paginés
    $: paginatedalertes = alertes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calcul du nombre total de pages
    export let totalPages = 10;

    // Calcul du nombre total de pages
    $: totalPages = Math.ceil(alertes.length / itemsPerPage);

    // Fonction pour changer de page
    function goToPage(page: any) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }


    function getPageNumbers() {
        let pages = [];
        if (totalPages <= 7) {
            // Affiche toutes les pages si <= 7 pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 3) pages.push(1, '...');
            for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...', totalPages);
        }
        return pages;
    }

    // Fonctions pour gérer les popups
    function openAddPopup() {
        showAddPopup = true;
    }

    function closeAddPopup() {
        showAddPopup = false;
    }

    function openEditPopup(forum: any) {
        selectedForum = forum;
        showEditPopup = true;
    }

    function openDeletePopup(forum: any) {
        selectedForum = forum;
        showDeletePopup = true;
    }

    function closeEditPopup() {
        showEditPopup = false;
        selectedForum = null;
    }

    function closeDeletePopup() {
        showDeletePopup = false;
        selectedForum = null;
    }

    function addForum(newForum: any) {
        alertes = [...alertes, { ...newForum, id: alertes.length + 1 }];
    }

    function updateForum(updatedForum: any) {
        alertes = alertes.map((f) => (f.id === updatedForum.id ? updatedForum : f));
    }

    $: if (showAddPopup == false || showEditPopup == false || showDeletePopup == false) {
        fetchData(user?.id);
    }

    function navigateToDashboard() {
        goto("/site/dashboard");
    }
</script>

<Header {user} />
<Sub_header titre="Alertes" subTitles={[{ title: "Alertes", link: "/new_site/alertes" }]}></Sub_header>



<main class="container mx-auto px-4 py-8 md:py-12">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center justify-between">
            <h2 class="text-xl font-semibold text-gray-800">Liste des alertes</h2>

            <button on:click={openAddPopup} class="buton buton--kirmizi flex items-center gap-2">
                <small>ENVOYER UNE ALERTE</small> <i class="fa fa-plus"></i>
            </button>
        </div><br>


        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-green-500">
                <tr class="text-white text-left text-xs uppercase">
                    <th class="px-4 py-3">#</th>
                    <th class="px-4 py-3">Objet</th>
                    <th class="px-4 py-3">Message</th>
                    <th class="px-4 py-3">Destinataire</th>
                    <th class="px-4 py-3">Actions</th>
                </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                {#if paginatedalertes.length > 0}
                    {#each paginatedalertes as forum, index}
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-4 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td class="px-4 py-3">{forum.objet}</td>
                            <td class="px-4 py-3">{forum.message}</td>
                            <td class="px-4 py-3">{forum?.destinateur?.libelle}</td>
                            <td class="px-4 py-3 flex space-x-2">
                                <button on:click={() => openEditPopup(forum)} class="bg-green-500 hover:bg-green-600 text-white p-2 rounded">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button on:click={() => openDeletePopup(forum)} class="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td colspan="5" class="px-6 py-10 text-center text-gray-500 bg-gray-50">
                            Aucune alerte pour l'instant
                        </td>
                    </tr>
                {/if}
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        {#if alertes.length > itemsPerPage}
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="flex space-x-2">
                    <button on:click={() => goToPage(1)} disabled={currentPage === 1}
                            class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50">
                        Premier
                    </button>
                    <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                            class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50">
                        Précédent
                    </button>

                    {#each getPageNumbers() as page}
                        {#if page === '...'}
                            <span class="px-3 py-1 text-gray-400">...</span>
                        {:else}
                            <button
                                    class={`px-3 py-1 rounded-md ${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                                    on:click={() => goToPage(page)}
                            >
                                {page}
                            </button>
                        {/if}
                    {/each}

                    <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                            class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50">
                        Suivant
                    </button>
                    <button on:click={() => goToPage(totalPages)} disabled={currentPage === totalPages}
                            class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50">
                        Dernier
                    </button>
                </div>
            </div>
        {/if}
    </div>
</main>

<Add
        {data}
        bind:showPopup={showAddPopup}
        closePopup={closeAddPopup}
        on:submit={addForum}
/>

<!-- Popup d'édition -->
{#if selectedForum}
    <Edit
            {data}
            bind:showPopup={showEditPopup}
            closePopup={closeEditPopup}
            forum={selectedForum}
            on:submit={updateForum}
    />

    <Delete
            {data}
            bind:showPopup={showDeletePopup}
            closePopup={closeDeletePopup}
            forum={selectedForum}
            on:submit={updateForum}
    />
{/if}

<Footer />
