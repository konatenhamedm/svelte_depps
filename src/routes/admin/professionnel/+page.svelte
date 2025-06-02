<script lang="ts">
  import Entete from "$components/_includes/Entete.svelte";
  import {
    Button,
    Input,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from "flowbite-svelte";
  import {
    EditOutline,
    TrashBinSolid,
    EyeOutline,
    LockOpenOutline,
    LockOutline,
    CheckCircleOutline
  } from "flowbite-svelte-icons";
  import Pagination from "$components/_includes/Pagination.svelte";
  import { pageSize } from "../../../store";
  import { get } from "svelte/store";
  import { onMount, onDestroy } from "svelte";
  import MessageError from "$components/MessageError.svelte";

  import { apiFetch, BASE_URL_API } from "$lib/api";
  import type { EndUser, professionnel } from "../../../types";
  import Add from "./Add.svelte";
  import Edit from "./Edit.svelte";
  import Show from "./Show.svelte";
  import Delete from "./Delete.svelte";
  import DropdownMenu from "$components/DropdownMenu.svelte";
  import DropdownMenuShow from "$components/DropdownMenuShow.svelte";
  import Imputation from "./Imputation.svelte";
  export let data; // Les données retournées par `load()`
  let user = data.user;

  const path: string = "/admin/end-user";
  const description: string = "Liste des end users freewan";
  const title: string = "Admin | end users";
  const subtitle: string = "Liste des end users";

  let openDelete: boolean = false;
  let openEdit: boolean = false;
  let openAdd: boolean = false;
  let openShow: boolean = false;
  let openImputation: boolean = false;
  let current_data: any = {};
  let activeTab = "attente"; // Valeur par défaut : "En attente"

  // Données et pagination
  let currentPage = 1;
  let main_data: professionnel[] = [];
  let loading = false;
  let searchQuery: string = "";
  $: searchQuery = "";


  // Fonction pour récupérer les données
async function fetchData() {
  loading = true; // Active le spinner de chargement
  try {
    const res = await apiFetch(true, "/professionnel/");
    if (res) {
      main_data = res.data as professionnel[];

      console.log(main_data);
    } else {
      console.error(
        "Erreur lors de la récupération des données:",
        res.statusText
      );
    }

    loading = false; // Désactive le spinner de chargement
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
  } finally {
    loading = false; // Désactive le spinner de chargement
  }
}
  onMount(async () => {
    await fetchData();
  });

  // Liste des onglets avec leur label et couleur
  const tabs = [
    /* { key: "all", label: "Tous" }, */
    { key: "attente", label: "En attente" },
    { key: "accepte", label: "Accepté" },
    { key: "rejete", label: "Rejeté" },
    { key: "valide", label: "Validé" },
    { key: "refuse", label: "Refusé" },
    { key: "renouvellement", label: "Renouvellement" },
    { key: "a_jour", label: "À jour" }
  ];
  let statusCounts: { [key: string]: number } = {};
  // Filtrage des données selon l'onglet actif
  // Filtrage des données selon l'onglet actif
  // Précalcul du nombre d'éléments par statut
  $: statusCounts = main_data.reduce((acc, user) => {
    acc[user.personne.status] = (acc[user.personne.status] || 0) + 1;
    return acc;
  }, {});

  // Filtrage des données selon l'onglet actif
  $: filteredData = main_data
          .filter((user) => user.personne.status === activeTab)
          .filter((user) => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (
                    user.personne.nom?.toLowerCase().includes(query) ||
                    user.personne.prenoms?.toLowerCase().includes(query) ||
                    user.personne.number?.toLowerCase().includes(query) ||
                    user.email?.toLowerCase().includes(query) ||
                    user.personne.profession?.libelle?.toLowerCase().includes(query) ||
                    user.personne.code?.toLowerCase().includes(query)
            );
          });

  // Calcul du nombre total de pages
  $: totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / (get(pageSize) || 10))
  );

  // Pagination
  $: paginatedProducts = filteredData.slice(
    (currentPage - 1) * get(pageSize),
    currentPage * get(pageSize)
  );

  // Gestion de la plage d'affichage
  $: startRange = (currentPage - 1) * get(pageSize) + 1;
  $: endRange = Math.min(currentPage * get(pageSize), filteredData.length);

  // Changement d'onglet
  function handleTabChange(tabKey: any) {
    activeTab = tabKey;
    currentPage = 1; // Réinitialiser à la première page après un changement d'onglet
  }

  function handlePageChange(event: CustomEvent) {
    currentPage = event.detail;
  }

  $: if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  $: if (filteredData.length === 0) {
    currentPage = 1;
  }

  async function refreshDataIfNeeded() {
    fetchData();
  }

  // Rafraîchir les données après fermeture des modales
  $: if (!openAdd || !openEdit || !openDelete || !openShow  || !openImputation ) {
    refreshDataIfNeeded();
  }

  const handleAction = (action: any, item: any) => {
    current_data = item;
    if (action === "view") {
      openShow = true;
    } else if (action === "edit") {
      openEdit = false;
    } else if (action === "delete") {
      openDelete = false;
    
    } else if (action === "imputation") {
      openImputation = true;
    }
  };



</script>

<Entete
  libelle=" dossiers"
  parent="Gestion des dossiers"
  descr="Liste des dossiers"
