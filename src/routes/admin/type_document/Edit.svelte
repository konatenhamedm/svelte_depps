<script lang="ts">
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";
  import { onMount } from "svelte";
  import InputSelect from "$components/inputs/InputSelect.svelte";

  export let open: boolean = false; // modal control
  let isLoad = false;
  let nombre: string = "";
  let libelle: string = "";
  let typePersonne: any = "";
  let typePersonnes : any = []; // Assume that this will be populated with cities

  export let sizeModal: any = "lg";
  export let userUpdateId: any;

  export let data: Record<string, string> = {};

  // Initialize form data with the provided record
  function init(form: HTMLFormElement) {
    nombre = data?.nombre;
    libelle = data?.libelle;
    typePersonne = data?.typePersonne.id;
  }

  async function SaveFunction() {
    isLoad = true;

    try {
      const res = await fetch(BASE_URL_API + "/typeDocument/update/" + data?.id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre,
          libelle: libelle,
          typePersonne: typePersonne,
          userUpdate: userUpdateId,
        }),
      });

      if (res.ok) {
        isLoad = false;
        open = false; // Close the modal
      }
    } catch (error) {
      console.error("Error saving:", error);
      isLoad = false;

    }
  }

  function handleModalClose(event: Event) {
    if (isLoad) {
      event.preventDefault();
    }
  }

  async function getTypePersonne() {
        try {
            const res = await fetch(BASE_URL_API + "/typePersonne");
            const data = await res.json();
            typePersonnes = data.data
        } catch (error) {
            console.error("Error fetching villes:", error);
        }
    }

    onMount(async () => {
        await getTypePersonne();
    })
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Modification de type document"
    : "Modification de type document"}
  size={sizeModal}
  class="m-4 modale_general"
  on:close={handleModalClose}
>
  <!-- Modal body -->
  <div class="space-y-6 p-0">
    <form action="#" use:init>
      <div class="grid grid-cols-1 gap-4 mb-4">
       

        <InputSimple
          fieldName="libelle"
          label="Libelle"
          bind:field={libelle}
          placeholder="entrez le libelle"
          class="w-full"
        ></InputSimple>
         <InputSimple
          fieldName="nombre"
          label="Nombre"
          bind:field={nombre}
          placeholder="entrez le nombre"
          class="w-full"
        ></InputSimple>
      </div>
      <div class="grid grid-cols-1 gap-6">
        
        <InputSelect
        label="Type personne"
        bind:selectedId={typePersonne}
        datas={typePersonnes}
        id="typePersonne"
    />
       
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
