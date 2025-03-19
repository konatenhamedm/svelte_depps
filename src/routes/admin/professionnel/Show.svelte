<script lang="ts">
  import InputCheck from "$components/inputs/InputCheck.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API } from "$lib/api";
  import { BASE_URL } from "$lib/config";
  import { Button, Modal } from "flowbite-svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import { createEventDispatcher } from "svelte";
  import DocShow from "./DocShow.svelte";

  let isLoad = false;

  export let userUpdateId: any;

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
    numero = data.personne.number || "";
    nom = data.personne.nom || "";
    status = data.personne.status || "";
    prenoms = data.personne.prenoms || "";
    reason = data.personne.reason || "";
    addressPro = data.personne.addressPro || "";
    professionnel = data.personne.professionnel || "";
    profession = data.personne.profession || "";
    civilite = data.personne.civilite.libelle || "";
    dateNaissance = data.personne.dateNaissance || "";
    contactPro = data.personne.contactPro || "";
    dateDiplome = data.personne.dateDiplome || "";
    dateEmploi = data.personne.dateEmploi || "";
    diplome = data.personne.diplome || "";
    situationPro = data.personne.situationPro || "";
    lieuResidence = data.personne.lieuResidence || "";
    situation = data.personne.situation || "";
    typeUser = data?.typeUser || "";
    userEmail = data?.email || "";
    appartenirOrganisation = data.personne.appartenirOrganisation || "";
    photo = data.personne.photo || "";
    cni = data.personne.cni || "";
    CVpath = data.personne.cv.path || "";
    CValt = data.personne.cv.alt || "";

    Photopath = data.personne.photo.path || "";
    Photoalt = data.personne.photo.alt || "";

    diplomeFilePath = data.personne.diplomeFile.path || "";
    diplomeFileAlt = data.personne.diplomeFile.alt || "";

    cniPath = data.personne.cni.path || "";
    cniAlt = data.personne.cni.alt || "";

    casierPath = data.personne.casier.path || "";
    casierAlt = data.personne.casier.alt || "";

    certificatPath = data.personne.certificat.path || "";
    certificatAlt = data.personne.certificat.alt || "";

   /*  if(data.personne.status == "attente"){ */
      valid_endUser.status = "acceptation";
      valid_endUser.raison = "";
    /* } */
  }
  let valid_endUser = {
    raison: "",
    status: ""
  };

  let openShow: boolean = false;
  let current_data: any = {};
  let showNotification = false;
  let notificationMessage = "";
  let notificationType = "info";

  /*   let openShow: boolean = false; */

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
  /* ddd */
  function closeDialog() {
    isDialogOpen = false;
  }
  async function SaveFunction() {
    isLoad = true;
    try {
      const res = await fetch(
        BASE_URL_API + "/professionnel/active/" + data.personne?.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: valid_endUser.status,
            raison: valid_endUser.raison,
            userUpdate: userUpdateId,
            email: userEmail
          })
        }
      );

      if (res.ok) {
        isLoad = false;
        open = false;
        notificationMessage = "Traitement effectué  avec succès!";
        notificationType = "success";
        showNotification = true;
        dispatch("changeStatus");
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
  }
  async function SaveFunctionSingleMethode(etat: string) {
    isLoad = true;
    try {
      const res = await fetch(
        BASE_URL_API + "/professionnel/active/" + data.personne?.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status: etat,
            raison: "",
            userUpdate: userUpdateId,
            email: userEmail
          })
        }
      );

      if (res.ok) {
        isLoad = false;
        open = false;
        notificationMessage = "Traitement effectué  avec succès!";
        notificationType = "success";
        showNotification = true;
        dispatch("changeStatus");
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
  }
</script>

<Modal bind:open title="Détails " size={sizeModal} class="m-4 modale_general">
  <div class="space-y-6 p-4">
    <form action="#" use:init>

      {#if reason }
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
        <strong class="font-bold">OOUPS</strong>
        <span class="block sm:inline">{reason}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
      {/if }
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

      <div class="grid grid-cols-3 gap-6 mt-6">
        <!-- <div class="space-y-6"> -->
        <div   on:click={() => (
          (current_data = url_image + CVpath + "/" + CValt),
          (openShow = true)
        )}
          class="w-full h-9 flex justify-center bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          
            VOIR LE CV
         
        </div>
        <div   on:click={() => (
            (current_data = url_image + diplomeFilePath + "/" + diplomeFileAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          
            VOIR LE DIPLOME
          
        </div>

        <div    on:click={() => (
            (current_data = url_image + casierPath + "/" + casierAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
         
            VOIR LE CASIER
          
        </div>
        <!--  </div>
        <div class="space-y-6"> -->
        <div
          on:click={() => (
            (current_data = url_image + certificatPath + "/" + certificatAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          VOIR LE CERTIFICAT
        </div>
        <div   on:click={() => (
          (current_data = url_image + Photopath + "/" + Photoalt),
          (openShow = true)
        )}
          class="w-full h-9 flex justify-center bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          
            VOIR LA PHOTO
          
        </div>

        <div   on:click={() => (
          (current_data = url_image + cniPath + "/" + cniAlt),
          (openShow = true)
        )}
          class="w-full h-9 flex justify-center bg-gray-500 hover:bg-gray-500 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
         
            VOIR LA CNI
          
        </div>
        <!--   </div> -->
      </div>

      <div class="grid grid-cols-2 gap-6 mt-6">
        <div class="space-y-6">
          <div class="flex items-center justify-between space-x-2">
            <fieldset>
              <legend>Appartenance à une organisation</legend>
              <div class="flex items-center">
                <div class="mr-2">
                  <InputCheck
                    checked={appartenirOrganisation === "oui" ? true : false}
                    label="Non"
                    disabled={true}
                  />
                </div>
                <div>
                  <InputCheck
                    checked={appartenirOrganisation === "non" ? true : false}
                    label="Oui"
                    disabled={true}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <br />

      {#if status === "attente"}
        <fieldset class="border border-gray-300 rounded-md p-4">
          <legend class="text-lg font-semibold text-blue-500">Décision</legend>
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
              <label for="conforme" class="text-black mt-2 text-3xl"
                >Accepter</label
              >
            </div>
            <div class="flex items-center space-x-2">
              <input
                type="radio"
                id="unverified"
                name="profil"
                value="rejet"
                bind:group={valid_endUser.status}
              />
              <label for="unverified" class="text-black text-3xl mt-2"
                >Refuser</label
              >
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
      {/if}
      {#if status === "refuse"}
        <fieldset class="border border-gray-300 rounded-md p-4">
          <legend class="text-lg font-semibold text-blue-500">Traitement</legend
          >
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
      {/if}
    </form>
  </div>

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
              type="submit">{"Valider le dossier"}</Button
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
          {#if status == "accepte" || status == "valide" || status == "renouvellement"}
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
                  status === "accepte"
                    ? SaveFunctionSingleMethode("validation")
                    : status === "valide"
                      ? SaveFunctionSingleMethode("renouvellement")
                      : SaveFunctionSingleMethode("mis_a_jour")}
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
          style="background-color: gray !important; color: white;"
          on:click={() => (open = false)}
          type="submit">{"Fermer"}</Button
        >
      </div>
    </div>
  </div>
</Modal>

<DocShow bind:open={openShow} data={current_data} sizeModal="xl" />
