<script lang="ts">
  import { onMount } from "svelte";
  import Slide from "$components/Slide.svelte";
  import Header from "$components/Header.svelte";
  import Footer from "$components/Footer.svelte";
  import { apiFetch, BASE_URL_API, BASE_URL_API_V2 } from "$lib/api";
  import SkeletonLoader from "$components/_skeletons/SkeletonLoader.svelte";
  import Spinner from "$components/_skeletons/Spinner.svelte";

  export let data;
  let user = data?.user;
  let activeTab = "step2";
  let isLoading = true;
  let formData = {
    genre: "",
    civilite: "",
    numero: "",
    nom: "",
    prenoms: "",
    nationalite: "",
    dateNaissance: "",
    address: "",
    lieuResidence: "",
    diplome: "",
    dateDiplome: "",
    lieuDiplome: "",
    situation: "",

    // Professional informations
    profession: "",
    situationPro: "",
    specialite: "",
    emailPro: "",
    contactPro: "",
    professionnel: "",
    ville: "",
    dateEmploi: "",

    // Media informations
    photo: "",
    cni: "",
    casier: "",
    diplomeFile: "",
    certificat: "",
    cv: "",

    // Organization informations
    appartenirOrganisation: false,
    organisationNom: "",
    organisationNumero: "",
    organisationAnnee: ""
  };

  let specialites: any = [];
  let genres: any = [];
  let civilites: any = [];
  let villes: any = [];

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

      console.log(formData.situation)

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

  function formatDateForInput(dateString) {
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
      if (response.code === 200 && response.data) {
        const apiData = response.data;
        console.log("content api data", apiData);

        formData = {
          genre: apiData.genre ? apiData.genre.id : "",
          civilite: apiData.civilite ? apiData.civilite.id : "",
          nom: apiData.nom || "",
          prenoms: apiData.prenoms || "",
          nationalite: apiData.nationalite ? apiData.nationalite.id : "",
          dateNaissance: formatDateForInput(apiData.dateNaissance),
          numero: apiData.number || "",
          address: apiData.address || "",
          lieuResidence: apiData.lieuResidence || "",
          diplome: apiData.diplome || "",
          dateDiplome: formatDateForInput(apiData.dateDiplome),
          lieuDiplome: apiData.lieuDiplome || "",
          situation: apiData.situation || "",

          profession: apiData.profession || "",
          situationPro: apiData.situationPro || "",
          specialite: apiData.specialite ? apiData.specialite.id : "",
          emailPro: apiData.emailPro || "",
          contactPro: apiData.contactPro || "",
          professionnel: apiData.professionnel || "",
          ville: apiData.ville ? apiData.ville.id : "",
          dateEmploi: formatDateForInput(apiData.dateEmploi),

          photo: apiData.photo || "",
          cni: apiData.cni || "",
          casier: apiData.casier || "",
          diplomeFile: apiData.diplomeFile || "",
          certificat: apiData.certificat || "",
          cv: apiData.cv || "",

          // Organisation
          appartenirOrganisation:
            apiData.appartenirOrganisation !== null
              ? apiData.appartenirOrganisation
              : false,
          organisationNom: apiData.organisationNom || "",
          organisationNumero: apiData.organisationNumero || "",
          organisationAnnee: apiData.organisationAnnee || ""
        };

        console.log("Données chargées:", formData);
      } else {
        console.error("Erreur API", response.status);
      }
    } catch (error) {
      console.error("Erreur de récupération des données", error);
    }
  }

  async function loadReferenceData() {
    try {
      const genresResponse = await apiFetch(true, "/genre");
      if (genresResponse.code === 200) {
        genres = genresResponse.data || [];
      }

      const civilitesResponse = await apiFetch(true, "/civilite");
      if (civilitesResponse.code === 200) {
        civilites = civilitesResponse.data || [];
      }

      const specialitesResponse = await apiFetch(true, "/specialite");
      if (specialitesResponse.code === 200) {
        specialites = specialitesResponse.data || [];
      }

      const villesResponse = await apiFetch(true, "/ville");
      if (villesResponse.code === 200) {
        villes = villesResponse.data || [];
      }
    } catch (error) {
      console.error("Erreur lors du chargement des références:", error);
    }
  }

  onMount(async () => {
    isLoading = true;
    await loadReferenceData();
    await getUserInfos();
    isLoading = false;
  });
