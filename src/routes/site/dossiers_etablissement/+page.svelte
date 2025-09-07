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
    GetEtablissementData,
    Pays,
  } from "../../../types";
  import Step2Form from "$components/site/Step2Form.svelte";
  import EtapeProfessionnelle from "$components/site/EtapeProfessionnelle.svelte";
  import { is } from "date-fns/locale";

  export let data;
  let user = data?.user;
////Variable pour stocker le profil
  let profile:GetEtablissementData;
/// Variable pour stocker les nouvelles données du profil
  let newProfile:GetEtablissementData;

  // Fonction pour naviguer vers le tableau de bord 
 function navigateToDashboard () {
  goto('/site/dashboard')
 }

 ///Fonction pour recuperer le profil
 async function fetchProfile() {
  try {
    const response = await apiFetch(true,`/etablissement/get/one/${user.personneId}`);

    if (!response.code || response.code !== 200) {
     console.log("Erreur lors de la récupération du profil :", response);  
     alert("Il y a une erreur")
    }
    console.log("Réponse de l'API :", response);
    const data = await response.data;
    profile = data as GetEtablissementData;
    newProfile = { ...profile }; // Copier les données dans newProfile pour les modifications
    // console.log("Profil récupéré :", profile);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
  }
 }

 onMount(() => {
    // console.log("Données reçues :", data);
    if (!data || !data.user) {
      goto("/site/login");
    } else {
      user = data.user;
      // console.log("Utilisateur connecté :", user);
      fetchProfile().then(() => {
        isLoading = false; // Mettre à jour l'état de chargement une fois les données récupérées
      });
    }
  });

  let isLoading = true;
  let authenticating = false;
  let activeTab: string = "step2"; // Onglet actif par défaut
  let isModalOpen = false;
  let pdfUrl = "";

 function clickValidation () {
 
  authenticating = true;
  //// ON SEND NOTRE FORMULAIRE MAINTENANT AVEC LA REQUETE API POST
  apiFetch(true,`/etablissement/update/${user.personneId}`, 'PUT', newProfile).then((response) => {
    authenticating = false;
    if (!response.code || response.code !== 200) {
      console.log("Erreur lors de la modification du profil :", response);  
      alert("Il y a une erreur")
     } else {
      console.log("Profil modifié avec succès :", response);
      alert("Profil modifié avec succès !");

      // Mettre à jour le profil avec les nouvelles données
      profile = { ...newProfile };
     }
  }).catch((error) => {
    authenticating = false;
    console.error("Erreur lors de la modification du profil :", error);
    alert("Il y a une erreur")
  });
 }
