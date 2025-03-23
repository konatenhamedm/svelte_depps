<script lang="ts">
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API, BASE_URL_API_UPLOAD } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";

  export let open: boolean = false; // modal control
  let isLoad = false;
  let path: string = "";
  let libelle: string = "";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  // Initialize form data with the provided record
  function init(form: HTMLFormElement) {
    path = data?.path;
    libelle = data?.libelle;
    avatarPreview =
      BASE_URL_API_UPLOAD + data?.path.path + "/" + data?.path.alt;
  }

  let icons: any = {
    path: null as File | null,
    libelle: ""
  };
  export let sizeModal: any = "lg";
  export let userUpdateId: any;

  export let data: Record<string, string> = {};

  async function SaveFunction() {
    const formData = new FormData();
    formData.append("libelle", icons.libelle);
    formData.append("userUpdate", userUpdateId);

    if (icons.path instanceof File) {
      // Vérifie que c'est bien un fichier
      formData.append("path", icons.path);
    }
    console.log(formData);

    isLoad = true;
    try {
      const res = await fetch(
        BASE_URL_API + "/adminDocument/update/" + data?.id,
        {
          method: "POST",
          body: formData
        }
      );

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
      event.preventDefault();
    }
  }

  let avatarPreview: any = "";

  function handleFileUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      path = file;
      avatarPreview = URL.createObjectURL(file);
    }
  }
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Modification documentation"
    : "Modification documentation"}
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
