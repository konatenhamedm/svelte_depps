<script lang="ts">
  import {onMount} from 'svelte';
  import {apiFetch} from '$lib/api';
  import {formatDate} from '$lib/dateUtils';
  import {formatAmount} from '$lib/formatAmount';
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from 'flowbite-svelte';
  import Pdf from '$components/pdf/Pdf.svelte';
  import Pagination from '$components/_includes/Pagination.svelte';

  export let data;
  let user = data.user;
  let professionnels: any[] = [];
  let activeTab: 'professionnel' | 'etablissement' | 'pro' = 'professionnel';
  let professionnelsAjour: any[] = [];
  let etablissements: any[] = [];
  let professions: any[] = [];
  let selectedProfession: string = '';
  let filteredProfessionnels: any[] = [];
  let filteredProfessionnelsAjour: any[] = [];
  let filteredEtablissements: any[] = [];
  let currentPage = 1;
  const itemsPerPage = 10;
  let main_data: null = null;

  // Données pour les cartes
  let stats = {
    montantTotal: 0,
    nombreSuccess: 0,
    nombreFail: 0,
    toDayTransactionFail: 0,
    toDayTransactionSuccess: 0,
  };

  // Données pour la liste des transactions
  let loading = false;

  async function fetchInitialData() {
    loading = true;
    try {
      const [statsRes, proRes, etabRes, profRes] = await Promise.all([
        apiFetch(true, '/statistique/info-dashboard'),
        apiFetch(true, '/professionnel/'),
        apiFetch(true, '/professionnel/'),
        apiFetch(true, '/profession/'),
      ]);

      if (statsRes) main_data = statsRes.data;
      if (proRes) {
        console.log('Professionnels:', proRes.data);
        professionnels = proRes.data || [];
        professionnelsAjour = professionnels.filter(
          (p) => p.personne?.status === 'a_jour'
        );
      }
      if (etabRes) etablissements = etabRes.data || [];
      if (profRes) {
        console.log('Professions reçues:', profRes.data);
        professions = profRes.data || [];
        // Log pour vérifier la structure des professions
        if (professions.length > 0) {
          console.log(
            "Structure d'une profession:",
            JSON.stringify(professions[0], null, 2)
          );
        }
      }

      // On initialise les données filtrées après avoir chargé toutes les données
      updateFilteredData();
    } catch (error) {
      console.error('Erreur de chargement:', error);
    } finally {
      loading = false;
    }
  }

  function updateFilteredData() {
    if (professionnels.length > 0) {
      console.log(
        "Structure d'un professionnel:",
        JSON.stringify(professionnels[0], null, 2)
      );
    }

    if (!selectedProfession || selectedProfession === '') {
      // Aucun filtre sélectionné
      filteredProfessionnels = professionnels;
      filteredProfessionnelsAjour = professionnelsAjour;
      filteredEtablissements = etablissements;
      console.log(
        'Aucun filtre - tous les professionnels:',
        professionnels.length
      );
    } else {
      console.log('Recherche de la profession avec ID:', selectedProfession);

      // Filtrage adapté à la structure exacte des données
      filteredProfessionnels = professionnels.filter((p) => {
        if (!p.personne) return false;
        if (!p.personne.profession) return false;

        // Convertir en string pour garantir la correspondance du type
        const profId = String(p.personne.profession.id);
        const selectedId = String(selectedProfession);

        console.log(
          `Comparaison: ${profId} === ${selectedId}`,
          profId === selectedId
        );
        return profId === selectedId;
      });

      filteredProfessionnelsAjour = professionnelsAjour.filter((p) => {
        if (!p.personne || !p.personne.profession) return false;
        return String(p.personne.profession.id) === String(selectedProfession);
      });

      filteredEtablissements = etablissements.filter((e) => {
        if (!e.personne || !e.personne.profession) return false;
        return String(e.personne.profession.id) === String(selectedProfession);
      });
    }
  }

  function handleProfessionChange(event) {
    selectedProfession = event.target.value;
    console.log(
      'Nouvelle profession sélectionnée (valeur brute):',
      event.target.value
    );
    console.log(
      'Nouvelle profession sélectionnée (après affectation):',
      selectedProfession
    );

    // Vérifier si l'élément sélectionné existe dans la liste des professions
    const professionFound = professions.find(
      (p) => String(p.id) === String(selectedProfession)
    );

    updateFilteredData();
    currentPage = 1; // Réinitialiser à la première page après filtrage
  }

  // Date et heure
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
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
          toDayTransactionSuccess: response.data.toDayTransactionSuccess || 0,
        };
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    fetchStats();
    fetchInitialData();

    const timer = setInterval(() => {
      const now = new Date();
      currentTime = now.toLocaleTimeString('fr-FR');
      formattedDate = now.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    }, 1000);

    return () => clearInterval(timer);
  });

  let totalPages = 1;

  $: totalPages =
    activeTab === 'professionnel'
      ? Math.ceil(filteredProfessionnels.length / itemsPerPage)
      : activeTab === 'etablissement'
        ? Math.ceil(filteredEtablissements.length / itemsPerPage)
        : Math.ceil(filteredProfessionnelsAjour.length / itemsPerPage);

  function handlePageChange(event: CustomEvent<number>) {
    currentPage = event.detail;
  }

  $: startRange = currentPage;
  $: endRange = Math.min(currentPage + itemsPerPage, totalPages);
