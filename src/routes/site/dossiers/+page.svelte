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
  
  
    // Personal Informations
    code: "",
    poleSanitaire: "",
    nom: "",
    professionnel: "",
    prenoms: "",
    lieuExercicePro: "",
    emailAutre: "",

    // Professional informations
    profession: "",
    civilite: "",
    emailPro: "",
    dateDiplome: "",
    dateNaissance: "",
    numero: "",
    lieuDiplome: "",
    nationalite: "",
    situation: "",
    datePremierDiplome: "",
    poleSanitairePro: "",
    diplome: "",
    situationPro: "",

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

  onMount(async () => {
    isLoading = true;
    await loadReferenceData();
    await getUserInfos();
   
    isLoading = false;
  });
  function navigateToDashboard() {
    goto("/site/dashboard");
  }
</script>



<Slide {user} />

<div class="container">
  <div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4">
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
  </div><br>
</div>

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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               


                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Code de vérification (Uniquement pour les anciens membres)</label
                  >
                  <input
                    type="text"
                    bind:value={formData.code}
                    class="w-full form__input" style="color:black"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Pôle sanitaire,District,Ville,Commune,quartier,lot,ilot</label
                  >
                  <input
                    type="text"
                    bind:value={formData.poleSanitaire}
                    class="w-full form__input" style="color:black"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Nom</label
                  >
                  <input
                    type="text"
                    bind:value={formData.nom}
                    class="w-full form__input" style="color:black"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Structure d'exercice professionnel</label
                  >
                  <input
                    type="text"
                    bind:value={formData.professionnel}
                    class="w-full form__input" style="color:black"
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
                    >Lieu d'exercice professionnel</label
                  >
                  <input
                    type="text"
                    bind:value={formData.lieuExercicePro}
                    class="w-full form__input"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Email</label
                  >
                  <input
                    type="text"
                    bind:value={formData.emailAutre}
                    class="w-full form__input"
                  />
                </div>

              </div>
            </div>
          {/if}

          <!-- Step 3: Informations Professionnelles -->
          {#if activeTab === "step3"}
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Civilité</label
                  >
                  <select
                 
                  class="w-full form__input"
                  name=""
                  id=""
                  bind:value={formData.civilite}
                >
                  <option value="" selected={!formData.civilite}
                    >Veuillez sélectionner une option</option
                  >
                  {#each civilites as civilite}
                    <option
                      value={civilite.id}
                      selected={formData.civilite === civilite.id}
                      >{civilite.libelle}</option
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
                    >Date d'obtention du diplome</label
                  >
                  <input
                    type="date"
                    bind:value={formData.dateDiplome}
                    class="w-full form__input"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Date de naissance</label
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
                    >Lieu D'obtention du diplome</label
                  >
                  <input
                    type="text"
                    bind:value={formData.lieuDiplome}
                    class="w-full form__input"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Nationalité</label
                  >
                  <select
                 
                  class="w-full form__input"
                  name=""
                  id=""
                  bind:value={formData.nationalite}
                >
                  <option value="" selected={!formData.nationalite}
                    >Veuillez sélectionner une option</option
                  >
                  {#each pays as nationate}
                    <option
                      value={nationate.id}
                      selected={formData.nationalite === nationate.id}
                      >{nationate.libelle}</option
                    >
                  {/each}
                </select>
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
                    >Date du premier diplome</label
                  >
                  <input
                    type="date"
                    bind:value={formData.datePremierDiplome}
                    class="w-full form__input"
                  />
                </div>
                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Pole Sanitaire,District,Commune,Quartier...</label
                  >
                  <input
                    type="text" placeholder="Pole Sanitaire,District,Commune,Quartier,lot,ilot"
                    bind:value={formData.poleSanitairePro}
                    class="w-full form__input"
                  />
                </div>

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Dénomination du diplome</label
                  >
                  <input
                    type="text"
                    bind:value={formData.diplome}
                    class="w-full form__input"
                  />
                </div>

                <!-- <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Situation Professionnelle</label
                  >
                  <input
                    type="text"
                    bind:value={formData.situationPro}
                    class="w-full form__input"
                  />
                </div> -->

                <div class="space-y-2">
                  <label class="block text-3xl font-medium text-black"
                    >Situation Professionnelle *</label
                  >
                  <select
                 
                  class="w-full form__input"
                  name=""
                  id=""
                  bind:value={formData.situationPro}
                >
                  <option value="" selected={!formData.situationPro}
                    >Veuillez sélectionner une option</option
                  >
                  {#each situationProfessionnelles as situationPro}
                    <option
                      value={situationPro.id}
                      selected={formData.situationPro === situationPro.id}
                      >{situationPro.libelle}</option
                    >
                  {/each}
                </select>
                </div>
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

    background-color: transparent !important;
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
    width: 80%;
    top: 112px;
    background: #4292cecc;
    padding: 22px;
    color: white;
    font-size: 14px;
  }

  .file-ariane span {
    color: white;
  }
</style>
