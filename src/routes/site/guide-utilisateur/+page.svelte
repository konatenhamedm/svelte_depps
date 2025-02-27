<script lang="ts">
    import Slide from "$components/Slide.svelte";
    import Footer from "$components/Footer.svelte";
    import { faEye, faDownload, faFile, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
    import Fa from "svelte-fa";

    export let data;
    let user = data?.user;

    type Document = {
        id: number,
        libelle: string,
        path: string,
    };

    const documents: Document[] = [
        {
            id: 1,
            libelle: 'Contrat de service',
            path: 'https://example.com/doc1.pdf'
        },
        {
            id: 2,
            libelle: 'Facture client',
            path: 'https://example.com/doc2.pdf'
        },
        {
            id: 3,
            libelle: 'Rapport annuel',
            path: 'https://example.com/doc3.pdf'
        },
        // Ajoutez plus de documents ici pour tester la pagination
    ];

    let currentPage = 1;
    const itemsPerPage = 2; // Nombre de documents par page

    // Calculer les documents à afficher pour la page courante
    $: paginatedDocuments = documents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Calculer le nombre total de pages
    $: totalPages = Math.ceil(documents.length / itemsPerPage);

    function handleView(doc: Document) {
        window.open(doc.path, '_blank');
    }

    function handleDownload(doc: Document) {
        const link = document.createElement('a');
        link.href = doc.path;
        link.download = doc.libelle;
        link.click();
    }

    function nextPage() {
        if (currentPage < totalPages) {
            currentPage += 1;
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            currentPage -= 1;
        }
    }
</script>

<div id="guide-user">
    <Slide user={user} />
    <div class="w-[55%] mx-auto bg-white rounded-lg shadow-lg main-div">
        <div class="p-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-6">Liste des documents</h1>
            <div class="divide-y divide-gray-200">
                {#each paginatedDocuments as doc, i}
                    <div class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors {i % 2 === 1 ? 'bg-gray-50' : 'bg-white'}">
                        <div class="flex items-start gap-4">
                            <div class="pt-1">
                                <Fa icon={faFile} class="text-blue-500 text-xl" />
                            </div>
                            <div class="flex flex-col">
                                <span class="text-md font-semibold text-gray-900">{doc.libelle}</span>
                                <span class="text-xs text-gray-500">{doc.path}</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <button
                                    class="flex items-center view-button gap-2 px-4 py-2 text-sm text-gray-700  hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all border border-gray-200"
                                    on:click={() => handleView(doc)}
                            >
                                <Fa icon={faEye} class="text-sm" />
                                <span>Voir</span>
                            </button>
                            <button
                                    class="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all"
                                    on:click={() => handleDownload(doc)}
                            >
                                <Fa icon={faDownload} class="text-sm" />
                                <span>Télécharger</span>
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
            <div class="flex justify-between items-center mt-6">
                <button
                        class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all border border-gray-200"
                        on:click={prevPage}
                        disabled={currentPage === 1}
                >
                    <Fa icon={faChevronLeft} class="text-sm" />
                    <span>Précédent</span>
                </button>
                <span class="text-sm text-gray-700">Page {currentPage} sur {totalPages}</span>
                <button
                        class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all border border-gray-200"
                        on:click={nextPage}
                        disabled={currentPage === totalPages}
                >
                    <span>Suivant</span>
                    <Fa icon={faChevronRight} class="text-sm" />
                </button>
            </div>
        </div>
    </div>
    <Footer />
</div>

<style>
    .main-div {
        margin-top: 170px;
        margin-bottom: 150px;
        border: 1px solid #e5e7eb;
    }

    .view-button{
        background: #6e5dc1 !important;
    }
</style>