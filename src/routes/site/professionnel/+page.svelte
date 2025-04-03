<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";

  import { apiFetch, BASE_URL_API, BASE_URL_API_V2 } from "$lib/api";
  import type {
    Civilite,
    District,
    Genre,
    Pays,
    Specialite,
    Ville
  } from "../../../types.js";
  import { getProfessions } from "$lib/constants";
  import Spinner from "$components/_skeletons/Spinner.svelte";
  import { goto } from "$app/navigation";
  import Modal from "./Modal.svelte";
  import { P } from "flowbite-svelte";
  import TextInput from "$components/site/TextInput.svelte";
  import SelectInput from "$components/site/SelectInput.svelte";

  export let data;
  let user = data?.user;
  let paiementStatus: boolean;
  let showPassword = false;
  let showPasswordConfirm = false;

  function validateEmail(email: string): boolean {
    const regex = /\S+@\S+\.\S+/;

    return regex.test(email);
  }

  let isValid = true;
  let isValidContact = true;
  let isValidPhoneOrganisation = true;

  function validatePhone() {
    const regex = /^(07|01|05)\d{8}$/;
    isValid = regex.test(formData.numero);

    console.log(isValid);
  }

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
    organisationNom: ""
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
    organisationAnnee: ""

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
        Object.values(errors).every((error) => error === "") && !emailProError && !codeExisteError ;
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
        [fieldName]: { name: file.name, data: reader.result }
      };

      fileNames = {
        ...fileNames,
        [fieldName]: { name: file.name, url: reader.result }
      };

      // 🔥 Mettre à jour `formData` immédiatement
      formData[fieldName] = file;

      // 🔥 Stocker dans le localStorage
      localStorage.setItem("selectedFiles", JSON.stringify(selectedFiles));

      console.log("Mise à jour réussie:", formData);
    };
  }

  // Réaction automatique quand formData change

  function handleFileChange(event: any, fieldName: string) {
    const file = event.target.files[0] || null;
    updateFormData(fieldName, file);

    console.log("Fichier sélectionné pour", fieldName, ":", file);
    console.log("État actuel de formData:", formData);
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

  // ✅ Vérifier si on revient après un paiements
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
        localStorage.getItem("selectedFiles")
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
              type: "application/octet-stream"
            });
            formDatas.append(fieldName, blob, fileData.name);
          }
        });
      }

      authenticating = true;

      fetch("https://depps.leadagro.net/api/paiement/paiement", {
        method: "POST",
        body: formDatas
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
      localStorage.getItem("selectedFiles")
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
            type: "application/octet-stream"
          });
          formDatas.append(fieldName, blob, fileData.name);
        }
      });
    }

    console.log(formDatas);

    fetch("https://depps.leadagro.net/api/paiement/paiement", {
      method: "POST",
      body: formDatas
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
      localStorage.getItem("selectedFiles")
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
            type: "application/octet-stream"
          });
          formDatas.append(fieldName, blob, fileData.name);
        }
      });
    }

    fetch(BASE_URL_API + "/professionnel/create", {
      method: "POST",
      body: formDatas
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
        `https://depps.leadagro.net/api/paiement/get/transaction/${idtransaction}`
      );
      const data = await res.json();
      isPaiementDone = data.data;
      return data.data; // Assurez-vous que l'API renvoie un objet avec une clé `valid`
    } catch (error) {
      console.error(
        "Erreur lors de la vérification de la transaction :",
        error
      );
      return false;
    }
  }
  async function checkPaiementStatus(professionCode: any) {
    if (!professionCode) return false;

    try {
      const res = await fetch(
        `https://depps.leadagro.net/api/profession/get/status/paiement/${professionCode}`
      );
      const data = await res.json();
      paiementStatus = data.data;
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

  async function checkEmail(email: any) {
    if (!email) return false;

    try {
      const res = await fetch(
        `https://depps.leadagro.net/api/user/check/email/existe/${email}`
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
  let emailCheck = false;
  $: if(formData.profession) {
  
    checkPaiementStatus(formData.profession).then((resultat) => {
     // paiementStatus = resultat.data;

    });
  }
  let codeExisteError :string ;
  $: if(formData.code) {
    
    checkCodeVerification(formData.code).then((resultat) => {
       codeVericationStatus = resultat;

      if (codeVericationStatus == true) {
        codeExisteError = "Ce codes de vérification existe deja";
      }else{
        codeExisteError = "";
      }

  
          

    });
  }else{
    codeExisteError = "";
  }

  $: if (formData.email) {
    checkEmail(formData.email).then((resultat) => {
      emailCheck = resultat;

      if (emailCheck == true) {
        emailError = "Cet email existe deja";
      }

      console.log("emailCheck", emailCheck);
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
    await loadData();
  });
  onMount(() => {
   /*  localStorage.setItem("reference", ""); */
    /* localStorage.setItem("reference", "DEPPS250304234714045"); */
    if (localStorage.getItem("reference"))
      console.log("JE VEUX", localStorage.getItem("reference")?.toString());
  
    console.log(isPaiementDone)  
    console.log(paiementStatus)  

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
    { value: "Veuf (Veuve)", label: "Veuf (Veuve)" }
  ];

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
            <h2
              class="text-3xl h2-baslik-anasayfa-ozel font-semibold mb-4 text-center md:text-left"
            >
              Informations de rapport (étape 1/6)
            </h2>
            <br /><br />
            <div class="w-full mb-4" style="width:100%">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex flex-col form__group">
                  <label class="text-3xl font-medium mb-1">E-mail *</label>
                  <input
                    required
                    on:input={saveFormState}
                    on:input={(e) => updateField("email", e.target.value)}
                    type="email"
                    class="form__input w-full"
                    style="width:100%"
                    bind:value={formData.email}
                    placeholder="E-mail"
                  />
                  {#if emailError}
                    <p class="text-red-500 text-sm">{emailError}</p>
                  {/if}
                </div>

                <div class="flex flex-col form__group relative">
                  <label class="text-3xl font-medium mb-1">Mot de passe *</label
                  >

                  <div class="flex items-center">
                    <input
                      on:input={saveFormState}
                      on:input={(e) => updateField("password", e.target.value)}
                      type={showPassword ? "text" : "password"}
                      class="form__input w-full px-3 pr-10"
                      style="width:100%"
                      bind:value={formData.password}
                      placeholder="Mot de passe"
                    />

                    <button
                      type="button"
                      on:click={() => (showPassword = !showPassword)}
                      class="absolute right-3 text-black"
                      style="color:black !important"
                    >
                      {#if showPassword}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-eye-off"
                          ><path
                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                          ></path><line x1="1" y1="1" x2="23" y2="23"
                          ></line></svg
                        >
                      {:else}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-eye"
                          ><path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          ></path><circle cx="12" cy="12" r="3"></circle></svg
                        >
                      {/if}
                    </button>
                  </div>
                  {#if errors.password}
                    <p class="text-red-500 text-sm">{errors.password}</p>
                  {/if}
                </div>
                <div class="flex flex-col form__group relative">
                  <label class="text-3xl font-medium mb-1"
                    >Confirmer le mot de passe *</label
                  >
                  <div class="flex items-center">
                    <input
                      on:input={saveFormState}
                      on:input={(e) =>
                        updateField("confirmPassword", e.target.value)}
                      type={showPasswordConfirm ? "text" : "password"}
                      class="form__input w-full px-3 pr-10"
                      style="width:100%"
                      bind:value={formData.confirmPassword}
                      placeholder="Mot de passe"
                    />

                    <button
                      type="button"
                      on:click={() =>
                        (showPasswordConfirm = !showPasswordConfirm)}
                      class="absolute right-3 text-black"
                      style="color:black !important"
                    >
                      {#if showPasswordConfirm}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-eye-off"
                          ><path
                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                          ></path><line x1="1" y1="1" x2="23" y2="23"
                          ></line></svg
                        >
                      {:else}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-eye"
                          ><path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                          ></path><circle cx="12" cy="12" r="3"></circle></svg
                        >
                      {/if}
                    </button>
                  </div>
                  {#if errors.confirmPassword}
                    <p class="text-red-500 text-sm">{errors.confirmPassword}</p>
                  {/if}
                </div>
              </div>
            </div>
          {/if}

          <!-- Étape 2 -->
          {#if step === 2}
            <h2
              class="text-3xl h2-baslik-anasayfa-ozel font-semibold mb-4 text-center md:text-left"
            >
              Informations personnelles (étape 2/6)
            </h2>
            <br /><br />

            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4"
            >
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

              <SelectInput
                label="Nationnalité"
                bind:value={formData.nationalite}
                options={values.nationate.map((c) => ({
                  id: String(c.id),
                  libelle: c.libelle
                }))}
                placeholder="Veuillez sélectionner une nationnalité"
                error={errors.nationalite}
                onInput={saveFormState}
                step={2}
              />

              <SelectInput
                label="Civilité"
                bind:value={formData.civilite}
                options={values.civilite.map((c) => ({
                  id: String(c.id),
                  libelle: c.libelle
                }))}
                placeholder="Veuillez sélectionner une civilité"
                error={errors.civilite}
                onInput={saveFormState}
                step={2}
              />

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
          {/if}

          <!-- Étape 3 -->
          {#if step === 3}
            <h2
              class="text-3xl h2-baslik-anasayfa-ozel md:text-2xl font-bold my-4 text-center md:text-left"
            >
              Informations professionnelles (étape 3/6)
            </h2>
            <br /><br />

            <div class="bg-white p-6 rounded-lg shadow-m mb-4">
              <div class="mb-4">
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
                >
                  {#each professions as professionGP}
                    <div class="form__group mb-4">
                      <label class="form_label font-bold block mb-2">
                        <big>{professionGP.libelle}</big>
                      </label>

                      {#each professionGP.professions as profession}
                        <div class="flex items-center space-x-2">
                          <input
                            on:change={saveFormState}
                            on:change={(e: any) =>
                              updateField("profession", e.target.value)}
                            type="radio"
                            class="cursor-pointer"
                            id={profession.code}
                            name="rd_profession"
                            checked={profession.code == formData.profession}
                            on:change={() =>
                              (formData.profession = profession.code)}
                          />
                          <label for={profession.code} class="cursor-pointer"
                            >{profession.libelle}</label
                          >
                        </div>
                      {/each}
                    </div>
                  {/each}
                </div>
                {#if errors.profession}
                  <p class="text-red-500 text-sm">{errors.profession}</p>
                {/if}
              </div>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12"
              >
                <!-- emailPro: "",
              dateDiplome: "",
              lieuDiplome: "",
              datePremierDiplome: "",
              diplome: "",
              situationPro: "",
              
              profession: "",
              poleSanitairePro: "",
          
              poleSanitaire: "",
              region: "",
              district: "",
              ville: "",
              commune: "",
              quartier: "",
              professionnel: "",
              lieuExercicePro: "", -->

                <!-- Autres champs similaires -->
                <!-- Email Professionnel -->
                <!-- Email Professionnel -->
                <TextInput
                  type="text"
                  label="Code de vérification (Unique pour les ancien membres)"
                  bind:value={formData.code}
                  placeholder="Entrez votre code de vérification"
                  error={codeExisteError}
                  onInput={saveFormState}
                  step={3}
                />
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
                  <label class="block text-2xl font-medium mb-1">Région sanitaire *</label
                  >
                  <select
                    bind:value={formData.region}
                    class="w-full form__input"
                    on:change={saveFormState}
                    on:change={updateDistricts}
                    on:change={saveFormState}
                  >
                    <option value="">Sélectionnez votre Région</option>
                    {#each values.region as region}
                      <option value={region.id}>{region.libelle}</option>
                    {/each}
                  </select>
                  {#if errors.region}
                    <p class="text-red-500 text-sm">{errors.region}</p>
                  {/if}
                </div>

                <div class="form__group">
                  <label class="block text-2xl font-medium mb-1"
                    >District sanitaire*</label
                  >
                  <select
                    class="w-full form__input"
                    bind:value={formData.district}
                    on:change={updateVilles}
                    on:change={saveFormState}
                  >
                    <option value="">Sélectionnez votre district</option>
                    {#each values.district as district}
                      <option value={district.id}>{district.libelle}</option>
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
                    on:change={updateCommunes}
                    on:change={saveFormState}
                  >
                    <option value="">Sélectionnez votre ville</option>
                    {#each values.ville as ville}
                      <option value={ville.id}>{ville.libelle}</option>
                    {/each}
                  </select>
                  {#if errors.ville}
                    <p class="text-red-500 text-sm">{errors.ville}</p>
                  {/if}
                </div>

                <div class="form__group">
                  <label class="block text-2xl font-medium mb-1"
                    >Commune *</label
                  >
                  <select
                    class="w-full form__input"
                    bind:value={formData.commune}
                    on:change={saveFormState}
                  >
                    <option value="">Sélectionnez votre commune</option>
                    {#each values.commune as commune}
                      <option value={commune.id}>{commune.libelle}</option>
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
                <!-- Lieu d'exercice professionnel -->
                <!--  <TextInput
                  type="text"
                  label="Profession"
                  bind:value={formData.profession}
                  placeholder="Entrez votre profession"
                  error={errors.profession}
                  onInput={saveFormState}
                /> -->
              </div>
            </div>
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
                      <label class="form_label">{field.label}</label>
                      <div class="input-container">
                        {#if fileNames[field.key]}
                          <img
                            src={fileNames[field.key].url}
                            alt={fileNames[field.key].name}
                            class="preview-image"
                          />
                        {/if}
                        <input
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
                      {#if errors[field.key]}
                        <p class="text-red-500 text-sm">{errors[field.key]}</p>
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
          {#if step === 5}
            <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
              Informations organisationnelles (étape 5/6)
            </h2>
            <div class="tablo">
              <div class="tablo--1h-ve-2">
                <div
                  class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6"
                >
                  <div class="form__group mb-4">
                    <label class="form_label mb-4"
                      >Appartenez-vous à une organisation ?</label
                    >
                    <div class="flex items-center space-x-4">
                      {#each ["oui", "non"] as organisation}
                        <div class="flex items-center space-x-2">
                          <input
                            on:input={saveFormState}
                            on:input={(e: any) =>
                              updateField(
                                "appartenirOrganisation",
                                e.target.value
                              )}
                            type="radio"
                            class="cursor-pointer"
                            name="rd_profession"
                            value={organisation}
                            id={organisation}
                            checked={organisation ==
                              formData.appartenirOrganisation}
                            on:change={() =>
                              (formData.appartenirOrganisation = organisation)}
                          />
                          <label
                            for={organisation}
                            class="cursor-pointer"
                            style="text-transform: uppercase;"
                            >{organisation}</label
                          >
                        </div>
                      {/each}
                    </div>
                  </div>

                  {#if formData.appartenirOrganisation == "oui"}
                    <div class="form__group">
                      <label class="form_label">Nom de l'organisation *</label>
                      <input
                        on:input={saveFormState}
                        on:input={(e: any) =>
                          updateField("organisationNom", e.target.value)}
                        type="text"
                        class="form__input"
                        bind:value={formData.organisationNom}
                        placeholder="Nom de l'organisation"
                      />
                      {#if errors.organisationNom}<p class="error">
                          {errors.organisationNom}
                        </p>{/if}
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          {/if}

          <!-- Étape 6 : Paiement -->
          {#if step === 6}
            <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
              {#if !paiementStatus}
                VEUILLEZ VALIDER POUR FINALISER VOTRE INSCRIPTION
              {:else}
                {#if isPaiementDone == false}
                  VEUILLEZ PROCéDER AU PAIEMENT
                {/if}
                {#if isPaiementDone == true}
                  INFORMATIONS SUR LE PAIEMENT
                {/if}
              {/if}
            </h2>
            <div class="tablo">
              <div class="tablo--1h-ve-2">
                <!--   on:click={clickPaiement} -->
                <div class="grid grid-cols-1 gap-6 justify-center">
                  <div class="">
                    {#if !paiementStatus}
                      <p>
                        Vous pouvez soumettre le formulaire afin de finaliser
                        votre inscription.
                      </p>
                      <br />
                    {:else}
                      {#if isPaiementDone == false}
                        <p>
                          Veillez vous rendre sur le site de votre banque et
                          effectuer le paiement.
                        </p>
                        <br />
                      {/if}
                      {#if isPaiementDone == true}
                        <p>
                          Votre inscription à été effectué avec success,vous
                          pouvez imprimer le recu de paiement <a
                            href="javascript:void(0);"
                            class="text-blue-500"
                            on:click={() => {
                              openModal(reference);
                            }}>ICI</a
                          >
                        </p>
                        <br />
                        <p>
                          Veillez vous connecter avec vos identifiants en
                          cliquant sur le bouton ci-dessous
                        </p>
                        <br />
                      {/if}
                    {/if}

                    <br />

                    {#if messagefile != ""}
                      <div role="alert">
                        <div
                          class="bg-red-500 text-white font-bold rounded-t px-4 py-2"
                        >
                          Erreur s'est produite
                        </div>
                        <div
                          class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
                        >
                          <p>{messagefile}</p>
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/if}

          <!-- Boutons de navigation -->
          <div class="form__group">
            {#if step > 1}
              <button
                hidden={isPaiementDone == true}
                disabled={authenticating == true || isPaiementDone == true}
                type="button"
                class="buton buton--kirmizi"
                on:click={prevStep}>← RETOUR</button
              >
            {/if}

            {#if step < 5}
              <button
                type="button"
                class="buton buton--kirmizi"
                on:click={nextStep}>SUIVANT →</button
              >
            {:else if step === 5}
              <button
                type="button"
                class="buton buton--kirmizi"
                on:click={nextStep}>SUIVANT →</button
              >
            {:else}
              {#if isPaiementDone == false && paiementStatus == true}
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
              {:else}

              {#if isPaiementDone == false && paiementStatus == false}
                <button
                  type="button"
                  on:click={clickValidation}
                  class="buton buton--kirmizi bg-green-500"
                >
                  {#if authenticating}
                    <div class="grid grid-cols-2">
                      <div>
                        <Spinner />
                      </div>
                      <div>Valider</div>
                    </div>
                  {:else}
                    Valider
                  {/if}
                </button>
              {/if}
              {/if}
              {#if isPaiementDone == true && paiementStatus == true}
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
