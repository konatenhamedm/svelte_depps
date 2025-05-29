<script lang="ts">
    import { onMount } from "svelte";
    import type { StatsDashboard } from "../../types";
    import { apiFetch } from "$lib/api";
    import Pdf from "$components/pdf/Pdf.svelte";
    import {getAuthCookie} from "$lib/auth";

    export let data;
    let user = data.user;

    // Données réactives
    let main_data: StatsDashboard | null = null;
    let loading = false;
    let activeTab: 'professionnel' | 'etablissement' | 'pro' = 'professionnel';
    let currentPage = 1;
    const itemsPerPage = 10;
    let professionnels: any[] = [];
    let professionnelsAjour: any[] = [];
    let etablissements: any[] = [];
    let professions: any[] = [];
    let selectedProfession: string = '';
    let filteredProfessionnels: any[] = [];
    let filteredProfessionnelsAjour: any[] = [];
    let filteredEtablissements: any[] = [];

    // Stats pour les cards
    let stats = {
        attente: 0,
        accepte: 0,
        rejete: 0,
        valide: 0,
        refuse: 0
    };

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
            if (user && user.type && user.id) {
                const response = await apiFetch(
                    true,
                    `/statistique/info-dashboard/by/typeuser/${user.type}/${user.id}`
                );

                if (response && response.data) {
                    stats = {
                        ...stats,
                        ...response.data
                    };
                }
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des stats:", error);
        }
    }

    async function fetchInitialData() {
        loading = true;
        try {
            // Récupérer les stats en premier
            await fetchStats();

            const [proRes, etabRes, profRes] = await Promise.all([
                apiFetch(true, "/professionnel/"),
                apiFetch(true, "/professionnel/"),
                apiFetch(true, "/profession/")
            ]);

            if (proRes) {
                console.log("Professionnels:", proRes.data);
                // Filtrer par imputation = userId
                professionnels = (proRes.data || []).filter(p => p.imputation === user.id);
                professionnelsAjour = professionnels.filter(p => p.personne?.status === 'a_jour');
            }
            if (etabRes) {
                // Filtrer par imputation = userId
                etablissements = (etabRes.data || []).filter(e => e.imputation === user.id);
            }
            if (profRes) {
                console.log("Professions reçues:", profRes.data);
                professions = profRes.data || [];
                if (professions.length > 0) {
                    console.log("Structure d'une profession:", JSON.stringify(professions[0], null, 2));
                }
            }

            updateFilteredData();
        } catch (error) {
            console.error("Erreur de chargement:", error);
        } finally {
            loading = false;
        }
    }

    function updateFilteredData() {
        console.log("Mise à jour des données filtrées avec profession:", selectedProfession);

        if (!selectedProfession || selectedProfession === '') {
            filteredProfessionnels = professionnels;
            filteredProfessionnelsAjour = professionnelsAjour;
            filteredEtablissements = etablissements;
        } else {
            filteredProfessionnels = professionnels.filter(p => {
                if (!p.personne || !p.personne.profession) return false;
                return String(p.personne.profession.id) === String(selectedProfession);
            });

            filteredProfessionnelsAjour = professionnelsAjour.filter(p => {
                if (!p.personne || !p.personne.profession) return false;
                return String(p.personne.profession.id) === String(selectedProfession);
            });

            filteredEtablissements = etablissements.filter(e => {
                if (!e.personne || !e.personne.profession) return false;
                return String(e.personne.profession.id) === String(selectedProfession);
            });
        }
    }

    function handleProfessionChange(event) {
        selectedProfession = event.target.value;
        updateFilteredData();
        currentPage = 1;
    }

    function handleCardClick(type: 'professionnel' | 'etablissement' | 'pro') {
        activeTab = type;
        currentPage = 1;
        updateFilteredData();
    }

    onMount(() => {
        fetchInitialData();

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
            <!-- Carte Dossiers en attente -->
            <div class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium text-gray-500">Dossiers en attente</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div class="text-xs text-gray-400 mt-1">Statistique actuelle</div>
                <div class="text-lg font-semibold mt-2 text-blue-500">{stats.attente}</div>
            </div>

            <!-- Carte Dossiers acceptés -->
            <div class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium text-gray-500">Dossiers acceptés</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="text-xs text-gray-400 mt-1">Statistique actuelle</div>
                <div class="text-lg font-semibold mt-2 text-green-500">{stats.accepte}</div>
            </div>

            <!-- Carte Dossiers rejetés -->
            <div class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col">
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium text-gray-500">Dossiers rejetés</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div class="text-xs text-gray-400 mt-1">Statistique actuelle</div>
                <div class="text-lg font-semibold mt-2 text-red-500">{stats.rejete}</div>
            </div>

            <!-- Carte Professionnels à jour -->
            <button
                    on:click={() => handleCardClick('pro')}
                    class={`text-left bg-white rounded-lg shadow p-4 border transition-all flex flex-col
                ${activeTab === 'pro' ? 'border-blue-500' : 'border-gray-100 hover:border-blue-300'}`}
            >
                <div class="flex items-center justify-between">
                    <div class="text-sm font-medium text-gray-500">Professionnel(s)</div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <div class="text-xs text-gray-400 mt-1">à jour</div>
                <div class="text-lg font-semibold mt-2 text-blue-500">{professionnelsAjour.length}</div>
            </button>

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

        <!-- Tableau de données -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <div class="flex justify-between items-center p-4">
                <!-- Sélecteur de profession -->
                <div class="w-64">
                    <label for="profession" class="block text-sm font-medium text-gray-700 mb-1">Filtrer par profession</label>
                    <select
                            id="profession"
                            class="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            on:change={handleProfessionChange}
                    >
                        <option value="">Toutes les professions</option>
                        {#each professions as profession}
                            <option value={profession.id}>{profession.libelle}</option>
                        {/each}
                    </select>
                </div>

                <!-- Bouton PDF -->
                <Pdf
                        title={activeTab === 'professionnel' ? (selectedProfession ? `Liste des professionnels - ${professions.find(p => p.id === selectedProfession)?.libelle || ''}` : 'Liste des professionnels') :
                    activeTab === 'etablissement' ? (selectedProfession ? `Liste des établissements - ${professions.find(p => p.id === selectedProfession)?.libelle || ''}` : 'Liste des établissements') :
                    (selectedProfession ? `Liste des professionnels à jour - ${professions.find(p => p.id === selectedProfession)?.libelle || ''}` : 'Liste des professionnels à jour')}
                        headers={activeTab === 'professionnel' || activeTab === 'pro' ?
                    ['Nom', 'Prénoms', 'Téléphone', 'Email', 'Profession'] :
                    ['Nom', 'Adresse', 'Téléphone', 'Email', 'Profession']}
                        data={activeTab === 'professionnel' ? filteredProfessionnels :
                    activeTab === 'etablissement' ? filteredEtablissements :
                    filteredProfessionnelsAjour}
                        type={activeTab}
                />
            </div>

            <!-- Tableau -->
            {#if loading}
                <div class="p-8 text-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Chargement en cours...
                </div>
            {:else}
                {#if activeTab === 'professionnel'}
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Prénoms</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Profession</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        {#each filteredProfessionnels.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as item}
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.nom ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.prenoms ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.number ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.email ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.profession?.libelle ?? 'N/A'}</td>
                            </tr>
                        {:else}
                            <tr>
                                <td colspan="5" class="px-4 py-3 text-center text-sm text-gray-500">Aucun professionnel trouvé</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                {:else if activeTab === 'etablissement'}
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Adresse</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Profession</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        {#each filteredEtablissements.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as item}
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.username ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.adresse ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.number ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.email ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.profession?.libelle ?? 'N/A'}</td>
                            </tr>
                        {:else}
                            <tr>
                                <td colspan="5" class="px-4 py-3 text-center text-sm text-gray-500">Aucun établissement trouvé</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                {:else if activeTab === 'pro'}
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Prénoms</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Profession</th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        {#each filteredProfessionnelsAjour.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as item}
                            <tr class="hover:bg-gray-50">
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.nom ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.prenoms ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.number ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.email ?? 'N/A'}</td>
                                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.profession?.libelle ?? 'N/A'}</td>
                            </tr>
                        {:else}
                            <tr>
                                <td colspan="5" class="px-4 py-3 text-center text-sm text-gray-500">Aucun professionnel à jour trouvé</td>
                            </tr>
                        {/each}
                        </tbody>
                    </table>
                {/if}
            {/if}
        </div>

        <!-- Pagination -->
        {#if (activeTab === 'professionnel' && filteredProfessionnels.length > itemsPerPage) ||
        (activeTab === 'etablissement' && filteredEtablissements.length > itemsPerPage) ||
        (activeTab === 'pro' && filteredProfessionnelsAjour.length > itemsPerPage)}
            <div class="flex justify-center mt-4">
                {#each Array(Math.ceil(
                    activeTab === 'professionnel' ? filteredProfessionnels.length/itemsPerPage :
                        activeTab === 'etablissement' ? filteredEtablissements.length/itemsPerPage :
                            filteredProfessionnelsAjour.length/itemsPerPage
                )) as _, i}
                    <button
                            on:click={() => currentPage = i+1}
                            class={`mx-1 px-3 py-1 text-sm rounded ${currentPage === i+1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                        {i+1}
                    </button>
                {/each}
            </div>
        {/if}
    </section>
</div>
<style>

</style>