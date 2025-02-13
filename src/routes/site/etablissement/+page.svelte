<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";

  import { apiFetch } from "$lib/api";
  import type {
    Civilite,
    Genre,
    Pays,
    Specialite,
    Ville,
  } from "../../../types.js";
  import { getProfessions } from "$lib/constants";

  const professions = getProfessions();

  export let data; // Récupérer les données du layout
  let user = data?.user;

  let step = 1;

  let formData = {
    // Login informations

    password: "",
    confirmPassword: "",
    email: "",

    // Informations générales
    id: null,
    typePersonne: null,
    natureEntreprise: "",
    typeEntreprise: "",
    gpsEntreprise: "",
    niveauEntreprise: "",
    contactEntreprise: "",
    nomEntreprise: "",
    emailEntreprise: "",
    spaceEntreprise: "",

    // Promoteur
    genre: null,
    nomCompletPromoteur: "",
    emailPro: "",
    profession: "",
    contactsPromoteur: "",
    lieuResidence: "",
    numeroCni: "",

    // Technicien
    nomCompletTechnique: "",
    emailProTechnique: "",
    professionTechnique: "",
    contactProTechnique: "",
    lieuResidenceTechnique: "",
    numeroOrdreTechnique: "",

    // Documents
    photo: "",
    cni: null,
    dfe: null,
    diplomeFile: null,
    ordreNational: null,
    cv: null,
  };

  // Définition des erreurs
  let errors = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Informations générales
    typePersonne: "",
    natureEntreprise: "",
    typeEntreprise: "",
    gpsEntreprise: "",
    niveauEntreprise: "",
    contactEntreprise: "",
    nomEntreprise: "",
    emailEntreprise: "",
    spaceEntreprise: "",

    // Promoteur
    genre: "",
    nomCompletPromoteur: "",
    emailPro: "",
    profession: "",
    contactsPromoteur: "",
    lieuResidence: "",
    numeroCni: "",

    // Technicien
    nomCompletTechnique: "",
    emailProTechnique: "",
    professionTechnique: "",
    contactProTechnique: "",
    lieuResidenceTechnique: "",
    numeroOrdreTechnique: "",

    // Documents
    photo: "",
    cni: "",
    dfe: "",
    diplomeFile: "",
    ordreNational: "",
    cv: "",

    // Autres informations
    inscriptionProfessionId: "",
  };

  // Fonction de validation des étapes
  function validateStep() {
    let valid = true;

    if (step === 1) {
      errors.email = formData.email ? "" : "L'e-mail est requis";
      errors.password = formData.password ? "" : "Le mot de passe est requis";
      errors.confirmPassword =
        formData.confirmPassword === formData.password
          ? ""
          : "Les mots de passe ne correspondent pas";

      valid =
        !errors.username &&
        !errors.password &&
        !errors.confirmPassword &&
        !errors.email;
    }

    if (step === 2) {
      errors.natureEntreprise = formData.natureEntreprise
        ? ""
        : "La natureEntreprise est requise";
      errors.typeEntreprise = formData.typeEntreprise
        ? ""
        : "Le type est requis";
      errors.gpsEntreprise = formData.gpsEntreprise
        ? ""
        : "Les coordonnées GPS sont requises";
      errors.niveauEntreprise = formData.niveauEntreprise
        ? ""
        : "Le niveau est requis";
      errors.contactEntreprise = formData.contactEntreprise
        ? ""
        : "Le contact est requis";
      errors.nomEntreprise = formData.nomEntreprise
        ? ""
        : "Le nom de l'entreprise est requis";
      errors.emailEntreprise = formData.emailEntreprise
        ? ""
        : "L'email de l'entreprise est requis";
      errors.spaceEntreprise = formData.spaceEntreprise
        ? ""
        : "L'espace est requis";
      //  errors.typePersonneId = formData.typePersonneId ? "" : "Le type de personne est requis";

      valid =
        !errors.natureEntreprise &&
        !errors.typeEntreprise &&
        !errors.gpsEntreprise &&
        !errors.niveauEntreprise &&
        !errors.contactEntreprise &&
        !errors.nomEntreprise &&
        !errors.emailEntreprise &&
        !errors.spaceEntreprise;
      // && !errors.typePersonneId
    }

    if (step === 3) {
      errors.genre = formData.genre ? "" : "Le genre est requis";
      errors.nomCompletPromoteur = formData.nomCompletPromoteur
        ? ""
        : "Le nom complet est requis";
      errors.emailPro = formData.emailPro
        ? ""
        : "L'email professionnel est requis";
      errors.profession = formData.profession
        ? ""
        : "La profession est requise";
      errors.contactsPromoteur = formData.contactsPromoteur
        ? ""
        : "Les contacts sont requis";
      errors.lieuResidence = formData.lieuResidence
        ? ""
        : "Le lieu de résidence est requis";
      errors.numeroCni = formData.numeroCni
        ? ""
        : "Le numéro de CNI est requis";

      valid = Object.values(errors).every((e) => e === "");
    }

    if (step === 4) {
      errors.nomCompletTechnique = formData.nomCompletTechnique
        ? ""
        : "Le nom du technicien est requis";
      errors.emailProTechnique = formData.emailProTechnique
        ? ""
        : "L'email professionnel du technicien est requis";
      errors.professionTechnique = formData.professionTechnique
        ? ""
        : "La profession du technicien est requise";
      errors.contactProTechnique = formData.contactProTechnique
        ? ""
        : "Le contact professionnel du technicien est requis";
      errors.lieuResidenceTechnique = formData.lieuResidenceTechnique
        ? ""
        : "Le lieu de résidence du technicien est requis";
      errors.numeroOrdreTechnique = formData.numeroOrdreTechnique
        ? ""
        : "Le numéro d'ordre du technicien est requis";

      valid = Object.values(errors).every((e) => e === "");
    }

    if (step === 5) {
      errors.photo = formData.photo
        ? ""
        : "La photo du responsable est requise";
      errors.cni = formData.cni
        ? ""
        : "La photo physique est requise";
      errors.dfe = formData.dfe
        ? ""
        : "La CNI physique est requise";
      errors.diplomeFile = formData.diplomeFile
        ? ""
        : "Le fichier du diplôme est requis";
      errors.ordreNational = formData.ordreNational ? "" : "Le CV est requis";
      errors.cv = formData.cv ? "" : "Le DFE est requis";

      valid =  !errors.photo &&
        !errors.cni &&
        !errors.dfe &&
        !errors.diplomeFile &&
        !errors.cv &&
        !errors.ordreNational ;
    }

    if (step === 6) {
      valid = true;
    }

    return valid;
  }

  let isPaiementProcessing = false;
  $: isPaiementDone = false;
  let message: any = "";

  // 🔹 Fonction pour sauvegarder l'état actuel du formulaire
  function saveFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("step", step.toString());
    }
  }
  let fileNames = {}; // Stocke uniquement les noms des fichiers pour éviter les problèmes avec `localStorage`
  let selectedFiles = {};

  
  function updateFormData(fieldName, file) {
  if (file) {
    // Lire le fichier en Base64 pour le stocker dans localStorage
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Ajouter le fichier à selectedFiles
      selectedFiles = {
        ...selectedFiles,
        [fieldName]: { name: file.name, data: reader.result },
      };

      // Stocker dans le localStorage
      localStorage.setItem("selectedFiles", JSON.stringify(selectedFiles));

      // Mettre à jour les noms de fichiers affichés
      fileNames = { ...fileNames, [fieldName]: file.name };
    };
  }
}

