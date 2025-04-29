<script lang="ts">
    import Header from "$components/_includes/new_site/Header.svelte";
    import Footer from "$components/_includes/new_site/Footer.svelte";
    import Sub_header from "$components/_includes/new_site/Sub_header.svelte";
    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api";
    import { goto } from "$app/navigation";

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
            const res = await apiFetch(true, `/paiement/historique/${userId}`);
            if (res) {
                paiementData = res.data;
                console.log("Données récupérées :", paiementData);
            } else {
                console.error("Erreur de récupération:", res.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        if (user?.id) fetchData(user.id);
    });

    // Pagination calculée
    $: paginatedData = paiementData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    $: totalPages = Math.ceil(paiementData.length / itemsPerPage);

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) currentPage = page;
    }

    function getPageNumbers() {
        let pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage > 3) pages.push(1, '...');
            for (
                let i = Math.max(1, currentPage - 2);
                i <= Math.min(totalPages, currentPage + 2);
                i++
            ) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...', totalPages);
        }
        return pages;
    }

    function openAddPopup() {
        showAddPopup = true;
    }

    function closeAddPopup() {
        showAddPopup = false;
        fetchData(user?.id);
    }

    function openEditPopup(forum: any) {
        selectedForum = forum;
        showEditPopup = true;
    }

    function closeEditPopup() {
        showEditPopup = false;
        selectedForum = null;
        fetchData(user?.id);
    }

    function openDeletePopup(forum: any) {
        selectedForum = forum;
        showDeletePopup = true;
    }

    function closeDeletePopup() {
        showDeletePopup = false;
        selectedForum = null;
        fetchData(user?.id);
    }

    function addForum(newForum: any) {
        paiementData = [...paiementData, { ...newForum, id: paiementData.length + 1 }];
    }

    function updateForum(updatedForum: any) {
        paiementData = paiementData.map((f) => (f.id === updatedForum.id ? updatedForum : f));
    }

    function navigateToDashboard() {
        goto("/site/dashboard");
    }
</script>

<Header {user} />
<br /><br />
<Sub_header
        titre="Historique de paiement"
        subTitles={[{ title: "Historique de paiement", link: "/new_site/paiements" }]}
/>
<br /><br />

<main class="container mx-auto px-4 py-8 md:py-12">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Liste des paiements</h2><br><br>
        </div>

        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-green-500">
                <tr style="color: white !important;">
                    <th class="px-3 py-3 text-left text-xs font-medium  uppercase">#</th>
                    <th class="px-3 py-3 text-left text-xs font-medium  uppercase">Email</th>
                    <th class="px-3 py-3 text-left text-xs font-medium  uppercase">Montant</th>
                    <th class="px-3 py-3 text-left text-xs font-medium  uppercase">Référence</th>
                    <th class="px-3 py-3 text-left text-xs font-medium  uppercase">Méthode</th>
                </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                {#if paginatedData.length > 0}
                    {#each paginatedData as item, index}
                        <tr class="hover:bg-gray-50 transition-colors">
                            <td class="px-3 py-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td class="px-3 py-4">{item.user.email}</td>
                            <td class="px-3 py-4">{item.montant}</td>
                            <td class="px-3 py-4">{item.reference}</td>
                            <td class="px-3 py-4">
                                  <span class={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${item.channel === 'Carte bancaire' ? 'bg-green-100 text-green-800' : ''}
                                    ${item.channel === 'PayPal' ? 'bg-blue-100 text-blue-800' : ''}
                                    ${item.channel === 'Virement' ? 'bg-purple-100 text-purple-800' : ''}`}>
                                    {item.channel}
                                  </span>
                            </td>

                        </tr>
                    {/each}
                {:else}
                    <tr>
                        <td colspan="6" class="px-6 py-10 text-center text-gray-500 bg-gray-50">
                            <p>Aucune transaction trouvée</p>
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
                    </div>
                </div>

                <!-- Mobile -->
                <div class="flex justify-between items-center w-full sm:hidden">
                    <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                        Précédent
                    </button>
                    <p>{currentPage} sur {totalPages}</p>
                    <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                        Suivant
                    </button>
                </div>
            </div>
        {/if}
    </div>
</main>

<Footer />
