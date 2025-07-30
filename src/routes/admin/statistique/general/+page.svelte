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
  import TableauCroise from '$components/statistiques/TableauCroise.svelte';
  import Pyramide from '$components/statistiques/Pyramide.svelte';

  let main_data: Stats[] = [];
  let stats: any = [];
  let searchQuery = ''; // Pour la recherche par texte
  let periode: any | "null" = 'null';
  let annee: any = "null"; // Valeur par défaut pour l'année
  let mois: any = "null"; // Valeur par défaut pour l'année
  let tranche :any = "null";
  let currentPage = 1;
  let loading = false;
  let current_data: any = {};

  const moisDatas = [
    { libelle: "Janvier", id: "1" },
    { libelle: "Février", id: "2" },
    { libelle: "Mars", id: "3" },
    { libelle: "Avril", id: "4" },
    { libelle: "Mai", id: "5" },
    { libelle: "Juin", id: "6" },
    { libelle: "Juillet", id: "7" },
    { libelle: "Août", id: "8" },
    { libelle: "Septembre", id: "9" },
    { libelle: "Octobre", id: "10" },
    { libelle: "Novembre", id: "11" },
    { libelle: "Décembre", id: "12" }
  ];

  // Données trimestre
  const trimestres = [
    { libelle: "Premier trimestre", id: "1" },
    { libelle: "Deuxième trimestre", id: "2" },
    { libelle: "Troisième trimestre", id: "3" },
    { libelle: "Quatrième trimestre", id: "4" }
  ];

  // Données semestre
  const semestres = [
    { libelle: "Premier semestre", id: "1" },
    { libelle: "Deuxième semestre", id: "2" }
  ];

  async function fetchData() {
    loading = true; // Active le spinner de chargement

   
    try {
      const res = await apiFetch(true, `/statistique/generale?periode=${periode}&annee=${annee}&mois=${mois}&tranche=${tranche}`);

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

        <!-- Période -->
        <div>
          <InputSelectChart
            label="Périodes"
            bind:selectedId={periode}
            datas={[
              { libelle: "Mois", id: "mois" },
              { libelle: "Trimestre", id: "trimestre" },
              { libelle: "Semestre", id: "semestre" },
              { libelle: "Année", id: "annee" }
            ]}
            id="periode"
          />
        </div>
      
        <!-- Mois (si période = mois) -->
        {#if periode === 'mois'}
          <div>
            <InputSelectChart
              label="Mois"
              bind:selectedId={mois}
              datas={moisDatas}
              id="mois"
            />
          </div>
        {/if}
      
        <!-- Tranche Trimestre (si période = trimestre) -->
        {#if periode === 'trimestre'}
          <div>
            <InputSelectChart
              label="Trimestre"
              bind:selectedId={tranche}
              datas={trimestres}
              id="trimestre"
            />
          </div>
        {/if}
      
        <!-- Tranche Semestre (si période = semestre) -->
        {#if periode === 'semestre'}
          <div>
            <InputSelectChart
              label="Semestre"
              bind:selectedId={tranche}
              datas={semestres}
              id="semestre"
            />
          </div>
        {/if}
      
        <!-- Année (toujours affichée) -->
        <div>
          <InputSelectChart
            label="Année"
            bind:selectedId={annee}
            datas={stats.all_annees}
            id="annee"
          />
        </div>
      
        <!-- Bouton de recherche -->
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

   
    
        <Hist1 data={stats.pays} container="container1" title="Statistique de la répartition des professionnels par pays"/>
        <Hist2 data={stats.professions} container="container2" title="Statistique de la répartition des professionnels par profession" subtitle="Professions" type="Professionnels"/>
        <Hist1 data={stats.regions} container="container3" title="Statistique de la répartition des professionnels par région"/>
        <Hist2 data={stats.regions} container="container8" title="Statistique de la répartition des professionnels par region" subtitle="Régions" type="Professionnels"/>
        <Hist1 data={stats.villes} container="container5" title="Statistique de la répartition des professionnels par ville"/>
        <Hist2 data={stats.annees} container="container6" title="Statistique de la répartition des professionnel par année" subtitle="Années" type="Professionnels"/>
       
       
        <Pyramide apiData={stats} />
        <Hist2 data={stats.tranches_age} container="container4" title="Statistique de la répartition des professionnels par tranche d'âge" subtitle="Tranche d'âge" type="Professionnels"/>

        <Hist2 data={stats.genres} container="container7" title="Statistique de la répartition des professionnels par civilité" subtitle="Civilités" type="Professionnels"/>
       <TableauCroise apiData={stats} />
        {/if}
        
      </div>
    </div>
  </div>
</section>


<!-- Modales -->
