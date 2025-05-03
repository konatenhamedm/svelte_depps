<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "$components/Footer.svelte";
  import Slide from "$components/Slide.svelte";

  import { apiFetch, BASE_URL_API } from "$lib/api";
  import type Civilite from "../../../types.js";
  import type Pays from "../../../types.js";
  import { goto } from "$app/navigation";
  import Modal from "./Modal.svelte";
  import FormButtons from "$components/site/FormButtons.svelte";
  import InscriptionEtapeFinale from "$components/site/InscriptionEtapeFinale.svelte";
  import EtapeOrganisation from "$components/site/EtapeOrganisation.svelte";
  import EtapeProfessionnelle from "$components/site/EtapeProfessionnelle.svelte";
  import Step2Form from "$components/site/Step2Form.svelte";
  import EtapeConnexion from "$components/site/EtapeConnexion.svelte";

  export let data;
  let user = data?.user;
  let paiementStatus: boolean;
  let showPassword = false;
  let showPasswordConfirm = false;

  function validateEmail(email: string): boolean {
    const regex = /\S+@\S+\.\S+/;

    return regex.test(email);
  }

  let isValidPhoneOrganisation = true;

  $: emailError =
    formData.email && !validateEmail(formData.email)
      ? "Veuillez entrer un email valide"
      : "";

  $: emailProError =
    formData.emailPro && !validateEmail(formData.emailPro)
      ? "Veuillez entrer un email valide"
      : "";
  $: emailAutreError =
    formData.emailAutre && !validateEmail(formData.emailAutre)
      ? "Veuillez entrer un email valide"
      : "";

  let step = 1;

  let formData = {
    email: "",
    password: "",
    confirmPassword: "",
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
    email: "",
    code: "",
    password: "",
    confirmPassword: "",

    // Personal Informations

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
    organisationAnnee: "",

    // Paiement informations
  };

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
        !emailCheck;
    }

    if (step === 2) {
      errors.nom = formData.nom ? "" : "Le nom est requis";
      errors.prenoms = formData.prenoms ? "" : "Le prenoms est requis";
      errors.emailAutre = formData.emailAutre ? "" : "L'email est requis";
      errors.civilite = formData.civilite ? "" : "La civilité est requise";
      errors.dateNaissance = formData.dateNaissance
        ? ""
        : "La date de naissance est requise";
      errors.numero = formData.numero ? "" : "Le numéro est requis";
      errors.situation = formData.situation ? "" : "La situation est requise";

      valid =
        !errors.civilite &&
        !errors.dateNaissance &&
        !errors.emailPro &&
        !errors.numero &&
        !errors.situation &&
        !errors.nom &&
        !errors.prenoms &&
        !errors.emailAutre &&
        !emailAutreError;
    }

    if (step === 3) {
      errors.profession = formData.profession
        ? ""
        : "La profession est requise";

      errors.dateDiplome = formData.dateDiplome
        ? ""
        : "La date du diplome est requise";

      errors.lieuDiplome = formData.lieuDiplome
        ? ""
        : "Le lieu du diplome est requis";

      errors.datePremierDiplome = formData.datePremierDiplome
        ? ""
        : "La date du premier diplome est requise";

      errors.diplome = formData.diplome ? "" : "Le diplome est requis";
      errors.situationPro = formData.situationPro
        ? ""
        : "La situation est requise";

      errors.poleSanitaire = formData.poleSanitaire
        ? ""
        : "Le pole sanitaire est requis";
      errors.lieuExercicePro = formData.lieuExercicePro
        ? ""
        : "Le lieu d'exercice est requis";
      errors.professionnel = formData.professionnel
        ? ""
        : "Le professionnel est requis";
      errors.emailPro = formData.emailPro ? "" : "L'email est requis";
      errors.region = formData.region ? "" : "La région est requise";
      errors.district = formData.district ? "" : "Le district est requis";
      errors.ville = formData.ville ? "" : "La ville est requise";
      errors.commune = formData.commune ? "" : "La commune est requise";
      errors.quartier = formData.quartier ? "" : "Le quartier est requis";

      // Vérifie si toutes les valeurs dans errors sont vides (""), donc aucune erreur
      valid =
        Object.values(errors).every((error) => error === "") &&
        !emailProError &&
        !codeExisteError;
    }

    if (step === 4) {
      errors.photo = formData.photo ? "" : "La photo est requise";
      errors.cni = formData.cni
        ? ""
        : "La carte nationale d'identité est requise";
      errors.casier = formData.casier ? "" : "Le casier judiciaire est requis";
      errors.diplomeFile = formData.diplomeFile ? "" : "Le diplôme est requis";
      errors.certificat = formData.certificat ? "" : "Le certificat est requis";
      errors.cv = formData.cv ? "" : "Le CV est requis";

      // Vérifie si toutes les valeurs dans errors sont vides (""), donc aucune erreur
      valid = Object.values(errors).every((error) => error === "");

      console.log("Validation Status:", valid);
      console.log("FormData:", formData);
    }

    if (step === 5) {
      if (formData.appartenirOrganisation == "oui") {
        errors.organisationNom = formData.organisationNom
          ? ""
          : "Le nom de l'organisation est requis";

        valid = !errors.organisationNom && isValidPhoneOrganisation;
      }
    }

    if (step === 6) {
      valid = isPaiementDone;
    }

    return valid;
  }

  let isPaiementProcessing = false;
  $: isPaiementDone = false;
  $: message = "";

  // 🔹 Fonction pour sauvegarder l'état actuel du formulaire
  function saveFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("step", step.toString());
    }
  }
  let fileNames: { [key: string]: string } = {};

  let selectedFiles = {};

  function updateFormData(fieldName: string, file: File | null) {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      selectedFiles = {
        ...selectedFiles,
        [fieldName]: { name: file.name, data: reader.result },
      };

      fileNames = {
        ...fileNames,
        [fieldName]: { name: file.name, url: reader.result },
      };

      // 🔥 Mettre à jour `formData` immédiatement
      formData[fieldName] = file;

      // 🔥 Stocker dans le localStorage
      localStorage.setItem("selectedFiles", JSON.stringify(selectedFiles));

    };
  }

  function handleFileChange(event: any, fieldName: string) {
    const file = event.target.files[0] || null;
    updateFormData(fieldName, file);

  }

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

  onMount(() => {
    /*  localStorage.clear(); */
    console.log("gggg", formData);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("return")) {
      restoreFormState();
    }

    const storedFiles = JSON.parse(localStorage.getItem("selectedFiles")) || {};
    selectedFiles = storedFiles;

    fileNames = Object.keys(storedFiles).reduce((acc, key) => {
      acc[key] = { name: storedFiles[key].name, url: storedFiles[key].data };
      return acc;
    }, {});
  });

  let messagefile = "";

  function nextStep() {
    if (validateStep()) {
      step += 1;
      localStorage.setItem("step", step.toString());
      return;
    } else {
      /*  messagefile = "Veuillez remplir tous les champs obligatoires."; */
    }
  }

  function prevStep() {
    if (step > 1) {
      step -= 1;
      localStorage.setItem("step", step.toString());
    }
  }

  let authenticating_submit = false;

  // 🔹 Soumission du formulaire
  function submitForm() {
    if (validateStep()) {
      // Créer un FormData pour les données du formulaire
      let formDatas = new FormData();

      Object.keys(formData).forEach((key) => {
        formDatas.append(key, formData[key]);
      });

      const reference = localStorage.getItem("reference");
      if (reference) {
        formDatas.append("reference", reference);
      }
      formDatas.append("type", "professionnel");

      const selectedFilesFromStorage = JSON.parse(
        localStorage.getItem("selectedFiles"),
      );

      if (selectedFilesFromStorage) {
        // Ajouter chaque fichier au FormData
        Object.keys(selectedFilesFromStorage).forEach((fieldName) => {
          const fileData = selectedFilesFromStorage[fieldName];
          if (fileData && fileData.data) {
            const byteCharacters = atob(fileData.data.split(",")[1]);
            const byteArrays = [];

            for (
              let offset = 0;
              offset < byteCharacters.length;
              offset += 512
            ) {
              const slice = byteCharacters.slice(offset, offset + 512);
              const byteNumbers = new Array(slice.length);
              for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
              }
              byteArrays.push(new Uint8Array(byteNumbers));
            }

            const blob = new Blob(byteArrays, {
              type: "application/octet-stream",
            });
            formDatas.append(fieldName, blob, fileData.name);
          }
        });
      }

      authenticating = true;

      fetch("https://app.mydepps.net/api/paiement/paiement", {
        method: "POST",
        body: formDatas,
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.errors && Object.keys(result.errors).length > 0) {
            authenticating = false;
            messagefile = result.errors;
            console.log(result.errors);
          } else {
            if (result.url) {
              localStorage.setItem("reference", result.reference);

              window.location.href = result.url + "?return=1"; // 🔥 Ajout du paramètre `return`
            }
          }
        })
        .catch((error) => {
          console.error("Erreur paiements :", error);
          isPaiementProcessing = false;
          let authenticating = false;
        });
    }
  }

  // 🔹 Gestion du paiements
  function clickPaiement() {
    isPaiementProcessing = true;
    saveFormState(); // 🔥 Sauvegarder avant de partir

    initPaiement();
  }
  function clickValidation() {
    isPaiementProcessing = true;
    saveFormState(); // 🔥 Sauvegarder avant de partir

    initValidation();
  }

  let authenticating = false;
  function initPaiement() {
    authenticating = true;
    // Créer un FormData pour les données du formulaire
    let formDatas = new FormData();

    Object.keys(formData).forEach((key) => {
      formDatas.append(key, formData[key]);
    });

    const reference = localStorage.getItem("reference");
    if (reference) {
      formDatas.append("reference", reference);
    }
    formDatas.append("type", "professionnel");

    const selectedFilesFromStorage = JSON.parse(
      localStorage.getItem("selectedFiles"),
    );

    if (selectedFilesFromStorage) {
      // Ajouter chaque fichier au FormData
      Object.keys(selectedFilesFromStorage).forEach((fieldName) => {
        const fileData = selectedFilesFromStorage[fieldName];
        if (fileData && fileData.data) {
          const byteCharacters = atob(fileData.data.split(",")[1]);
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
            type: "application/octet-stream",
          });
          formDatas.append(fieldName, blob, fileData.name);
        }
      });
    }

    console.log(formDatas);

    fetch("https://app.mydepps.net/api/paiement/paiement", {
      method: "POST",
      body: formDatas,
    })
      .then((response) => response.json())
      .then((result) => {
        authenticating = false;

        if (result.data.url) {
          localStorage.setItem("reference", result.data.reference);
          window.location.href = result.data.url + "?return=1"; // 🔥 Ajout du paramètre `return`
        }
      })
      .catch((error) => {
        console.error("Erreur paiements :", error);
        isPaiementProcessing = false;
        authenticating = false;
      });
  }
  function initValidation() {
    authenticating = true;
    // Créer un FormData pour les données du formulaire
    let formDatas = new FormData();

    Object.keys(formData).forEach((key) => {
      formDatas.append(key, formData[key]);
    });

    const reference = localStorage.getItem("reference");
    if (reference) {
      formDatas.append("reference", reference);
    }
    formDatas.append("type", "professionnel");

    const selectedFilesFromStorage = JSON.parse(
      localStorage.getItem("selectedFiles"),
    );

    if (selectedFilesFromStorage) {
      // Ajouter chaque fichier au FormData
      Object.keys(selectedFilesFromStorage).forEach((fieldName) => {
        const fileData = selectedFilesFromStorage[fieldName];
        if (fileData && fileData.data) {
          const byteCharacters = atob(fileData.data.split(",")[1]);
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
            type: "application/octet-stream",
          });
          formDatas.append(fieldName, blob, fileData.name);
        }
      });
    }

    fetch(BASE_URL_API + "/professionnel/create", {
      method: "POST",
      body: formDatas,
    })
      .then((response) => response.json())
      .then((result) => {
        authenticating = false;

        if (result.errors && Object.keys(result.errors).length > 0) {
          messagefile = result.errors;
          console.log(result.errors);
        } else {
          connexion();
        }
      })
      .catch((error) => {
        console.error("Erreur paiements :", error);
        isPaiementProcessing = false;
        authenticating = false;
      });
  }

  function connexion() {
    goto("/site/connexion");
    localStorage.clear(); // Nettoyer les données du localStorage

    if (localStorage.getItem("reference")) {
      localStorage.setItem("reference", ""); // Nettoyer les données du localStorage
    }
  }

  async function checkTransactionID(idtransaction: any) {
    if (!idtransaction) return false;

    try {
      const res = await fetch(
        `https://app.mydepps.net/api/paiement/get/transaction/${idtransaction}`,
      );
      const data = await res.json();
      isPaiementDone = data.data;
      return data.data; // Assurez-vous que l'API renvoie un objet avec une clé `valid`
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de la transaction :",
        error,
      );
      return false;
    }
  }
  async function checkPaiementStatus(professionCode: any) {
    if (!professionCode) return false;

    try {
      const res = await fetch(
        `https://app.mydepps.net/api/profession/get/status/paiement/${professionCode}`,
      );
      const data = await res.json();
      paiementStatus = data.data;
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

  async function checkEmail(email: any) {
    if (!email) return false;

    try {
      const res = await fetch(
        `https://app.mydepps.net/api/user/check/email/existe/${email}`,
      );
      const data = await res.json();
      return data.data; // Assurez-vous que l'API renvoie un objet avec une clé `valid`
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de la transaction :",
        error,
      );
      return false;
    }
  }
  let emailCheck = false;
  $: if (formData.profession) {
    checkPaiementStatus(formData.profession).then((resultat) => {
      // paiementStatus = resultat.data;
    });
  }
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

  $: if (formData.email) {
    checkEmail(formData.email).then((resultat) => {
      emailCheck = resultat;

      if (emailCheck == true) {
        emailError = "Cet email existe deja";
      }
    });
  }

  let reference: any;

  // Déclenche la vérification de façon réactive dès que transactionID change
  $: if (typeof window !== "undefined" && localStorage.getItem("reference")) {
    reference = localStorage.getItem("reference").toString();
    if (reference != "") {
      checkTransactionID(reference).then((resultat) => {
        console.log(resultat);
        console.log("RRRDDFFF", reference);

        if (resultat == false) {
          message = "Votre paiement à échoué veillez ressayez svp.";
          /* isPaiementDone = false; */
        } else {
          message = "";
          isPaiementDone = true;
        }
      });
    }
  }

  let objects = [
    { name: "civilite", url: "/civilite/" },
    /* { name: "region", url: "/region" },
    { name: "ville", url: "/ville" },
    { name: "district", url: "/district" },
    { name: "commune", url: "/commune" }, */
    { name: "nationate", url: "/pays/" },
    { name: "situationProfessionnelle", url: "/situationProfessionnelle/" },
  ];

  let values: {
    civilite: Civilite[];
   /*  region: Civilite[];
    district: District[];
    ville: Civilite[];
    commune: Civilite[]; */
    nationate: Pays[];
    situationProfessionnelle: Pays[];
  } = {
    civilite: [],
    nationate: [],
    situationProfessionnelle: [],
    /* ville: [],
    region: [],
    district: [],
    commune: [], */
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

  let professions: any[] = [];

  async function getAllProfessions() {
    await apiFetch(true, "/typeProfession").then((response) => {
      if (response.code === 200) {
        professions = response.data;
      }
    });
  }

  onMount(async () => {
    await fetchData();
    getAllProfessions();
    //await loadData();
  });
  onMount(() => {
    /*  localStorage.setItem("reference", ""); */
    /* localStorage.setItem("reference", "DEPPS250304234714045"); */
    if (localStorage.getItem("reference"))
      console.log("JE VEUX", localStorage.getItem("reference")?.toString());

    console.log(isPaiementDone);
    console.log(paiementStatus);

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

    const EXPIRATION_TIME = 30 * 60 * 1000; // 30 minutes en millisecondes // 1 heure en millisecondes
    const lastSaved = localStorage.getItem("timestamp");

    if (lastSaved && Date.now() - parseInt(lastSaved) > EXPIRATION_TIME) {
      localStorage.clear();
      localStorage.setItem("reference", "");
    }

    // Mettre à jour le timestamp
    localStorage.setItem("timestamp", Date.now().toString());

    // Programmer un clear automatique après 1 heure
    setTimeout(() => {
      console.log("Effacement automatique après 1 heure !");
      localStorage.clear();
      localStorage.setItem("reference", "");
    }, EXPIRATION_TIME);
  });

  // Sauvegarder les données du formulaire dans localStorage à chaque modification
  function updateField(field: any, value: any) {
    formData[field] = value;
    localStorage.setItem("formData", JSON.stringify(formData));
  }

  let isModalOpen = false;
  let pdfUrl = "";

  function openModal(reference: any) {
    pdfUrl = reference; // ✅ Met à jour la variable réactive
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }

  const situationsMatrimoniales = [
    { value: "Célibataire", label: "Célibataire" },
    { value: "Marié(e)", label: "Marié(e)" },
    { value: "Divorcé(e)", label: "Divorcé(e)" },
    { value: "Veuf (Veuve)", label: "Veuf (Veuve)" },
  ];

  // Fonction pour charger les données depuis une API
  
</script>

<Slide {user} />
<section class="text-center pb-0" style="padding-top:142px">
  <h2 class="h2-baslik-anasayfa-ozel pb-1 text-uppercase">
    Inscription en tant que professionnel de santé
  </h2>
  <p class="text-center paragraf">
    Veuillez renseigner vos informations afin de procéder à l'inscription
  </p>
</section>

<main style="padding-top:200px">
  <!--İletişim Form Alanı-->
  <section class="iletisim-form-alani pt-0">
    <div class="tablo">
      <div class="" style="visibility: visible;">
        <form
          class="form one_customer"
          method="post"
          on:submit|preventDefault={submitForm}
        >
          <!-- Étape 1 -->
          {#if step === 1}
            <EtapeConnexion
              bind:formData
              {errors}
              {emailError}
              {saveFormState}
              {showPassword}
              {showPasswordConfirm}
              togglePassword={() => (showPassword = !showPassword)}
              toggleConfirmPassword={() =>
                (showPasswordConfirm = !showPasswordConfirm)}
            />
          {/if}

          <!-- Étape 2 -->
          {#if step === 2}
            <Step2Form
              {formData}
              {errors}
              {values}
              {situationsMatrimoniales}
              {saveFormState}
            />
          {/if}

          <!-- Étape 3 -->
          {#if step === 3}
            <EtapeProfessionnelle
              {formData}
              {errors}
              {values}
              {professions}
              {codeExisteError}
              {updateField}
            />
          {/if}

          <!-- Étape 4 -->
          {#if step === 4}
          <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
            Informations médiatiques (étape 4/6)
          </h2>

          <div class="tablo">
            <div class="tablo--1h-ve-2">
              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
              >
                {#each [{ key: "photo", label: "Photo d'identité", type: "file" }, { key: "cni", label: "Copie CNI(Carte nationale d’identité)", type: "file" }, { key: "casier", label: "Extrait Casier judiciaire(Datant de moins 3 mois)", type: "file" }, { key: "diplomeFile", label: "Diplôme légalisé", type: "file" }, { key: "certificat", label: "Certificat de residence (Datant de moins 3 mois)", type: "file" }, { key: "cv", label: "CV", type: "file" }] as field}
                  <div class="form__group">
                    <label class="form_label" for={field.key}>{field.label}</label>
                    <div class="input-container">
                      {#if fileNames[field.key]}
                        <img
                          src={fileNames[field.key].url}
                          alt={fileNames[field.key].name}
                          class="preview-image"
                        />
                      {/if}
                      <input
                        id={field.key}
                        type={field.type}
                        class="form__input"
                        on:change={(e) => handleFileChange(e, field.key)}
                      />
                    </div>
                    {#if fileNames[field.key]}
                      <p>
                        {fileNames[field.key].name}
                        <a
                          href={fileNames[field.key].url}
                          download={fileNames[field.key].name}
                          class="download-link">📥 Télécharger</a
                        >
                      </p>
                    {/if}
                    {#if errors[field.key as keyof typeof errors]}
                      <p class="text-red-500 text-sm">{errors[field.key as keyof typeof errors]}</p>
                    {/if}
                  </div>
                {/each}

                <style>
                  .input-container {
                    display: flex;
                    align-items: center;
                    gap: 10px; /* Espace entre l'image et le champ input */
                  }

                  .preview-image {
                    width: 50px; /* Ajustez la taille de l'image selon vos besoins */
                    height: 50px;
                    border-radius: 5px;
                    object-fit: cover;
                  }

                  .form__input {
                    flex-grow: 1; /* Le champ input prend le reste de l'espace */
                  }

                  .download-link {
                    margin-left: 10px;
                    color: blue;
                    text-decoration: none;
                  }

                  .download-link:hover {
                    text-decoration: underline;
                  }

                  .text-red-500 {
                    color: red;
                  }
                </style>
              </div>
            </div>
          </div>
        {/if}
          <!-- Étape 5 -->
          <EtapeOrganisation
            {step}
            {formData}
            {updateField}
            {errors}
          />

          <!-- Étape 6 : Paiement -->
          <InscriptionEtapeFinale
            {step}
            {paiementStatus}
            {isPaiementDone}
            {formData}
            {reference}
            {openModal}
            {messagefile}
          />

          <!-- Boutons de navigation -->
          <FormButtons
            {step}
            {prevStep}
            {nextStep}
            {clickValidation}
            {clickPaiement}
            {connexion}
            {authenticating}
            {isPaiementDone}
            {paiementStatus}
            {formData}
            {message}
          />
        </form>
      </div>
    </div>
  </section>
</main>
{#if isModalOpen == true}
  <Modal isOpen={isModalOpen} {pdfUrl} onClose={closeModal} />
{/if}
<!-- </div> -->
<Footer />

<style>
  /*  .iletisim-form-alani {
    padding: 10rem 261px 10rem !important;
    
} */

  .iletisim-form-alani {
    padding: 4rem 235px 5rem !important;
    margin-top: -20vh !important;
    background-color: #fff;
  }
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

  .form__group {
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

  button.ml-2.s-98Y-TDGwojhe {
    position: relative !important;
    right: 70px !important;
  }

  svg.feather.feather-eye.s-98Y-TDGwojhe {
    position: relative !important;
    right: 50px !important;
    color: gray !important;
  }

  .download-link {
    margin-left: 10px;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
