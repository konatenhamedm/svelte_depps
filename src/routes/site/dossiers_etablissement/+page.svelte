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
  import type {
    Civilite,
    District,
    Etablissement2,
    Pays,
  } from "../../../types";
  import Step2Form from "$components/site/Step2Form.svelte";
  import EtapeProfessionnelle from "$components/site/EtapeProfessionnelle.svelte";
  import { is } from "date-fns/locale";

  export let data;
  let user = data?.user;
  let activeTab = "step2";
  let isLoading = true;

  interface DocumentItem {
    libelle: string;
    path: string; // chemin ou base64 du fichier
    libelleGroupe: string;
  }
  let formData: {
    password: string;
    confirmPassword: string;
    email: string;
    niveauIntervention: any;
    typePersonne: any;
    code: any;
    nom: string;
    prenoms: string;
    telephone: string;
    bp: string;
    emailAutre: string;
    adresse: string;
    nomRepresentant: string;
    denomination: string;
    documents: any[];
  } = {
    password: "",
    confirmPassword: "",
    email: "",
    code: "",
    niveauIntervention: "",
    typePersonne: "",
    nom: "",
    prenoms: "",
    telephone: "",
    bp: "",
    emailAutre: "",
    adresse: "",
    nomRepresentant: "",
    denomination: "",
    documents: [],
  };

  // Définition des erreurs
  let errors = {
    email: "",
    password: "",
    confirmPassword: "",
    // Informations générales
    // Informations generales ( à update en fonction du type)
    typePersonne: "",
    niveauIntervention: "",
    nom: "",
    prenoms: "",
    telephone: "",
    bp: "",
    emailAutre: "",
    adresse: "",
    nomRepresentant: "",
    denomination: "",
    code: "",
    // Pour la derniere step
    documents: "",
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
      const response = await apiFetch(true, `/etablissement/get/one/${userId}`);
      const apiData: Etablissement2 = response.data;

      formData = {
        password: "",
        confirmPassword: "",
        email: apiData.email || "",
        // niveauIntervention: apiData.personne.niveauIntervention || "",
        typePersonne: apiData.personne.typePersonne || "",
        code: apiData.personne.code || "",
        nom: apiData.personne.nom || "",
        prenoms: apiData.personne.prenoms || "",
        telephone: apiData.personne.telephone || "",
        bp: apiData.personne.bp || "",
        emailAutre: apiData.personne.emailAutre || "",
        adresse: apiData.personne.adresse || "",
        nomRepresentant: apiData.personne.nomRepresentant || "",
        denomination: apiData.personne.denomination || "",
        documents: apiData.personne.documents || [],
      };
    } catch (error) {
      console.error("Erreur de récupération des données", error);
    } finally {
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
        "/situationProfessionnelle"
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
    { name: "nationate", url: "/pays" },
    { name: "statusPro", url: "/statusPro" },
    { name: "typeDiplome", url: "/typeDiplome" },
    { name: "lieuObtentionDiplome", url: "/lieuDiplome" },
    { name: "situationProfessionnelle", url: "/situationProfessionnelle" },
  ];

  let values: {
    civilite: Civilite[];
    region: Civilite[];
    district: District[];
    ville: Civilite[];
    commune: Civilite[];
    nationate: Pays[];
    lieuObtentionDiplome: Pays[];
    typeDiplome: Pays[];
    statusPro: Pays[];
    situationProfessionnelle: Pays[];
  } = {
    civilite: [],
    nationate: [],
    lieuObtentionDiplome: [],
    statusPro: [],
    typeDiplome: [],
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
            res.statusText
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
    /* if (formData.district) {
      await updateVilles();
    }
    if (formData.ville) {
      await updateCommunes();
    } */
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
      (region) => region.id === +formData.region
    );
    /* if (selectedRegion) {
      // Charger les districts de la région sélectionnée
      formData.district ? formData.district : "";
      formData.ville ? formData.ville : "";
      formData.commune ? formData.commune : "";

      values.district = await fetchDataChange(`/district/${formData.region}`);
      values.ville = [];
      values.commune = [];
    } */
  }

  // Fonction pour mettre à jour les villes en fonction du district
  async function updateVilles() {
    const selectedDistrict = values.district.find(
      (district) => district.id === +formData.district
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
      (ville) => ville.id === +formData.ville
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
    formDatas.append("type", "etablissement");

    // Append files from localStorage
    const selectedFilesFromStorage = JSON.parse(
      localStorage.getItem("selectedFiles") || "{}"
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
    formData: Record<string, any>
  ) {
    for (const [key, value] of Object.entries(formData)) {
      if (value !== undefined && value !== null) {
        formDatas.append(key, value);
      }
    }
  }

  function appendFilesToFormData(
    formDatas: FormData,
    selectedFiles: Record<string, any>
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
    fetch(`${BASE_URL_API}/etablissement/update/${user?.personneId}`, {
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
        `https://depps.leadagro.net/api/professionnel/existe/code/${code}`
      );
      const data = await res.json();
      return data.data;
      return data.data; // Assurez-vous que l'API renvoie un objet avec une clé `valid`
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de la transaction :",
        error
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
        codeExisteError = "";
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
          </ul>
        </div>

        <!-- Tab Contents -->
        <div class="mt-1">
          <!-- Step 2: Informations Personnelles -->
          {#if activeTab === "step2"}
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4"
            >
              <TextInput
                type="text"
                label="Email"
                bind:value={formData.email}
                placeholder="Entrez votre email"
                error={errors.email}
                onInput={saveFormState}
                step={2}
              />
             
              {#if formData.typePersonne.libelle == "PHYSIQUE"}
               <div  class="form__grup">
                      <label class="form_label">Nom*</label>
                      <input
                        on:input={(e: any) =>
                          updateField('nom', e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.nom}
                        placeholder="Nom"
                      />
                      {#if errors.nom}<p class="error">
                          {errors.nom}
                        </p>{/if}
                    </div>

                    <!-- Champ contactEntreprise -->

                    <div  class="form__grup">
                      <label class="form_label">Prenoms *</label>
                      <input
                        on:input={(e: any) =>
                          updateField('prenoms', e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.prenoms}
                        placeholder="Prenoms"
                      />
                      {#if errors.prenoms}<p class="error">
                          {errors.prenoms}
                        </p>{/if}
                    </div>

                    <div  class="form__grup">
                      <label class="form_label">Telephone *</label>
                      <input
                        on:input={(e: any) =>
                          updateField('telephone', e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.telephone}
                        placeholder="Telephone"
                      />
                      {#if errors.telephone}<p class="error">
                          {errors.telephone}
                        </p>{/if}
                    </div>

                    <!-- Champ Type -->
                    <div  class="form__grup">
                      <label class="form_label">Boite Postale *</label>
                      <input
                        on:input={(e: any) => updateField('bp', e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.bp}
                        placeholder="Boite Postale"
                      />
                      {#if errors.bp}<p class="error">
                          {errors.bp}
                        </p>{/if}
                    </div>

                    <!-- Champ gpsEntreprise -->

                    <div  class="form__grup">
                      <label class="form_label">Autre E-mail *</label>
                      <input
                        on:input={(e: any) =>
                          updateField('emailAutre', e.target.value)}
                        type="email"
                        class="form__input"
                        bind:value={formData.emailAutre}
                        placeholder="Autre E-mail"
                      />
                      {#if errors.emailAutre}<p class="error">
                          {errors.emailAutre}
                        </p>{/if}
                    </div>
              {/if}
              {#if formData.typePersonne.libelle == "MORALE"}
               <div  class="form__grup">
                      <label class="form_label">Adresse *</label>
                      <input
                        on:input={(e: any) =>
                          updateField('adresse', e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.adresse}
                        placeholder="Adresse"
                      />
                      {#if errors.adresse}<p class="error">
                          {errors.adresse}
                        </p>{/if}
                    </div>
                    <!-- Champ Nom de l'entreprise -->

                    <!-- Champ Email de l'entreprise -->

                    <div  class="form__grup">
                      <label class="form_label">Nom du representant *</label>
                      <input
                        on:input={(e: any) =>
                          updateField('nomRepresentant', e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.nomRepresentant}
                        placeholder="Nom du representant"
                      />
                      {#if errors.nomRepresentant}<p class="error">
                          {errors.nomRepresentant}
                        </p>{/if}
                    </div>

                    <!-- Champ Espace -->
                    <div  class="form__grup">
                      <label class="form_label">Dénomination *</label>
                      <input
                        on:input={(e: any) =>
                          updateField('denomination', e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.denomination}
                        placeholder="Denomination"
                      />
                      {#if errors.denomination}<p class="error">
                          {errors.denomination}
                        </p>{/if}
                    </div>
               {/if}
            </div>
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
                      {field == "diplomeFile"
                        ? "Origine du diplôme"
                        : field.toUpperCase()}
                    </label>

                    {#if formData[field] && formData[field].url}
                      <div class="flex items-center mb-2">
                        <span class="text-3xl text-gray-500">
                          Fichier : {formData[field].alt}
                        </span>
                        <a
                          on:click={() =>
                            openModal(
                              BASE_URL_API_UPLOAD + formData[field].url
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
