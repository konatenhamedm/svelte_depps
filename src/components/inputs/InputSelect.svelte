<script lang="ts">
type Select = {id:number,libelle:string }
export let label;
export let datas: Select[] = [];
export let id;
export let selectedId : number ;
export let isSelected = true;
export let disabled: boolean = false;

</script>


<div class="w-full  mx-auto">
    <label for="{id}" class="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <select id="{id}"     disabled={disabled} bind:value={selectedId} class="select2 w-full h-10 form-input font-normal rounded block  border-gray-200 text-sm focus:border-gray-300 focus:ring-0 bg-white">
      <option value="">Veillez selectionnez {label}</option>
      {#each datas as data }
     {#if isSelected }
     <option  value="{data.id}"  >{data.libelle}</option>
     {:else }
     <option  value="{data.libelle}"  >{data.libelle}</option>
     {/if }
     {/each}
     
        <!-- <option value="AF">Afghanistan</option>
      <option value="DZ">Algeria</option>
      <option value="AO">Angola</option>
      <option value="AR">Argentina</option> -->
      <!-- Autres options -->
    </select>
  </div>

  <!-- <p>voici la valeur selectionner : {selectedId}</p> -->