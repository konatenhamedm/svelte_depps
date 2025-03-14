<script>
    export let count = 5;
</script>

{#each Array(count) as _}
    <div class="flex items-start p-4 hover:bg-gray-50 relative">
        <div class="h-2 w-2 rounded-full bg-green-400 absolute left-2 top-6"></div>
        <div class="mr-3 flex-shrink-0">
            <div class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        <div class="flex-grow">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        </div>
        <div class="w-6 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
{/each}