/>
<section class="content">
  <div class="row">
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border flex justify-between items-center">
          <h4 class="box-title text-xl font-medium">
            Liste des dossiers professionnels
          </h4>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="tabs flex gap-4 pr-0 pb-4">
            {#each tabs as tab}
              <button
                class="tab px-4 py-2 rounded-md transition-colors duration-200
            {activeTab === tab.key
                  ? 'bg-gray-700 text-white'
                  : 'bg-green-500 text-white'}"
                on:click={() => handleTabChange(tab.key)}
              >
                {tab.label}
                <span
                  class="badge rounded-full px-2 py-0.5 text-xs ml-2
            {activeTab === tab.key
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-300 text-black'}"
                >
                  {statusCounts[tab.key] || 0}
                </span>
              </button>
            {/each}
          </div>
          <div class="table-responsive">
            <div class="w-full grid grid-cols-4">
              <div class="relative">
                <Input
                        placeholder="Rechercher..."
                        type="text"
                        bind:value={searchQuery}
                        class="form-input font-normal rounded block w-full border-gray-200 text-sm focus:border-gray-300 focus:ring-0 bg-white mb-4 pl-10"
                />
                {#if searchQuery}
                  <button
                          on:click={() => (searchQuery = '')}
                          class="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                {/if}
                <svg
                        class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                >
                  <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <Table class="border border-gray-300">
              <TableHead
                class="border-y border-gray-200 bg-gray-100 dark:border-gray-700"
              >
               
              {#if activeTab === "valide"}
              {#each ["nom", "prénoms", "Téléphone", "email", "professionnel de santé", "Code", "imputation"] as title}
                {#if title}
                  <TableHeadCell class="ps-4 font-normal border border-gray-300">
                    {title}
                  </TableHeadCell>
                {/if}
              {/each}
            {:else}
              {#each ["nom", "prénoms", "Téléphone", "email", "professionnel de santé", "imputation", (user.type === "SOUS-DIRECTEUR" && activeTab == "attente") ? "Action" : null] as title}
                {#if title}
                  <TableHeadCell class="ps-4 font-normal border border-gray-300">
                    {title}
                  </TableHeadCell>
                {/if}
              {/each}
            {/if}
            
              </TableHead>
              <TableBody>
                {#if loading && paginatedProducts.length === 0}
                  <TableBodyRow class="border border-gray-300">
                    <TableBodyCell
                      colspan={6}
                      class="text-center items-center p-4 text-gray-500 border border-gray-300"
                    >
                      <div
                        class="flex flex-row gap-2 items-center justify-center"
                      >
                        <div
                          class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                        ></div>
                        <div
                          class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                        ></div>
                        <div
                          class="w-4 h-4 rounded-full bg-blue-600 animate-bounce"
                        ></div>
                      </div>
                    </TableBodyCell>
                  </TableBodyRow>
                {:else if paginatedProducts.length === 0}
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
                  {#each paginatedProducts as item}
                    <TableBodyRow class="text-base border border-gray-300">
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{item.personne.nom}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{item.personne.prenoms}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{item.personne.number}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{item.email}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{ item.personne.profession.libelle}</TableBodyCell
                      >
                      {#if activeTab === "valide"}
                        <TableBodyCell class="p-4 border border-gray-300"
                          >{item.personne.code}</TableBodyCell
                        >
                        {/if}

                        <TableBodyCell class="p-4 border border-gray-300"
                          >
                          {#if item.personne.imputationData }
                          {item.personne.imputationData.username}
                          
                          {:else}
                          {item.personne.imputationData}
                          {/if}
                          
                          </TableBodyCell
                        >

                       {#if item?.personne?.status == "attente" && user.type == "SOUS-DIRECTEUR"  }
                      <TableBodyCell class="p-2 w-8 border border-gray-300">
                        <DropdownMenuShow {item} onAction={handleAction} user={user} />
                      </TableBodyCell>

                      {/if}
                   <!--    {#if  user.type == "ADMINISTRATEUR"  }
                      <TableBodyCell class="p-2 w-8 border border-gray-300">
                        <DropdownMenuShow {item} onAction={handleAction} user={user} />
                      </TableBodyCell>

                      {/if} -->

                      <!-- <Button
                            color="green"
                            style="background-color: green"
                            size="sm"
                            class="gap-2 px-3 bg-green-800"
                            on:click={() => (
                              (current_data = item), (openShow = true)
                            )}
                          >
                            <EyeOutline size="sm" />
                          </Button> -->
                    </TableBodyRow>
                  {/each}
                {/if}
              </TableBody>
            </Table>

            <div class="w-full grid grid-cols-4">
              <div class="col-span-3 p-2">
                <span
                  class="text-sm font-normal text-gray-500 dark:text-gray-400"
                >
                  Affichage
                  <span class="font-semibold text-gray-900 dark:text-white"
                    >{startRange}-{endRange}</span
                  >
                  sur un total de
                  <span class="font-semibold text-gray-900 dark:text-white"
                    >{filteredData.length}</span
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
          </div>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
  </div>
</section>

<!-- Modales -->
<Add
  bind:open={openAdd}
  data={current_data}
  sizeModal="xl"
  userUpdateId={user?.id}
/>
<Edit
  bind:open={openEdit}
  data={current_data}
  sizeModal="xl"
  userUpdateId={user?.id}
/>

{#if openShow}
  <Show
    bind:open={openShow}
    data={current_data}
    sizeModal="xl"
    userUpdateId={user.id}
  />
{/if}
{#if openImputation}
  <Imputation
    bind:open={openImputation}
    data={current_data}
    sizeModal="md"
    userUpdateId={user.id}
  />
{/if}

<Delete bind:open={openDelete} data={current_data} />

<style>
  .tab {
    @apply px-4 py-2 rounded-lg border border-gray-300 text-gray-700;
  }
  .tab-active {
    @apply text-white border-transparent;
  }
</style>
