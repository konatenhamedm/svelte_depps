<script lang="ts">
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import Notification from "$components/_includes/Notification.svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  export let open: boolean = false;
  let isLoad = false;

  let icons: any = {
    path: null as File | null,
    libelle: ""
  };
  export let sizeModal: any = "lg";
  export let userUpdateId: any;

  export let data: Record<string, string> = {};

  function init(form: HTMLFormElement) {}

  async function SaveFunction() {
    const formData = new FormData();
    formData.append("libelle", icons.libelle);
    formData.append("userUpdate", userUpdateId);

   
    if (icons.path instanceof File) {
      // Vérifie que c'est bien un fichier
      formData.append("path", icons.path);
    }
    console.log(formData)

    isLoad = true;
    try {
      const res = await fetch(BASE_URL_API + "/adminDocument/create", {
        method: "POST",
       
        body: formData
      });

      if (res.ok) {
        isLoad = false;
        open = false;
        notificationMessage = "document créé avec succès!";
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

  let avatarPreview: any = "";

  function handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      icons.path = file;
      avatarPreview = URL.createObjectURL(file);
    }
  }
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Ajouter un document "
    : "Ajouter un document"}
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
          bind:field={icons.libelle}
          placeholder="entrez le libelle"
          class="w-full"
        ></InputSimple>
      </div>
      <div class="grid grid-cols-1">
        <Label class="col-span-6 space-y-1 sm:col-span-3">
          <span>Document</span>
          <Input 
            type="file"
            name="document"
            on:change={handleFileUpload}
            class="border outline-none form-input font-normal rounded block w-full border-gray-200 text-sm focus:border-gray-300 focus:ring-0 bg-white"
            placeholder="Document"
          />
        </Label>
        <p>{avatarPreview}</p>
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
