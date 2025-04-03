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
  } from "flowbite-svelte";
  import {
    EditOutline,
    EyeOutline,
    TrashBinSolid,
  } from "flowbite-svelte-icons";
  import Entete from "../../../components/_includes/Entete.svelte";
  import MessageError from "../../../components/MessageError.svelte";
  import Pagination from "../../../components/_includes/Pagination.svelte";
  // Importer le store pageSize
  import { get } from "svelte/store";
  import type { CodeGenerateur, Permission, User } from "../../../types";
  import { apiFetch } from "$lib/api";
  import { pageSize } from "../../../store"; // Importer le store pageSize
  import { onMount } from "svelte";
  import Add from "./Add.svelte";
  import Edit from "./Edit.svelte";
  import Show from "./Show.svelte";
  import Delete from "./Delete.svelte";
  import { getAuthCookie } from "$lib/auth";
  import DropdownMenu from "$components/DropdownMenu.svelte";

  export let data; // Les données retournées par `load()`
  let user = data.user;

  let main_data: CodeGenerateur[] = [];
  let searchQuery = ""; // Pour la recherche par texte
  let selectedService: any = ""; // Pour filtrer par service
  let selectedStatus: any = ""; // Pour filtrer par status
  let startDate: any | null = null; // Date de début
  let endDate: any | null = null; // Date de fin
  let currentPage = 1;
  let loading = false;
  let openDelete: boolean = false;
  let openEdit: boolean = false;
  let openAdd: boolean = false;
  let openShow: boolean = false;
  let current_data: any = {};

  async function fetchData() {
    loading = true; // Active le spinner de chargement
    try {
      const res = await apiFetch(true, "/codeGenerateur");
      console.log(res);
      if (res) {
        main_data = res.data as CodeGenerateur[];
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
    await fetchData();
  });

  $: filteredData = main_data.filter((item) => {
    return item.code.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // $: totalPages = Math.ceil(filteredData.length / get(pageSize)) pageSize se trouve store.ts;
  $: totalPages = Math.max(1, Math.ceil(filteredData.length / get(pageSize)));

  //$: paginatedProducts = filteredData.slice((currentPage - 1) * get(pageSize), currentPage * get(pageSize));
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

  $: if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  $: if (filteredData.length === 0) {
    currentPage = 1;
  }

  // Fonction pour rafraîchir les données après certaines actions
  async function refreshDataIfNeeded() {
    await fetchData();
  }

  // Rafraîchir les données après fermeture des modales
  $: if (!openAdd || !openEdit || !openDelete) {
    refreshDataIfNeeded();
  }
  const handleAction = (action: any, item: any) => {
    current_data = item;
    if (action === "view") {
      openShow = true;
    } else if (action === "edit") {
      openEdit = true;
    } else if (action === "delete") {
      openDelete = true;
    }
  };

  function formatDateForInput(dateString: string) {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (e) {
      console.error("Erreur de formatage de date:", e);
      return "";
    }
  }

</script>

<Entete
  libelle="Gestion des codes "
  parent="Parametres"
  descr="Liste des codes"
/>
<section class="content">
  <div class="row">
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border flex justify-between items-center">
          <h4 class="box-title text-xl font-medium">Liste des codes</h4>

          <div>
            <a
              class="py-[5px] px-3 waves-effect waves-light btn btn-info mb-5"
              on:click={() => ((current_data = {}), (openAdd = true))}
            >
              + Nouvelle
            </a>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
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
                {#each ["Date création","code","Civilite","Profession","Date naissance"] as title}
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
                        >{formatDateForInput(item.dateCreation)}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{item.code}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{item.civilite.libelle}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{item.profession.libelle}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                        >{formatDateForInput(item.dateNaissance)}</TableBodyCell
                      >

                      <!--  <TableBodyCell class="p-4 border border-gray-300">{item.sous_menu.libelle}</TableBodyCell>
                                   -->

                  <!--     <TableBodyCell class="p-2 w-8 border border-gray-300">
                        <DropdownMenu {item} onAction={handleAction} />
                      </TableBodyCell> -->
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
 {#if openAdd == true}
 <Add
   bind:open={openAdd}
   data={current_data}
   sizeModal="md"
   userUpdateId={user.id}
 />
 {/if}
<Edit
  bind:open={openEdit}
  data={current_data}
  sizeModal="xl"
  userUpdateId={user.id}
/>
<Show bind:open={openShow} data={current_data} sizeModal="xl" />
<Delete bind:open={openDelete} data={current_data} />
