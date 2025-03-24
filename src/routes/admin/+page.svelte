<script lang="ts">
  import { onMount } from "svelte";
  import type { StatsDashboard } from "../../types";
  import CardInfo from "$components/CardInfo.svelte";
  import { apiFetch } from "$lib/api";

  export let data; // Les données retournées par `load()`
  let user = data.user;

  // Données statistiques
  let dataEtablissement: number;
  let dataProfessionnel: number;
  let dataProfessionnelAjour: number;

  // Date et heure
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  let currentTime = currentDate.toLocaleTimeString('fr-FR');

  // Tableaux et pagination
  let main_data: StatsDashboard;
  let loading = false;
  let activeTab: 'professionnel' | 'etablissement' = 'professionnel';
  let currentPage = 1;
  const itemsPerPage = 10;
  let professionnels: any[] = [];
  let etablissements: any[] = [];

  // Fonction pour récupérer les données du dashboard
  async function fetchData() {
    loading = true;
    try {
      const res = await apiFetch(true, "/statistique/info-dashboard");
      if (res) {
        main_data = res['data'] as StatsDashboard;
        dataEtablissement = main_data.countEtablissement;
        dataProfessionnelAjour = main_data.professionnelAjour;
        dataProfessionnel = main_data.countProfessionnel;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      loading = false;
    }
  }

  // Fonction pour récupérer les professionnels
  async function fetchProfessionnels() {
    try {
      const res = await apiFetch(true, "/professionnel/");
      professionnels = res.data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des professionnels:", error);
    }
  }

  // Fonction pour récupérer les établissements
  async function fetchEtablissements() {
    try {
      const res = await apiFetch(true, "/etablissement/");
      etablissements = res.data || [];
    } catch (error) {
      console.error("Erreur lors de la récupération des établissements:", error);
    }
  }

  // Gestion du clic sur les cards
  function handleCardClick(type: 'professionnel' | 'etablissement') {
    activeTab = type;
    currentPage = 1;
    if (type === 'professionnel') fetchProfessionnels();
    else fetchEtablissements();
  }

  // Au montage du composant
  onMount(async () => {
    await fetchData();
    await fetchProfessionnels();

    // Mise à jour en temps réel de l'heure
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
    <!-- Grille des cartes statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
      <!-- Carte Date/Heure -->
      <CardInfo
              title={'Date & Heure'}
              descr={currentTime}
              valeur={formattedDate}
              bgColor="bg-red-500 text-white"
              class="card-container"
      />

      <!-- Carte Visites -->
      <CardInfo
              title={'Visite total'}
              descr={formattedDate}
              valeur={'5'}
              class="card-container"
      />

      <!-- Carte Professionnels à jour -->
      <CardInfo
              on:click={() => handleCardClick('professionnel')}
              title={'Professionnel(s) de santé'}
              descr={"à jour"}
              valeur={dataProfessionnelAjour}
              class="card-container cursor-pointer hover:shadow-lg transition-shadow"
              active={activeTab === 'professionnel'}
      />

      <!-- Carte Tous les professionnels -->
      <CardInfo
              on:click={() => handleCardClick('professionnel')}
              title={'Professionnel(s) de santé'}
              descr={"sur la plateforme"}
              valeur={dataProfessionnel}
              class="card-container cursor-pointer hover:shadow-lg transition-shadow"
              active={activeTab === 'professionnel'}
      />

      <!-- Carte Etablissements -->
      <CardInfo
              on:click={() => handleCardClick('etablissement')}
              title={'Etablissement(s) de santé'}
              descr={'sur la plateforme'}
              valeur={dataEtablissement}
              class="card-container cursor-pointer hover:shadow-lg transition-shadow"
              active={activeTab === 'etablissement'}
      />
    </div>

    <!-- Tableau de données -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      {#if loading}
        <div class="p-8 text-center">Chargement en cours...</div>
      {:else}
        {#if activeTab === 'professionnel'}
          <!-- Tableau des professionnels -->
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénoms</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each professionnels.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as item}
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nom}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.prenom}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.telephone}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
              </tr>
            {:else}
              <tr>
                <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">Aucun professionnel trouvé</td>
              </tr>
            {/each}
            </tbody>
          </table>
        {:else}
          <!-- Tableau des établissements -->
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            {#each etablissements.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage) as item}
              <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nom}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.adresse}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.telephone}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
              </tr>
            {:else}
              <tr>
                <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">Aucun établissement trouvé</td>
              </tr>
            {/each}
            </tbody>
          </table>
        {/if}
      {/if}
    </div>

    <!-- Pagination -->
    {#if (activeTab === 'professionnel' && professionnels.length > itemsPerPage) || (activeTab === 'etablissement' && etablissements.length > itemsPerPage)}
      <div class="flex justify-center mt-4">
        {#each Array(Math.ceil(activeTab === 'professionnel' ? professionnels.length/itemsPerPage : etablissements.length/itemsPerPage)) as _, i}
          <button
                  on:click={() => currentPage = i+1}
                  class={`mx-1 px-3 py-1 rounded ${currentPage === i+1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i+1}
          </button>
        {/each}
      </div>
    {/if}
  </section>
</div>

<style>
  .card-container {
    min-height: 120px;
    display: flex;
    flex-direction: column;
  }
</style>