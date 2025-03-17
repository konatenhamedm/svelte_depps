<script lang="ts">
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import Notification from "$components/_includes/Notification.svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";
  import InputSelect from "$components/inputs/InputSelect.svelte";
  import { onMount } from "svelte";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";
  let typeProfessions : any = []; // Assume that this will be populated with cities

  export let open: boolean = false;
  let isLoad = false;

  let icons: any = {
    code: "",
    libelle: "",
    typeProfession: "",
    montantRenouvellement: "",
    montantNouvelleDemande: "",
  };
  export let sizeModal: any = "lg";
  export let userUpdateId: any;

  export let data: Record<string, string> = {};

  function init(form: HTMLFormElement) {}

  async function SaveFunction() {

    console.log({
          typeProfession: icons.typeProfession,
          libelle: icons.libelle,
          userUpdate: userUpdateId,
        })
    isLoad = true;
    try {
      const res = await fetch(BASE_URL_API + "/profession/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          typeProfession: icons.typeProfession,
          libelle: icons.libelle,
          montantRenouvellement: icons.montantRenouvellement,
          montantNouvelleDemande: icons.montantNouvelleDemande,
          userUpdate: userUpdateId,
        }),
      });

      if (res.ok) {
        isLoad = false;
        open = false;
        notificationMessage = "profession créé avec succès!";
        notificationType = "success";
        showNotification = true;
      }
    } catch (error) {
      notificationMessage = "Une erreur crée lors de l enregistrement";
      notificationType = "error";
      showNotification = true;
      console.error("Error saving:", error);
    }
  }

  function handleModalClose(event: Event) {
    if (isLoad) {
      event.preventDefault(); // Prevent modal from closing if loading
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
  title={Object.keys(data).length ? "Ajouter une  profession " : "Ajouter une  profession"}
  size={sizeModal}
  class="m-4 modale_general"
  on:close={handleModalClose}
>
  <!-- Modal body -->
  <div class="space-y-6 p-0">
    <form action="#" use:init>
      <div class="grid grid-cols-1 mb-2">
     

        <InputSimple
          fieldName="libelle"
          label="Libelle"
          bind:field={icons.libelle}
          placeholder="entrez le libelle"
          class="w-full"
        ></InputSimple>
      </div>

      <div class="grid grid-cols-1 gap-6 mb-2">
        
        <InputSelect 
        label="Type profession"
        bind:selectedId={icons.typeProfession}
        datas={typeProfessions}
        id="typePersonne"
    />
       
      </div>
      <div class="grid grid-cols-2 gap-2">
      <div>
          <InputSimple
          fieldName="montantNouvelleDemande"
          label="Montant nouvelle demande"
          bind:field={icons.montantNouvelleDemande}
          placeholder="entrez le montant"
          class="w-full"
        ></InputSimple>
      </div>
      <div>

        <InputSimple
        fieldName="montantRenouvellement"
        label="Montant renouvellement"
        bind:field={icons.montantRenouvellement}
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
          style="background-color: blue;"
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
          style="background-color: #55a1ff;"
          type="button"
          class="bg-[#55a1ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#008020]"
          on:click={SaveFunction}
        >
          Enregistrer
        </button>
      {/if}
    </div>
  </div>
</Modal>

{#if showNotification}
  <Notification
    message={notificationMessage}
    type={notificationType}
    duration={5000}
  />
{/if}
