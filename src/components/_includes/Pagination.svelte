<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let currentPage: number;
  export let totalPages: number;

  const dispatch = createEventDispatcher();

  function previousPage() {
    if (currentPage > 1) {
      dispatch('changePage', currentPage - 1); // Émettre un événement
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      dispatch('changePage', currentPage + 1); // Émettre un événement
    }
  }

  function setPage(page: number) {
    dispatch('changePage', page); // Émettre un événement
  }
</script>

<nav class="flex items-center -space-x-px" aria-label="Pagination">
  <button 
    type="button" 
    class:disabled={currentPage === 1} 
    on:click={previousPage} 
    class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6"></path>
    </svg>
    <span class="hidden sm:block">Previous</span>
  </button>

  {#each Array(totalPages) as _, i}
    <button 
      type="button" 
      class={currentPage === i + 1 ? "min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-black border border-gray-200 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-300" : "min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-black hover:bg-gray-100 py-2 px-3 text-sm first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-100"} 
      on:click={() => setPage(i + 1)}>
      {i + 1}
    </button>
  {/each}

  <button 
    type="button" 
    class:disabled={currentPage === totalPages} 
    on:click={nextPage} 
    class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
    <span class="hidden sm:block">Next</span>
    <svg class="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 6 6 6-6 6"></path>
    </svg>
  </button>
</nav>
