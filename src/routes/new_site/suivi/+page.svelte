<script lang="ts">
    import Header from "$components/_includes/new_site/Header.svelte";
    import Footer from "$components/_includes/new_site/Footer.svelte";
    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api";
    import { EyeOutline } from "flowbite-svelte-icons";
    import { goto } from "$app/navigation";
    import { formatDate } from "$lib/dateUtils.js";
    import Sub_header from "$components/_includes/new_site/Sub_header.svelte";

    let paiementData: any[] = [];

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
            /* const res = await apiFetch(true, `/ValidationWorkflow/47`); */
            const res = await apiFetch(
                true,
                `/ValidationWorkflow/${user.personneId}`
            );
            if (res) {
                paiementData = res.data;
                console.log("content main_data", paiementData);
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

    // Calcul des paiementData paginés
    $: paginatedpaiementData = paiementData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    let totalPages = 10;
    // Calcul du nombre total de pages
    $: totalPages = Math.ceil(paiementData.length / itemsPerPage);

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

    $: if (
        showAddPopup == false ||
        showEditPopup == false ||
        showDeletePopup == false
    ) {
        fetchData(user?.id);
    }

    function navigateToDashboard() {
        goto("/site/dashboard");
    }
</script>

<Header {user} />
<Sub_header
        titre="suivi dossiers"
        subTitles={[{ title: "suivi de dossier", link: "/new_site/suivi" }]}
/>
<br /><br />


<main class="container mx-auto px-4 py-8 md:py-12">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Liste des alertes</h2>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-green-500">
                <tr class="text-white">
                    <th class="px-3 py-3 text-left text-xs font-medium uppercase">#</th>
                    <th class="px-3 py-3 text-left text-xs font-medium uppercase">Nom complet</th>
                    <th class="px-3 py-3 text-left text-xs font-medium uppercase">Étape</th>
                    <th class="px-3 py-3 text-left text-xs font-medium uppercase">Date</th>
                    <th class="px-3 py-3 text-left text-xs font-medium uppercase">Motif</th>
                </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                {#if paginatedpaiementData.length > 0}
                    {#each paginatedpaiementData as item, index}
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-3 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td class="px-3 py-4">{item.personne.nom} {item.personne.prenoms}</td>
                            <td class="px-3 py-4">{item.etape}</td>
                            <td class="px-3 py-4">{formatDate(item.createdAt)}</td>
                            <td class="px-3 py-4">{item.raison}</td>
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
        {#if totalPages > 1}
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <!-- Desktop -->
                <div class="hidden sm:flex sm:items-center sm:justify-between w-full">
                    <div class="flex space-x-2">
                        <button on:click={() => goToPage(1)} disabled={currentPage === 1}
                                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50">Premier</button>

                        <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50">Précédent</button>

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
                                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50">Suivant</button>

                        <button on:click={() => goToPage(totalPages)} disabled={currentPage === totalPages}
                                class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50">Dernier</button>
                    </div>
                </div>

                <!-- Mobile -->
                <div class="flex justify-between items-center w-full sm:hidden">
                    <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                            class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50">Précédent</button>
                    <p>{currentPage} sur {totalPages}</p>
                    <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                            class="px-3 py-1 bg-gray-100 text-gray-700 rounded-md disabled:opacity-50">Suivant</button>
                </div>
            </div>
        {/if}
    </div>
</main>


<Footer />
