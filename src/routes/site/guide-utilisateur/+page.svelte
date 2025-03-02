<script lang="ts">
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import {
    faEye,
    faDownload,
    faFile,
    faChevronLeft,
    faChevronRight
  } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import Modal from "$components/Modal.svelte";
  import { apiFetch, BASE_URL_API_UPLOAD } from "$lib/api.js";
  import { onMount } from "svelte";

  export let data;
  let user = data?.user;
  let loading = false;

  type Document = {
    id: number;
    libelle: string;
    path: string;
  };

  let documents: Document[] = [];

  async function fetchData() {
    loading = true;
    try {
      const res = await apiFetch(true, `/adminDocument/`);
      if (res) {
        documents = res.data;
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
    await fetchData();
  });

  let currentPage = 1;
  const itemsPerPage = 4; // Nombre de documents par page

  // Calculer les documents à afficher pour la page courante
  $: paginatedDocuments = documents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculer le nombre total de pages
  $: totalPages = Math.ceil(documents.length / itemsPerPage);

  function handleView(doc: Document) {
    window.open(doc.path, "_blank");
  }

  function handleDownload(doc: Document) {
    const link = document.createElement("a");
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

<Slide {user} />
<main style="padding-top: 200px" class="pb-20">
  <section class="iletisim-form-alani">
    <div id="guide-user">
      <div class="w-[55%] mx-auto bg-white rounded-lg shadow-lg main-div">
        <div class="p-1">
          <h1 class="text-2xl font-bold text-gray-800 mb-6">
            Liste des documents
          </h1>
          <div class="divide-y divide-gray-200">
            {#if loading }
              {#each Array(3) as _, i}
                <div
                  class="flex items-center justify-between p-4 bg-gray-100 animate-pulse"
                >
                  <div class="flex items-start gap-4">
                    <div class="w-6 h-6 bg-gray-300 rounded"></div>
                    <div class="flex flex-col gap-2">
                      <div class="w-40 h-4 bg-gray-300 rounded"></div>
                      <div class="w-24 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div class="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
              {/each}
            {:else}
              {#each paginatedDocuments as doc, i}
                <div
                  class="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors {i %
                    2 ===
                  1
                    ? 'bg-gray-50'
                    : 'bg-white'}"
                >
                  <div class="flex items-start gap-4">
                    <div class="pt-1">
                      <Fa icon={faFile} class="text-blue-500 text-xl" />
                    </div>
                    <div class="flex flex-col">
                      <span class="text-3xl  font-semibold text-gray-900"
                        >{doc.libelle}</span
                      >
                      <span class="text-xs text-gray-500">
                        {BASE_URL_API_UPLOAD +
                          doc.path.path +
                          "/" +
                          doc.path.alt}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <button
                      class="flex items-center view-button gap-2 px-4 py-2 text-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all border border-gray-200"
                      on:click={() =>
                        openModal(
                          BASE_URL_API_UPLOAD +
                            doc.path.path +
                            "/" +
                            doc.path.alt
                        )}
                    >
                      <Fa icon={faEye} class="text-sm" />
                      <span>Voir</span>
                    </button>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
          <div class="flex justify-between items-center mt-6">
            <button
              class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all border border-gray-200"
              style="color: black !important;"
              on:click={prevPage}
              disabled={currentPage === 1}
            >
              <Fa icon={faChevronLeft} class="text-sm" />
              <span>Précédent</span>
            </button>
            <span class="text-sm text-gray-700"
              >Page {currentPage} sur {totalPages}</span
            >
            <button
              class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all border border-gray-200"
              style="color: black !important;"
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
  </section>
</main>

<Modal isOpen={isModalOpen} {pdfUrl} onClose={closeModal} />

<style>
  .main-div {
    margin-top: 100px;
    margin-bottom: 150px;
    border: 1px solid #e5e7eb;
  }

  .view-button {
    background: #6e5dc1 !important;
  }
</style>
