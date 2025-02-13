<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  // Simulated data
  const payments = Array(20).fill(null).map((_, index) => ({
      type: "Renouvellement",
      montant: "25 000 FCFA",
      date: "03 décembre 2024 à 11:11:41"
  }));

  // Pagination
  let currentPage = 1;
  let itemsPerPage = 5;

  $: totalPages = Math.ceil(payments.length / itemsPerPage);
  $: paginatedPayments = payments.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  function nextPage() {
      if (currentPage < totalPages) currentPage++;
  }

  function prevPage() {
      if (currentPage > 1) currentPage--;
  }

  function goToPage(page) {
      currentPage = page;
  }

</script>

    <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(426px, 612px);"></div>
        <div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(451px, 637px);">

        </div>
            <Header />
            <Slide />

        <div class="max-w-[125rem] mx-auto p-6 history">
            <h1 class="text-2xl font-bold text-blue-500 mb-6">HISTORIQUE DE PAIEMENT</h1>

        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left  text-lg font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                        <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="relative px-6 py-3">
                            <span class="sr-only">Actions</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    {#each paginatedPayments as payment}
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{payment.type}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{payment.montant}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-lg text-gray-900">{payment.date}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button class="text-gray-400 hover:text-gray-600">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                                        <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                                        <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="currentColor" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    {/each}
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div class="flex-1 flex justify-between items-center">
                    <div>
                        <p class="text-sm text-gray-700">
                            Affichage de <span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> à <span class="font-medium">{Math.min(currentPage * itemsPerPage, payments.length)}</span> sur <span class="font-medium">{payments.length}</span> résultats
                        </p>
                    </div>
                    <div class="flex space-x-2">
                        <button
                                on:click={prevPage}
                                disabled={currentPage === 1}
                                class="relative inline-flex items-center px-4 py-2 border text-black border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Précédent
                        </button>

                        <!-- Page numbers -->
                        <div class="flex space-x-2">
                            {#each Array(totalPages) as _, i}
                                <button
                                        on:click={() => goToPage(i + 1)}
                                        class="relative btn-pagination inline-flex items-center px-4 py-2 border {currentPage === i + 1 ? 'bg-blue-500 text-black border-blue-500' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'} text-sm font-medium rounded-md"
                                >
                                    {i + 1}
                                </button>
                            {/each}
                        </div>

                        <button
                                on:click={nextPage}
                                disabled={currentPage === totalPages}
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>

<style>
    .history{
        margin-top: 130px;
        margin-bottom: 130px;
    }

    .btn-pagination{
        color: black !important;
    }
</style>