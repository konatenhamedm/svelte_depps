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
  let numero = "";
  let nom = "";
  let status = "";
  let prenoms = "";
  let addressPro = "";
  let professionnel = "";
  let profession = "";
  let civilite = "";
  let dateNaissance = "";
  let contactPro = "";
  let lieuResidence = "";
  let situation = "";
  let dateDiplome = "";
  let dateEmploi = "";
  let diplome = "";
  let situationPro = "";
  let userEmail = "";
  let typeUser = "";
  let appartenirOrganisation = "";
  let photo = "";
  let cni = "";
  let cv = "";
  let CVpath = "";
  let CValt = "";
  let reason = "";

  let Photopath = "";
  let Photoalt = "";
  let diplomeFilePath = "";
  let diplomeFileAlt = "";
  let cniPath = "";
  let cniAlt = "";
  let casierPath = "";
  let casierAlt = "";
  let certificatPath = "";
  let certificatAlt = "";

  function init(form: HTMLFormElement) {
    console.log(`je suis la data `, data);
    numero = data.number || "";
    nom = data.nom || "";
    status = data.status || "";
    prenoms = data.prenoms || "";
    reason = data.reason || "";
    addressPro = data.addressPro || "";
    professionnel = data.professionnel || "";
    profession = data.profession || "";
    civilite = data.civilite.libelle || "";
    dateNaissance = data.dateNaissance || "";
    contactPro = data.contactPro || "";
    dateDiplome = data.dateDiplome || "";
    dateEmploi = data.dateEmploi || "";
    diplome = data.diplome || "";
    situationPro = data.situationPro || "";
    lieuResidence = data.lieuResidence || "";
    situation = data.situation || "";
    typeUser = data.user?.typeUser || "";
    userEmail = data.user?.email || "";
    appartenirOrganisation = data.appartenirOrganisation || "";
    photo = data.photo || "";
    cni = data.cni || "";
    CVpath = data.cv.path || "";
    CValt = data.cv.alt || "";

    Photopath = data.photo.path || "";
    Photoalt = data.photo.alt || "";

    diplomeFilePath = data.diplomeFile.path || "";
    diplomeFileAlt = data.diplomeFile.alt || "";

    cniPath = data.cni.path || "";
    cniAlt = data.cni.alt || "";

    casierPath = data.casier.path || "";
    casierAlt = data.casier.alt || "";

    certificatPath = data.certificat.path || "";
    certificatAlt = data.certificat.alt || "";
  }
  let valid_endUser = {
        raison: "",
        status: "",
    };
  

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
                BASE_URL_API +"/professionnel/active/" +data?.id,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: valid_endUser.status,
                        raison:
                        valid_endUser.raison,
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
                BASE_URL_API +"/professionnel/active/" +data?.id,
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
      <div class="grid grid-cols-3 gap-6">
        <div>
          <InputSimple
            fieldName="nom"
            label="Nom"
            field={nom}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="prenoms"
            label="Prénom(s)"
            field={prenoms}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="dateNaissance"
            label="Date de naissance"
            field={dateNaissance}
            disabled={true}
          />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div>
          <InputSimple
            fieldName="civilite"
            label="Civilité"
            field={civilite}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="lieuResidence"
            label="Lieu de résidence"
            field={lieuResidence}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="userEmail"
            label="Email utilisateur"
            field={userEmail}
            disabled={true}
          />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-6">
        <div>
          <InputSimple
            fieldName="userPhone"
            label="Téléphone utilisateur"
            field={numero}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="typeUser"
            label="Type utilisateur"
            field={typeUser}
            disabled={true}
          />
        </div>
        <!--   <div>  <InputSimple
          fieldName="casier"
          label="Casier"
          field={casier}
          disabled={true}
        />
      
        </div> -->
      </div>

      <!-- Deuxième section : Informations professionnelles -->
      <div class="grid grid-cols-3 gap-6 mt-6">
        <div class="space-y-6">
          <InputSimple
            fieldName="profession"
            label="Profession"
            field={profession}
            disabled={true}
          />
        </div>
        <div class="space-y-6">
          <InputSimple
            fieldName="professionnel"
            label="Structure d’exercice professionnel"
            field={professionnel}
            disabled={true}
          />
        </div>
        <div class="space-y-6">
          <InputSimple
            fieldName="contactPro"
            label="Contact professionnel"
            field={contactPro}
            disabled={true}
          />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6 mt-6">
        <div class="space-y-6">
          <InputSimple
            fieldName="addressPro"
            label="Adresse professionnelle"
            field={addressPro}
            disabled={true}
          />
        </div>
        <div class="space-y-6">
          <InputSimple
            fieldName="situationPro"
            label="Situation professionnelle"
            field={situationPro}
            disabled={true}
          />
        </div>
        <div class="space-y-6">
          <InputSimple
            fieldName="diplome"
            label="Diplôme"
            field={diplome}
            disabled={true}
          />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-6 mt-6">
        <div class="space-y-6">
          <InputSimple
            fieldName="situation"
            label="Situation"
            field={situation}
            disabled={true}
          />
        </div>
        <div class="space-y-6">
          <InputSimple
            fieldName="dateDiplome"
            label="Date du diplôme"
            field={dateDiplome}
            disabled={true}
          />
        </div>
        <div class="space-y-6">
          <InputSimple
            fieldName="dateEmploi"
            label="Date d'emploi"
            field={dateEmploi}
            disabled={true}
          />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mt-6">
        <div class="space-y-6">
          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a href={url_image + CVpath + "/" + CValt} target="_blank">
              Voir le CV
            </a>
          </div>
          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a
              href={url_image + diplomeFilePath + "/" + diplomeFileAlt}
              target="_blank"
            >
              Voir le diplome
            </a>
          </div>

          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a href={url_image + casierPath + "/" + casierAlt} target="_blank">
              Voir le casier
            </a>
          </div>
        </div>
        <div class="space-y-6">
          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a
              href={url_image + certificatPath + "/" + certificatAlt}
              target="_blank"
            >
              Voir le certificat
            </a>
          </div>
          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a href={url_image + Photopath + "/" + Photoalt} target="_blank">
              Voir la photo
            </a>
          </div>

          <div
            class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            <a href={url_image + cniPath + "/" + cniAlt} target="_blank">
              Voir cni
            </a>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-6 mt-6">
        <div class="space-y-6">
          <div class="flex items-center justify-between space-x-2">
            <fieldset>
              <legend>Appartenance à une organisation</legend>
              <div class="flex items-center">
                <div class="mr-2">
                  <InputCheck
                    checked={appartenirOrganisation === "false" ? true : false}
                    label="Non"
                    disabled={true}
                  />
                </div>
                <div>
                  <InputCheck
                    checked={appartenirOrganisation === "true" ? true : false}
                    label="Oui"
                    disabled={true}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div><br>

      {#if status === "attente"}
      <fieldset class="border border-gray-300 rounded-md p-4">
        <legend class="text-lg font-semibold text-blue-500">Traitement</legend>
        <div class="space-y-4">
            <div class="flex items-center space-x-2">
                <input
                    type="radio"
                    id="conforme"
                    name="profil"
                    value="acceptation"
                    bind:group={valid_endUser.status}
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
                    bind:group={valid_endUser.status}
                />
                <label for="unverified" class="text-gray-700 mt-2">Refuser</label>
            </div>
            {#if valid_endUser.status === "rejet"}
                <textarea
                    bind:value={valid_endUser.raison}
                    placeholder="Observation"
                    class="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
            {/if}
        </div>
    </fieldset>
    {/if }
      {#if status === "refuse"}
      <fieldset class="border border-gray-300 rounded-md p-4">
        <legend class="text-lg font-semibold text-blue-500">Traitement</legend>
        <div class="space-y-4">
          <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Oups erreur!</strong>
          <span class="block sm:inline">{reason}</span>
        </div>
           
        </div>
    </fieldset>
    {/if }

   
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
      {#if status === "attente"}
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
          {#if status == 'accepte' || status == "valide" || status == "renouvellement"}
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
            on:click={() => status === "accepte" ? SaveFunctionSingleMethode("validation") : status === "valide" ? SaveFunctionSingleMethode("renouvellement") : SaveFunctionSingleMethode("mis_a_jour")}
            type="submit"
            >{#if status === "accepte"}{"Valider l'inscription"}{:else if status === "valide"}{"Renouveller l'inscription"}{:else if status === "renouvellement"}{"Mise au jour de l'inscription"}{/if}</Button
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
