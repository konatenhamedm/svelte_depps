<script lang="ts">
  import InputCheck from "$components/inputs/InputCheck.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { BASE_URL } from "$lib/config";
  import { Button, Modal } from "flowbite-svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import { createEventDispatcher } from 'svelte';

  let isLoad = false;

  export let open: boolean = false;
  export let sizeModal: any = "lg";
  export let data: Record<string, string> = {};
  const dispatch = createEventDispatcher();

  const url_image = "https://depps.leadagro.net/uploads/";
  let datas = {
    id: "",
  typePersonne: "",
  genre: {
    id: "",
    libelle: "",
  },
  photo: {
    path: "",
    alt: "",
    url: "",
  },
  cni: {
    path: "",
    alt: "",
    url: "",
  } ,
  diplomeFile: {
    path: "",
    alt: "",
    url: "",
  },
  cv: {
    path: "",
    alt: "",
    url: "",
  } ,
  dfe: {
    path: "",
    alt: "",
    url: "",
  } ,
  ordreNational: {
    path: "",
    alt: "",
    url: "",
  } ,
  nomEntreprise: "",
  natureEntreprise: "",
  typeEntreprise: "",
  contactEntreprise: "",
  nomCompletTechnique: "",
  appartenirOrganisation: "",
  status: "",
  reason: "",
  user: {
    id: "",
    username: "",
    email: "",
    typeUser: "",
  }
    };
 

  function init(form: HTMLFormElement) {
 
   datas = {
    id: data.id,
  typePersonne: data.typePersonne.libelle,
  genre: {
    id: data.genre.id,
    libelle: data.genre.libelle,
  },
  photo: data.photo ? {
    path: data.photo.path,
    alt: data.photo.alt,
    url: data.photo.url,
  } : {
    path: "",
    alt: "",
    url: "",
  },

  cni: data.cni  ? {
    path: data.cni.path,
    alt: data.cni.alt,
    url: data.cni.url,
  } : {
    path: "",
    alt: "",
    url: "",
  },

  diplomeFile: data.diplomeFile ? {
    path: data.diplomeFile.path,
    alt: data.diplomeFile.alt,
    url: data.diplomeFile.url,
  } : {
    path: "",
    alt: "",
    url: "",
  }
  ,
  cv: data.cv ?{
    path: "",
    alt: "",
    url: "",
  }: {
    path: "",
    alt: "",
    url: "",
  },
  dfe: data.dfe ?{
    path: "",
    alt: "",
    url: "",
  } : {
    path: "",
    alt: "",
    url: "",
  },
  ordreNational: data.ordreNational ? {
    path: "",
    alt: "",
    url: "",
  } : {
    path: "",
    alt: "",
    url: "",  
  },
  nomEntreprise: data.nomEntreprise,
  natureEntreprise: data.natureEntreprise,
  typeEntreprise: data.typeEntreprise,
  contactEntreprise: data.contactEntreprise,
  nomCompletTechnique: data.nomCompletTechnique,
  appartenirOrganisation: data.appartenirOrganisation,
  status: data.status,
  reason: data.reason,
  user: {
    id: data.user.id,
    username: data.user.username,
    email: data.user.email,
    typeUser: data.user.typeUser,
  }
    };
  }

    let openShow: boolean = false;
    let current_data: any = {};
    let showNotification = false;
    let notificationMessage = "";
    let notificationType = "info";

    function handleModalClose(event: Event) {
        if (isLoad) {
            event.preventDefault(); 
        }
    }

   
    let isDialogOpen = false;

    let currentImage = "";

    function openDialog(imageUrl: string) {
        currentImage = imageUrl;
        isDialogOpen = true;
    }

    function closeDialog() {
        isDialogOpen = false;
    }

    async function SaveFunction() {
        isLoad = true;
        try {
            const res = await fetch(
                BASE_URL_API +"/etablissement/active/" +data?.id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: datas.status,
                        raison:
                        datas.reason,
                    }),
                },
            );

            if (res.ok) {
                isLoad = false;
                open = false;
                notificationMessage = "Traitement effectué  avec succès!";
                notificationType = "success";
                showNotification = true;
                dispatch('changeStatus');
            }
        } catch (error) {
            console.error("Error saving:", error);
        }
    }
    async function SaveFunctionSingleMethode(etat: string) {
        isLoad = true;
        try {
            const res = await fetch(
                BASE_URL_API +"/etablissement/active/" +data?.id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: etat,
                        raison:""
                    }),
                },
            );

            if (res.ok) {
                isLoad = false;
                open = false;
                notificationMessage = "Traitement effectué  avec succès!";
                notificationType = "success";
                showNotification = true;
                dispatch('changeStatus');
            }
        } catch (error) {
            console.error("Error saving:", error);
        }
    }
</script>

