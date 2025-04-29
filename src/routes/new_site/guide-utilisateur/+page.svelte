<script lang="ts">
    import Header from "$components/_includes/new_site/Header.svelte";
    import Footer from "$components/_includes/new_site/Footer.svelte";
    import { onMount } from "svelte";
    import { apiFetch, BASE_URL_API_UPLOAD } from "$lib/api";
    import Modal from "$components/Modal.svelte";

    import { EyeOutline } from "flowbite-svelte-icons";
    import { goto } from "$app/navigation";
    import Sub_header from "$components/_includes/new_site/Sub_header.svelte";

    export let data;
    let user = data?.user;
    let alertes: any[] = [];


    type Document = {
        id: number;
        libelle: string;
        path: string;
    };

    let documents: Document[] = [];

    function handleView(doc: Document) {
        window.open(doc.path, "_blank");
    }

    function handleDownload(doc: Document) {
        const link = document.createElement("a");
        link.href = doc.path;
        link.download = doc.libelle;
        link.click();
    }



    let currentPage = 1;
    const itemsPerPage = 3;
    let showAddPopup = false;
    let showEditPopup = false;
    let showDeletePopup = false;
    let selectedForum: any = null;
    let loading = false;

    async function fetchData(userId: number) {
        loading = true;
        try {
            const res = await apiFetch(true, `/adminDocument/`);
            if (res) {
                alertes = res.data;
                console.log("content main_data", alertes);
            } else {
                console.error("Erreur de récupération:", res.statusText);
            }
        } catch (error) {
            console.error("Erreur API:", error);
        } finally {
            loading = false;
        }
    }

    onMount(async () => {
        await fetchData(user?.id);
    });

    let totalPages = 10;

    // Calcul des alertes paginés
    $: paginatedalertes = alertes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calcul du nombre total de pages
    $: totalPages = Math.ceil(alertes.length / itemsPerPage);
    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }


    function getPageNumbers() {
        let pages = [];
        if (totalPages <= 7) {
            // Affiche toutes les pages si <= 7 pages
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage > 3) pages.push(1, '...');
            for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...', totalPages);
        }
        return pages;
    }

    // Fonctions pour gérer les popups
    function openAddPopup() {
        showAddPopup = true;
    }

    function closeAddPopup() {
        showAddPopup = false;
    }

    function openEditPopup(forum: any) {
        selectedForum = forum;
        showEditPopup = true;
    }

    function openDeletePopup(forum: any) {
        selectedForum = forum;
        showDeletePopup = true;
    }

    function closeEditPopup() {
        showEditPopup = false;
        selectedForum = null;
    }

    function closeDeletePopup() {
        showDeletePopup = false;
        selectedForum = null;
    }

    function addForum(newForum: any) {
        alertes = [...alertes, { ...newForum, id: alertes.length + 1 }];
    }

    function updateForum(updatedForum: any) {
        alertes = alertes.map((f) => (f.id === updatedForum.id ? updatedForum : f));
    }

    $: if (showAddPopup == false || showEditPopup == false || showDeletePopup == false) {
        fetchData(user?.id);
    }

    function navigateToDashboard() {
        goto("/site/dashboard");
    }

    let isModalOpen = false;
    let pdfUrl = "";

    function openModal(url:any) {
        pdfUrl = url; // ✅ Met à jour la variable réactive
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
    }
</script>

<Header {user} />
<Sub_header
        titre="Liste des documents"
        subTitles={[{ title: "Liste des documents", link: "/new_site/guide-utilisateur" }]}
/>
<br /><br />

<main class="container mx-auto px-4 py-8 md:py-12">
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-4 py-5 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-800">Liste des documents d'alerte</h2>
        </div>

        <div class="p-6 space-y-4">
            {#if paginatedalertes.length > 0}
                {#each paginatedalertes as forum, index}
                    <div class="flex items-center justify-between border rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition">
                        <div class="flex items-center space-x-4">
                            <i class="fa fa-file text-orange-500 text-2xl"></i>
                            <div>
                                <p class="text-sm text-gray-500">Document :</p>
                                <p class="text-base font-medium text-gray-700">{forum?.libelle}</p>
                            </div>
                        </div>
                        <button
                                class="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white hover:bg-green-700 transition"
                                on:click={() =>
                openModal(
                  BASE_URL_API_UPLOAD + forum.path.path + '/' + forum.path.alt
                )
              }
                        >
                            <i class="fa fa-eye"></i>
                        </button>
                    </div>
                {/each}
            {:else}
                <div class="text-center text-gray-500 py-10 bg-gray-50 rounded-md">
                    Aucune alerte pour l'instant
                </div>
            {/if}
        </div>

        <!-- Pagination -->
        {#if alertes.length > itemsPerPage}
            <div class="px-4 py-3 border-t border-gray-200 bg-white flex justify-center">
                <div class="flex space-x-2">
                    <button
                            on:click={() => goToPage(1)}
                            disabled={currentPage === 1}
                            class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Premier
                    </button>
                    <button
                            on:click={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Précédent
                    </button>

                    {#each getPageNumbers() as page}
                        {#if page === '...'}
                            <span class="px-3 py-1 text-gray-400">...</span>
                        {:else}
                            <button
                                    on:click={() => goToPage(page)}
                                    class={`px-3 py-1 rounded-md ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                            >
                                {page}
                            </button>
                        {/if}
                    {/each}

                    <button
                            on:click={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Suivant
                    </button>
                    <button
                            on:click={() => goToPage(totalPages)}
                            disabled={currentPage === totalPages}
                            class="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Dernier
                    </button>
                </div>
            </div>
        {/if}
    </div>
</main>


<Modal isOpen={isModalOpen} {pdfUrl} onClose={closeModal} />


<Footer />

<style>
    .fa-eye:before {
        color: #1faae1;
        font-size: 20px;
    }
</style>
