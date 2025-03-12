<script lang="ts">
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API, BASE_URL_API_V2 } from "$lib/api";
  import { Button, Input, Label, Modal, P, Textarea } from "flowbite-svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";

  export let open: boolean = false; // modal control
  let isLoad = false;

  let libelle: string = "";
  let paiement: any;

  export let sizeModal: any = "lg";
  export let userUpdateId: any;

  export let data: Record<string, string> = {};

  let paiementValue:any = 0; // Valeur initiale

function updateField() {
  paiementValue = paiementValue === 1 ? 0 : 1; // Basculer entre 0 et 1

  console.log(paiement);
}

  // Initialize form data with the provided record
  function init(form: HTMLFormElement) {
    
    libelle = data?.libelle;
    paiement = data?.paiement ? 1 : 0;
    paiementValue = paiement;  // Synchroniser la valeur de la checkbox

    console.log(paiement)
  }

  async function SaveFunction() {
    isLoad = true;

    try {
      const res = await fetch(BASE_URL_API_V2 + "/specialite/update/" + data?.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          libelle: libelle,
          userUpdate: userUpdateId,
          paiement: paiementValue,
        }),
      });

      if (res.ok) {
        isLoad = false;
        open = false; // Close the modal
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
  }

  function handleModalClose(event: Event) {
    if (isLoad) {
      event.preventDefault();
    }
  }
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Modification spécialite"
    : "Modification spécialite"}
  size={sizeModal}
  class="m-4 modale_general"
  on:close={handleModalClose}
>
  <!-- Modal body -->
  <div class="space-y-6 p-0">
    <form action="#" use:init>
     
        <div class="grid grid-cols-1 mb-4">
          
          <InputSimple
            fieldName="libelle"
            label="Libelle"
            bind:field={libelle}
            placeholder="entrez le libelle"
            class="w-full"
          ></InputSimple>
        </div>
        <div class="grid grid-cols-1">
          <div class="flex items-center mb-4">
            <input
            id="default-checkbox"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            bind:checked={paiementValue} 
          />
            <label
              for="default-checkbox"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              paiement
            </label>
          </div>
        </div>

    </form>
  </div>

  <!-- Modal footer -->
  <div slot="footer" class="w-full">
    <div class="flex justify-end">
      {#if isLoad}
        <Button
          disabled={true}
          color="blue"
          style="background-color: #55a1ff;"
          type="submit"
        >
          <div class="flex flex-row gap-2">
            <div
              class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"
            ></div>
            <div
              class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.3s]"
            ></div>
            <div
              class="w-3 h-3 rounded-full bg-white animate-bounce [animation-delay:.7s]"
            ></div>
          </div>
        </Button>
      {:else}
        <button
          type="button"
          style="background-color: #55a1ff;"
          class="bg-[#55a1ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#008020]"
          on:click={SaveFunction}
        >
          Modifier
        </button>
      {/if}
    </div>
  </div>
</Modal>