<Modal bind:open title="Détails " size={sizeModal} class="m-4 modale_general">
  <div class="space-y-6 p-4">
    <form action="#" use:init>
      <!-- Première section : Informations personnelles -->
      <div class="grid grid-cols-3 gap-6 mb-4">
        <div>
          <InputSimple
            fieldName="nom"
            label="Nom entrepprise"
            field={datas.nomEntreprise}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="prenoms"
            label="Nature entreprise"
            field={datas.natureEntreprise}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="Email"
            label="Email"
            field={datas.user.email}
            disabled={true}
          />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-6">
        <div>
          <InputSimple
            fieldName="nom"
            label="Contact entrepprise"
            field={datas.contactEntreprise}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="prenoms"
            label="Nom technicien"
            field={datas.nomCompletTechnique}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="Type personne"
            label="Type personne"
            field={datas.typePersonne}
            disabled={true}
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mt-6">
        <div class="space-y-6">
          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a href={url_image + datas.photo.path + "/" + datas.photo.alt} target="_blank">
              Voir le photo
            </a>
          </div>
          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a
              href={url_image + datas.photo.path + "/" + datas.photo.alt}
              target="_blank"
            >
              Voir le diplome
            </a>
          </div>

          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a href={url_image + datas.photo.path + "/" + datas.photo.alt} target="_blank">
              Voir le casier
            </a>
          </div>
        </div>
        <div class="space-y-6">
          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a
              href={url_image + datas.photo.path + "/" + datas.photo.alt}
              target="_blank"
            >
              Voir le certificat
            </a>
          </div>
          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a href={url_image + datas.photo.path + "/" + datas.photo.alt} target="_blank">
              Voir la photo
            </a>
          </div>

          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a href={url_image + datas.photo.path + "/" + datas.photo.alt} target="_blank">
              Voir cni
            </a>
          </div>
        </div>
      </div>

      <br />

      {#if datas.status === "attente"}
        <fieldset class="border border-gray-300 rounded-md p-4">
          <legend class="text-lg font-semibold text-blue-500">Traitement</legend
          >
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <input
                type="radio"
                id="conforme"
                name="profil"
                value="acceptation"
                bind:group={datas.status}
                checked
              />
              <label for="conforme" class="text-gray-700 mt-2">Accepter</label>
            </div>
            <div class="flex items-center space-x-2">
              <input
                type="radio"
                id="unverified"
                name="profil"
                value="rejet"
                bind:group={datas.status}
              />
              <label for="unverified" class="text-gray-700 mt-2">Refuser</label>
            </div>
            {#if datas.status === "rejet"}
              <textarea
                bind:value={datas.reason}
                placeholder="Observation"
                class="w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            {/if}
          </div>
        </fieldset>
      {/if}
      {#if datas.status === "refuse"}
        <fieldset class="border border-gray-300 rounded-md p-4">
          <legend class="text-lg font-semibold text-blue-500">Traitement</legend
          >
          <div class="space-y-4">
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">Oups erreur!</strong>
              <span class="block sm:inline">{datas.reason}</span>
            </div>
          </div>
        </fieldset>
      {/if}
    </form>
  </div>

  <!-- Modal footer -->
  <!-- <div slot="footer" class="w-full">
    <div class="w-full grid grid-cols-3">
{status}
      {#if status === "attente"}
      <div class="col-span-2">


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
          on:click={() => (open = false)}
        >
        Accepter dossie
        </button>
      {/if}

      <button
          style="background-color: #55a1ff;"
          type="button"
          class="bg-[#55a1ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#008020]"
          on:click={() => (open = false)}
        >
        Accepter dossie
        </button>

    
      </div>
      {:else}

      <button
          style="background-color: #55a1ff;"
          type="button"
          class="bg-[#55a1ff] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[#008020]"
          on:click={() => (open = false)}
        >
        Accepter dossie
        </button>
      {/if}
    


      <div class="flex justify-end">
        <Button
          color="alternative"
          style="background-color: red !important; color: white;"
          on:click={() => (open = false)}
          type="submit">{"Fermer"}</Button
        >
      </div>
    </div>
  </div> -->

  <div slot="footer" class="w-full">
    <div class="w-full grid grid-cols-3">
      {#if datas.status === "attente"}
        <div class="col-span-2">
          {#if isLoad}
            <Button
              disabled={true}
              color="alternative"
              style="background-color: green !important; color: white;"
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
            <Button
              color="alternative"
              style="background-color: green !important; color: white;"
              on:click={SaveFunction}
              type="submit">{"Traiter le dossier"}</Button
            >
          {/if}

          <!-- <Button
            color="alternative"
            style="background-color: red !important; color: white;"
            on:click={() => (open = false)}
            type="submit">{"Refuser dossier"}</Button
          > -->
        </div>
      {:else}
        <div class="col-span-2">
          {#if datas.status == "accepte" || datas.status == "valide" || datas.status == "renouvellement"}
            {#if isLoad}
              <Button
                disabled={true}
                color="alternative"
                style="background-color: green !important; color: white;"
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
              <Button
                color="alternative"
                style="background-color: green !important; color: white;"
                on:click={() =>
                  datas.status === "accepte"
                    ? SaveFunctionSingleMethode("validation")
                    : datas.status === "valide"
                      ? SaveFunctionSingleMethode("renouvellement")
                      : SaveFunctionSingleMethode("mis_a_jour")}
                type="submit"
                >{#if datas.status === "accepte"}{"Valider l'inscription"}{:else if datas.status === "valide"}{"Renouveller l'inscription"}{:else if datas.status === "renouvellement"}{"Mise au jour de l'inscription"}{/if}</Button
              >
            {/if}
          {/if}
        </div>
      {/if}

      <div class="flex justify-end">
        <Button
          color="alternative"
          style="background-color: red !important; color: white;"
          on:click={() => (open = false)}
          type="submit">{"Fermer"}</Button
        >
      </div>
    </div>
  </div>
</Modal>
