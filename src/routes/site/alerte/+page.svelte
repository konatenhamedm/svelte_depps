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
        Modal
    } from "flowbite-svelte";

    import { onMount } from "svelte";
    import { apiFetch } from "$lib/api";
    import Slide from "$components/Slide.svelte";
    import Footer from "$components/Footer.svelte";

    export let data;
    let user = data?.user;
    let main_data: any[] = [];
    let searchQuery = "";
    let loading = false;
    let isEditMode = false;
    let current_data: any = {};

    let alerte = {
        destinataire: "Adminisration DEPPS",
        objet: "",
        message: "",
    };

    let recipients : any = [];

    async function getDestinataire() {
        try {
            const response = await fetch('https://depps.leadagro.net/api/destinateur/');
            if (!response.ok) {
                throw new Error('Échec de la récupération des destinataires');
            }
            const data = await response.json();
            recipients = data.data;
            console.log("content recipient", recipients);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }

    let showDeleteModal = false;
    let deleteId = null;

    async function fetchData() {
        loading = true;
        try {
            const res = await apiFetch(true, "/alerte/");
            if (res) {
                main_data = res.data;
                console.log("content main_data",main_data)
            } else {
                console.error("Erreur de récupération:", res.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        fetchData();
        getDestinataire();

    });

    async function saveAlerte() {
        loading = true;
        try {
            const url = isEditMode
                ? `https://depps.leadagro.net/api/alerte/update/${current_data.id}`
                : "https://depps.leadagro.net/api/alerte/create";

            const method = isEditMode ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user: data.user.id,
                    destinateur: alerte.destinataire,
                    objet: alerte.objet,
                    message: alerte.message,
                    userUpdate: data.user.id
                }),
            });
            if (res.ok) {
                resetForm();
                await fetchData();
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement:", error);
        } finally {
            loading = false;
        }
    }

    function resetForm() {
        alerte = { destinataire: "Adminisration DEPPS", objet: "", message: "" };
        isEditMode = false;
        current_data = {};
    }

    function editAlerte(item) {
        alerte = { ...item };
        current_data = item;
        isEditMode = true;

        alerte.destinataire = item?.destinateur?.id || '';
    }


    function confirmDelete(id) {
        deleteId = id;
        showDeleteModal = true;
    }

    async function deleteAlerte() {
        loading = true;
        try {
            const res = await fetch(`https://depps.leadagro.net/api/alerte/delete/${deleteId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                await fetchData();
            }
        } catch (error) {
            console.error("Erreur suppression:", error);
        } finally {
            loading = false;
            showDeleteModal = false;
            deleteId = null;
        }
    }
</script>

<Slide user={user} />
<section class="main-content p-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Formulaire -->
        <div class="bg-white p-6 rounded-lg shadow-md col-span-1">
            <h4 class="text-xl font-semibold mb-4">{isEditMode ? "Modifier" : "Ajouter"} une alerte</h4>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Destinataire</label>
                <select
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        bind:value={alerte.destinataire}
                >
                    {#each recipients as recipient}
                        <option value={recipient.id}>{recipient.libelle}</option>
                    {/each}
                </select>
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Objet</label>
                <Input
                        type="text"
                        bind:value={alerte.objet}
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
            </div>


            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                        bind:value={alerte.message}
                        class="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        rows="4"
                ></textarea>
            </div>

            <Button on:click={saveAlerte} class="w-full bg-blue-600 hover:bg-blue-700 text-white">
                {isEditMode ? "Modifier" : "Ajouter"}
            </Button>
        </div>

        <!-- Tableau -->
        <div class="bg-white p-6 rounded-lg shadow-md col-span-2">
            <div class="flex justify-between items-center mb-4">
                <h4 class="text-xl font-semibold text-gray-800">Liste des alertes</h4>
            </div>

            <div class="mb-4">
                <Input placeholder="Rechercher..." type="text" bind:value={searchQuery} class="w-full" />
            </div>

            <Table class="border border-gray-300">
                <TableHead class="bg-gray-100 border-b">
                    {#each ["Destinataire", "Objet", "Message", "Action"] as title}
                        <TableHeadCell class="px-4 py-2">{title}</TableHeadCell>
                    {/each}
                </TableHead>
                <TableBody>
                    {#if loading && main_data.length === 0}
                        <TableBodyRow>
                            <TableBodyCell colspan={4} class="text-center py-4">Chargement...</TableBodyCell>
                        </TableBodyRow>
                    {:else if main_data.length === 0}
                        <TableBodyRow>
                            <TableBodyCell colspan={4} class="text-center py-4">Aucune alerte trouvée</TableBodyCell>
                        </TableBodyRow>
                    {:else}
                        {#each main_data as item}
                            <TableBodyRow class="text-sm">
                                <TableBodyCell class="px-4 py-2 table-cell">{item?.destinateur?.libelle}</TableBodyCell>
                                <TableBodyCell class="px-4 py-2 table-cell">{item.objet}</TableBodyCell>
                                <TableBodyCell class="px-4 py-2 table-cell">{item.message}</TableBodyCell>
                                <TableBodyCell class="px-2 py-2 table-cell">
                                    <button on:click={() => editAlerte(item)} class="text-blue-500 mr-2">
                                        ✏️
                                    </button>
                                    <button on:click={() => confirmDelete(item.id)} class="text-red-500">
                                        🗑️
                                    </button>
                                </TableBodyCell>
                            </TableBodyRow>
                        {/each}
                    {/if}
                </TableBody>
            </Table>
        </div>
    </div>
</section>

<!-- Modal de confirmation -->
<Modal bind:open={showDeleteModal} title="Confirmation">
    <p>Voulez-vous vraiment supprimer cette alerte ?</p>
    <div class="flex justify-end space-x-4 mt-4">
        <Button on:click={() => (showDeleteModal = false)} class="bg-gray-500 text-white">Annuler</Button>
        <Button on:click={deleteAlerte} class="bg-red-600 text-white">Supprimer</Button>
    </div>
</Modal>

<Footer />

<style>
    .main-content {
        margin-top: 135px;
    }

    .table-cell {
        font-size: 1rem; /* Augmente la taille de la police */
    }

</style>
