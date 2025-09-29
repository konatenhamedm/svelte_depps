<script lang="ts">
  import InputCheck from "$components/inputs/InputCheck.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { apiFetch, BASE_URL_API, BASE_URL_API_UPLOAD } from "$lib/api";
  import { BASE_URL } from "$lib/config";
  import { Button, Modal } from "flowbite-svelte";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import { createEventDispatcher, onMount } from "svelte";
  import DocShow from "./DocShow.svelte";
  import { format } from "date-fns";
  import RecuPaiement from "./RecuPaiement.svelte";
  import FicheInscription from "./FicheInscription.svelte";

  let isLoad = false;

  export let userUpdateId: any;

  export let open: boolean = false;
  export let sizeModal: any = "lg";
  export let data: Record<string, string> = {};
  const dispatch = createEventDispatcher();

  let professionLibelle: string = "";

  const url_image = "https://prodmydepps.leadagro.net/uploads/";
 

  function formatDateForInput(dateString: string) {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "yyyy-MM-dd"); // Formater en YYYY-MM-DD
    } catch (e) {
      console.error("Erreur de formatage de date:", e);
      return "";
    }
  }

  async function getProfessionLibelle(code: any) {
    console.log("Code profession:", code);
    try {
      const res = await fetch(BASE_URL_API + "/etablissement/get/all/" + code);

      if (res.ok) {
        const data = await res.json();
        if (data && data.data) {
          console.log("Data récupérée:", data.data);
          return data.data;
        } else {
          console.error("Erreur: data.data est undefined", data);
          return null;
        }
      } else {
        console.error("Erreur HTTP:", res.status, res.statusText);
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      return null;
    }
  }

  function init(form: HTMLFormElement) {
    console.log(`je suis la data `, data);

  }
  let valid_endUser = {
    raison: "",
    status: status == "accepte" ? "validation" : "acceptation",
  };

onMount(()=>{
  console.log("Data on mount:", data);
})

  let openShow: boolean = false;
  let openShowDoc: boolean = false;
  let current_data: any = {};
  let pdfUrl: any;
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
    console.log("Email", userEmail);
    console.log("Email", valid_endUser.status);
    console.log("Email", valid_endUser.raison);
    console.log("Email", data.personne);

    isLoad = true;
    try {
      const res = await fetch(
        BASE_URL_API + "/professionnel/active/" + data.personne?.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: valid_endUser.status,
            raison: valid_endUser.raison,
            userUpdate: userUpdateId,
            email: userEmail,
          }),
        },
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
    console.log("EmailTTT", userEmail);
    console.log("Email", valid_endUser.status);
    console.log("Email", valid_endUser.raison);
    console.log("Email", userUpdateId);
    console.log("TTGDFDFDFD", etat);
    isLoad = true;
    try {
      const res = await fetch(
        BASE_URL_API + "/professionnel/active/" + data.personne?.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: etat,
            raison: "",
            userUpdate: userUpdateId,
            email: userEmail,
          }),
        },
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

  /*  onMount(async () => {
    await getProfessionLibelle(profession);
  }) */

  let isModalOpen = false;
  let isModalOpenRegister = false;

  function openModal(url: any) {
    pdfUrl = url; // ✅ Met à jour la variable réactive
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
</script>

<Modal bind:open title="Détails " size={sizeModal} class="m-4 modale_general">
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
    crossorigin="anonymous"
  />
  <div class="space-y-6 p-4">
    <form action="#" use:init>
      <label style="color: black; font-weight: bold; font-size: x-large; margin-bottom: 15px;">Informations sur l'établissement</label>
        {#if data.rapportExamen }
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
        <!-- <strong class="font-bold">OOUPS</strong> -->
        <span class="block sm:inline">{data.rapportExamen}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
      {/if }
      <!-- Première section : Informations personnelles -->
       <div class="grid grid-cols-3 gap-6">
        
        <div>
          <InputSimple
            fieldName="Email"
            label="Email"
            field={data.email}
            disabled={true}
          />
        </div>
         <div>
          <InputSimple
            fieldName="Entité Juridique"
            label="Entité Juridique"
            field={data.personne.typePersonne.libelle}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="Niveau d'Intervention"
            label="Niveau d'Intervention"
            field={data.personne.niveauIntervention.libelle}
            disabled={true}
          />
        </div>
        {#if data.personne.typePersonne.libelle == "PHYSIQUE"}
         <div>
          <InputSimple
            fieldName="Nom"
            label="Nom"
            field={data.personne.nom}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="Prenoms"
            label="Prénom(s)"
            field={data.personne.prenoms}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="Telephone"
            label="Téléphone"
            field={data.personne.telephone}
            disabled={true}
          />
        </div>
         <div>
          <InputSimple
            fieldName="Boite Postale"
            label="Boite Postale"
            field={data.personne.bp}
            disabled={true}
          />
        </div>
         <div>
          <InputSimple
            fieldName="Autre E-mail"
            label="Autre E-mail"
            field={data.personne.emailAutre}
            disabled={true}
          />
        </div>
        {/if}
        {#if data.personne.typePersonne.libelle == "MORALE"}
         <div>
          <InputSimple
            fieldName="Adresse"
            label="Adresse"
            field={data.personne.adresse}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="Nom du Representant"
            label="Nom du Representant"
            field={data.personne.nomRepresentant}
            disabled={true}
          />
        </div>
        <div>
          <InputSimple
            fieldName="Denomination"
            label="Denomination"
            field={data.personne.denomination}
            disabled={true}
          />
        </div>
        
        {/if}
      </div>
      <label style="color: black; font-weight: bold; margin-top: 15px;font-size: x-large;">Documents</label>
      <div class="grid grid-cols-4 gap-6 mt-6">
        
      {#each data.personne.documents as doc }
         <div
          on:click={() => (
            (current_data = BASE_URL_API_UPLOAD + doc.path.url), (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] p-4 border border-white rounded cursor-pointer"
        >
          VOIR {doc.libelle.toUpperCase()}
        </div>
      {/each}
      </div>
      </form>


      <!-- Deuxième section : Informations professionnelles -->
      <!-- <div class="grid grid-cols-3 gap-6 mt-6">
        <div class="space-y-6">
          <InputSimple
            fieldName="datePremierDiplome"
            label="Date d'obtention premier emploi"
            field={datePremierDiplome}
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
            fieldName="situationPro"
            label="Situation professionnelle"
            field={situationPro}
            disabled={true}
          />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6 mt-6 mb-6">
        <div class="space-y-6">
          <InputSimple
            fieldName="diplome"
            label="Diplôme"
            field={diplome}
            disabled={true}
          />
        </div>
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
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div>
          <InputSimple
            fieldName="poleSanitaire"
            label="lot,ilot *"
            field={poleSanitaire}
            disabled={true}
          />
        </div>

        <div class="space-y-6">
          <InputSimple
            fieldName="lieuExercicePro"
            label="Lieu d’exercice professionnel"
            field={lieuExercicePro}
            disabled={true}
          />
        </div>
      </div> -->
      <!-- <div class="grid grid-cols-4 gap-6 mt-6"> -->
        <!-- <div class="space-y-6"> -->
        <!-- <div
          on:click={() => (
            (current_data = url_image + CVpath + "/" + CValt), (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          VOIR LE CV
        </div>
        <div
          on:click={() => (
            (current_data = url_image + diplomeFilePath + "/" + diplomeFileAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          VOIR LE DIPLOME
        </div>

        <div
          on:click={() => (
            (current_data = url_image + casierPath + "/" + casierAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          VOIR LE CASIER
        </div> -->
        <!--  </div>
        <div class="space-y-6"> -->
        <!-- <div
          on:click={() => (
            (current_data = url_image + certificatPath + "/" + certificatAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          VOIR LE CERTIFICAT
        </div>
        <div
          on:click={() => (
            (current_data = url_image + Photopath + "/" + Photoalt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          VOIR LA PHOTO
        </div>

        <div
          on:click={() => (
            (current_data = url_image + cniPath + "/" + cniAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          VOIR LA CNI
        </div>

        <div
          on:click={() => (
            (current_data = data), (isModalOpenRegister = true) // Utiliser isModalOpenRegister ici au lieu de isModalOpen
          )}
          style="background-color: green;"
          class="w-full h-9 flex justify-center bg-green hover:bg-green text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
        >
          FICHE D'INSCRIPTION
        </div>
        {#if data.personne.profession.montantRenouvellement != "" || data.personne.profession.montantNouvelleDemande != ""}
          <div
            on:click={() => ((current_data = data), (isModalOpen = true))}
            style="background-color: green;"
            class="w-full h-9 flex justify-center bg-green hover:bg-green text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
          >
            REÇU DE PAIEMENT
          </div>
        {/if}
      </div> -->

      <!-- <div class="grid grid-cols-2 gap-6 mt-6 mb-2">
        <div class="space-y-6">
          <div class="flex items-center justify-between space-x-2">
            <fieldset>
              <legend style="color: black;"
                >Appartenez-vous à une organisation?</legend
              >
              <div class="flex items-center">
                <div class="mr-2">
                  <InputCheck
                    checked={appartenirOrganisation === "non" ? true : false}
                    label="Non"
                    disabled={true}
                  />
                </div>
                <div>
                  <InputCheck
                    checked={appartenirOrganisation === "oui" ? true : false}
                    label="Oui"
                    disabled={true}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div> -->
        <!-- {#if appartenirOrganisation === "oui"} -->
          <!-- <div class="grid grid-cols-1 gap-6 mt-6"> -->
          <!-- <div class="space-y-6">
            <InputSimple
              fieldName="organisation"
              label="Nom de l'organisation"
              field={organisationNom}
              disabled={true}
            />
          </div> -->
          <!-- </div> -->
        <!-- {/if}
      </div> 
      <div class="grid grid-cols-2 gap-6 mt-6 mb-2">
        <div class="space-y-6">
          <div class="flex items-center justify-between space-x-2">
            <fieldset>
              <legend style="color: black;"
                >Appartenez-vous à un ordre ?</legend
              >
              <div class="flex items-center">
                <div class="mr-2">
                  <InputCheck
                    checked={appartenirOrdre === "non" ? true : false}
                    label="Non"
                    disabled={true}
                  />
                </div>
                <div>
                  <InputCheck
                    checked={appartenirOrdre === "oui" ? true : false}
                    label="Oui"
                    disabled={true}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        {#if appartenirOrdre === "oui"} -->
          <!-- <div class="grid grid-cols-1 gap-6 mt-6"> -->
          <!-- <div class="space-y-6">
            <InputSimple
              fieldName="numeroInscription"
              label="Numéro d'inscription"
              field={numeroInscription}
              disabled={true}
            />
          </div> -->
          <!-- </div> -->
        <!-- {/if} -->
      <!-- </div> -->
<!-- 
      <br />

      {#if status === "attente" }
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
                >Rejeter</label
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
      {#if status === "accepte" }
        <fieldset class="border border-gray-300 rounded-md p-4">
          <legend class="text-lg font-semibold text-blue-500">Décision</legend>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <input
                type="radio"
                id="conforme"
                name="profil"
                value="validation"
                bind:group={valid_endUser.status}
                checked
              />
              <label for="conforme" class="text-black mt-2 text-3xl"
                >Valider</label
              >
            </div>
            <div class="flex items-center space-x-2">
              <input
                type="radio"
                id="unverified"
                name="profil"
                value="refuse"
                bind:group={valid_endUser.status}
              />
              <label for="unverified" class="text-black text-3xl mt-2"
                >Refuser</label
              >
            </div>
            {#if valid_endUser.status === "refuse"}
              <textarea
                bind:value={valid_endUser.raison}
                placeholder="Observation"
                class="w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            {/if}
          </div>
        </fieldset>
      {/if}
      
      {#if status === "refuse" || status === "rejete"}
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
  </div> -->
  
</div>
  <div slot="footer" class="w-full">
    <div class="w-full grid grid-cols-3">
      
    

     
      <div class="col-span-2">
      </div>
     
        

      <div class="flex justify-end item-end">
        <Button
          color="alternative"
          style="background-color: gray !important; color: white;"
          on:click={() => (open = false)}
          type="submit"
          >{"Fermer"}
        </Button>
      </div>
    </div>
  </div>
</Modal>

{#if isModalOpen == true}
  <RecuPaiement
    bind:open={isModalOpen}
    data={current_data}
    sizeModal="xl"
    {userUpdateId}
  />
{/if}

{#if isModalOpenRegister == true}
  <FicheInscription
    bind:open={isModalOpenRegister}
    data={current_data}
    sizeModal="xl"
    {userUpdateId}
  />
{/if}

<DocShow bind:open={openShow} data={current_data} sizeModal="xl" />
