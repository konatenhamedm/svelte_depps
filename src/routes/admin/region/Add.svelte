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
  let directions: any = [];

  export let open: boolean = false;
  let isLoad = false;

  let icons: any = {
    code: "",
    libelle: ""
  };
  export let sizeModal: any = "lg";
  export let userUpdateId: any;

  export let data: Record<string, string> = {};

  function init(form: HTMLFormElement) {}

  async function SaveFunction() {
    isLoad = true;
    try {
      const res = await fetch(BASE_URL_API + "/region/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          code: icons.code,
          libelle: icons.libelle,
          direction: icons.direction,
          userUpdate: userUpdateId
        })
      });

      if (res.ok) {
        isLoad = false;
        open = false;
        notificationMessage = "region créé avec succès!";
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

  async function getData() {
    try {
      const res = await fetch(BASE_URL_API + "/direction/");
      const data = await res.json();
      directions = data.data;
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  }

  onMount(async() => {
   await getData();
  });
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Ajouter une region "
    : "Ajouter une region"}
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
      <div class="grid grid-cols-1">
        <InputSimple
          fieldName="code"
          label="Code"
          bind:field={icons.code}
          placeholder="entrez le code"
          class="w-full"
        ></InputSimple>

        <InputSimple
          fieldName="libelle"
          label="Libelle"
          bind:field={icons.libelle}
          placeholder="entrez le libelle"
          class="w-full"
        ></InputSimple>

        <InputSelect
        label="Direction"
        bind:selectedId={icons.direction}
        datas={directions}
        id="direction"
      
      ></InputSelect>
        
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
