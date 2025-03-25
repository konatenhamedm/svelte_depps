<script lang="ts">
  import { onMount } from "svelte";
  import type { StatsDashboard } from "../../types";
  import { apiFetch } from "$lib/api";

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

  // Date et heure
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  let currentTime = currentDate.toLocaleTimeString('fr-FR');

  async function fetchInitialData() {
    loading = true;
    try {
      const [statsRes, proRes, etabRes] = await Promise.all([
        apiFetch(true, "/statistique/info-dashboard"),
        apiFetch(true, "/professionnel/"),
        apiFetch(true, "/etablissement/")
      ]);

      if (statsRes) main_data = statsRes.data;
      if (proRes) {
        professionnels = proRes.data || [];
        professionnelsAjour = professionnels.filter(p => p.personne?.status === 'a_jour');
      }
      if (etabRes) etablissements = etabRes.data || [];
    } catch (error) {
      console.error("Erreur de chargement:", error);
    } finally {
      loading = false;
    }
  }

  function handleCardClick(type: 'professionnel' | 'etablissement' | 'pro') {
    activeTab = type;
    currentPage = 1;
  }

  onMount(async () => {
    await fetchInitialData();

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
      <!-- Carte Visites -->
      <div class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col">
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-gray-500">Visite total</div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div class="text-xs text-gray-400 mt-1">ce mois</div>
        <div class="text-lg font-semibold mt-2 text-blue-500">5</div>
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

      <!-- Carte Tous les professionnels -->
      <button
              on:click={() => handleCardClick('professionnel')}
              class={`text-left bg-white rounded-lg shadow p-4 border transition-all flex flex-col
          ${activeTab === 'professionnel' ? 'border-blue-500' : 'border-gray-100 hover:border-blue-300'}`}
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-gray-500">Professionnel(s)</div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div class="text-xs text-gray-400 mt-1">total</div>
        <div class="text-lg font-semibold mt-2 text-blue-500">{professionnels.length}</div>
      </button>

      <!-- Carte Etablissements -->
      <button
              on:click={() => handleCardClick('etablissement')}
              class={`text-left bg-white rounded-lg shadow p-4 border transition-all flex flex-col
          ${activeTab === 'etablissement' ? 'border-blue-500' : 'border-gray-100 hover:border-blue-300'}`}
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-gray-500">Etablissement(s)</div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div class="text-xs text-gray-400 mt-1">total</div>
        <div class="text-lg font-semibold mt-2 text-blue-500">{etablissements.length}</div>
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
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each professionnels.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as item}
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.nom ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.prenoms ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.number ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.email ?? 'N/A'}</td>
              </tr>
            {:else}
              <tr>
                <td colspan="4" class="px-4 py-3 text-center text-sm text-gray-500">Aucun professionnel trouvé</td>
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
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each etablissements.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as item}
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.username ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.adresse ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.number ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.email ?? 'N/A'}</td>
              </tr>
            {:else}
              <tr>
                <td colspan="4" class="px-4 py-3 text-center text-sm text-gray-500">Aucun établissement trouvé</td>
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
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each professionnelsAjour.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as item}
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.nom ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.prenoms ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.number ?? 'N/A'}</td>
                <td class="px-4 py-3 whitespace-nowrap text-sm">{item.personne?.email ?? 'N/A'}</td>
              </tr>
            {:else}
              <tr>
                <td colspan="4" class="px-4 py-3 text-center text-sm text-gray-500">Aucun professionnel à jour trouvé</td>
              </tr>
            {/each}
            </tbody>
          </table>
        {/if}
      {/if}
    </div>

    <!-- Pagination -->
    {#if (activeTab === 'professionnel' && professionnels.length > itemsPerPage) ||
    (activeTab === 'etablissement' && etablissements.length > itemsPerPage) ||
    (activeTab === 'pro' && professionnelsAjour.length > itemsPerPage)}
      <div class="flex justify-center mt-4">
        {#each Array(Math.ceil(
                activeTab === 'professionnel' ? professionnels.length/itemsPerPage :
                        activeTab === 'etablissement' ? etablissements.length/itemsPerPage :
                                professionnelsAjour.length/itemsPerPage
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

<style lang="postcss">
  .card-container {
    min-height: 120px;
    display: flex;
    flex-direction: column;
  }
</style>