<script lang="ts">

	
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { apiFetch, BASE_URL_API } from "$lib/api";
  import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
  import Notification from "$components/_includes/Notification.svelte";
  import InputTextArea from "$components/inputs/InputTextArea.svelte";
    import type { Civilite } from "../../../types";
    import { onMount } from "svelte";
    import InputSelect from "$components/inputs/InputSelect.svelte";
    import InputDateSimple from "$components/inputs/InputDateSimple.svelte";

  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  export let open: boolean = false;
  let isLoad = false;

  let icons: any = {
   
    civilite: "",
    profession: "",
    dateNaissance: "",
    dateCreation: "",
  
  };
  export let sizeModal: any = "lg";
  export let userUpdateId: any;
  export let data: Record<string, string> = {};

  function init(form: HTMLFormElement) {}

  async function SaveFunction() {
    isLoad = true;
    try {
      const res = await fetch(BASE_URL_API + "/codeGenerateur/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ profession: icons.profession, civilite: icons.civilite ,dateCreation: icons.dateCreation,dateNaissance: icons.dateNaissance,userUpdate: userUpdateId})
      });

      if (res.ok) {
        isLoad = false;
        open = false;
        notificationMessage = "destinataire créé avec succès!";
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

  /**
   * @type {any[]}
   */
   let objects = [
     { name: "profession", url: "/profession/" },
    { name: "civilites", url: "/civilite/" },
    
  ];

  let values: {
    profession: Civilite[];
    civilites: Civilite[];
    
  } = {
    civilites: [],
    profession: []
  };

  async function getData() {
    try {
      let res = null;
      objects.forEach(async (element) => {
        res = await apiFetch(true, element.url);
        if (res) {
          if (Object.keys(values).includes(element.name)) {
            values[element.name as keyof typeof values] = res.data;
          } else {
            console.error(`Invalid key: ${element.name}`);
          }
        } else {
          console.error(
            "Erreur lors de la récupération des données:",
            res.statusText
          );
        }
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }


  onMount(async() => {
   await getData();

  });
  
</script>

<Modal
  bind:open
  title={Object.keys(data).length
    ? "Ajouter code "
    : "Ajouter un code"}
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
      <div class="grid grid-cols-1 gap-4">
   
      <InputDateSimple fieldName="dateNaissance"
      label="Date de création"
      bind:field={icons.dateCreation}
      placeholder="entrez la date de création"
      >
      </InputDateSimple>
      <InputDateSimple fieldName="dateNaissance"
      label="Date de naissance"
      bind:field={icons.dateNaissance}
      placeholder="entrez la date de naissance"
      >
      </InputDateSimple>

      <InputSelect
        label="Civilite"
        bind:selectedId={icons.civilite}
        datas={values.civilites}
        id="civilite"
      
      ></InputSelect>
      <InputSelect
        label="Profession"
        bind:selectedId={icons.profession}
        datas={values.profession}
        id="profession"
      
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
