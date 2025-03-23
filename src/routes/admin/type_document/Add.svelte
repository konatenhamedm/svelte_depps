<script lang="ts">
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import Notification from "$components/_includes/Notification.svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";
  import { onMount } from "svelte";
  import InputSelect from "$components/inputs/InputSelect.svelte";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  export let open: boolean = false;
  let isLoad = false;

  let typePersonnes: any = []; // Assume that this will be populated with cities

  let typeDoc: any = {
    nombre: "",
    libelle: "",
    typePersonne: ""
  };
  export let sizeModal: any = "lg";
  export let userUpdateId: any;

  export let data: Record<string, string> = {};

  function init(form: HTMLFormElement) {}

  async function SaveFunction() {
    isLoad = true;
    try {
      const res = await fetch(BASE_URL_API + "/typeDocument/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: typeDoc.nombre,
          libelle: typeDoc.libelle,
          typePersonne: typeDoc.typePersonne,
          userUpdate: userUpdateId
        })
      });

      if (res.ok) {
        isLoad = false;
        open = false;
        notificationMessage = "type document créé avec succès!";
        notificationType = "success";
        showNotification = true;
      }
    } catch (error) {
      notificationMessage = "Une erreur crée lors de l enregistrement";
      notificationType = "error";
      showNotification = true;
      isLoad = false;
      console.error("Error saving:", error);
    }
  }

  function handleModalClose(event: Event) {
    if (isLoad) {
      event.preventDefault(); // Prevent modal from closing if loading
    }
  }

  async function getTypePersonne() {
    try {
      const res = await fetch(BASE_URL_API + "/typePersonne");
      const data = await res.json();
      typePersonnes = data.data;
    } catch (error) {
      console.error("Error fetching villes:", error);
    }
  }

  onMount(async () => {
    await getTypePersonne();
  });
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Ajouter une type document "
    : "Ajouter une type document"}
  size={sizeModal}
  class="m-4 modale_general"
  on:close={handleModalClose}
>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <div class="space-y-6 p-0">
    <form action="#" use:init>
      <div class="grid grid-cols-1 gap-4 mb-4">
        <InputSimple
          fieldName="libelle"
          label="Libelle"
          bind:field={typeDoc.libelle}
          placeholder="entrez le libelle"
          class="w-full"
        ></InputSimple>
        <InputSimple
          fieldName="nombre"
          label="Nombre"
          bind:field={typeDoc.nombre}
          placeholder="entrez le nombre"
          class="w-full"
        ></InputSimple>
      </div>
      <div class="grid grid-cols-1 gap-6">
        <InputSelect
          label="Type personne"
          bind:selectedId={typeDoc.typePersonne}
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