///////////// Function pour mettre à jour les champs du formulaire
 function updateField(field: keyof GetEtablissementData, value: any) {
  newProfile = { ...newProfile, [field]: value };
  console.log(`Champ ${field} mis à jour :`, value);
 }

 // Fonction pour sauvegarder l'état du formulaire (exemple simple)
 function saveFormState() {
  console.log("État du formulaire sauvegardé :", newProfile);
 }

 // Fonction pour ouvrir la modale avec le PDF
 function openModalWithPdf(url: string) {
  pdfUrl = url;
  isModalOpen = true;
 }

 // Fonction pour fermer la modale
 function closeModal() {
  isModalOpen = false;
 }  




  ////Gestion d'erreurs
  let errors: Record<string, string> = {};
 
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
           {#if activeTab === "step2"}
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4"
            >
              <TextInput
                type="text"
                label="Email"
                bind:value={newProfile.email}
                placeholder="Entrez votre email"
                error={errors.email}
                disabled={true}
                step={2}
              />

              {#if newProfile.personne.typePersonne.libelle == "PHYSIQUE"}
                <div class="form__grup">
                  <label class="form_label">Nom*</label>
                  <input
                    on:input={(e: any) => {
                      newProfile = {
                        ...newProfile,
                        personne: { ...newProfile.personne, nom: e.target.value }
                      };
                      saveFormState();
                    }}
                    type="text"
                    class="form__input"
                    bind:value={newProfile.personne.nom}
                    placeholder="Nom"
                  />
                  {#if errors.nom}<p class="error">
                      {errors.nom}
                    </p>{/if}
                </div>

                <!-- Champ contactEntreprise -->

                <div class="form__grup">
                  <label class="form_label">Prenoms *</label>
                  <input
                    on:input={(e: any) => {
                      newProfile = {
                        ...newProfile,
                        personne: { ...newProfile.personne, prenoms: e.target.value }
                      };
                      saveFormState();
                    }}
                    type="text"
                    class="form__input"
                    bind:value={newProfile.personne.prenoms}
                    placeholder="Prenoms"
                  />
                  {#if errors.prenoms}<p class="error">
                      {errors.prenoms}
                    </p>{/if}
                </div>

                <div class="form__grup">
                  <label class="form_label">Telephone *</label>
                  <input
                    on:input={(e: any) => {
                      newProfile = {
                        ...newProfile,
                        personne: { ...newProfile.personne, telephone: e.target.value }
                      };
                      saveFormState();
                    }}
                    type="text"
                    class="form__input"
                    bind:value={newProfile.personne.telephone}
                    placeholder="Telephone"
                  />
                  {#if errors.telephone}<p class="error">
                      {errors.telephone}
                    </p>{/if}
                </div>

                <!-- Champ Type -->
                <div class="form__grup">
                  <label class="form_label">Boite Postale *</label>
                  <input
                    on:input={(e: any) => {
                      newProfile = {
                        ...newProfile,
                        personne: { ...newProfile.personne, bp: e.target.value }
                      };
                      saveFormState();
                    }}
                    type="text"
                    class="form__input"
                    bind:value={newProfile.personne.bp}
                    placeholder="Boite Postale"
                  />
                  {#if errors.bp}<p class="error">
                      {errors.bp}
                    </p>{/if}
                </div>

                <!-- Champ gpsEntreprise -->

                <div class="form__grup">
                  <label class="form_label">Autre E-mail *</label>
                  <input
                    on:input={(e: any) => {
                      newProfile = {
                        ...newProfile,
                        personne: { ...newProfile.personne, emailAutre: e.target.value }
                      };
                      saveFormState();
                    }}
                    type="email"
                    class="form__input"
                    bind:value={newProfile.personne.emailAutre}
                    placeholder="Autre E-mail"
                  />
                  {#if errors.emailAutre}<p class="error">
                      {errors.emailAutre}
                    </p>{/if}
                </div>
              {/if}
              {#if newProfile.personne.typePersonne.libelle == "MORALE"}
                <div class="form__grup">
                  <label class="form_label">Adresse *</label>
                  <input
                    on:input={(e: any) => {
                      newProfile = {
                        ...newProfile,
                        personne: { ...newProfile.personne, adresse: e.target.value }
                      };
                      saveFormState();
                    }}
                    type="text"
                    class="form__input"
                    bind:value={newProfile.personne.adresse}
                    placeholder="Adresse"
                  />
                  {#if errors.adresse}<p class="error">
                      {errors.adresse}
                    </p>{/if}
                </div>
                <!-- Champ Nom de l'entreprise -->

                <!-- Champ Email de l'entreprise -->

                <div class="form__grup">
                  <label class="form_label">Nom du representant *</label>
                  <input
                    on:input={(e: any) => {
                      newProfile = {
                        ...newProfile,
                        personne: { ...newProfile.personne, nomRepresentant: e.target.value }
                      };
                      saveFormState();
                    }}
                    type="text"
                    class="form__input"
                    bind:value={newProfile.personne.nomRepresentant}
                    placeholder="Nom du representant"
                  />
                  {#if errors.nomRepresentant}<p class="error">
                      {errors.nomRepresentant}
                    </p>{/if}
                </div>

                <!-- Champ Espace -->
                <div class="form__grup">
                  <label class="form_label">Dénomination *</label>
                  <input
                    on:input={(e: any) => {
                      newProfile = {
                        ...newProfile,
                        personne: { ...newProfile.personne, denomination: e.target.value }
                      };
                      saveFormState();
                    }}
                    type="text"
                    class="form__input"
                    bind:value={newProfile.personne.denomination}
                    placeholder="Denomination"
                  />
                  {#if errors.denomination}<p class="error">
                      {errors.denomination}
                    </p>{/if}
                </div>
              {/if}
            </div>
          {/if}
          {#if activeTab === "step4"}
            On fait notre boucle pour afficher les documents
            {#each profile.personne.documents as doc}
              <div class="mb-4 p-4 border border-gray-200 rounded-lg">
                <div class=" justify-between items-center">
                  <div>
                    <label class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">{doc.libelle} *</label>

                  </div>
                   <div class="flex items-center"> 
                    
                    <input
                          accept="image/*, .pdf"
                          type="file"
                          on:input={(e: any) => {
                            const file = e.target.files[0];
                            if (file) {
                              // Mettre à jour le document dans le profil
                              newProfile.personne.documents = newProfile.personne.documents.map((d) =>
                                d.id === doc.id ? { ...d, file: file } : d
                              );
                              saveFormState();
                            }
                          }}
                          class="form__input"
                          placeholder="Documents à fournir"
                        />
                        {#if doc.path != null}
                         <img
                                    src="{BASE_URL_API_UPLOAD}/{doc.path.url}"
                                    alt="{doc.path.alt}"  
                                    style="width:70px;height:70px;object-fit:cover;border-radius:4px;border:1px solid #ccc;"
                                  />
                        {/if}
                    
                   </div>
                  <button
                    on:click={() => {doc.path != null ? openModalWithPdf(`${BASE_URL_API_UPLOAD}/${doc.path.url}`) : alert("Aucun document disponible")}}
                    class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Voir le document
                  </button>
                </div>
              </div>
            {/each}
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
