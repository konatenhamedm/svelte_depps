<script>
    import Footer from "$components/Footer.svelte";
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import {onMount} from "svelte";
    import {apiFetch} from "$lib/api";

    let payments = [];
    let currentPage = 1;
    let itemsPerPage = 5;
    let totalPages = 1;
    let loading = true;

    async function fetchPayments() {
        try {
            const data = await apiFetch(true,"/paiement/historique");
            payments = data.data.map(p => ({
                username: p.user.username,
                email: p.user.email,
                montant: p.montant + " FCFA",
                reference: p.reference,
                channel: p.channel
            }));
            totalPages = Math.ceil(payments.length / itemsPerPage);
        } catch (error) {
            console.error("Erreur lors de la récupération des paiements:", error);
        } finally {
            loading = false;
        }
    }

    onMount(fetchPayments);

    $: paginatedPayments = payments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
    }

    function prevPage() {
        if (currentPage > 1) currentPage--;
    }

    function goToPage(page) {
        currentPage = page;
    }
</script>

<Header/>
<Slide/>

<div class="max-w-[125rem] mx-auto p-6 history">
    <h1 class="text-2xl font-bold text-blue-500 mb-6">HISTORIQUE DE PAIEMENT</h1>

    {#if loading}
        <p>Chargement des données...</p>
    {:else}
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase">Utilisateur</th>
                        <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase">Email</th>
                        <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase">Montant</th>
                        <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase">Référence</th>
                        <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase">Canal</th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    {#each paginatedPayments as payment}
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 text-lg text-gray-900">{payment.username}</td>
                            <td class="px-6 py-4 text-lg text-gray-900">{payment.email}</td>
                            <td class="px-6 py-4 text-lg text-gray-900">{payment.montant}</td>
                            <td class="px-6 py-4 text-lg text-gray-900">{payment.reference}</td>
                            <td class="px-6 py-4 text-lg text-gray-900">{payment.channel}</td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>

            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
                <p class="text-sm text-gray-700">
                    Affichage de {Math.min((currentPage - 1) * itemsPerPage + 1, payments.length)}
                    à {Math.min(currentPage * itemsPerPage, payments.length)} sur {payments.length} résultats
                </p>
                <div class="flex space-x-2">
                    <button on:click={prevPage} disabled={currentPage === 1} class="pagination-btn">Précédent</button>
                    {#each Array(totalPages) as _, i}
                        <button on:click={() => goToPage(i + 1)}
                                class="pagination-btn {currentPage === i + 1 ? 'active' : ''}">{i + 1}</button>
                    {/each}
                    <button on:click={nextPage} disabled={currentPage === totalPages} class="pagination-btn">Suivant
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>

<Footer/>

<style>
    .history {
        margin-top: 130px;
        margin-bottom: 130px;
    }

    .pagination-btn {
        padding: 8px 12px;
        border: 1px solid gray;
        background: white;
        cursor: pointer;
        border-radius: 5px;
        color:black !important;
    }

    .pagination-btn.active {
        background: blue;
        color: white !important;
    }

    .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
