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
    appartenirOrganisation: "",
    organisationNom: "",
    organisationNumero: "",
    organisationAnnee: ""
  };

  let specialites: any = [];
  let genres: any = [];
  let civilites: any = [];
  let villes: any = [];

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
          appartenirOrganisation: apiData.appartenirOrganisation,
          organisationNom: apiData.organisations[0].nom || "",
          organisationNumero: apiData.organisations[0].numero || "",
          organisationAnnee: apiData.organisations[0].annee || ""
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

  let isModalOpen = false;
  let pdfUrl = "";

  function openModal(url:any) {
    pdfUrl = url; // ✅ Met à jour la variable réactive
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
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
  <main style="padding-top: 10px" class="pb-0">
    <section class="iletisim-form-alani">
      <SkeletonLoader {activeTab} />
    </section>
  </main>
{:else}
  <main style="padding-top: -10px" class="pb-0">
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
                Informations de Base
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
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Genre</label
                  >
                  <select
                    bind:value={formData.genre}
                    class="w-full form__input"
                  >
                    <option value="">Sélectionner un genre</option>
                    {#each genres as genre}
                      <option value={genre.id}>{genre.libelle}</option>
                    {/each}
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Civilité</label
                  >
                  <select
                    bind:value={formData.civilite}
                    class="w-full form__input"
                  >
                    <option value="">Sélectionner une civilité</option>
                    {#each civilites as civilite}
                      <option value={civilite.id}>{civilite.libelle}</option>
                    {/each}
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Nom</label
                  >
                  <input
                    type="text"
                    bind:value={formData.nom}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Prénoms</label
                  >
                  <input
                    type="text"
                    bind:value={formData.prenoms}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Date de Naissance</label
                  >
                  <input
                    type="date"
                    bind:value={formData.dateNaissance}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Numéro</label
                  >
                  <input
                    type="text"
                    bind:value={formData.numero}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Adresse</label
                  >
                  <input
                    type="text"
                    bind:value={formData.address}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Lieu de Résidence</label
                  >
                  <input
                    type="text"
                    bind:value={formData.lieuResidence}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2 form__group">
                  <label class="block text-3xl font-medium text-black"
                    >Situation Matrimoniale</label
                  >

                  <select class=" w-full form__input" bind:value={formData.situation}>
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
                  <label class="block text-3xl font-medium text-black"
                    >Diplôme</label
                  >
                  <input
                    type="text"
                    bind:value={formData.diplome}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Date d'obtention du diplôme</label
                  >
                  <input
                    type="date"
                    bind:value={formData.dateDiplome}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Lieu d'obtention du diplôme</label
                  >
                  <input
                    type="text"
                    bind:value={formData.lieuDiplome}
                    class="w-full form__input"
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
                  <label class="block text-3xl font-medium text-black"
                    >Profession</label
                  >
                  <input
                    type="text"
                    bind:value={formData.profession}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Situation Professionnelle</label
                  >
                  <input
                    type="text"
                    bind:value={formData.situationPro}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Spécialité</label
                  >
                  <select
                    bind:value={formData.specialite}
                    class="w-full form__input"
                  >
                    <option value="">Sélectionner une spécialité</option>
                    {#each specialites as specialite}
                      <option value={specialite.id}>{specialite.libelle}</option
                      >
                    {/each}
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Email Professionnel</label
                  >
                  <input
                    type="email"
                    bind:value={formData.emailPro}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Contact Professionnel</label
                  >
                  <input
                    type="text"
                    bind:value={formData.contactPro}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Professionnel</label
                  >
                  <input
                    type="text"
                    bind:value={formData.professionnel}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Ville d'exercice</label
                  >
                  <select
                    bind:value={formData.ville}
                    class="w-full form__input"
                  >
                    <option value="">Sélectionner une ville</option>
                    {#each villes as ville}
                      <option value={ville.id}>{ville.libelle}</option>
                    {/each}
                  </select>
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Date d'emploi</label
                  >
                  <input
                    type="date"
                    bind:value={formData.dateEmploi}
                    class="w-full form__input"
                  />
                </div>
              </div>
            </div>
          {/if}

          <!-- Step 4: Documents -->
          {#if activeTab === "step4"}
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each ["photo", "cni", "casier", "diplomeFile", "certificat", "cv"] as field}
                  <div class="space-y-2">
                    <label class="block text-3xl font-medium text-black">
                      {field.toUpperCase()}
                    </label>

                    {#if formData[field] && formData[field].url}
                      <div class="flex items-center mb-2">
                        <span class="text-3xl text-gray-500">
                          Fichier actuel : {formData[field].alt}
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
                          target="_blank"
                          class="ml-4 text-white hover:underline"
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
            <div class="bg-white p-6 rounded-lg shadow-md">
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

                  <div class="space-y-2">
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
    </section>
  </main>
{/if}
<Footer></Footer>

<Modal isOpen={isModalOpen} {pdfUrl} onClose={closeModal} />

<style>
  .iletisim-form-alani {
    padding: 20rem 226px 10rem !important;

    background-color: transparent !important;
  }
  .content-sec {
    margin-top: 160px;
  }

  .btn-tabs {
    color: black !important;
    font-size: 14px;
  }
</style>