</script>

<div class="p-4">
  <section class="content">
    <!-- Grille des cartes -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <!-- Carte Montant Total -->
      <div
        class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-gray-500">Montant Total</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-xs text-gray-400 mt-1">Cumul des transactions</div>
        <div class="text-lg font-semibold mt-2 text-green-500">
          {stats.montantTotal.toLocaleString('fr-FR')} FCFA
        </div>
      </div>

      <!-- Carte Transactions réussies -->
      <div
        class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-gray-500">
            Transactions réussies
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-xs text-gray-400 mt-1">Total historique</div>
        <div class="text-lg font-semibold mt-2 text-blue-500">
          {stats.nombreSuccess}
        </div>
      </div>

      <!-- Carte Transactions échouées -->
      <div
        class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-gray-500">
            Transactions échouées
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-xs text-gray-400 mt-1">Total historique</div>
        <div class="text-lg font-semibold mt-2 text-red-500">
          {stats.nombreFail}
        </div>
      </div>

      <!-- Carte Transactions réussies aujourd'hui -->
      <div
        class="bg-white rounded-lg shadow p-4 border border-gray-100 flex flex-col"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium text-gray-500">
            Réussies aujourd'hui
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div class="text-xs text-gray-400 mt-1">Ce jour</div>
        <div class="text-lg font-semibold mt-2 text-green-500">
          {stats.toDayTransactionSuccess}
        </div>
      </div>

      <!-- Carte Date/Heure -->
      <div class="bg-blue-500 text-white rounded-lg shadow p-4 flex flex-col">
        <div class="flex items-center justify-between">
          <div class="text-sm font-medium">Date & Heure</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-xs opacity-90 mt-1">à {currentTime}</div>
        <div class="text-lg font-semibold mt-2">{formattedDate}</div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="flex justify-between items-center p-4">
        <div class="w-64">
          <label
            for="profession"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Filtrer par profession</label
          >
          <select
            id="profession"
            class="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            on:change={handleProfessionChange}
          >
            <option value="" selected={selectedProfession === ''}
              >Toutes les professions</option
            >
            {#each professions as profession}
              <option
                value={profession.id}
                selected={selectedProfession === profession.id}
                >{profession.libelle}</option
              >
            {/each}
          </select>
        </div>

        <Pdf
          title={activeTab === 'professionnel'
            ? selectedProfession
              ? `Liste des professionnels - ${professions.find((p) => p.id === selectedProfession)?.libelle || ''}`
              : 'Liste des professionnels'
            : activeTab === 'etablissement'
              ? selectedProfession
                ? `Liste des établissements - ${professions.find((p) => p.id === selectedProfession)?.libelle || ''}`
                : 'Liste des établissements'
              : selectedProfession
                ? `Liste des professionnels à jour - ${professions.find((p) => p.id === selectedProfession)?.libelle || ''}`
                : 'Liste des professionnels à jour'}
          headers={activeTab === 'professionnel' || activeTab === 'pro'
            ? ['Nom', 'Prénoms', 'Téléphone', 'Email', 'Profession']
            : ['Nom', 'Adresse', 'Téléphone', 'Email', 'Profession']}
          data={activeTab === 'professionnel'
            ? filteredProfessionnels
            : activeTab === 'etablissement'
              ? filteredEtablissements
              : filteredProfessionnelsAjour}
          type={activeTab}
        />
      </div>

      {#if loading}
        <div class="p-8 text-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 inline-block"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Chargement en cours...
        </div>
      {:else if activeTab === 'professionnel'}
        <Table class="border border-gray-300">
          <TableHead
            class="border-y border-gray-200 bg-gray-100 dark:border-gray-700"
          >
            {#each ['Nom', 'Prénoms', 'Téléphone', 'Email', 'Profession'] as title}
              <TableHeadCell class="ps-4 font-normal border border-gray-300"
                >{title}</TableHeadCell
              >
            {/each}
          </TableHead>
          <TableBody>
            {#if filteredProfessionnels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).length === 0}
              <TableBodyRow class="border border-gray-300">
                <TableBodyCell
                  colspan={6}
                  class="text-center items-center p-4 text-gray-500 border border-gray-300"
                >
                  <div class="flex flex-row items-center justify-center">
                    <div class="grid grid-cols-1">
                      <img
                        src="/search_notfound.svg"
                        alt="Aucun résultat trouvé"
                      /><br />
                      <h1 class="text-2xl font-bold">Aucun résultat</h1>
                    </div>
                  </div>
                </TableBodyCell>
              </TableBodyRow>
            {:else}
              {#each filteredProfessionnels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as item}
                <TableBodyRow class="text-base border border-gray-300">
                  <TableBodyCell class="p-4 border border-gray-300"
                    >{item.personne?.nom ?? 'N/A'}</TableBodyCell
                  >
                  <TableBodyCell class="p-4 border border-gray-300"
                    >{item.personne?.prenoms ?? 'N/A'}</TableBodyCell
                  >
                  <TableBodyCell class="p-4 border border-gray-300"
                    >{item.personne?.number ?? 'N/A'}</TableBodyCell
                  >
                  <TableBodyCell class="p-4 border border-gray-300"
                    >{item.personne?.email ?? 'N/A'}</TableBodyCell
                  >
                  <TableBodyCell class="p-4 border border-gray-300"
                    >{item.personne?.profession?.libelle ??
                      'N/A'}</TableBodyCell
                  >
                </TableBodyRow>
              {/each}
            {/if}
          </TableBody>
        </Table>
      {:else if activeTab === 'etablissement'}
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Nom</th
              >
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Adresse</th
              >
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Téléphone</th
              >
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Email</th
              >
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Profession</th
              >
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each filteredEtablissements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as item}
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.username ?? 'N/A'}</td
                >
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.adresse ?? 'N/A'}</td
                >
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.number ?? 'N/A'}</td
                >
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.email ?? 'N/A'}</td
                >
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.personne?.profession?.libelle ?? 'N/A'}</td
                >
              </tr>
            {:else}
              <tr>
                <td
                  colspan="5"
                  class="px-4 py-3 text-center text-sm text-gray-500"
                  >Aucun établissement trouvé</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      {:else if activeTab === 'pro'}
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Nom</th
              >
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Prénoms</th
              >
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Téléphone</th
              >
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Email</th
              >
              <th
                class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                >Profession</th
              >
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {#each filteredProfessionnelsAjour.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as item}
              <tr class="hover:bg-gray-50">
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.personne?.nom ?? 'N/A'}</td
                >
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.personne?.prenoms ?? 'N/A'}</td
                >
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.personne?.number ?? 'N/A'}</td
                >
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.personne?.email ?? 'N/A'}</td
                >
                <td class="px-4 py-3 whitespace-nowrap text-sm"
                  >{item.personne?.profession?.libelle ?? 'N/A'}</td
                >
              </tr>
            {:else}
              <tr>
                <td
                  colspan="5"
                  class="px-4 py-3 text-center text-sm text-gray-500"
                  >Aucun professionnel à jour trouvé</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>

    {#if (activeTab === 'professionnel' && filteredProfessionnels.length > itemsPerPage) }
      <div class="w-full grid grid-cols-4">
        <div class="col-span-3 p-2">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Affichage
            <span class="font-semibold text-gray-900 dark:text-white"
              >{startRange}-{endRange}</span
            >
            sur un total de
            <span class="font-semibold text-gray-900 dark:text-white"
              >{totalPages * itemsPerPage}</span
            >
          </span>
        </div>
        <div class="flex p-2 justify-end">
          {#if totalPages > 1}
            <Pagination
              {currentPage}
              {totalPages}
              on:changePage={handlePageChange}
            />
          {/if}
        </div>
      </div>
    {/if}

  </section>
</div>

<!-- Modal pour voir les détails d'une transaction -->

<style>
  .content {
    padding: 10px;
    margin: 0 auto;
  }
</style>
