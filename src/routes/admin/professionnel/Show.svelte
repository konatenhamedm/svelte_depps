<script lang="ts">
  import InputCheck from "$components/inputs/InputCheck.svelte";
  import InputSimple from "$components/inputs/InputSimple.svelte";
  import { apiFetch, BASE_URL_API } from "$lib/api";
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

  const url_image = "https://depps.leadagro.net/uploads/";
  let persionneId = "";
  let numero = "";
  let nom = "";
  let status = "";
  let prenoms = "";
  let professionnel = "";
  let datePremierDiplome = "";
  let poleSanitaire = "";
  let poleSanitairePro = "";
  let organisationNom = "";
  let lieuExercicePro = "";
  let profession = "";
  let civilite = "";
  let dateNaissance = "";
  let nationalite = "";
  let situation = "";
  let dateDiplome = "";
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
  let lieuDiplome = "";

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
      const res = await fetch(BASE_URL_API + "/profession/get/by/code/" + code);

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
    numero = data.personne.number || "";
    nom = data.personne.nom || "";
    status = data.personne.status || "";
    professionLibelle = data.personne.profession
      ? data.personne.profession.libelle
      : "";
    prenoms = data.personne.prenoms || "";
    reason = data.personne.reason || "";
    professionnel = data.personne.professionnel || "";
    civilite = data.personne.civilite.libelle || "";
    nationalite = data.personne.nationate.libelle || "";
    dateNaissance = data.personne.dateNaissance || "";
    dateDiplome = data.personne.dateDiplome || "";
    diplome = data.personne.diplome || "";
    poleSanitaire = data.personne.poleSanitaire || "";
    organisationNom = data.personne.organisationNom || "";
    poleSanitairePro = data.personne.poleSanitairePro || "";
    lieuExercicePro = data.personne.lieuExercicePro || "";
    datePremierDiplome = data.personne.datePremierDiplome || "";
    situationPro = data.personne.situationPro.libelle || "";
    situation = data.personne.situation || "";
    typeUser = data?.typeUser || "";
    userEmail = data.email || "";
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
    lieuDiplome = data.personne.lieuDiplome || "";
    persionneId = data.personne.id;
    // Récupérer la profession
    /*profession =  data.personne.professionLibelle || ""; await getProfessionLibelle(data.personne.profession);
    if (profession) {
      console.log("Profession récupérée:", profession);
    } else {
      console.error("Impossible de récupérer la profession");
    }*/

    console.log("uuu", persionneId);
  }
  let valid_endUser = {
    raison: "",
    status: "acceptation",
  };

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
      <!--   {#if reason }
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
        <strong class="font-bold">OOUPS</strong>
        <span class="block sm:inline">{reason}</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>
      {/if } -->
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
            label="Nationnalité"
            field={nationalite}
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
      <div class="grid grid-cols-3 gap-6">
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
        <div class="space-y-6">
          <InputSimple
            fieldName="profession"
            label="Spécialité"
            field={professionLibelle}
            disabled={true}
          />
        </div>
      </div>

      <!-- Deuxième section : Informations professionnelles -->
      <div class="grid grid-cols-3 gap-6 mt-6">
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
      </div>
      <div class="grid grid-cols-4 gap-6 mt-6">
        <!-- <div class="space-y-6"> -->
        <button
          type="button"
          on:click={() => (
            (current_data = url_image + CVpath + "/" + CValt), (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
          aria-label="Voir le CV"
        >
          VOIR LE CV
        </button>
        <button
          type="button"
          on:click={() => (
            (current_data = url_image + diplomeFilePath + "/" + diplomeFileAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
          aria-label="Voir le diplôme"
        >
          VOIR LE DIPLOME
        </button>

        <button
          type="button"
          on:click={() => (
            (current_data = url_image + casierPath + "/" + casierAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
          aria-label="Voir le casier"
        >
          VOIR LE CASIER
        </button>
        <!--  </div>
        <div class="space-y-6"> -->
        <button
          type="button"
          on:click={() => (
            (current_data = url_image + certificatPath + "/" + certificatAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
          aria-label="Voir le certificat"
        >
          VOIR LE CERTIFICAT
        </button>
        <button
          type="button"
          on:click={() => (
            (current_data = url_image + Photopath + "/" + Photoalt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
          aria-label="Voir la photo"
        >
          VOIR LA PHOTO
        </button>

        <button
          type="button"
          on:click={() => (
            (current_data = url_image + cniPath + "/" + cniAlt),
            (openShow = true)
          )}
          class="w-full h-9 flex justify-center bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 pb-[1.9rem] px-4 border border-white rounded cursor-pointer"
          aria-label="Voir la CNI"
        >
          VOIR LA CNI
        </button>

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
            aria-label="Voir le reçu de paiement"
            role="button"
          >
            REÇU DE PAIEMENT
      </div>
        {/if}
      </div>

      <div class="grid grid-cols-2 gap-6 mt-6 mb-2">
        <div class="space-y-6">
          <div class="flex items-center justify-between space-x-2">
            <fieldset>
              <legend style="color: black;"
                >Appartenance à une organisation</legend
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
        </div>
        {#if appartenirOrganisation === "oui"}
          <!-- <div class="grid grid-cols-1 gap-6 mt-6"> -->
          <div class="space-y-6">
            <InputSimple
              fieldName="organisation"
              label="Nom de l'organisation"
              field={organisationNom}
              disabled={true}
            />
          </div>
          <!-- </div> -->
        {/if}
      </div>

      <br />

      {#if status === "attente" || status === "accepte" || status === "valide" || status === "renouvellement"}
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
