<script lang="ts">
    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api";
    import { formatDate } from "$lib/dateUtils";
    import { formatAmount } from "$lib/formatAmount";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";

    export let data;
    let user = data.user;

    // Données pour les cartes
    let stats = {
        montantTotal: 0,
        nombreSuccess: 0,
        nombreFail: 0,
        toDayTransactionFail: 0,
        toDayTransactionSuccess: 0
    };

    // Données pour la liste des transactions
    let transactions: any[] = [];
    let loading = false;
    let openShow = false;
    let current_data: any = {};

    // Date et heure
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    let currentTime = currentDate.toLocaleTimeString('fr-FR');

    async function fetchStats() {
        try {
            loading = true;
            const response = await apiFetch(
                true,
                `/statistique/info-dashboard/by/typeuser/${user.type}/${user.id}`
            );

            if (response && response.data) {
                stats = {
                    montantTotal: response.data.montantTotal || 0,
                    nombreSuccess: response.data.nombreSuccess || 0,
                    nombreFail: response.data.nombreFail || 0,
                    toDayTransactionFail: response.data.toDayTransactionFail || 0,
                    toDayTransactionSuccess: response.data.toDayTransactionSuccess || 0
                };
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des stats:", error);
        } finally {
            loading = false;
        }
    }

    async function fetchTransactions() {
        try {
            loading = true;
            const res = await apiFetch(true, "/paiement/historique");
            if (res) {
                // Prendre les 10 dernières transactions triées par date décroissante
                transactions = (res.data || [])
                    .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 10);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des transactions:", error);
        } finally {
            loading = false;
        }
    }

    function getBgColor(color: number): string {
        switch (color) {
            case 1:
                return "bg-success border-success";
            case 0:
                return "bg-danger border-danger";
            default:
                return "bg-gray-300";
        }
    }

    function getStatus(status: number): string {
        switch (status) {
            case 1:
                return "Paiement effectué";
            case 0:
                return "Paiement échoué";
            default:
                return "Inconnu";
        }
    }



    onMount(() => {
        fetchStats();
        fetchTransactions();

        const timer = setInterval(() => {
            const now = new Date();
            currentTime = now.toLocaleTimeString('fr-FR');
            formattedDate = now.toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            });
        }, 1000);

        return () => clearInterval(timer);
    });
</script>

<div class="p-4">
    <section class="content">
        <!-- Grille des cartes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <!-- Carte Montant Total -->
            <div class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium text-gray-500">Montant Total</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="text-xs text-gray-400 mt-1">Cumul des transactions</div>
                <div class="text-lg font-semibold mt-2 text-green-500">{stats.montantTotal.toLocaleString('fr-FR')} FCFA</div>
            </div>

            <!-- Carte Transactions réussies -->
            <div class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium text-gray-500">Transactions réussies</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="text-xs text-gray-400 mt-1">Total historique</div>
                <div class="text-lg font-semibold mt-2 text-blue-500">{stats.nombreSuccess}</div>
            </div>

            <!-- Carte Transactions échouées -->
            <div class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium text-gray-500">Transactions échouées</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="text-xs text-gray-400 mt-1">Total historique</div>
                <div class="text-lg font-semibold mt-2 text-red-500">{stats.nombreFail}</div>
            </div>

            <!-- Carte Transactions réussies aujourd'hui -->
            <div class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium text-gray-500">Réussies aujourd'hui</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="text-xs text-gray-400 mt-1">Ce jour</div>
                <div class="text-lg font-semibold mt-2 text-green-500">{stats.toDayTransactionSuccess}</div>
            </div>

            <!-- Carte Date/Heure -->
            <div class="bg-blue-500 text-white rounded-lg shadow p-4 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium">Date & Heure</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div class="text-xs opacity-90 mt-1">à {currentTime}</div>
                <div class="text-lg font-semibold mt-2">{formattedDate}</div>
            </div>
        </div>

        <!-- Liste des 10 dernières transactions -->
        <div class="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div class="p-4 border-b border-gray-200">
                <h3 class="text-lg font-medium text-gray-900">10 dernières transactions</h3>
            </div>

            <Table class="border border-gray-300">
                <TableHead class="border-y border-gray-200 bg-gray-100 dark:border-gray-700">
                    {#each ["Reference", "Type", "Email", "Etat paiement", "Montant", "Date"] as title}
                        <TableHeadCell class="ps-4 font-normal border border-gray-300">{title}</TableHeadCell>
                    {/each}
                </TableHead>
                <TableBody>
                    {#if loading && transactions.length === 0}
                        <TableBodyRow class="border border-gray-300">
                            <TableBodyCell colspan={7} class="text-center items-center p-4 text-gray-500 border border-gray-300">
                                <div class="flex flex-row gap-2 items-center justify-center">
                                    <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
                                    <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
                                    <div class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
                                </div>
                            </TableBodyCell>
                        </TableBodyRow>
                    {:else if transactions.length === 0}
                        <TableBodyRow class="border border-gray-300">
                            <TableBodyCell colspan={7} class="text-center items-center p-4 text-gray-500 border border-gray-300">
                                <div class="flex flex-row items-center justify-center">
                                    <div class="grid grid-cols-1">
                                        <img src="/search_notfound.svg" alt="Aucune transaction trouvée" /><br />
                                        <h1 class="text-2xl font-bold">Aucune transaction</h1>
                                    </div>
                                </div>
                            </TableBodyCell>
                        </TableBodyRow>
                    {:else}
                        {#each transactions as item}
                            <TableBodyRow class="text-base border border-gray-300">
                                <TableBodyCell class="p-4 border border-gray-300">{item.reference}</TableBodyCell>
                                <TableBodyCell class="p-4 border border-gray-300">{item.type}</TableBodyCell>
                                <TableBodyCell class="p-4 border border-gray-300">{item.user.email}</TableBodyCell>
                                <TableBodyCell class="p-4 border border-gray-300">
                                    <span class={`py-[0.1875rem] px-[0.8125rem] text-xs rounded-[1.25rem] text-white w-[77px] leading-[1.5] ${getBgColor(item.state)}`}>
                                        {getStatus(item.state)}
                                    </span>
                                </TableBodyCell>
                                <TableBodyCell class="p-4 border border-gray-300 justify-end text-right">
                                    {formatAmount(parseInt(item.montant, 10))}
                                </TableBodyCell>
                                <TableBodyCell class="p-4 border border-gray-300">
                                    {formatDate(item.createdAt)}
                                </TableBodyCell>
                               <!-- <TableBodyCell class="p-2 w-8 border border-gray-300">
                                    <DropdownOnlyShow {item} onAction={handleAction} />
                                </TableBodyCell>-->
                            </TableBodyRow>
                        {/each}
                    {/if}
                </TableBody>
            </Table>
        </div>
    </section>
</div>

<!-- Modal pour voir les détails d'une transaction -->

<style>
    .content {
        max-width: 1200px;
        margin: 0 auto;
    }
</style>