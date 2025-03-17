<script lang="ts">
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";
  import InputSelect from "$components/inputs/InputSelect.svelte";
  import { onMount } from "svelte";

  export let open: boolean = false; // modal control
  let isLoad = false;
  let typeProfession: any = "";
  let libelle: string = "";
  let montantNouvelleDemande: string = "";
  let montantRenouvellement: string = "";
  let typeProfessions : any = [];

  export let sizeModal: any = "lg";
  export let userUpdateId: any;

  export let data: Record<string, string> = {};

  // Initialize form data with the provided record
  function init(form: HTMLFormElement) {
    typeProfession = data?.typeProfession?.id;
    libelle = data?.libelle;
    montantRenouvellement = data?.montantRenouvellement;
    montantNouvelleDemande = data?.montantNouvelleDemande;
  }

  async function SaveFunction() {
    isLoad = true;

    try {
      const res = await fetch(BASE_URL_API + "/profession/update/" + data?.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeProfession: typeProfession,
          libelle: libelle,
          montantRenouvellement: montantRenouvellement,
          montantNouvelleDemande: montantNouvelleDemande,
          userUpdate: userUpdateId,
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

  async function getTypeProfession() {
        try {
            const res = await fetch(BASE_URL_API + "/typeProfession");
            const data = await res.json();
            typeProfessions = data.data
        } catch (error) {
            console.error("Error fetching villes:", error);
        }
    }

    onMount(async () => {
        await getTypeProfession();
    })
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Modification  profession"
    : "Modification  profession"}
  size={sizeModal}
  class="m-4 modale_general"
  on:close={handleModalClose}
>
  <!-- Modal body -->
  <div class="space-y-6 p-0">
    <form action="#" use:init>
      <div class="grid grid-cols-1 mb-2">
        <div class="grid grid-cols-1">
       
          <InputSimple
          fieldName="libelle"
          label="Libelle"
          bind:field={libelle}
          placeholder="entrez le libelle"
          class="w-full"
        ></InputSimple>
      </div>

      <div class="grid grid-cols-1 gap-6 mb-2">
        
        <InputSelect
        label="Type profession"
        bind:selectedId={typeProfession}
        datas={typeProfessions}
        id="typePersonne"
    />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
            <InputSimple
            fieldName="montantNouvelleDemande"
            label="Montant nouvelle demande"
            bind:field={montantNouvelleDemande}
            placeholder="entrez le montant"
            class="w-full"
          ></InputSimple>
        </div>
        <div>
  
          <InputSimple
          fieldName="montantRenouvellement"
          label="Montant renouvellement"
          bind:field={montantRenouvellement}
          placeholder="entrez le montant"
          class="w-full"
        ></InputSimple>
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
