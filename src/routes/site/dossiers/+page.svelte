<script lang="ts">
  import { onMount } from "svelte";
  import Slide from "$components/Slide.svelte";
  import Footer from "$components/Footer.svelte";
  import { apiFetch, BASE_URL_API, BASE_URL_API_UPLOAD } from "$lib/api";
  import SkeletonLoader from "$components/_skeletons/SkeletonLoader.svelte";
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import { goto } from "$app/navigation";
  import DocShow from "./DocShow.svelte";
  import Modal from "$components/Modal.svelte";
  import TextInput from "$components/site/TextInput.svelte";
  import SelectInput from "$components/site/SelectInput.svelte";
  import type { Civilite, District, Pays } from "../../../types";
  import Step2Form from "$components/site/Step2Form.svelte";
  import EtapeProfessionnelle from "$components/site/EtapeProfessionnelle.svelte";
  import { is } from "date-fns/locale";

  export let data;
  let user = data?.user;
  let activeTab = "step2";
  let isLoading = true;

  let formData = {
    // Personal Informations
    code: "",
    nom: "",
    prenoms: "",
    nationalite: "",
    civilite: "",
    emailAutre: "",
    numero: "",
    dateNaissance: "",
    situation: "",

    // Professional informations
    profession: "",
    emailPro: "",
    dateDiplome: "",
    lieuDiplome: "",
    datePremierDiplome: "",
    diplome: "",
    situationPro: "",

    professionnel: "",

    poleSanitaire: "",
    region: "",
    district: "",
    ville: "",
    commune: "",
    quartier: "",
    lieuExercicePro: "",
    /* //media informations
     */
    photo: "",
    cni: "",
    casier: "",
    diplomeFile: "",
    certificat: "",
    cv: "",

    // organization informations

    appartenirOrganisation: "non",
    organisationNom: "",
  };
  let errors = {
    nom: "",
    code: "",
    prenoms: "",
    nationalite: "",
    civilite: "",
    emailAutre: "",
    numero: "",
    dateNaissance: "",
    situation: "",

    // Professional informations
    profession: "",
    emailPro: "",
    dateDiplome: "",
    lieuDiplome: "",
    datePremierDiplome: "",
    diplome: "",
    situationPro: "",

    poleSanitaire: "",
    region: "",
    district: "",
    ville: "",
    commune: "",
    quartier: "",
    professionnel: "",
    lieuExercicePro: "",

    //media informations

    // Media informations
    photo: "",
    cni: "",
    casier: "",
    diplomeFile: "",
    certificat: "",
    cv: "",

    // Organization informations
    appartenirOrganisation: "",
    organisationNom: "",
    organisationNumero: "",
    organisationAnnee: "",

    // Paiement informations
  };

  let civilites: any = [];
  let situationProfessionnelles: any = [];
  let pays: any = [];

  let openShow: boolean = false;
  let current_data: any = {};

  const situations = ["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf(ve)"];
  const situationsPro = ["Salarié", "Indépendant", "Sans emploi", "Étudiant"];
  let authenticating = false;

  function formatDateForInput(dateString: string) {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (e) {
      console.error("Erreur de formatage de date:", e);
      return "";
    }
  }

  async function getUserInfos() {
    isLoading = true;
    try {
      const userId = user?.personneId;
      const response = await apiFetch(true, `/professionnel/get/one/${userId}`)
        .then((res) => {
          const apiData = res.data;

          formData = {
            code: apiData.personne.code ? apiData.personne.code : "",
            nom: apiData.personne.nom || "",
            prenoms: apiData.personne.prenoms || "",
            nationalite: apiData.personne.nationate
              ? String(apiData.personne.nationate.id)
              : "",
            civilite: apiData.personne.civilite
              ? String(apiData.personne.civilite.id)
              : "",
            emailAutre: apiData.personne.email || "",
            numero: apiData.personne.number || "",
            dateNaissance: formatDateForInput(apiData.personne.dateNaissance),
            situation: apiData.personne.situation || "",
            profession: apiData.personne.profession.libelle || "",
            emailPro: apiData.personne.emailPro || "",
            dateDiplome: formatDateForInput(apiData.personne.dateDiplome),
            lieuDiplome: apiData.personne.lieuDiplome || "",
            datePremierDiplome: formatDateForInput(
              apiData.personne.datePremierDiplome,
            ),
            diplome: apiData.personne.diplome || "",
            situationPro: apiData.personne.situationPro
              ? String(apiData.personne.situationPro.id)
              : "",
            professionnel: apiData.personne.professionnel || "",
            region: apiData.personne.region ? apiData.personne.region.id : "",
            /* poleSanitaire: apiData.personne.poleSanitaire
              ? apiData.personne.poleSanitaire
              : "", */
            district: apiData.personne.district
              ? apiData.personne.district.id
              : "",
            commune: apiData.personne.commune
              ? apiData.personne.commune.id
              : "",
            ville: apiData.personne.ville ? apiData.personne.ville.id : "",
            quartier: apiData.personne.quartier
              ? apiData.personne.quartier
              : "",
            lieuExercicePro: apiData.personne.lieuExercicePro || "",

            /*  poleSanitairePro: apiData.personne.poleSanitairePro || "",*/
            photo: apiData.personne.photo || "",
            cni: apiData.personne.cni || "",
            casier: apiData.personne.casier || "",
            diplomeFile: apiData.personne.diplomeFile || "",
            certificat: apiData.personne.certificat || "",
            cv: apiData.personne.cv || "",
            // Organisation
            appartenirOrganisation: apiData.personne.appartenirOrganisation,
            organisationNom:
              apiData.personne.appartenirOrganisation == "oui"
                ? apiData.personne.organisationNom || ""
                : "",
          };
        })
        .finally(() => {
          isLoading = false;
        });
    } catch (error) {
      console.error("Erreur de récupération des données", error);
      isLoading = false;
    }
  }

  async function loadReferenceData() {
    try {
      const civilitesResponse = await apiFetch(true, "/civilite");
      if (civilitesResponse.code === 200) {
        civilites = civilitesResponse.data || [];
      }
      const paysResponse = await apiFetch(true, "/pays");
      if (paysResponse.code === 200) {
        pays = paysResponse.data || [];
      }
      const situationProfessionnellesResponse = await apiFetch(
        true,
        "/situationProfessionnelle",
      );
      if (situationProfessionnellesResponse.code === 200) {
        situationProfessionnelles =
          situationProfessionnellesResponse.data || [];
      }
    } catch (error) {
      console.error("Erreur lors du chargement des références:", error);
    }
  }

  let isModalOpen = false;
  let pdfUrl = "";

  function openModal(url: any) {
    pdfUrl = url; // ✅ Met à jour la variable réactive
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  let professions: any[] = [];

  async function getAllProfessions() {
    await apiFetch(true, "/typeProfession").then((response) => {
      if (response.code === 200) {
        professions = response.data;
      }
    });
  }

  function navigateToDashboard() {
    goto("/site/dashboard");
  }

  function saveFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      /* localStorage.setItem("step", step.toString()); */
    }
  }

  /**
   * @type {any[]}
   */
  let objects = [
    { name: "civilite", url: "/civilite" },
    { name: "region", url: "/region" },
    { name: "ville", url: "/ville" },
    { name: "district", url: "/district" },
    { name: "commune", url: "/commune" },
    { name: "nationate", url: "/pays" },
    { name: "situationProfessionnelle", url: "/situationProfessionnelle" },
  ];

  let values: {
    civilite: Civilite[];
    region: Civilite[];
    district: District[];
    ville: Civilite[];
    commune: Civilite[];
    nationate: Pays[];
    situationProfessionnelle: Pays[];
  } = {
    civilite: [],
    nationate: [],
    situationProfessionnelle: [],
    ville: [],
    region: [],
    district: [],
    commune: [],
  };

  async function fetchData() {
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
            res.statusText,
          );
        }
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  }

  // Fonction pour charger les données depuis une API
  async function fetchDataChange(url: string) {
    const response = await apiFetch(true, url);
    if (!response) {
      console.error("Erreur lors de la récupération des données:", url);
      return [];
    }
    const data = response.data;
    return data;
  }

  async function applyFilters() {
    if (formData.region) {
      await updateDistricts();
    }
    if (formData.district) {
      await updateVilles();
    }
    if (formData.ville) {
      await updateCommunes();
    }
  }

  const situationsMatrimoniales = [
    { value: "Célibataire", label: "Célibataire" },
    { value: "Marié(e)", label: "Marié(e)" },
    { value: "Divorcé(e)", label: "Divorcé(e)" },
    { value: "Veuf (Veuve)", label: "Veuf (Veuve)" },
  ];

  // Fonction pour charger les données nécessaires lors de l'initialisation
  async function loadData() {
    for (let obj of objects) {
      const data = await fetchDataChange(obj.url);
      values[obj.name] = data;
    }

    await applyFilters();
  }

  // Fonction pour mettre à jour les districts en fonction de la région
  async function updateDistricts() {
    const selectedRegion = values.region.find(
      (region) => region.id === +formData.region,
    );
    if (selectedRegion) {
      // Charger les districts de la région sélectionnée
      formData.district ? formData.district : "";
      formData.ville ? formData.ville : "";
      formData.commune ? formData.commune : "";

      values.district = await fetchDataChange(`/district/${formData.region}`);
      values.ville = [];
      values.commune = [];
    }
  }

  // Fonction pour mettre à jour les villes en fonction du district
  async function updateVilles() {
    const selectedDistrict = values.district.find(
      (district) => district.id === +formData.district,
    );
    if (selectedDistrict) {
      // Charger les villes du district sélectionné
      formData.ville ? formData.ville : "";
      formData.commune ? formData.commune : "";
      values.ville = await fetchDataChange(`/ville/${formData.district}`);
      values.commune = [];
    }
  }

  // Fonction pour mettre à jour les communes en fonction de la ville
  async function updateCommunes() {
    const selectedVille = values.ville.find(
      (ville) => ville.id === +formData.ville,
    );
    if (selectedVille) {
      // Charger les communes de la ville sélectionnée

      formData.commune ? formData.commune : "";
      values.commune = await fetchDataChange(`/commune/${formData.ville}`);
    }
  }

  onMount(() => {
    fetchData();
    loadReferenceData();

    getUserInfos();

    getAllProfessions();

    loadData();
  });

  function initValidation() {
    authenticating = true;

    const formDatas = new FormData();

    // Append form data fields
    appendFormDataFields(formDatas, formData);

    // Append reference if available
    const reference = localStorage.getItem("reference");
    if (reference) {
      formDatas.append("reference", reference);
    }
    formDatas.append("type", "professionnel");

    // Append files from localStorage
    const selectedFilesFromStorage = JSON.parse(
      localStorage.getItem("selectedFiles") || "{}",
    );
    appendFilesToFormData(formDatas, selectedFilesFromStorage);

    // Debugging: Log FormData
    for (const pair of formDatas.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    // Send the request
    sendFormData(formDatas);
  }

  function appendFormDataFields(
    formDatas: FormData,
    formData: Record<string, any>,
  ) {
    for (const [key, value] of Object.entries(formData)) {
      if (value !== undefined && value !== null) {
        formDatas.append(key, value);
      }
    }
  }

  function appendFilesToFormData(
    formDatas: FormData,
    selectedFiles: Record<string, any>,
  ) {
    for (const [fieldName, fileData] of Object.entries(selectedFiles)) {
      if (fileData && fileData.data) {
        const blob = base64ToBlob(fileData.data, "application/octet-stream");
        formDatas.append(fieldName, blob, fileData.name);
      }
    }
  }

  function base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: mimeType });
  }

  function sendFormData(formDatas: FormData) {
    console.log("FormData:", formDatas);
    fetch(`${BASE_URL_API}/professionnel/update/${user?.personneId}`, {
      method: "POST",
      body: formDatas,
    })
      .then((response) => response.json())
      .then((result) => {
        authenticating = false;
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error during submission:", error);
        authenticating = false;
      });
  }

  function clickValidation() {
    saveFormState();
    initValidation();
  }
  async function checkCodeVerification(code: any) {
    if (!code) return false;

    try {
      const res = await fetch(
        `https://prodmydepps.leadagro.net/api/professionnel/existe/code/${code}`,
      );
      const data = await res.json();
      return data.data;
      return data.data; // Assurez-vous que l'API renvoie un objet avec une clé `valid`
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de la transaction :",
        error,
      );
      return false;
    }
  }
  let codeVericationStatus = false;

  let codeExisteError: any;
  $: if (formData.code) {
    checkCodeVerification(formData.code).then((resultat) => {
      codeVericationStatus = resultat;

      if (
        resultat.exsiteInProfessionnel == true &&
        resultat.exsiteInCodeGenerateur == true
      ) {
        codeExisteError =
          "l'utilisateur de ce code de vérification existe deja";
      } else if (
        resultat.exsiteInCodeGenerateur == true &&
        resultat.exsiteInProfessionnel == false
      ) {
        codeExisteError = "";
      } else if (
        resultat.exsiteInProfessionnel == false &&
        resultat.exsiteInCodeGenerateur == false
      ) {
        codeExisteError = "Ce code de vérification n'existe pas";
      } else if (
        resultat.exsiteInProfessionnel == true &&
        resultat.exsiteInCodeGenerateur == false
      ) {
        codeExisteError =
          "";
      } else {
        codeExisteError = "";
      }
    });
  } else {
    codeExisteError = "";
  }
  function updateField(field: any, value: any) {
    formData[field] = value;
    localStorage.setItem("formData", JSON.stringify(formData));
  }
