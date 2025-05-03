<script lang="ts">
    import { onMount } from "svelte";
    import Footer from "$components/_includes/new_site/Footer.svelte";
    import Header from "$components/_includes/new_site/Header.svelte";
    import {
        apiFetch,
        BASE_URL_API,
        BASE_URL_API_UPLOAD,
    } from "$lib/api";
    import SkeletonLoader from "$components/_skeletons/SkeletonLoader.svelte";
    import Spinner from "$components/_skeletons/Spinner.svelte";
    import { goto } from "$app/navigation";
    import Modal from "$components/Modal.svelte";
    import TextInput from "$components/site/TextInput.svelte";
    import SelectInput from "$components/site/SelectInput.svelte";
    import type { Civilite, District, Pays } from "../../../types";
    import Step2Form from "$components/site/Step2Form.svelte";
    import EtapeProfessionnelle from "$components/site/EtapeProfessionnelle.svelte";
    import Sub_header from "$components/_includes/new_site/Sub_header.svelte";

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
        try {
            const userId = user?.personneId;
            const response = await apiFetch(true, `/professionnel/get/one/${userId}`);
            console.log("response before condition", response);
            if (response.data) {
                const apiData = response.data;
                console.log("content api data", apiData);

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
                    poleSanitaire: apiData.personne.poleSanitaire
                        ? apiData.personne.poleSanitaire
                        : "",
                    district: apiData.personne.district
                        ? apiData.personne.district.id
                        : "",
                    commune: apiData.personne.commune ? apiData.personne.commune.id : "",
                    ville: apiData.personne.ville ? apiData.personne.ville.id : "",
                    quartier: apiData.personne.quartier ? apiData.personne.quartier : "",
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

                /* await getProfessionLibelle(apiData.personne.profession.code); */
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

    onMount(async () => {
        isLoading = true;
        await fetchData();
        await loadReferenceData();
        await getUserInfos();
        await getAllProfessions();

        console.log("YEEEE", formData);

        await loadData();
        isLoading = false;
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

    function appendFormDataFields(formDatas: FormData, formData: Record<string, any>) {
        for (const [key, value] of Object.entries(formData)) {
            if (value !== undefined && value !== null) {
                formDatas.append(key, value);
            }
        }
    }

    function appendFilesToFormData(formDatas: FormData, selectedFiles: Record<string, any>) {
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
                `https://app.mydepps.net/api/professionnel/existe/code/${code}`,
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
                    "l'utilisateur de ce code de vérification existe deja";
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

<Header user = {user}></Header>
<Sub_header titre="Liste des dossiers" subTitles={[{ title: "Liste des dossiers", link: "/new_site/dossiers" }]}></Sub_header><br><br>
<div class="row justify-content-center g-0">
   <!-- <div class="col-xl-3 col-12 d-xl-block d-none">
        <div class="h-p100" style="background-image: url(../images/front-end-img/295x566.png); background-position: center center;"></div>
    </div>-->
    <div class="col-xl-9 col-12 bg-gray-100">
        <div class="tab h-p100">
            <ul class="nav nav-tabs bg-gray mb-20" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link m-0 rounded-0 py-10 px-20 active show" id="home-04-tab" data-bs-toggle="tab" href="#home-04" role="tab" aria-controls="home-04" aria-selected="true">Informations Personnelles</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link m-0 rounded-0 py-10 px-20" id="profile-04-tab" data-bs-toggle="tab" href="#profile-04" role="tab" aria-controls="profile-04" aria-selected="false">Informations Professionnelles </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link m-0 rounded-0 py-10 px-20" id="portfolio-04-tab" data-bs-toggle="tab" href="#portfolio-04" role="tab" aria-controls="portfolio-04" aria-selected="false">Documents </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link m-0 rounded-0 py-10 px-20" id="contact-04-tab" data-bs-toggle="tab" href="#contact-04" role="tab" aria-controls="contact-04" aria-selected="false">Organisation </a>
                </li>
            </ul>
            <div class="tab-content h-p100 px-20" id="myTabContent">
                <div class="tab-pane fade active show " id="home-04" role="tabpanel" aria-labelledby="home-04-tab">
                    <div class="row">

                        <Step2Form
                            {formData}
                            {errors}
                            {values}
                            {situationsMatrimoniales}
                            {saveFormState}
                            showTitle={false}
                        />
                    </div>
                </div>
                <div class="tab-pane fade h-p100" id="profile-04" role="tabpanel" aria-labelledby="profile-04-tab">
                    <div class="row">
                        <div
                                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12"
                        >
                            <TextInput
                                    type="text"
                                    label="Profession"
                                    bind:value={formData.profession}
                                    error={codeExisteError}
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
                                showTitle ={false}
                        />
                    </div>
                </div>
                <div class="tab-pane fade h-p100" id="portfolio-04" role="tabpanel" aria-labelledby="portfolio-04-tab">
                    <div class="row">
                        <div class=" p-6 rounded-lg shadow-sm">
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
                    </div>
                </div>
                <div class="tab-pane fade h-p100" id="contact-04" role="tabpanel" aria-labelledby="contact-04-tab">
                    <div class="row">
                        <div class=" p-6 rounded-lg shadow-sm">
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
                    </div>
                </div>
                <div class=" flex justify-end">
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

        </div>
    </div>
</div> <br><br><br><br>

<Footer></Footer>

<style>
    .flex.justify-end.s-bmp3s5IDGhiR {
        margin-top: -35px;
    }

    .h-p100 {
        height: 98% !important; }
</style>