</script>

<Header {user} />
<Slide {user} />
{#if isLoading}
  <SkeletonLoader {activeTab} />
{:else}
  <div class="w-full mx-auto p-4 content-sec">
    <!-- Tabs Navigation -->
    <div class="mb-4 border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
        <li class="mr-2">
          <button
            class="inline-block p-4 btn-tabs {activeTab === 'step2'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'hover:text-gray-600 hover:border-gray-300'}"
            on:click={() => (activeTab = "step2")}
          >
            Informations de Base
          </button>
        </li>
        <li class="mr-2">
          <button
            class="inline-block p-4 btn-tabs {activeTab === 'step3'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'hover:text-gray-600 hover:border-gray-300'}"
            on:click={() => (activeTab = "step3")}
          >
            Informations Professionnelles
          </button>
        </li>
        <li class="mr-2">
          <button
            class="inline-block p-4 btn-tabs {activeTab === 'step4'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'hover:text-gray-600 hover:border-gray-300'}"
            on:click={() => (activeTab = "step4")}
          >
            Documents
          </button>
        </li>
        <li class="mr-2">
          <button
            class="inline-block btn-tabs p-4 {activeTab === 'step5'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'hover:text-gray-600 hover:border-gray-300'}"
            on:click={() => (activeTab = "step5")}
          >
            Organisation
          </button>
        </li>
      </ul>
    </div>

    <!-- Tab Contents -->
    <div class="mt-6">
      <!-- Step 2: Informations Personnelles -->
      {#if activeTab === "step2"}
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Genre</label
              >
              <select
                bind:value={formData.genre}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionner un genre</option>
                {#each genres as genre}
                  <option value={genre.id}>{genre.libelle}</option>
                {/each}
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Civilité</label
              >
              <select
                bind:value={formData.civilite}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionner une civilité</option>
                {#each civilites as civilite}
                  <option value={civilite.id}>{civilite.libelle}</option>
                {/each}
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                bind:value={formData.nom}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Prénoms</label
              >
              <input
                type="text"
                bind:value={formData.prenoms}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Date de Naissance</label
              >
              <input
                type="date"
                bind:value={formData.dateNaissance}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Numéro</label
              >
              <input
                type="text"
                bind:value={formData.numero}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Adresse</label
              >
              <input
                type="text"
                bind:value={formData.address}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Lieu de Résidence</label
              >
              <input
                type="text"
                bind:value={formData.lieuResidence}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Situation Matrimoniale</label
              >


              <select
            
              class="form__input"
              name=""
              id=""
              bind:value={formData.situation}
            >
              <option value="" selected={!formData.situation}
                >Veuillez sélectionner une option</option
              >

              <option
                value="Célibataire"
                selected={formData.situation === "Célibataire"}
                >Célibataire</option
              >
              <option
                value="Marié(e)"
                selected={formData.situation === "Marié(e)"}
                >Marié(e)</option
              >
              <option
                value="Divorcé(e)"
                selected={formData.situation === "Divorcé(e)"}
                >Divorcé(e)</option
              >
              <option
                value="Veuf (Veuve)"
                selected={formData.situation === "Veuf (Veuve)"}
                >Veuf (Veuve)</option
              >
            </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Diplôme</label
              >
              <input
                type="text"
                bind:value={formData.diplome}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Date d'obtention du diplôme</label
              >
              <input
                type="date"
                bind:value={formData.dateDiplome}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Lieu d'obtention du diplôme</label
              >
              <input
                type="text"
                bind:value={formData.lieuDiplome}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      {/if}

      <!-- Step 3: Informations Professionnelles -->
      {#if activeTab === "step3"}
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Profession</label
              >
              <input
                type="text"
                bind:value={formData.profession}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Situation Professionnelle</label
              >
              <input
                type="text"
                bind:value={formData.situationPro}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Spécialité</label
              >
              <select
                bind:value={formData.specialite}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionner une spécialité</option>
                {#each specialites as specialite}
                  <option value={specialite.id}>{specialite.libelle}</option>
                {/each}
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Email Professionnel</label
              >
              <input
                type="email"
                bind:value={formData.emailPro}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Contact Professionnel</label
              >
              <input
                type="text"
                bind:value={formData.contactPro}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Professionnel</label
              >
              <input
                type="text"
                bind:value={formData.professionnel}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Ville d'exercice</label
              >
              <select
                bind:value={formData.ville}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sélectionner une ville</option>
                {#each villes as ville}
                  <option value={ville.id}>{ville.libelle}</option>
                {/each}
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Date d'emploi</label
              >
              <input
                type="date"
                bind:value={formData.dateEmploi}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      {/if}

      <!-- Step 4: Documents -->
      {#if activeTab === "step4"}
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Photo</label
              >
              {#if formData.photo && formData.photo.url}
                <div class="flex items-center mb-2">
                  <span class="text-sm text-gray-500 mr-2"
                    >Fichier actuel : {formData.photo.alt}</span
                  >
                  {#if formData.photo.url === "pdf"}
                    <span
                      class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded"
                      >PDF</span
                    >
                  {:else}
                    <img
                      src={formData.photo.path + "/" + formData.photo.alt}
                      alt="Photo"
                      class="h-16 w-16 object-cover rounded"
                    />
                  {/if}
                </div>
              {/if}
              <input
                type="file"
                accept="image/*"
                on:change={(e) => (formData.photo = e.target.files[0])}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">CNI</label>
              {#if formData.cni && formData.cni.url}
                <div class="flex items-center mb-2">
                  <span class="text-sm text-gray-500"
                    >Fichier actuel : {formData.cni.alt}</span
                  >
                </div>
              {/if}
              <input
                type="file"
                on:change={(e) => (formData.cni = e.target.files[0])}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Casier judiciaire</label
              >
              {#if formData.casier && formData.casier.url}
                <div class="flex items-center mb-2">
                  <span class="text-sm text-gray-500"
                    >Fichier actuel : {formData.casier.alt}</span
                  >
                </div>
              {/if}
              <input
                type="file"
                on:change={(e) => (formData.casier = e.target.files[0])}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Diplôme</label
              >
              {#if formData.diplomeFile && formData.diplomeFile.url}
                <div class="flex items-center mb-2">
                  <span class="text-sm text-gray-500"
                    >Fichier actuel : {formData.diplomeFile.alt}</span
                  >
                </div>
              {/if}
              <input
                type="file"
                on:change={(e) => (formData.diplomeFile = e.target.files[0])}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Certificat</label
              >
              {#if formData.certificat && formData.certificat.url}
                <div class="flex items-center mb-2">
                  <span class="text-sm text-gray-500"
                    >Fichier actuel : {formData.certificat.alt}</span
                  >
                </div>
              {/if}
              <input
                type="file"
                on:change={(e) => (formData.certificat = e.target.files[0])}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">CV</label>
              {#if formData.cv && formData.cv.url}
                <div class="flex items-center mb-2">
                  <span class="text-sm text-gray-500"
                    >Fichier actuel : {formData.cv.alt}</span
                  >
                </div>
              {/if}
              <input
                type="file"
                on:change={(e) => (formData.cv = e.target.files[0])}
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      {/if}

      <!-- Step 5: Organisation -->
      {#if activeTab === "step5"}
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="col-span-2 space-y-2">
              <label class="block text-sm font-medium text-gray-700"
                >Appartenez-vous à une organisation ??</label
              >
              <div class="flex space-x-4">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    bind:group={formData.appartenirOrganisation}
                    value={true}
                    class="form-radio text-blue-600"
                  />
                  <span class="ml-2">Oui</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    bind:group={formData.appartenirOrganisation}
                    value={false}
                    class="form-radio text-blue-600"
                  />
                  <span class="ml-2">Non</span>
                </label>
              </div>
            </div>

            {#if formData.appartenirOrganisation}
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700"
                  >Nom de l'organisation</label
                >
                <input
                  type="text"
                  bind:value={formData.organisationNom}
                  class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700"
                  >Numéro de l'organisation</label
                >
                <input
                  type="text"
                  bind:value={formData.organisationNumero}
                  class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700"
                  >Année d'adhésion</label
                >
                <input
                  type="number"
                  bind:value={formData.organisationAnnee}
                  class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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
{/if}
<Footer></Footer>

<style>
  .content-sec {
    margin-top: 160px;
  }

  .btn-tabs {
    color: black !important;
    font-size: 14px;
  }
</style>
