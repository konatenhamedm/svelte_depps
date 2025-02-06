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
        TableHeadCell,
    } from "flowbite-svelte";
    import {
        EditOutline,
        TrashBinSolid,
        EyeOutline,
        LockOpenOutline,
        LockOutline,
        CheckCircleOutline,
    } from "flowbite-svelte-icons";
    import Pagination from "$components/_includes/Pagination.svelte";
    import { pageSize } from "../../../store";
    import { get } from "svelte/store";
    import { onMount, onDestroy } from "svelte";
    import MessageError from "$components/MessageError.svelte";
  
    import { apiFetch } from "$lib/api";
    import type { EndUser, professionnel } from "../../../types";
  import Add from "./Add.svelte";
  import Edit from "./Edit.svelte";
  import Show from "./Show.svelte";
  import Delete from "./Delete.svelte";
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
    let current_data: any = {};
    let activeTab = "all"; // Valeur par défaut : "En attente"
  
    // Données et pagination
    let currentPage = 1;
    let main_data: professionnel[] = [];
    let loading = false;
    $: searchQuery = "";
  
  
  
    // Fonction pour récupérer les données
    async function fetchData() {
        loading = true; // Active le spinner de chargement
        try {
            const res = await apiFetch(true, "/professionnel/");
            if (res) {
                main_data = res.data as professionnel[];
            } else {
                console.error(
                    "Erreur lors de la récupération des données:",
                    res.statusText,
                );
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        } finally {
            loading = false; // Désactive le spinner de chargement
        }
    }
  
  
  
    onMount(async () => {
        fetchData();
        
    });

        // Liste des onglets avec leur label et couleur
        const tabs = [
        { key: "all", label: "Tous" },
        { key: "attente", label: "En attente" },
        { key: "accepte", label: "Accepté" },
        { key: "valide", label: "Validé" },
        { key: "refuse", label: "Refusé" },
        { key: "renouvellement", label: "Renouvellement" },
        { key: "a_jour", label: "À jour" }
    ];

  
     // Filtrage des données selon l'onglet actif
      // Filtrage des données selon l'onglet actif
    $: filteredData = main_data.filter(user => 
        activeTab === "all" ? true : user.status === activeTab
    );
  
    $: totalPages = Math.max(1, Math.ceil(filteredData.length / get(pageSize)));
  
    $: paginatedProducts =
        filteredData.length > 0
            ? filteredData.slice(
                  (currentPage - 1) * get(pageSize),
                  currentPage * get(pageSize),
              )
            : [];
  
    $: startRange = currentPage;
    $: endRange = Math.min(currentPage + get(pageSize), totalPages);
  
    function handlePageChange(event: CustomEvent) {
        currentPage = event.detail;
    }
  
    function handleTabChange(tab: string) {
        activeTab = tab;
        currentPage = 1; // Réinitialiser la pagination lors du changement de tabulation
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
    $: if (!openAdd || !openEdit || !openDelete || !openShow) {
        refreshDataIfNeeded();
    }




  
  
  </script>

  
  <Entete
    libelle=" dossiers acceptés "
    parent="Parametres"
    descr="Liste des dossiers acceptés"
  />
  <section class="content">
    <div class="row">
      <div class="col-12">
        <div class="box">
          <div class="box-header with-border flex justify-between items-center">
            <h4 class="box-title text-xl font-medium">
              Liste des dossiers accepte
            </h4>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="tabs flex gap-4 pr-0 pb-4">
                {#each tabs as tab}
                    <button
                        class="tab px-4 py-2 rounded-md transition-colors duration-200 
                            {activeTab === tab.key ? 'bg-gray-700 text-white' : 'bg-green-500 text-white'}"
                        on:click={() => handleTabChange(tab.key)}
                    >
                        {tab.label}
                        <span
                            class="badge rounded-full px-2 py-0.5 text-xs ml-2 
                                {activeTab === tab.key ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'}"
                        >
                            {main_data.filter(user => tab.key === "all" || user.status === tab.key).length}
                        </span>
                    </button>
                {/each}
            </div>
            <div class="table-responsive">
                
              <div class="w-full grid grid-cols-4">
                <div>
                  <Input
                    placeholder="Rechercher..."
                    type="text"
                    bind:value={searchQuery}
                    class="form-input font-normal rounded block w-full border-gray-200 text-sm focus:border-gray-300 focus:ring-0 bg-white mb-4"
                  />
                </div>
              </div>

             
              <Table class="border border-gray-300">
                <TableHead
                  class="border-y border-gray-200 bg-gray-100 dark:border-gray-700"
                >
                  {#each ["nom", "prénoms", "Téléphone", "email", "type", "Action"] as title}
                    <TableHeadCell class="ps-4 font-normal border border-gray-300"
                      >{title}</TableHeadCell
                    >
                  {/each}
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
                          >{item.nom}</TableBodyCell
                        >
                        <TableBodyCell class="p-4 border border-gray-300"
                          >{item.prenoms}</TableBodyCell
                        >
                        <TableBodyCell class="p-4 border border-gray-300"
                          >{item.user.phone}</TableBodyCell
                        >
                        <TableBodyCell class="p-4 border border-gray-300"
                          >{item.user.email}</TableBodyCell
                        >
                        <TableBodyCell class="p-4 border border-gray-300"
                          >{item.user.typeUser}</TableBodyCell
                        >
                        <!--  <TableBodyCell class="p-4 border border-gray-300">{item.sous_menu.libelle}</TableBodyCell>
                                     -->
                        <TableBodyCell
                          class="space-x-1 p-2 w-8 border border-gray-300"
                        >
                          <Button
                            color="green"
                            style="background-color: green"
                            size="sm"
                            class="gap-2 px-3 bg-green-800"
                            on:click={() => (
                              (current_data = item), (openShow = true)
                            )}
                          >
                            <EyeOutline size="sm" />
                          </Button>
  
                          <Button
                            color="green"
                            style="background-color: green"
                            size="sm"
                            class="gap-2 px-3 bg-green-800"
                            on:click={() => (
                              (current_data = item), (openShow = true)
                            )}
                          >
                            <EyeOutline size="sm" />
                          </Button>
                        </TableBodyCell>
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
  <Show bind:open={openShow} data={current_data} sizeModal="xl" />
  <Delete bind:open={openDelete} data={current_data} />
  <style>
   

    .tab {
        @apply px-4 py-2 rounded-lg border border-gray-300 text-gray-700;
    }
    .tab-active {
        @apply text-white border-transparent;
    }
</style>
