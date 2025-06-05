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
    Select
  } from "flowbite-svelte";
  import {
    EditOutline,
    EyeOutline,
    TrashBinSolid
  } from "flowbite-svelte-icons";
  import Entete from "../../../components/_includes/Entete.svelte";
  import MessageError from "../../../components/MessageError.svelte";
  import Pagination from "../../../components/_includes/Pagination.svelte";
  // Importer le store pageSize
  import { get } from "svelte/store";
  import type { professionnel, Transaction, User } from "../../../types";
  import { apiFetch } from "$lib/api";
  import { pageSize } from "../../../store"; // Importer le store pageSize
  import { onMount } from "svelte";

  import { getAuthCookie } from "$lib/auth";
  import Show from "./Show.svelte";
  import Delete from "./Delete.svelte";
  import { formatDate } from "$lib/dateUtils";
  import { formatAmount } from "$lib/formatAmount";
  import DropdownMenuShow from "$components/DropdownMenuShow.svelte";
  import DropdownMenu from "$components/DropdownMenu.svelte";
  import DropdownOnlyShow from "$components/DropdownOnlyShow.svelte";
  import Pdf from "$components/pdf/Pdf.svelte";

  export let data; // Les données retournées par `load()`
  let user = data.user;

  let main_data: Transaction[] = [];
  let searchQuery = ""; // Pour la recherche par texte
  let selectedService: any = ""; // Pour filtrer par service
  let selectedStatus: any = ""; // Pour filtrer par status
  let startDate: any | null = null; // Date de début
  let endDate: any | null = null; // Date de fin
  let selectedAmount: any = ""; // Pour filtrer par montant
  let currentPage = 1;
  let loading = false;
  let openDelete: boolean = false;
  let openEdit: boolean = false;
  let openAdd: boolean = false;
  let openShow: boolean = false;
  let current_data: any = {};

  // Options statiques pour le filtre de montant
  const amountOptions = [
    { value: "", label: "Tous les montants" },
    { value: "5000", label: "5 000 FCFA" },
    { value: "25000", label: "25 000 FCFA" },
    { value: "50000", label: "50 000 FCFA" }
  ];

  async function fetchData() {
    loading = true; // Active le spinner de chargement
    try {
      const res = await apiFetch(true, "/paiement/historique");
      console.log(res);
      if (res) {
        main_data = res.data as Transaction[];
        console.log("content main", main_data);
      } else {
        console.error(
                "Erreur lors de la récupération des données:",
                res.statusText
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
    // Filtre par recherche texte
    const textMatch = item.reference.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtre par montant
    let amountMatch = true;
    if (selectedAmount) {
      amountMatch = parseInt(item.montant, 10) === parseInt(selectedAmount, 10);
    }

    // Filtre par date
    let dateMatch = true;
    if (startDate) {
      const itemDate = new Date(item.createdAt);
      const start = new Date(startDate);
      dateMatch = itemDate >= start;
    }
    if (endDate) {
      const itemDate = new Date(item.createdAt);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Pour inclure toute la journée
      dateMatch = dateMatch && itemDate <= end;
    }

    return textMatch && amountMatch && dateMatch;
  });

  // $: totalPages = Math.ceil(filteredData.length / get(pageSize)) pageSize se trouve store.ts;
  $: totalPages = Math.max(1, Math.ceil(filteredData.length / get(pageSize)));

  //$: paginatedProducts = filteredData.slice((currentPage - 1) * get(pageSize), currentPage * get(pageSize));
  $: paginatedProducts =
          filteredData.length > 0
                  ? filteredData.slice(
                          (currentPage - 1) * get(pageSize),
                          currentPage * get(pageSize)
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

  const handleAction = (action: any, item: any) => {
    current_data = item;
    if (action === "view") {
      openShow = true;
    } else if (action === "edit") {
      openEdit = false;
    } else if (action === "delete") {
      openDelete = false;
    }
  };

  // Rafraîchir les données après fermeture des modales
  $: if (!openAdd || !openEdit || !openDelete) {
    refreshDataIfNeeded();
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

</script>

<Entete
        libelle="Liste des historiques de paiement"
        parent="Parametres"
        descr="Liste des historiques de paiement"
/>
<section class="content">
  <div class="row">
    <div class="col-12">
      <div class="box">
        <div class="box-header with-border flex justify-between items-center">
          <h4 class="box-title text-xl font-medium">
            Liste des historiques de paiement
          </h4>
          <Pdf
                  title="Historique_Paiements"
                  headers={["Reference", "Type", "Email", "Etat", "Montant", "Date"]}
                  data={main_data}
                  type="paiement"
          />
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <div class="table-responsive">
            <div class="w-full grid grid-cols-4 gap-4 mb-4">
              <div>
                <Input
                        placeholder="Rechercher..."
                        type="text"
                        bind:value={searchQuery}
                        class="form-input font-normal rounded block w-full border-gray-200 text-sm focus:border-gray-300 focus:ring-0 bg-white"
                />
              </div>
              <div>
                <Select bind:value={selectedAmount}>
                  {#each amountOptions as option}
                    <option value={option.value}>{option.label}</option>
                  {/each}
                </Select>
              </div>
              <div>
                <Input
                        type="date"
                        bind:value={startDate}
                        class="form-input font-normal rounded block w-full border-gray-200 text-sm focus:border-gray-300 focus:ring-0 bg-white"
                        placeholder="Date de début"
                />
              </div>
              <div>
                <Input
                        type="date"
                        bind:value={endDate}
                        class="form-input font-normal rounded block w-full border-gray-200 text-sm focus:border-gray-300 focus:ring-0 bg-white"
                        placeholder="Date de fin"
                />
              </div>
            </div>
            <Table class="border border-gray-300">
              <TableHead
                      class="border-y border-gray-200 bg-gray-100 dark:border-gray-700"
              >
                {#each ["Nom","Prénoms","Profession","Contacts","Reference", "type","moyens de paiement", "email","Etat paiement", "Montant", "Date"] as title}
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
                      >{item?.user?.personne?.nom}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                      >{item?.user?.personne?.prenoms}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                      >{item?.user?.personne?.profession}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                      >{item?.user?.personne?.number}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                      >{item?.reference}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                      >{item.type}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                      >{item.channel}</TableBodyCell
                      >

                      <TableBodyCell class="p-4 border border-gray-300"
                      >{item.user.email}</TableBodyCell
                      >

                      <TableBodyCell class="p-4 border border-gray-300"
                      ><span
                              class={`py-[0.1875rem] px-[0.8125rem] text-xs rounded-[1.25rem] text-white w-[77px] leading-[1.5] ${getBgColor(item.state)}`}
                      >{getStatus(
                              item.state,
                      )}</span
                      >

                      </TableBodyCell
                      >
                      <TableBodyCell
                              class="p-4 border border-gray-300 justify-end text-right"
                      >{formatAmount(
                              parseInt(item.montant, 10)
                      )}</TableBodyCell
                      >
                      <TableBodyCell class="p-4 border border-gray-300"
                      >{formatDate(item.createdAt)}</TableBodyCell
                      >
                      <!--  <TableBodyCell class="p-4 border border-gray-300">{item.sous_menu.libelle}</TableBodyCell>
                                   -->

                      <!-- <TableBodyCell class="p-2 w-8 border border-gray-300">
                         Utilisation de <details> pour gérer l'ouverture/fermeture au clic
                           <DropdownOnlyShow {item} onAction={handleAction} />
                       </TableBodyCell>-->
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
<Show bind:open={openShow} data={current_data} sizeModal="xl" />
<Delete bind:open={openDelete} data={current_data} />