<script lang="ts">
  import { onMount } from "svelte";
  import Slide from "$components/Slide.svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";
  import { apiFetch, BASE_URL_API, BASE_URL_API_UPLOAD, BASE_URL_API_V2 } from "$lib/api";
  import SkeletonLoader from "$components/_skeletons/SkeletonLoader.svelte";
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import { goto } from "$app/navigation";
  import DocShow from "./DocShow.svelte";
  import Modal from "$components/Modal.svelte";
  import TextInput from "$components/site/TextInput.svelte";
  import SelectInput from "$components/site/SelectInput.svelte";
  import type { Civilite, District, Pays } from "../../../types";

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
    poleSanitairePro: "",
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
    poleSanitairePro: "",
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
    organisationAnnee: ""

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
  const handleSubmit = async () => {
    authenticating = true;
    try {
      const formDataToSend = new FormData();

      // Convertir l'objet formData en FormData
      for (const [key, value] of Object.entries(formData)) {
        // Pour les objets avec ID (comme les sélections)
        if (typeof value === "object" && value !== null && value.id) {
          formDataToSend.append(key, value.id);
        }
        // Pour les fichiers
        else if (value instanceof File) {
          formDataToSend.append(key, value);
        }
        // Pour les dates
        else if (key.includes("date") && value) {
          const formattedDate = new Date(value).toISOString().split("T")[0];
          formDataToSend.append(key, formattedDate);
        }
        // Pour toutes les autres valeurs
        else if (value !== undefined && value !== null) {
          formDataToSend.append(key, value);
        }
      }

      console.log(formData.situation);

      const userId = user?.personneId;
      formDataToSend.append("userUpdate", userId);
      fetch(`${BASE_URL_API}/professionnel/update/${userId}`, {
        method: "POST",
        body: formDataToSend
      })
        .then((response) => response.json())
        .then((result) => {
          authenticating = false;

          console.log(result);
        })
        .catch((error) => {
          console.error("Erreur paiements :", error);
          authenticating = false;
        });

      console.log(formDataToSend);
    } catch (error) {
      authenticating = false;
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

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
    try {
      const userId = user?.personneId;
      const response = await apiFetch(true, `/professionnel/get/one/${userId}`);
      console.log("response before condition", response);
      if (response.data) {
        const apiData = response.data;
        console.log("content api data", apiData);

        formData = {

          code: apiData.code ? apiData.code : "",
         region: apiData.region ? apiData.region.id : "",
          district: apiData.district ? apiData.district.id : "",
          commune: apiData.commune ? apiData.commune.id : "",
          ville: apiData.ville ? apiData.ville.id : "",
          quartier: apiData.quartier ? apiData.quartier : "",
          poleSanitaire: apiData.poleSanitaire ? apiData.poleSanitaire : "",
          nom: apiData.nom || "",
          prenoms: apiData.prenoms || "",
          professionnel: apiData.professionnel || "",
          lieuExercicePro: apiData.lieuExercicePro || "",
          emailAutre: apiData.email || "",
          civilite: apiData.civilite ? apiData.civilite.id : "",
          nationalite: apiData.nationate ? apiData.nationate.id : "",
          dateNaissance: formatDateForInput(apiData.dateNaissance),
          numero: apiData.number || "",
          diplome: apiData.diplome || "",
          dateDiplome: formatDateForInput(apiData.dateDiplome),
          lieuDiplome: apiData.lieuDiplome || "",
          situation: apiData.situation || "",
          profession: apiData.profession || "",
          situationPro: apiData.situationPro || "",
          emailPro: apiData.emailPro || "",
          poleSanitairePro: apiData.poleSanitairePro || "",
          datePremierDiplome: formatDateForInput(apiData.datePremierDiplome),
          photo: apiData.photo || "",
          cni: apiData.cni || "",
          casier: apiData.casier || "",
          diplomeFile: apiData.diplomeFile || "",
          certificat: apiData.certificat || "",
          cv: apiData.cv || "",
          // Organisation
         appartenirOrganisation: apiData.appartenirOrganisation,
          organisationNom: apiData.appartenirOrganisation == "oui" ? apiData.organisationNom|| "" : "",
         
        };
        
        await getProfessionLibelle(apiData.profession);
      } else {
        console.error("Erreur API", response.status);
      }
    } catch (error) {
      console.error("Erreur de récupération des données", error);
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
        pays =paysResponse.data || [];
      }
      const situationProfessionnellesResponse = await apiFetch(true, "/situationProfessionnelle");
      if (situationProfessionnellesResponse.code === 200) {
        situationProfessionnelles =situationProfessionnellesResponse.data || [];
      }

   
     
    } catch (error) {
      console.error("Erreur lors du chargement des références:", error);
    }
  }

  let isModalOpen = false;
  let pdfUrl = "";

  function openModal(url:any) {
    pdfUrl = url; // ✅ Met à jour la variable réactive
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  
  async function getProfessionLibelle(code:any) {
    
    try {
      const res = await fetch(BASE_URL_API + "/profession/get/by/code/" + code);

      if (res.ok) {
        const data = await res.json();
        if (data && data.data) {
          console.log("Data récupérée:", data.data);
          formData.profession = data.data;
         /*  return data.data; */
        } else {
          console.error("Erreur: data.data est undefined", data);
          /* return null; */
        }
      } else {
        console.error("Erreur HTTP:", res.status, res.statusText);
        /* return null; */
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      /* return null; */
    }
  }
 /*  onMount(async () => {
    getAllProfessions();
  }); */
  onMount(async () => {
    isLoading = true;
    fetchData();
    await loadReferenceData();
    await getUserInfos();
    
    await loadData();
    isLoading = false;
  });
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
    { name: "situationProfessionnelle", url: "/situationProfessionnelle" }
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
    commune: []
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
    { value: "Veuf (Veuve)", label: "Veuf (Veuve)" }
  ];

  // Fonction pour charger les données nécessaires lors de l'initialisation
  async function loadData() {
    for (let obj of objects) {
      const data = await fetchDataChange(obj.url);
      values[obj.name] = data;
    }

    applyFilters();
  }


  // Fonction pour mettre à jour les districts en fonction de la région
  async function updateDistricts() {
   
    const selectedRegion = values.region.find(
      (region) => region.id === +formData.region
    );
    if (selectedRegion) {
      // Charger les districts de la région sélectionnée
      formData.district = "";
      formData.ville = "";
      formData.commune = "";
      values.district = await fetchDataChange(`/district/${formData.region}`);
      values.ville = [];
      values.commune = [];
    }
  }

  // Fonction pour mettre à jour les villes en fonction du district
  async function updateVilles() {
    const selectedDistrict = values.district.find(
      (district) => district.id === +formData.district
    );
    if (selectedDistrict) {
      // Charger les villes du district sélectionné
      formData.ville = "";
      formData.commune = "";
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
      formData.commune = "";
      values.commune = await fetchDataChange(`/commune/${formData.ville}`);
    }
  }

</script>



<Slide {user} />


  <div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4">
    
    <div class="flex items-center hover:text-blue-600 entete">
        <button on:click={navigateToDashboard} class="flex items-center hover:text-blue-600">
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
    <span class="text-gray-800">Liste des dossiers</span> <!-- Nom de la page actuelle -->
    </div>
  
  </div><br>


{#if isLoading}
  <main style="padding-top: 8px" class="pb-0">
    <section class="iletisim-form-alani">
      <SkeletonLoader {activeTab} />
    </section>
  </main>
{:else}
  <main  class="pb-0">
    <section class="iletisim-form-alani">
      <div class="w-full mx-auto p-4 content-sec">
        <!-- Tabs Navigation -->
        <div class="mb-4 border-b border-gray-200">
          <ul
            class="flex flex-wrap -mb-px text-3xl font-medium text-center border border-gray-200 bg-white"
          >
            <li class="mr-[0.5px] border-2 border-r-white ">
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
            <div class="bg-white p-2 rounded-lg shadow-sm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               
                <TextInput
                type="text"
                label="Nom"
                bind:value={formData.nom}
                placeholder="Entrez votre nom"
                error={errors.nom}
                onInput={saveFormState}
                step={2}
              />

              <TextInput
                type="text"
                label="Prénoms"
                bind:value={formData.prenoms}
                placeholder="Entrez votre prénom"
                error={errors.prenoms}
                onInput={saveFormState}
                step={2}
              />

              <div class="form__group">
                <label class="block text-2xl font-medium mb-1"
                  >Nationalité *</label
                >
                <select
                  on:change={saveFormState}
                  class="w-full form__input"
                  name=""
                  id=""
                  bind:value={formData.nationalite}
                >
                  <option value="" selected={!formData.nationalite}
                    >Veuillez sélectionner une option</option
                  >
                  {#each values.nationate as nationate}
                    <option
                      value={nationate.id}
                      selected={formData.nationalite === nationate.id}
                      >{nationate.libelle}</option
                    >
                  {/each}
                </select>
                {#if errors.nationalite}<p class="text-red-500 text-sm">
                    {errors.nationalite}
                  </p>{/if}
              </div>

              <div class="form__group">
                <label class="block text-2xl font-medium mb-1"
                  >Civilité *</label
                >
                <select
                  on:input={saveFormState}
                  bind:value={formData.civilite}
                  class="w-full form__input"
                >
                  <option value="" selected={!formData.civilite}>Veuillez sélectionner une option</option>
                  {#each values.civilite as civilite}
                    <option  selected={ civilite.id === +formData.civilite} value={civilite.id}>{civilite.libelle}</option>
                  {/each}
                </select>
                {#if errors.civilite}<p class="text-red-500 text-sm">
                    {errors.civilite}
                  </p>{/if}
              </div>

              <TextInput
                type="email"
                label="Email"
                bind:value={formData.emailAutre}
                placeholder="Entrez votre email"
                error={errors.emailAutre}
                onInput={saveFormState}
                step={2}
              />

              <TextInput
                type="tel"
                label="Contact"
                bind:value={formData.numero}
                placeholder="07xxxxxxxx"
                error={errors.numero}
                onInput={saveFormState}
                step={2}
              />

              <TextInput
                type="date"
                label="Date de naissance"
                bind:value={formData.dateNaissance}
                placeholder="Entrez votre date de naissance"
                error={errors.dateNaissance}
                onInput={saveFormState}
                step={2}
              />

              <SelectInput
                label="Situation matrimoniale"
                bind:value={formData.situation}
                options={situationsMatrimoniales.map((c) => ({
                  id: String(c.value),
                  libelle: c.label
                }))}
                placeholder="Veuillez sélectionner une situation matrimoniale"
                error={errors.situation}
                onInput={saveFormState}
                step={2}
              />

              </div>
            </div>
          {/if}

          <!-- Step 3: Informations Professionnelles -->
          {#if activeTab === "step3"}
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                type="email"
                label="Adresse email professionnel"
                bind:value={formData.emailPro}
                placeholder="Entrez votre email professionnel"
                error={errors.emailPro}
                onInput={saveFormState}
                step={3}
              />

              <!-- Date d'obtention du diplôme -->
              <TextInput
                type="date"
                label="Date d'obtention du diplôme"
                bind:value={formData.dateDiplome}
                placeholder="Entrez la date d'obtention du diplôme"
                error={errors.dateDiplome}
                onInput={saveFormState}
                step={3}
              />

              <!-- Lieu d'obtention du diplôme -->
              <TextInput
                type="text"
                label="Lieu d'obtention du diplôme"
                bind:value={formData.lieuDiplome}
                placeholder="Entrez le lieu d'obtention"
                error={errors.lieuDiplome}
                onInput={saveFormState}
                step={3}
              />

              <!-- Date du premier emploi -->
              <TextInput
                type="date"
                label="Date du premier emploi"
                bind:value={formData.datePremierDiplome}
                placeholder="Entrez la date du premier emploi"
                error={errors.datePremierDiplome}
                onInput={saveFormState}
                step={3}
              />

              <!-- Dénomination du diplôme -->
              <TextInput
                type="text"
                label="Dénomination du diplôme"
                bind:value={formData.diplome}
                placeholder="Entrez la dénomination du diplôme"
                error={errors.diplome}
                onInput={saveFormState}
                step={3}
              />

              <!-- Situation Professionnelle (Select) -->
              <SelectInput
                label="Situation professionnelle"
                bind:value={formData.situationPro}
                options={values.situationProfessionnelle.map((c) => ({
                  id: String(c.id),
                  libelle: c.libelle
                }))}
                placeholder="Sélectionnez votre situation professionnelle"
                error={errors.situationPro}
                onInput={saveFormState}
                step={3}
              />

              <!-- Région (Select) -->
            
              <div class="form__group">
                <label class="block text-2xl font-medium mb-1">Région *</label>
                <select
                bind:value={formData.region}
                  class="w-full form__input"
                  on:change={saveFormState}
                  on:change={updateDistricts} on:change={saveFormState}
                >
                <option value="" selected={!formData.region}>Sélectionnez votre Région</option>
                {#each values.region as region}
                  <option value={region.id} selected={region.id === +formData.region}>{region.libelle}</option>
                {/each}
                </select>
                {#if errors.region}
                  <p class="text-red-500 text-sm">{errors.region}</p>
                {/if}
              </div>

              <div class="form__group">
                <label class="block text-2xl font-medium mb-1">District *</label>
                <select
               
                  class="w-full form__input"
                  bind:value={formData.district}
                on:change={updateVilles} on:change={saveFormState}
                >
                <option value="" selected={!formData.district}>Sélectionnez votre district</option>
                {#each values.district as district}
                  <option value={district.id} selected={district.id === +formData.district}>{district.libelle}</option>
                {/each}
                </select>
                {#if errors.district}
                  <p class="text-red-500 text-sm">{errors.district}</p>
                {/if}
              </div>

              <div class="form__group">
                <label class="block text-2xl font-medium mb-1">Ville *</label>
                <select
               
                  class="w-full form__input"
                  bind:value={formData.ville}
                on:change={updateCommunes} on:change={saveFormState}
                >
                <option value="" selected={!formData.ville}>Sélectionnez votre ville</option>
                {#each values.ville as ville}
                  <option value={ville.id} selected={ville.id === +formData.ville}>{ville.libelle}</option>
                {/each}
                </select>
                {#if errors.ville}
                  <p class="text-red-500 text-sm">{errors.ville}</p>
                {/if}
              </div>

              <div class="form__group">
                <label class="block text-2xl font-medium mb-1">Commune *</label>
                <select
               
                  class="w-full form__input"
                  bind:value={formData.commune} on:change={saveFormState}
                >
                <option value="" selected={!formData.commune}>Sélectionnez votre commune</option>
                {#each values.commune as commune}
                  <option value={commune.id} selected={commune.id === +formData.commune}>{commune.libelle}</option>
                {/each}
                </select>
                {#if errors.commune}
                  <p class="text-red-500 text-sm">{errors.commune}</p>
                {/if}
              </div>

              <!-- Quartier -->
              <TextInput
                type="text"
                label="Quartier"
                bind:value={formData.quartier}
                placeholder="Entrez votre Quartier"
                error={errors.quartier}
                onInput={saveFormState}
                step={3}
              />

              <!-- Pôle Sanitaire -->
              <TextInput
                type="text"
                label="Ilot,lot"
                bind:value={formData.poleSanitaire}
                placeholder="Entrez votre Ilot,Lot"
                error={errors.poleSanitaire}
                onInput={saveFormState}
                step={3}
              />

              <!-- Professionnel -->
              <TextInput
                type="text"
                label="Structure d'exercice professionnel"
                bind:value={formData.professionnel}
                placeholder="Entrez votre Structure d'exercice professionnel"
                error={errors.professionnel}
                onInput={saveFormState}
                step={3}
              />

              <!-- Lieu d'exercice professionnel -->
              <TextInput
                type="text"
                label="Lieu d'exercice professionnel"
                bind:value={formData.lieuExercicePro}
                placeholder="Entrez votre lieu d'exercice professionnel"
                error={errors.lieuExercicePro}
                onInput={saveFormState}
                step={3}
              />
                
              </div>
            </div>
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
                        <a   on:click={() =>
                          openModal(
                            BASE_URL_API_UPLOAD +
                              formData[field].path +
                              "/" +
                              formData[field].alt
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

                 <!--  <div class="space-y-2">
                    <label class="block text-3xl font-medium text-black"
                      >Numéro de l'organisation</label
                    >
                    <input
                      type="text"
                      bind:value={formData.organisationNumero}
                      class="w-full form__input"
                    />
                  </div>

                  <div class="space-y-2">
                    <label class="block text-3xl font-medium text-black"
                      >Année d'adhésion</label
                    >
                    <input
                      type="number"
                      bind:value={formData.organisationAnnee}
                      class="w-full form__input"
                    /> -->
                <!--   </div> -->
                {/if}
              </div>
            </div>
          {/if}
        </div>

        <!-- Submit Button -->
        <div class="mt-6 flex justify-end">
          <!--   <button
                on:click={handleSubmit}
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Modifier
        </button> -->

          <button
            type="button"
            on:click={handleSubmit}
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
    </section>
  </main>
{/if}
<Footer></Footer>

<Modal isOpen={isModalOpen} {pdfUrl} onClose={closeModal} />

<style>
  .iletisim-form-alani {
    padding: 20rem 226px 10rem !important;

    background-color: white !important;
  }
  .entete {
    width: 76% !important;
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
