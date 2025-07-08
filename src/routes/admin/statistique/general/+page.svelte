<script lang="ts">
  import {
    Button,
    Input,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from 'flowbite-svelte';

  import Entete from '../../../../components/_includes/Entete.svelte';
  import Pagination from '../../../../components/_includes/Pagination.svelte';
  // Importer le store pageSizeAutre
  import {get} from 'svelte/store';
  import type {Permission, sMenu, Stats, User} from '../../../../types';
  import {apiFetch} from '$lib/api';
  import {pageSizeAutre} from '../../../../store'; // Importer le store pageSizeAutre
  import {onMount} from 'svelte';
  import {getAuthCookie} from '$lib/auth';
  import Donut from '$components/statistiques/Donut.svelte';
  import Pie from '$components/statistiques/Pie.svelte';
  import Hist1 from '$components/statistiques/histogrames/Hist1.svelte';
  import Hist2 from '$components/statistiques/histogrames/Hist2.svelte';
  import SkeletonChart from '$components/_skeletons/SkeletonChart.svelte';
  import InputSelect from '$components/inputs/InputSelect.svelte';
  import InputSelectChart from '$components/inputs/InputSelectChart.svelte';

  let main_data: Stats[] = [];
  let stats: any = [];
  let searchQuery = ''; // Pour la recherche par texte
  let periode: any | "null" = 'null';
  let annee: any = "null"; // Valeur par défaut pour l'année
  let currentPage = 1;
  let loading = false;
  let current_data: any = {};

  async function fetchData() {
    loading = true; // Active le spinner de chargement

   
    try {
      const res = await apiFetch(true, `/statistique/generale?periode=${periode}&annee=${annee}`);

      if (res) {
        main_data = res.data.nombre as Stats[];
        stats = res.data
        console.log(stats);
      } else {
        console.error(
          'Erreur lors de la récupération des données:',
          res.statusText
        );
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      loading = false; // Désactive le spinner de chargement
    }
  }

  onMount(async () => {
    await fetchData();
  });

  async function appliquerFiltres() {
   await fetchData();
}
  
</script>

<Entete
  libelle="Statistiques générales"
  parent="Gestion des statistiques"
  descr="Statistiques"
/>

<section class="content">
  <div class="row">
    <div class="col-12">
      <!-- Filtres -->
      <div class="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm flex flex-wrap gap-4 items-end">
        <div>
          <InputSelectChart
          label="Période"
          bind:selectedId={periode}
          datas={[
            {
              'libelle':"Mois",
              'id':"mois"
            },
            {
              'libelle':"Trimestre",
              'id':"trimestre"
            },
            {
              'libelle':"Semestre",
              'id':"semestre"
            },
            {
              'libelle':"Année",
              'id':"annee"
            }
          ]}
          id="periode"
        
        ></InputSelectChart>
        <!--   <label class="block text-sm font-medium text-gray-700 mb-1">Période</label>
          <select
            bind:value={periode}
            class="form-select block w-full rounded border-gray-300"
          >
            <option value="null">Sélectionner</option>
            <option value="mois">Mois</option>
            <option value="trimestre">Trimestre</option>
            <option value="semestre">Semestre</option>
            <option value="annee">Année</option>
          </select> -->
        </div>

        <div>
          <InputSelectChart
          label="Annee"
          bind:selectedId={annee}
          datas={stats.all_annees}
          id="annee"
        
        ></InputSelectChart>
         <!--  <label class="block text-sm font-medium text-gray-700 mb-1">Année</label>
          <select
            bind:value={annee}
            class="form-select block w-full rounded border-gray-300"
          >
            <option value="null">Sélectionner</option>
            {#each stats.all_annees as year}
              <option value={year.libelle}>{year.libelle}</option>
            {/each}
          </select> -->
        </div>

        <button
          on:click={appliquerFiltres}
          class="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Rechercher
        </button>
      </div>

      <!-- Grille de graphiques -->
      <div class="grid grid-cols-2 gap-2">
        {#if loading}
        {#each Array(6) as _, i}
          <SkeletonChart />
        {/each}
       
        {:else}

        <!-- 
          'pays' => array_reverse($statsPays),
          'professions' => array_reverse($statsProfession),
                'villes' => array_reverse($statsVille),
                'tranches_age' => $statsTrancheAge,
                'annees' => array_reverse($statsAnnee),
                'regions' => array_reverse($statsRegions),

                'genres' => array_reverse($statsGenre),

                'all_annees'=>$dataAnnee
                 -->
    
        <Hist1 data={stats.pays} container="container1" title="Statistique de la répartition des professionnels par pays"/>
        <Hist2 data={stats.professions} container="container2" title="Statistique de la répartition des professionnels par profession" subtitle="Profession" type="Professionnels"/>
        <Hist1 data={stats.regions} container="container3" title="Statistique de la répartition des professionnel par region"/>
        <Hist2 data={stats.tranches_age} container="container4" title="Statistique de la répartition des professionnel par tranche d'âge" subtitle="Tranche d'âge" type="Professionnels"/>

        <Hist1 data={stats.villes} container="container5" title="Statistique de la répartition des professionnel par ville"/>
        <Hist2 data={stats.annees} container="container6" title="Statistique de la répartition des professionnel par année" subtitle="Années" type="Professionnels"/>
        <Hist2 data={stats.genres} container="container7" title="Statistique de la répartition des professionnel par civilité" subtitle="Civilités" type="Professionnels"/>
        <Hist2 data={stats.genres} container="container8" title="Statistique de la répartition des professionnel par region" subtitle="Régions" type="Professionnels"/>
        {/if}
        
      </div>
    </div>
  </div>
</section>


<!-- Modales -->
