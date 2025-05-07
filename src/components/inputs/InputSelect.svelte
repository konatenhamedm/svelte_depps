<script lang="ts">
  type Select = { id: number, libelle: string };
  
  export let label: string;
  export let datas: Select[] = [];
  export let id: string;
  export let selectedId: number | null = null;
  export let disabled: boolean = false;
</script>

<div class="w-full mx-auto col-span-6 space-y-1 sm:col-span-3">
  <label for="{id}" class="block mb-2 text-sm font-medium text-gray-900">{label}</label>
  <select
    id="{id}"
    disabled={disabled}
    bind:value={selectedId}
    class="select2 w-full form-input font-normal rounded block border-gray-200 text-sm text-black focus:border-gray-300 focus:ring-0 bg-white"
  >
    <option value="" selected>Veuillez sélectionner {label}</option>
    {#each datas as data (data.id)}
      <option value="{data.id}">{data.libelle}</option>
    {/each}
  </select>
</div>