function handleFileChange(event, fieldName) {
  const file = event.target.files[0] || null;
  updateFormData(fieldName, file);
}


  // 🔹 Fonction pour restaurer le formulaire après un retour
  // Restaurer les données et l'étape depuis localStorage
  function restoreFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const savedFormData = localStorage.getItem("formData");
      const savedStep = localStorage.getItem("step");

      if (savedFormData) {
        formData = JSON.parse(savedFormData);
      }

      if (savedStep) {
        step = parseInt(savedStep);
      } else {
        localStorage.setItem("step", step.toString());
      }
    }
  }

  // ✅ Vérifier si on revient après un paiement
  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("return")) {
      restoreFormState();
    }
  });

  // Lire la valeur de `step` depuis localStorage, sinon initialiser à 1

  let messagefile = "";
  // Fonction pour changer d'étape et sauvegarder dans localStorage
  function nextStep() {
    if (validateStep()) {
      step += 1;
      localStorage.setItem("step", step.toString());
      return;
    } else {
      messagefile = "Veuillez remplir tous les champs obligatoires.";
    }
  }

  function prevStep() {
    if (step > 1) {
      step -= 1;
      localStorage.setItem("step", step.toString());
    }
  }

  // 🔹 Soumission du formulaire
  function submitForm() {
  if (validateStep()) {
    // Créer un FormData pour les données du formulaire
    let formDatas = new FormData();

        Object.keys(formData).forEach((key) => {
          formDatas.append(key, formData[key]);
      });

    // Ajouter les données de référence stockées en localStorage
    const reference = localStorage.getItem("reference");
    if (reference) {
      formDatas.append("reference", reference);
    }
/* 
    // Ajouter les autres données du formulaire
    Object.keys(formDataState).forEach((key) => {
      formData.append(key, formDataState[key]);
    }); */

    // Récupérer les fichiers stockés en localStorage
    const selectedFilesFromStorage = JSON.parse(localStorage.getItem("selectedFiles"));

    if (selectedFilesFromStorage) {
      // Ajouter chaque fichier au FormData
      Object.keys(selectedFilesFromStorage).forEach((fieldName) => {
        const fileData = selectedFilesFromStorage[fieldName];
        if (fileData && fileData.data) {
          // Ajouter chaque fichier en tant que base64 (si tu veux envoyer en base64)
          // formData.append(fieldName, fileData.data, fileData.name);

          // Si tu veux envoyer le fichier en tant qu'objet Blob, tu peux utiliser cette ligne
          const byteCharacters = atob(fileData.data.split(',')[1]);
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            byteArrays.push(new Uint8Array(byteNumbers));
          }

          const blob = new Blob(byteArrays, { type: "application/octet-stream" });
          formDatas.append(fieldName, blob, fileData.name);
        }
      });
    }

    console.log(selectedFilesFromStorage);

    // Envoi des données au serveur
    fetch("http://depps.leadagro.net/api/etablissement/create", {
      method: "POST",
      body: formDatas,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.errors && Object.keys(result.errors).length > 0) {
          console.log(result.errors);
        } else {
          // Rediriger l'utilisateur après une soumission réussie
          window.location.href = "/site/connexion";
          localStorage.clear();  // Nettoyer les données du localStorage
        }
      })
      .catch((error) => {
        console.log("Erreur lors de la soumission du formulaire:", error);
      });
  }
}

  // 🔹 Gestion du paiement
  function clickPaiement() {
    isPaiementProcessing = true;
    saveFormState(); // 🔥 Sauvegarder avant de partir

    initPaiement();
  }

  function initPaiement() {
    let data = new FormData();
    data.append("nom", formData.nomEntreprise);
    data.append("prenoms", formData.natureEntreprise);
    data.append("email", formData.email);
    data.append("numero", formData.contactEntreprise);

    fetch("https://depps.leadagro.net/api/paiement/paiement", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.url) {
          localStorage.setItem("reference", result.reference);

          window.location.href = result.url + "?return=1"; // 🔥 Ajout du paramètre `return`
        }
      })
      .catch((error) => {
        console.error("Erreur paiement :", error);
        isPaiementProcessing = false;
      });
  }

  async function checkTransactionID(idtransaction: any) {
    if (!idtransaction) return false;

    try {
      const res = await fetch(
        `https://depps.leadagro.net/api/paiement/get/transaction/${idtransaction}`
      );
      const data = await res.json();
      return data.data; // Assurez-vous que l'API renvoie un objet avec une clé `valid`
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de la transaction :",
        error
      );
      return false;
    }
  }

  // Déclenche la vérification de façon réactive dès que transactionID change
  $: if (typeof window !== "undefined" && localStorage.getItem("reference")) {
    const reference = localStorage.getItem("reference").toString();
    if (reference) {
      checkTransactionID(reference).then((resultat) => {
        console.log(resultat);
        if (!resultat) {
          message = "Cet identifiant de transaction n'est pas valide";
          isPaiementDone = false;
        } else {
          message = "";
          isPaiementDone = true;
        }
      });
    }
  }

  /**
   * @type {any[]}
   */
  let objects = [
    { name: "civilite", url: "/civilite" },
    { name: "genre", url: "/genre" },
    { name: "nationate", url: "/pays" },
    { name: "specialite", url: "/specialite" },
    { name: "ville", url: "/ville" },
  ];

  let values: {
    genre: Genre[];
    civilite: Civilite[];
    nationate: Pays[];
    specialite: Specialite[];
    ville: Ville[];
  } = { genre: [], civilite: [], nationate: [], specialite: [], ville: [] };

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

  onMount(async () => {
    fetchData();
  });
  onMount(() => {
    //localStorage.clear();
    const savedStep = localStorage.getItem("step");
    if (savedStep) {
      step = parseInt(savedStep);
    }

    const savedData = localStorage.getItem("formData");

    if (savedStep) step = parseInt(savedStep);
    if (savedData) formData = JSON.parse(savedData);

    if (savedData) {
      formData = { ...formData, ...JSON.parse(savedData) };
    }

    const savedFiles = localStorage.getItem("fileNames");
    if (savedFiles) {
      fileNames = JSON.parse(savedFiles);
    }

    console.log("fileNames:", localStorage.getItem("reference"));
  });

  // Sauvegarder les données du formulaire dans localStorage à chaque modification
  function updateField(field, value) {
    formData[field] = value;
    localStorage.setItem("formData", JSON.stringify(formData));
  }
