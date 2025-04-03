<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let currentPage: number;
  export let totalPages: number;

  const dispatch = createEventDispatcher();

  function previousPage() {
    if (currentPage > 1) {
      dispatch('changePage', currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      dispatch('changePage', currentPage + 1);
    }
  }

  function setPage(page: number) {
    dispatch('changePage', page);
  }

  function generatePages() {
    let pages = [];

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, 5, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }

    return pages;
  }
</script>

<nav class="flex items-center space-x-2" aria-label="Pagination">
  <!-- Bouton précédent -->
  <button
          type="button"
          class:disabled={currentPage === 1}
          on:click={previousPage}
          class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
    <svg class="size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6"></path>
    </svg>
  </button>

  <!-- Pages dynamiques -->
  {#each generatePages() as page}
    {#if page === "..."}
      <span class="px-2 text-gray-500">...</span>
    {:else}
      <button
              type="button"
              class={currentPage === page ? "min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-black border border-gray-200 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300" : "min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-black hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100"}
              on:click={() => setPage(page)}>
        {page}
      </button>
    {/if}
  {/each}

  <!-- Bouton suivant -->
  <button
          type="button"
          class:disabled={currentPage === totalPages}
          on:click={nextPage}
          class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
    <svg class="size-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 6 6 6-6 6"></path>
    </svg>
  </button>
</nav>
