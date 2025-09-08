<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { BASE_URL_API } from "$lib/api";

  import { apiFetch } from "$lib/api";
  import type {
    Civilite,
    Genre,
    Pays,
    Specialite,
    Ville,
  } from "../../../types.js";
  import { getProfessions } from "$lib/constants";
  import MessageError from "$components/MessageError.svelte";
  import { goto } from "$app/navigation";
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import EtapeConnexion from "$components/site/EtapeConnexion.svelte";
  import SelectInput from "$components/site/SelectInput.svelte";
  import InputSelect from "$components/inputs/InputSelect.svelte";
  import InputSelectTypePersonne from "$components/inputs/InputSelectTypePersonne.svelte";
  import type { AnyAaaaRecord } from "node:dns";

  const professions = getProfessions();

  export let data; // Récupérer les données du layout
  let user = data?.user;
  let isPaiementProcessing = false;
  $: isPaiementDone = false;
  $: message = "";
  let step = 1;
  $: hideForPhysic = true;
  $: hideForOther = false;

  //////Nouvelle variable

  let showPassword = false;
  let showPasswordConfirm = false;

  $: emailError =
    formData.email && !validateEmail(formData.email)
      ? "Veuillez entrer un email valide"
      : "";
  $: emailPassword =
    formData.email && !validatePassword(formData.password)
      ? "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre."
      : "";

  $: emailAutreError =
    formData.emailAutre && !validateEmail(formData.emailAutre)
      ? "Veuillez entrer un email valide"
      : "";

  function validateEmail(email: string): boolean {
    const regex = /^[\w\-.]+@([\w-]+\.)+(com|fr|net|org|ci)$/i;
    return regex.test(email);
  }
  function validatePassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }

  $: if (formData.typePersonne == "PHYSIQUE") {
    hideForOther = false;
    hideForPhysic = true;
    // Effacer les champs de la personne morale
    formData.adresse = "";
    formData.nomRepresentant = "";
    formData.denomination = "";
  } else if (formData.typePersonne == "MORALE") {
    hideForPhysic = false;
    hideForOther = true;
    // Effacer les champs de la personne physique
    formData.nom = "";
    formData.prenoms = "";
    formData.telephone = "";
    formData.bp = "";
    formData.emailAutre = "";
  } else {
    hideForPhysic = false;
    hideForOther = false;
  }
  /////fin
  interface DocumentItem {
    libelle: string;
    path: string; // chemin ou base64 du fichier
    libelleGroupe: string;
  }
  let uploadedFiles: { [key: string]: string } = {}; // key: libelle+libelleGroupe, value: file name or base64

  function handleDocumentChange(
    event: Event,
    libelle: string,
    libelleGroupe: any
  ) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;

      // On ajoute l'objet formaté dans formData.documents
      formData.documents.push({
        libelle: libelle,
        path: base64, // ou file.name si tu veux juste le nom
        libelleGroupe: libelleGroupe,
      });
      uploadedFiles[libelle + libelleGroupe] = file.name;

      // Sauvegarde dans localStorage si besoin
      localStorage.setItem("formData", JSON.stringify(formData));
    };
    reader.readAsDataURL(file);
  }

  let formData: {
    password: string;
    confirmPassword: string;
    email: string;
    niveauIntervention: any;
    typePersonne: any;

    nom: string;
    prenoms: string;
    telephone: string;
    bp: string;
    emailAutre: string;
    adresse: string;
    nomRepresentant: string;
    denomination: string;
    documents: DocumentItem[];
  } = {
    password: "",
    confirmPassword: "",
    email: "",
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
    // Pour la derniere step
    documents: "",
  };
  let emailCheck = false;
  async function checkEmail(email: any) {
    if (!email) return false;

    try {
      const res = await fetch(
        BASE_URL_API + `/user/check/email/existe/${email}`
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

  $: if (formData.email) {
    checkEmail(formData.email).then((resultat) => {
      emailCheck = resultat;

      if (emailCheck == true) {
        emailError = "Cet email existe deja";
      }
    });
  }

  // Fonction de validation des étapes
  function validatePhone(phone: string): boolean {
    // Exemple : commence par 0, puis 9 chiffres (français), adapte selon ton besoin
    const regex = /^(07|05|01)\d{8}$/;
    return regex.test(phone);
  }

  function validateEmail2(email: string): boolean {
    // Doit se terminer par .com, .fr, .net, .org ou .ci (insensible à la casse)
    const regex = /^[\w\-.]+@([\w-]+\.)+(com|fr|net|org|ci)$/i;
    return regex.test(email);
  }
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
        !errors.password &&
        !errors.confirmPassword &&
        !errors.email &&
        !emailError &&
        !emailCheck &&
        !emailPassword;
    }

    if (step === 2) {
      // Champ obligatoire pour tous
      errors.typePersonne = formData.typePersonne ? "" : "Le type est requis";

      // Champs pour Personne Physique
      if (!hideForOther) {
        errors.nom = formData.nom ? "" : "Le nom est requis";
        errors.prenoms = formData.prenoms ? "" : "Les prénoms sont requis";
        errors.telephone = !formData.telephone
          ? "Le téléphone est requis"
          : !validatePhone(formData.telephone)
            ? "Numéro de téléphone invalide"
            : "";
        errors.bp = formData.bp ? "" : "La boîte postale est requise";
        errors.emailAutre = !formData.emailAutre
          ? "L'email est requis"
          : !validateEmail2(formData.emailAutre)
            ? "Email invalide"
            : "";
        errors.adresse = "";
        errors.nomRepresentant = "";
        errors.denomination = "";
      }

      // Champs pour Personne Morale
      if (!hideForPhysic) {
        errors.adresse = formData.adresse ? "" : "L'adresse est requise";
        errors.nomRepresentant = formData.nomRepresentant
          ? ""
          : "Le nom du représentant est requis";
        errors.denomination = formData.denomination
          ? ""
          : "La dénomination est requise";
        errors.nom = "";
        errors.prenoms = "";
        errors.telephone = "";
        errors.bp = "";
        errors.emailAutre = "";
      }

      // Déterminer si tout est valide
      valid = Object.values(errors).every((errorMsg) => errorMsg === "");
    }

    if (step === 3) {
      valid = true;
    }

    if (step === 4) {
      valid = isPaiementDone;
    }

    return valid;
  }

  ////Fonction asynchrone pour recuperer le groupe de documents pour le type de personne
  async function getTypeDoc() {
    let res = null;
    // alert("hello world, " + formData.typePersonne);
    res = await apiFetch(true, `${objects[2].url}/${formData.typePersonne}`);
    if (res) {
      if (Object.keys(values).includes(objects[2].name)) {
        values[objects[2].name as keyof typeof values] = res.data;
      } else {
        console.error(`Invalid key: ${objects[2].name}`);
      }
    } else {
      console.error(
        "Erreur lors de la récupération des données:",
        res.statusText
      );
    }
  }

  // 🔹 Fonction pour sauvegarder l'état actuel du formulaire
  async function saveFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("step", step.toString());
      await getTypeDoc();

      console.log("formData sauvegardé:", formData.typePersonne);
      ///recuperer les informations du type de document lorsque le type de personne est selectionné
      if (formData.typePersonne > 0) {
        getTypeDoc();
      }
      if (formData.typePersonne == "MORALE") {
        formData.documents = [];
        formData.nom = "";
        formData.prenoms = "";
        formData.telephone = "";
        formData.bp = "";
        formData.emailAutre = "";
        localStorage.setItem("formData", JSON.stringify(formData));
      } else if (formData.typePersonne == "PHYSIQUE") {
        formData.documents = [];
        formData.adresse = "";
        formData.nomRepresentant = "";
        formData.denomination = "";
        localStorage.setItem("formData", JSON.stringify(formData));
      }
    }
  }

  function updateFormData(fieldName: any, file: any) {
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

  function handleFileChange(event: any, fieldName: any) {
    const file = event.target.files[0] || null;
    updateFormData(fieldName, file);
  }

  // 🔹 Fonction pour restaurer le formulaire après un retour
  // Restaurer les données et l'étape depuis localStorage
  async function restoreFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      const savedFormData = localStorage.getItem("formData");
      const savedStep = localStorage.getItem("step");

      if (savedFormData) {
        formData = JSON.parse(savedFormData);
        console.log("formData restauré:", savedFormData);
      }

      if (savedStep) {
        step = parseInt(savedStep);
      } else {
        localStorage.setItem("step", step.toString());
      }
    }
  }

  // ✅ Vérifier si on revient après un paiements
  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("return")) {
     await restoreFormState();
    }
    console.log("formData.typePersonne onMount", formData.typePersonne);
    await getTypeDoc();
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

  // 🔹 Gestion du paiements
  function clickPaiement() {
    console.log("click payment");
    isPaiementProcessing = true;
    saveFormState(); // 🔥 Sauvegarder avant de partir

    initPaiement();
  }

  let authenticating = false;
  async function initPaiement() {
    authenticating = true;
    console.log("formdata", formData);

    let formDatas = new FormData();

    const simpleFields = [
      "password",
      "confirmPassword",
      "email",
      "niveauIntervention",
      "typePersonne",
      "nom",
      "prenoms",
      "telephone",
      "bp",
      "emailAutre",
      "adresse",
      "nomRepresentant",
      "denomination",
    ];

    simpleFields.forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        formDatas.append(key, formData[key]);
      }
    });

    // Ajouter les documents dans le format souhaité
    if (formData.documents && Array.isArray(formData.documents)) {
      console.log("formData.documents", formData.documents);
      formData.documents.forEach((doc, index) => {
        formDatas.append(`documents[${index}][libelle]`, doc.libelle);
        formDatas.append(`documents[${index}][path]`, doc.path);
        if (doc.libelleGroupe) {
          formDatas.append(
            `documents[${index}][libelleGroupe]`,
            doc.libelleGroupe
          );
        }
      });
    }

    // Ajouter la référence et le type
    const reference = localStorage.getItem("reference");
    if (reference) {
      formDatas.append("reference", reference);
    }
    formDatas.append("type", "etablissement");

    const selectedFilesFromStorage = JSON.parse(
      localStorage.getItem("selectedFiles") || "{}"
    );

    if (selectedFilesFromStorage) {
      Object.keys(selectedFilesFromStorage).forEach((fieldName) => {
        const fileData = selectedFilesFromStorage[fieldName];
        if (fileData && fileData.data) {
          const base64Data = fileData.data.split(",")[1];
          const byteCharacters = atob(base64Data);
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
            byteArrays.push(new Uint8Array(byteNumbers));
          }

          const blob = new Blob(byteArrays, {
            type: fileData.type || "application/octet-stream",
          });
          formDatas.append(fieldName, blob, fileData.name);
        }
      });
    }

    console.log("Contenu de formDatas:");
    for (let [key, value] of formDatas.entries()) {
      if (value instanceof Blob) {
        console.log(
          key,
          `[Fichier: ${value.name || "sans nom"}, type: ${value.type}, taille: ${value.size} octets]`
        );
      } else {
        console.log(key, value);
      }
    }

    console.log("formDatas", formDatas);

    try {
      const response = await fetch(`${BASE_URL_API}/paiement/paiement`, {
        method: "POST",
        body: formDatas,
      });

      const result = await response.json();
      console.log("Réponse du serveur:", result);

      authenticating = false;

      if (result.data && result.data.url) {
        alert(result.data.url);
        localStorage.setItem("reference", result.data.reference);
        window.location.href = result.data.url + "?return=1";
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      isPaiementProcessing = false;
      authenticating = false;
    }
  }
  function connexion() {
    goto("/site/connexion");
    localStorage.clear(); // Nettoyer les données du localStorage
  }

  // Déclenche la vérification de façon réactive dès que transactionID change
  $: if (typeof window !== "undefined" && localStorage.getItem("reference")) {
    const reference = localStorage.getItem("reference").toString();
    if (reference) {
    }
  }

  /**
   * @type {any[]}
   */
  let objects = [
    { name: "typePersonne", url: "/typePersonne" },
    { name: "niveauIntervention", url: "/niveauIntervention" },
    {
      name: "typeDocument",
      url: "/libelleGroupe/all",
      id: formData.typePersonne,
    },
  ];

  let values: {
    genre: Genre[];
    civilite: Civilite[];
    nationate: Pays[];
    specialite: Specialite[];
    typePersonne: any;
    niveauIntervention: any;
    ville: Ville[];
    typeDocument: any[];
  } = {
    genre: [],
    civilite: [],
    nationate: [],
    specialite: [],
    ville: [],
    typePersonne: [],
    niveauIntervention: [],
    typeDocument: [],
  };

  async function fetchData() {
    try {
      let res = null;
      objects.forEach(async (element) => {
        if (element.id) {
          res = await apiFetch(true, `${element.url}/${element.id}`);
        } else {
          res = await apiFetch(true, element.url);
        }

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
  function updateField(field: any, value: any) {
    formData[field] = value;
    localStorage.setItem("formData", JSON.stringify(formData));
  }
</script>

<div id="">
  <Header />
  <Slide {user} />
  <section class="text-center pb-20" style="padding-top:150px">
    <h2 class="h2-baslik-anasayfa-ozel pb-10 text-uppercase">
      Inscription en tant que etablissement de santé
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
            on:submit|preventDefault={clickPaiement}
          >
            {#if step === 1}
              <EtapeConnexion
                bind:formData
                {errors}
                {emailError}
                {emailPassword}
                {saveFormState}
                {showPassword}
                {showPasswordConfirm}
                togglePassword={() => (showPassword = !showPassword)}
                toggleConfirmPassword={() =>
                  (showPasswordConfirm = !showPasswordConfirm)}
              />
            {/if}

            <!-- Étape 1 -->
            {#if step === 2}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Etablissement de Sante (étape 2/3)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-2">
                    <!-- Champ natureEntreprise -->

                    <!-- <div class="form__grup"> -->
                    <!-- <label class="form_label">Personne Physique *</label> -->
                    <SelectInput
                      label="Niveau d'Intervention"
                      bind:value={formData.niveauIntervention}
                      options={values.niveauIntervention.map(
                        (c: { id: number; libelle: string }) => ({
                          id: String(c.id),
                          libelle: c.libelle,
                        })
                      )}
                      placeholder="Sélectionnez le type de personne "
                      error={errors.typePersonne}
                      onInput={saveFormState}
                      on:change={saveFormState}
                      step={2}
                      bind:formData
                    />
                    <SelectInput
                      label="Entité juridique *"
                      bind:value={formData.typePersonne}
                      options={values.typePersonne.map(
                        (c: { id: number; libelle: string }) => ({
                          id: String(c.libelle),
                          libelle: c.libelle,
                        })
                      )}
                      placeholder="Sélectionnez le type de personne "
                      error={errors.typePersonne}
                      onInput={saveFormState}
                      on:change={saveFormState}
                      step={2}
                      bind:formData
                    />

                    <div hidden={hideForOther} class="form__grup">
                      <label class="form_label">Nom*</label>
                      <input
                        on:input={(e: any) =>
                          updateField("nom", e.target.value)}
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

                    <div hidden={hideForOther} class="form__grup">
                      <label class="form_label">Prenoms *</label>
                      <input
                        on:input={(e: any) =>
                          updateField("prenoms", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.prenoms}
                        placeholder="Prenoms"
                      />
                      {#if errors.prenoms}<p class="error">
                          {errors.prenoms}
                        </p>{/if}
                    </div>

                    <div hidden={hideForOther} class="form__grup">
                      <label class="form_label">Telephone *</label>
                      <input
                        on:input={(e: any) =>
                          updateField("telephone", e.target.value)}
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
                    <div hidden={hideForOther} class="form__grup">
                      <label class="form_label">Boite Postale *</label>
                      <input
                        on:input={(e: any) => updateField("bp", e.target.value)}
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

                    <div hidden={hideForOther} class="form__grup">
                      <label class="form_label">Autre E-mail *</label>
                      <input
                        on:input={(e: any) =>
                          updateField("emailAutre", e.target.value)}
                        type="email"
                        class="form__input"
                        bind:value={formData.emailAutre}
                        placeholder="Autre E-mail"
                      />
                      {#if errors.emailAutre}<p class="error">
                          {errors.emailAutre}
                        </p>{/if}
                    </div>

                    <!-- Champ niveauEntreprise -->
                    <div hidden={hideForPhysic} class="form__grup">
                      <label class="form_label">Adresse *</label>
                      <input
                        on:input={(e: any) =>
                          updateField("adresse", e.target.value)}
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

                    <div hidden={hideForPhysic} class="form__grup">
                      <label class="form_label">Nom du representant *</label>
                      <input
                        on:input={(e: any) =>
                          updateField("nomRepresentant", e.target.value)}
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
                    <div hidden={hideForPhysic} class="form__grup">
                      <label class="form_label">Dénomination *</label>
                      <input
                        on:input={(e: any) =>
                          updateField("denomination", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.denomination}
                        placeholder="Denomination"
                      />
                      {#if errors.denomination}<p class="error">
                          {errors.denomination}
                        </p>{/if}
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 2 -->
            {#if step === 3}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Documents de l'établissement (étape 3/3)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  {#each values.typeDocument as document}
                    <div style="margin-top: 20px;"></div>
                    <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                      {document.libelle}
                    </h2>
                    <div class="grid grid-cols-2">
                      {#each document.typeDocuments as requiredFile, index}
                        <div class="form__grup">
                          <label class="form_label"
                            >{requiredFile.libelle} *</label
                          >
                          <div class="flex items-center">
                            {#if uploadedFiles[requiredFile.libelle + document.libelle]}
                              <span
                                class="file-preview"
                                style="margin-right:8px;"
                              >
                                {#if formData.documents
                                  .find((d) => d.libelle === requiredFile.libelle && d.libelleGroupe === document.libelle)
                                  ?.path.startsWith("data:image")}
                                  <!-- Affiche la miniature de l'image -->
                                  <img
                                    src={formData.documents.find(
                                      (d) =>
                                        d.libelle === requiredFile.libelle &&
                                        d.libelleGroupe === document.libelle
                                    )?.path}
                                    alt="miniature"
                                    style="width:70px;height:70px;object-fit:cover;border-radius:4px;border:1px solid #ccc;"
                                  />
                                {:else}
                                  <!-- Affiche le nom du fichier si ce n'est pas une image -->
                                  <span style="font-size:12px;color:#555;">
                                    {uploadedFiles[
                                      requiredFile.libelle + document.libelle
                                    ]}
                                  </span>
                                {/if}
                              </span>
                            {/if}

                            <input
                              accept="image/*, .pdf"
                              type="file"
                              class="form__input"
                              on:change={(e) =>
                                handleDocumentChange(
                                  e,
                                  requiredFile.libelle,
                                  document.libelle
                                )}
                              placeholder="Documents à fournir"
                            />

                            {#if errors.documents}
                              <p class="error">{errors.documents}</p>
                            {/if}
                          </div>
                        </div>
                      {/each}
                    </div>
                  {/each}
                </div>
              </div>
            {/if}

            <!-- Étape 4 : Paiement -->
            {#if step === 4}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                VEUILLEZ PROCéDER AU PAIEMENT
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <!-- on:click={clickPaiement} -->
                  <div class="grid grid-cols-1 gap-20 flex justify-center">
                    <div class="">
                      {#if isPaiementDone == false}
                        <p>
                          Veillez vous rendre sur le site de votre banque et
                          effectuer le paiement.
                        </p>
                        <br />
                      {/if}
                      {#if isPaiementDone == true}
                        <p>
                          Votre inscription à été effectué avec success,veillez
                          vous connecter.
                        </p>
                        <br />
                      {/if}

                      <br />
                    </div>
                  </div>
                </div>
              </div>
            {/if}

            <!-- Boutons de navigation -->
            <div class="form__grup">
              {#if step > 1}
                <button
                  disabled={authenticating == true || isPaiementDone == true}
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={prevStep}>← RETOUR</button
                >
              {/if}

              {#if step < 4}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={() => nextStep()}>SUIVANT →</button
                >
              {:else}
                {#if isPaiementDone == false}
                  <button
                    type="button"
                    on:click={clickPaiement}
                    class="buton buton--kirmizi bg-green-500"
                  >
                    {#if authenticating}
                      <div class="grid grid-cols-2">
                        <div>
                          <Spinner />
                        </div>
                        <div>Effectuer le paiement</div>
                      </div>
                    {:else}
                      Effectuer le paiement
                    {/if}
                  </button>
                {/if}
                {#if isPaiementDone == true}
                  <button
                    type="button"
                    on:click={connexion}
                    class="buton buton--kirmizi bg-green-500"
                  >
                    Connectez vous
                  </button>
                {/if}
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

    .file-icon {
      display: flex;
      align-items: center;
      color: #e53e3e; /* red for PDF, change as needed */
    }
  </style>
  <Footer />
</div>