</script>

<Slide {user} />

<div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4">
  <div class="flex items-center hover:text-blue-600 entete">
    <button
      on:click={navigateToDashboard}
      class="flex items-center hover:text-blue-600"
    >
      <!-- Icône SVG pour "Tableau de bord" -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
        />
      </svg>
      Tableau de bord
    </button>
    <span>/</span>
    <span class="text-gray-800">Liste des dossiers</span>
    <!-- Nom de la page actuelle -->
  </div>
</div>
<br />

{#if isLoading}
  <main style="padding-top: 8px" class="pb-0">
    <section class="iletisim-form-alani">
      <SkeletonLoader {activeTab} />
    </section>
  </main>
{:else}
  <main class="pb-0">
    <section class="iletisim-form-alani">
      <!-- <form class="form one_customer" method="post"> -->
      <div class="w-full mx-auto p-4 content-sec">
        <!-- Tabs Navigation -->
        <div class="mb-4 border-b border-gray-200">
          <ul
            class="flex flex-wrap -mb-px text-3xl font-medium text-center border border-gray-200 bg-white"
          >
            <li class="mr-[0.5px] border-2 border-r-white">
              <button
                class="inline-block p-4 btn-tabs {activeTab === 'step2'
                  ? 'text-white-600 border-b-2 border-blue-600 bg-blue-400 '
                  : 'hover:text-gray-600 hover:border-gray-300'}"
                on:click={() => (activeTab = "step2")}
              >
                Informations Personnelles
              </button>
            </li>
            <li class="mr-[0.5px] border-2 border-r-white">
              <button
                class="inline-block p-4 btn-tabs {activeTab === 'step3'
                  ? 'text-white border-b-2 border-blue-600 bg-blue-400'
                  : 'hover:text-gray-600 hover:border-gray-300'}"
                on:click={() => (activeTab = "step3")}
              >
                Informations Professionnelles
              </button>
            </li>
            <li class="mx-[0.5px] border-2 border-r-white">
              <button
                class="inline-block p-4 btn-tabs {activeTab === 'step4'
                  ? 'text-white border-b-2 border-blue-600 bg-blue-400'
                  : 'hover:text-gray-600 hover:border-gray-300'}"
                on:click={() => (activeTab = "step4")}
              >
                Documents
              </button>
            </li>
            <li class="mx-[0.5px] border-2 border-rl-white">
              <button
                class="inline-block btn-tabs p-4 {activeTab === 'step5'
                  ? 'text-white border-b-2 border-blue-600 bg-blue-400'
                  : 'hover:text-gray-600 hover:border-gray-300'}"
                on:click={() => (activeTab = "step5")}
              >
                Organisation
              </button>
            </li>
          </ul>
        </div>

        <!-- Tab Contents -->
        <div class="mt-1">
          <!-- Step 2: Informations Personnelles -->
          {#if activeTab === "step2"}
           

            <Step2Form
              {formData}
              {errors}
              {values}
              {situationsMatrimoniales}
              {saveFormState}
              showTitle={false}
            />
          {/if}

          <!-- Step 3: Informations Professionnelles -->
          {#if activeTab === "step3"}
            
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 p-8"
            >
              <TextInput
                type="text"
                label="Profession"
                bind:value={formData.profession}
                error={""}
                step={3}
                bind:formData
                disabled={true}
              />
            </div>

            <EtapeProfessionnelle
              {formData}
              {errors}
              {values}
              professions={[]}
              {codeExisteError}
              {updateField}
              showTitle={false}
            />
          {/if}

          <!-- Step 4: Documents -->
          {#if activeTab === "step4"}
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each ["photo", "cni", "casier", "diplomeFile", "certificat", "cv"] as field}
                  <div class="space-y-2">
                    <label class="block text-3xl font-medium text-black">
                      {field.toUpperCase()}
                    </label>

                    {#if formData[field] && formData[field].url}
                      <div class="flex items-center mb-2">
                        <span class="text-3xl text-gray-500">
                          Fichier : {formData[field].alt}
                        </span>
                        <a
                          on:click={() =>
                            openModal(
                              BASE_URL_API_UPLOAD + formData[field].url,
                            )}
                          href="javascript:void(0)"
                          download="document"
                          class="ml-4 text-blue-600 hover:underline"
                        >
                          Télécharger
                        </a>
                      </div>
                    {/if}

                    <input
                      type="file"
                      on:change={(e) => (formData[field] = e.target.files[0])}
                      class="w-full form__input"
                    />
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <!-- Step 5: Organisation -->
          {#if activeTab === "step5"}
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-2 space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Appartenir à une organisation ?</label
                  >
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        bind:group={formData.appartenirOrganisation}
                        value="oui"
                        disabled
                        class="form-radio text-white"
                        checked={formData.appartenirOrganisation === "oui"}
                      />
                      <span class="ml-2">Oui</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        bind:group={formData.appartenirOrganisation}
                        value="non"
                        disabled
                        class="form-radio text-white"
                        checked={formData.appartenirOrganisation === "non"}
                      />
                      <span class="ml-2">Non</span>
                    </label>
                  </div>
                </div>

                {#if formData.appartenirOrganisation == "oui"}
                  <div class="space-y-2">
                    <label class="block text-3xl font-medium text-black"
                      >Nom de l'organisation</label
                    >
                    <input
                      type="text"
                      bind:value={formData.organisationNom}
                      class="w-full form__input"
                    />
                  </div>

                 
                {/if}
              </div>
            </div>
          {/if}
        </div>

        <!-- Submit Button -->
        <div class="mt-6 flex justify-end">
          <button
            type="button"
            on:click={clickValidation}
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {#if authenticating}
              <div class="grid grid-cols-2">
                <div>
                  <Spinner />
                </div>
                <div>Modifier</div>
              </div>
            {:else}
              Modifier
            {/if}
          </button>
        </div>
      </div>
      <!--  </form> -->
      <br /><br /><br /><br />
    </section>
  </main>
{/if}
<Footer></Footer>

<Modal isOpen={isModalOpen} {pdfUrl} onClose={closeModal} />

<style>
  
  .iletisim-form-alani {
    padding: 20rem 157px 10rem !important;

    background-color: white !important;
  }
  .entete {
    width: 80% !important;
  }
  .content-sec {
    margin-top: 160px;
  }

  .btn-tabs {
    color: black !important;
    font-size: 14px;
  }

  .file-ariane {
    position: absolute;
    width: 100%;
    top: 96px;
    background: #4292cecc;
    padding: 22px;
    color: white;
    font-size: 14px;
    justify-content: center;
    align-items: center;
  }

  .file-ariane span {
    color: white;
    margin: 0 5px;
  }
</style>