</script>

<div
  id="pointer-ring"
  style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(308px, 648px);"
></div>
<div
  id="pointer-dot"
  style="border-color: rgb(113, 88, 190); transform: translate(333px, 673px);"
></div>
<div id="">
  <Header {user} />
  <Slide {user} />
  <section class="text-center pb-20" style="padding-top:150px">
    <h2 class="h2-baslik-anasayfa-ozel pb-10 text-uppercase">
      Inscription en tant que professionnel de santé
    </h2>
    <p class="text-center paragraf">
      Veuillez renseigner vos informations afin de procéder à l'inscription
    </p>
  </section>

  <main style="padding-top:200px">
    <!--İletişim Form Alanı-->
    <section class="iletisim-form-alani pt-20">
      <div class="tablo">
        <div class="" style="visibility: visible;">
          <form
            class="form one_customer"
            method="post"
            on:submit|preventDefault={submitForm}
          >
            {#if step === 1}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations de connexion (étape 1/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-3">
                    <div class="form__grup">
                      <label class="form_label">E-mail *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("email", e.target.value)}
                        type="email"
                        class="form__input"
                        bind:value={formData.email}
                        placeholder="E-mail"
                      />
                      {#if errors.email}<p class="error">
                          {errors.email}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Mot de passe *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("password", e.target.value)}
                        type="password"
                        class="form__input"
                        bind:value={formData.password}
                        placeholder="Mot de passe"
                      />
                      {#if errors.password}<p class="error">
                          {errors.password}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label"
                        >Confirmer le mot de passe *</label
                      >
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("confirmPassword", e.target.value)}
                        type="password"
                        class="form__input"
                        bind:value={formData.confirmPassword}
                        placeholder="Confirmer le mot de passe"
                      />
                      {#if errors.confirmPassword}<p class="error">
                          {errors.confirmPassword}
                        </p>{/if}
                    </div>
                  </div>
                </div>
              </div>
            {/if}
            <!-- Étape 1 -->
            {#if step === 2}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Etablissement de Sante (étape 2/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-2">
                    <!-- Champ natureEntreprise -->

                    <div class="form__grup">
                      <label class="form_label">Personne Physique *</label>
                      <select
                        on:change={saveFormState}
                     
                        class="form__input"
                        name=""
                        id=""
                        bind:value={formData.typePersonne}
                      >
                        <option value="" selected={!formData.typePersonne}
                          >Veuillez sélectionner un type</option
                        >

                        <option
                          value="Personne_physique"
                          selected={formData.typePersonne ===
                            "Personne_physique"}>Personne physique</option
                        >
                        <option
                          value="Personne_Morale"
                          selected={formData.typePersonne === "Personne_Morale"}
                          >Personne Morale</option
                        >
                      </select>
                      {#if errors.typePersonne}<p class="error">
                          {errors.typePersonne}
                        </p>{/if}
                    </div>


                    <!-- Champ Type -->
                   
                    <div class="form__grup">
                      <label class="form_label"
                        >Nature de l'entreprise privée sanitaire *</label
                      >
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("natureEntreprise", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.natureEntreprise}
                        placeholder="Nature"
                      />
                      {#if errors.natureEntreprise}<p class="error">
                          {errors.natureEntreprise}
                        </p>{/if}
                    </div>
                 
                    <!-- Champ contactEntreprise -->
                  
                     <div class="form__grup">
                      <label class="form_label"
                        >Nom de l'entreprise de l'entreprise privée sanitaire *</label
                      >
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("nomEntreprise", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.nomEntreprise}
                        placeholder="Nom de l'entreprise"
                      />
                      {#if errors.nomEntreprise}<p class="error">
                          {errors.nomEntreprise}
                        </p>{/if}
                    </div>

                     <div class="form__grup">
                      <label class="form_label"
                        >Type d'entreprise privée sanitaire *</label
                      >
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("typeEntreprise", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.typeEntreprise}
                        placeholder="typeEntreprise"
                      />
                      {#if errors.typeEntreprise}<p class="error">
                          {errors.typeEntreprise}
                        </p>{/if}
                    </div>

                    <!-- Champ Type -->
                     <div class="form__grup">
                      <label class="form_label"
                        >contact de l'entreprise privée sanitaire *</label
                      >
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("contactEntreprise", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.contactEntreprise}
                        placeholder="contact"
                      />
                      {#if errors.contactEntreprise}<p class="error">
                          {errors.contactEntreprise}
                        </p>{/if}
                    </div>

                    <!-- Champ gpsEntreprise -->
                   
                    
                     <div class="form__grup">
                      <label class="form_label"
                        >E-mail de l'entreprise privée sanitaire *</label
                      >
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("emailEntreprise", e.target.value)}
                        type="email"
                        class="form__input"
                        bind:value={formData.emailEntreprise}
                        placeholder="E-mail de l'entreprise"
                      />
                      {#if errors.emailEntreprise}<p class="error">
                          {errors.emailEntreprise}
                        </p>{/if}
                    </div>

                    <!-- Champ niveauEntreprise -->
                    <div class="form__grup">
                      <label class="form_label">Niveau d'intervention *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("niveauEntreprise", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.niveauEntreprise}
                        placeholder="niveauEntreprise"
                      />
                      {#if errors.niveauEntreprise}<p class="error">
                          {errors.niveauEntreprise}
                        </p>{/if}
                    </div>
                    <!-- Champ Nom de l'entreprise -->

                    <!-- Champ Email de l'entreprise -->
                   

                      <div class="form__grup">
                      <label class="form_label"
                        >Distrite, ville , commune *</label
                      >
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("spaceEntreprise", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.spaceEntreprise}
                        placeholder="Espace"
                      />
                      {#if errors.spaceEntreprise}<p class="error">
                          {errors.spaceEntreprise}
                        </p>{/if}
                    </div>

                    <!-- Champ Espace -->
                    <div class="form__grup">
                      <label class="form_label"
                        >coordonnées gpsEntreprise *</label
                      >
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("gpsEntreprise", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.gpsEntreprise}
                        placeholder="gps de Entreprise"
                      />
                      {#if errors.gpsEntreprise}<p class="error">
                          {errors.gpsEntreprise}
                        </p>{/if}
                    </div>

                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 2 -->
            {#if step === 3}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations du promoteur (étape 3/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-2">
                    <div class="form__grup">
                      <label class="form_label">Genre *</label>
                      <select
                        on:change={saveFormState}
                        class="form__input"
                        name=""
                        id=""
                        bind:value={formData.genre}
                      >
                        <option value="" selected={!formData.genre}
                          >Veuillez sélectionner une option</option
                        >
                        {#each values.genre as genre}
                          <option
                            value={genre.id}
                            selected={formData.genre === genre.id}
                            >{genre.libelle}</option
                          >
                        {/each}
                      </select>
                      {#if errors.genre}<p class="error">
                          {errors.genre}
                        </p>{/if}
                    </div>

                  <!-- Champ contactsPromoteur -->
                    <div class="form__grup">
                      <label class="form_label">Contact *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("contactsPromoteur", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.contactsPromoteur}
                        placeholder="contacts Promoteur"
                      />
                      {#if errors.contactsPromoteur}<p class="error">
                          {errors.contactsPromoteur}
                        </p>{/if}
                    </div>


                 
                       <!-- Champ Nom Complet -->
                    <div class="form__grup">
                      <label class="form_label">Nom complet *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("nomCompletPromoteur", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.nomCompletPromoteur}
                        placeholder="Nom complet"
                      />
                      {#if errors.nomCompletPromoteur}<p class="error">
                          {errors.nomCompletPromoteur}
                        </p>{/if}
                    </div>

                   <!-- Champ Numéro de CNI -->
                    <div class="form__grup">
                      <label class="form_label">N° de CNI *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("numeroCni", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.numeroCni}
                        placeholder="Numéro de CNI"
                      />
                      {#if errors.numeroCni}<p class="error">
                          {errors.numeroCni}
                        </p>{/if}
                    </div>

                  


                      <!-- Champ Email Pro -->
                    <div class="form__grup">
                      <label class="form_label">Adresse E-mail *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("emailPro", e.target.value)}
                        type="email"
                        class="form__input"
                        bind:value={formData.emailPro}
                        placeholder="E-mail professionnel"
                      />
                      {#if errors.emailPro}<p class="error">
                          {errors.emailPro}
                        </p>{/if}
                    </div>

                    <!-- Champ Lieu de Résidence -->
                    <div class="form__grup">
                      <label class="form_label">Lieu de résidence *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("lieuResidence", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.lieuResidence}
                        placeholder="Lieu de résidence"
                      />
                      {#if errors.lieuResidence}<p class="error">
                          {errors.lieuResidence}
                        </p>{/if}
                    </div>

                   

                     <!-- Champ Profession -->
                    <div class="form__grup">
                      <label class="form_label">Profession *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("profession", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.profession}
                        placeholder="Profession"
                      />
                      {#if errors.profession}<p class="error">
                          {errors.profession}
                        </p>{/if}
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 3 -->
            {#if step === 4}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations du technicien (étape 4/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-2">
                    <!-- Champ Nom Complet Technique -->
                    <div class="form__grup">
                      <label class="form_label">Nom complet *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("nomCompletTechnique", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.nomCompletTechnique}
                        placeholder="Nom complet"
                      />
                      {#if errors.nomCompletTechnique}<p class="error">
                          {errors.nomCompletTechnique}
                        </p>{/if}
                    </div>

                    

                   

                    <!-- Champ Contact Pro Technique -->
                    <div class="form__grup">
                      <label class="form_label">Contact *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("contactProTechnique", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.contactProTechnique}
                        placeholder="Contact professionnel"
                      />
                      {#if errors.contactProTechnique}<p class="error">
                          {errors.contactProTechnique}
                        </p>{/if}
                    </div>


                    <!-- Champ Email Pro Technique -->
                    <div class="form__grup">
                      <label class="form_label">Adresse E-mail *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("emailProTechnique", e.target.value)}
                        type="email"
                        class="form__input"
                        bind:value={formData.emailProTechnique}
                        placeholder="E-mail professionnel"
                      />
                      {#if errors.emailProTechnique}<p class="error">
                          {errors.emailProTechnique}
                        </p>{/if}
                    </div>

                    <!-- Champ Lieu de Résidence Technique -->
                    <div class="form__grup">
                      <label class="form_label">Lieu de résidence *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("lieuResidenceTechnique", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.lieuResidenceTechnique}
                        placeholder="Lieu de résidence"
                      />
                      {#if errors.lieuResidenceTechnique}<p class="error">
                          {errors.lieuResidenceTechnique}
                        </p>{/if}
                    </div>

                     <!-- Champ Profession Technique -->
                    <div class="form__grup">
                      <label class="form_label">Profession *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("professionTechnique", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.professionTechnique}
                        placeholder="Profession"
                      />
                      {#if errors.professionTechnique}<p class="error">
                          {errors.professionTechnique}
                        </p>{/if}
                    </div>

                    <!-- Champ Numéro d'Ordre Technique -->
                    <div class="form__grup">
                      <label class="form_label">N° d'ordre *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("numeroOrdreTechnique", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.numeroOrdreTechnique}
                        placeholder="Numéro d'ordre"
                      />
                      {#if errors.numeroOrdreTechnique}<p class="error">
                          {errors.numeroOrdreTechnique}
                        </p>{/if}
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 4 -->
            {#if step === 5}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations médiatiques (étape 5/5)
              </h2>
              <!-- {#if messagefile !== ""}
               <div
                 class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                 role="alert"
               >
                 <strong class="font-bold">Oups erreur!</strong>
                 <span class="block sm:inline">{messagefile}</span>
               </div>
             {/if} -->
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-2">
                    {#each ["photo", "diplomeFile", "cni", "cv", "ordreNational", "dfe"] as fieldName}
                      <div class="form__grup">
                        <label class="form_label"
                          >{fieldName.toUpperCase()}</label
                        >
                        <input
                          type="file"
                          class="form__input"
                          on:change={(e) => handleFileChange(e, fieldName)}
                        />
                        {#if fileNames[fieldName]}
                          <p>{fileNames[fieldName]} *</p>
                        {/if}
                        {#if errors[fieldName]}
                          <p class="error">{errors[fieldName]}</p>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </div>
              </div>
            {/if}
  <!-- Étape 6 : Paiement -->
  {#if step === 6}
  <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
    VEUILLEZ PROCéDER AU PAIEMENT
  </h2>
  <div class="tablo">
    <div class="tablo--1h-ve-2">
      <!--   on:click={clickPaiement} -->
      <div class="grid grid-cols-1 gap-20 flex justify-center">
        <div class="">
          {#if !isPaiementDone}
            <p>
              Veillez vous rendre sur le site de votre banque et
              effectuer le paiement.
            </p>
            <br />

           <!--  <button
              id="reloadPaiementLsssink"
              class="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
              on:click={clickPaiement}
            >
              Effectuer le paiement
            </button> -->
          {/if}
          {#if isPaiementDone}
            <p>
              Veillez finaliser votre inscription en cliquant sur le
              bouton ci-dessous.
            </p>
            <br />
           <!--  <button
              type="button"
              id="r"
              class="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
              on:click={submitForm}
              disabled={!isPaiementDone}
            >
              Finaliser l'inscription
            </button> -->
          {/if}

          <br />
          <!--  <p>
                Une fois le paiement effectué, veuillez renseigner
                l'identifiant de la transaction pour valider votre
                inscription.
              </p> -->
        </div>
      </div>
    </div>
  </div>
{/if}

            <!-- Boutons de navigation -->
            <div class="form__grup">
              {#if step > 1}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={prevStep}>← RETOUR</button
                >
              {/if}

              {#if step < 6}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={() => nextStep()}>SUIVANT →</button
                >
            
              {:else}

              {#if !isPaiementDone}
                        
                        <!-- <button
                          id="reloadPaiementLsssink"
                          class="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-lg hover:bg-green-500 transition duration-300"
                          on:click={clickPaiement}
                        >
                          Effectuer le paiement
                        </button> -->

                        <button
                      
                        on:click={clickPaiement}
                        class="buton buton--kirmizi bg-green-500 "
                       
                      >
                      Effectuer le paiement
                      </button>
                      {/if}
                      {#if isPaiementDone}
                       
                      <button
                         type="submit"
                        on:click={submitForm}
                        class="buton buton--kirmizi bg-green-500 "
                        disabled={!isPaiementDone}
                      >
                      Finaliser l'inscription
                      </button>
                      
                      {/if}


                <!-- disabled={!isPaiementDone} -->
                <!--   <button
                    type="submit"
                    on:click={submitForm}
                    class="buton buton--kirmizi"
                    disabled={!isPaiementDone}
                  >
                    VALIDER
                  </button> -->
              {/if}

              <br />
              <br />
              {#if message !== ""}
                <div
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong class="font-bold">Oups erreur!</strong>
                  <span class="block sm:inline">{message}</span>
                </div>
              {/if}
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <style>
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .footerss p {
      display: flex;
      flex-wrap: wrap;
      justify-content: start !important;
      align-items: start !important;
    }
    h2.h2-baslik-footer.h-yazi-margin-kucuk,
    .footer__list,
    .footer__sosyal {
      display: flex;
      flex-wrap: wrap;
      justify-content: start !important;
      align-items: start !important;
    }
    .form {
      max-width: 100%;
      margin: auto;
    }
    .tablo {
      display: flex;
      flex-direction: column;
    }
    .row {
      display: flex;
      gap: 1px; /* Espacement entre les champs */
      flex-wrap: wrap;
    }

    .form__grup {
      flex: 1; /* Permet aux champs de prendre la même largeur */
      min-width: 250px; /* Empêche les champs d'être trop petits */
    }
    h3 {
      font-size: 1.5em;
      margin-bottom: 15px;
      color: #333;
    }

    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }

    .bouncingImage {
      cursor: pointer;
    }

    .bouncingImage:hover {
      scale: 1.1;
      duration: 2;
    }
  </style>
  <Footer />
</div>
