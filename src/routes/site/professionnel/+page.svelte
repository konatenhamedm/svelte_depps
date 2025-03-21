<script lang="ts">
  import { onMount } from "svelte";
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";

  import { apiFetch, BASE_URL_API, BASE_URL_API_V2 } from "$lib/api";
  import type {
    Civilite,
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
  function validatePhoneOrganisation() {
    const regex = /^(07|01|05)\d{8}$/;
    isValidPhoneOrganisation = regex.test(formData.organisationNumero);
  }
  /*   function validateContactPro() {
    const regex = /^(07|01|05)\d{8}$/; // Préfixe + 7 chiffres = 10 chiffres max
    isValidContact = regex.test(formData.contactPro);
  } */

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
    organisationNumero: "",
    organisationAnnee: ""
  };

  let errors = {
    email: "",
    password: "",
    confirmPassword: "",

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
      /* errors.code = formData.code ? "" : "Le code est requis"; */
      errors.poleSanitaire = formData.poleSanitaire
        ? ""
        : "Le pole sanitaire est requis";
      errors.nom = formData.nom ? "" : "Le nom est requis";
      errors.prenoms = formData.prenoms ? "" : "Le prenoms est requis";
      errors.lieuExercicePro = formData.lieuExercicePro
        ? ""
        : "Le lieu d'exercice est requis";
      errors.emailAutre = formData.emailAutre ? "" : "L'email est requis";
      errors.professionnel = formData.professionnel
        ? ""
        : "Le professionnel est requis";

      valid =
        !errors.code &&
        !errors.poleSanitaire &&
        !errors.professionnel &&
        !errors.nom &&
        !errors.prenoms &&
        !errors.lieuExercicePro &&
        !errors.emailAutre &&
        !emailAutreError;
    }

    if (step === 3) {
      errors.profession = formData.profession
        ? ""
        : "La profession est requise";
      errors.civilite = formData.civilite ? "" : "La civilité est requise";
      errors.emailPro = formData.emailPro ? "" : "L'email est requis";
      errors.dateDiplome = formData.dateDiplome
        ? ""
        : "La date du diplome est requise";
      errors.dateNaissance = formData.dateNaissance
        ? ""
        : "La date de naissance est requise";
      errors.numero = formData.numero ? "" : "Le numéro est requis";
      errors.lieuDiplome = formData.lieuDiplome
        ? ""
        : "Le lieu du diplome est requis";
      errors.nationalite = formData.nationalite
        ? ""
        : "La nationalité est requise";
      errors.situation = formData.situation ? "" : "La situation est requise";
      errors.datePremierDiplome = formData.datePremierDiplome
        ? ""
        : "La date du premier diplome est requise";
      errors.poleSanitairePro = formData.poleSanitairePro
        ? ""
        : "Le pole sanitaire est requis";
      errors.diplome = formData.diplome ? "" : "Le diplome est requis";
      errors.situationPro = formData.situationPro
        ? ""
        : "La situation est requise";

      // Vérifie si toutes les valeurs dans errors sont vides (""), donc aucune erreur
      valid =
        Object.values(errors).every((error) => error === "") && !emailProError;
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
        errors.organisationNumero = formData.organisationNumero
          ? ""
          : "Le numero de l'organisation est requis";
        errors.organisationAnnee = formData.organisationAnnee
          ? ""
          : "L'année est requise";

        valid =
          !errors.organisationNom &&
          !errors.organisationNumero &&
          !errors.organisationAnnee &&
          isValidPhoneOrganisation;
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

  /* function updateFormData(fieldName: any, file: any) {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        selectedFiles = {
          ...selectedFiles,
          [fieldName]: { name: file.name, data: reader.result }
        };

        localStorage.setItem("selectedFiles", JSON.stringify(selectedFiles));

        fileNames = {
          ...fileNames,
          [fieldName]: { name: file.name, url: reader.result }
        };
      };
    }
  } */

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
          if (result) {
            goto("/site/connexion");
            localStorage.clear(); // Nettoyer les données du localStorage
            localStorage.setItem("reference", "");
          }
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

    if (localStorage.getItem("reference"))
      localStorage.setItem("reference", ""); // Nettoyer les données du localStorage
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
  async function checkPaiementStatus(professionCode: any) {
    if (!professionCode) return false;

    try {
      const res = await fetch(
        `https://depps.leadagro.net/api/profession/get/status/paiement/${professionCode}`
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
  $: if (formData.profession) {
    console.log("PALMERYYYYYY", formData.profession);

    checkPaiementStatus(formData.profession).then((resultat) => {
      paiementStatus = resultat;

      console.log("PALMERYYYYuuuuu", formData.profession);
    });
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

  // Déclenche la vérification de façon réactive dès que transactionID change
  $: if (typeof window !== "undefined" && localStorage.getItem("reference")) {
    const reference = localStorage.getItem("reference").toString();
    if (reference != "") {
      checkTransactionID(reference).then((resultat) => {
        console.log(resultat);
        if (resultat.data == false) {
          message = "Votre paiement à échoué veillez ressayez svp.";
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
    { name: "nationate", url: "/pays" }
  ];

  let values: {
    civilite: Civilite[];
    nationate: Pays[];
  } = { civilite: [], nationate: [] };

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
    fetchData();
    getAllProfessions();
  });
  onMount(() => {
    /* localStorage.setItem('reference', ''); */
    /* localStorage.setItem("reference", "DEPPS250304234714045"); */

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

  function openModal(url: any) {
    pdfUrl = url; // ✅ Met à jour la variable réactive
    isModalOpen = true;
  }

  function closeModal() {
    isModalOpen = false;
  }
</script>

<!-- <div
  id="pointer-ring"
  style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(308px, 648px);"
></div>
<div
  id="pointer-dot"
  style="border-color: rgb(113, 88, 190); transform: translate(333px, 673px);"
></div> -->
<!-- <div id="" class="mb-10"> -->
<Header {user} />
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
            <h2 class="text-3xl font-semibold mb-4 text-center md:text-left">
              Informations de rapport (étape 1/6)
            </h2>
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

                  <!-- <input
                    on:input={saveFormState}
                    on:input={(e) =>
                      updateField("confirmPassword", e.target.value)}
                    type="password"
                    class="w-full form__input"
                    bind:value={formData.confirmPassword}
                    placeholder="Confirmer le mot de passe"
                  />
                  {#if errors.confirmPassword}
                    <p class="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  {/if} -->
                </div>
              </div>
            </div>
          {/if}

          <!-- Étape 2 -->
          {#if step === 2}
            <h2 class="text-3xl font-semibold mb-4 text-center md:text-left">
              Informations personnelles (étape 2/6)
            </h2>

            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4"
            >
              <!-- code -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1"
                  >Code de vérification (Uniquement pour les anciens membres)</label
                >
                <input
                  type="text"
                  bind:value={formData.code}
                  class="w-full form__input"
                  placeholder="Code de vérification"
                  on:input={saveFormState}
                />
                {#if errors.code}<p class="text-red-500 text-sm">
                    {errors.code}
                  </p>{/if}
              </div>
              <!-- pole sanitaire -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1"
                  >Pôle sanitaire,District,Ville,Commune,quartier,lot,ilot *</label
                >
                <input
                  type="text"
                  bind:value={formData.poleSanitaire}
                  class="w-full form__input"
                  placeholder="Pôle sanitaire,District,Ville,Commune,quartier,lot,ilot"
                  on:input={saveFormState}
                />
                {#if errors.poleSanitaire}<p class="text-red-500 text-sm">
                    {errors.poleSanitaire}
                  </p>{/if}
              </div>

              <!-- Nom -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1">Nom *</label>
                <input
                  type="text"
                  bind:value={formData.nom}
                  class="w-full form__input"
                  placeholder="Nom"
                  on:input={saveFormState}
                />
                {#if errors.nom}<p class="text-red-500 text-sm">
                    {errors.nom}
                  </p>{/if}
              </div>
              <!-- Structure -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1"
                  >Structure d'exercice professionnel *</label
                >
                <input
                  type="text"
                  bind:value={formData.professionnel}
                  class="w-full form__input"
                  placeholder="Structure d'exercice professionnel"
                  on:input={saveFormState}
                />
                {#if errors.professionnel}<p class="text-red-500 text-sm">
                    {errors.professionnel}
                  </p>{/if}
              </div>
              <!-- Prenoms -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1">Prenoms *</label>
                <input
                  type="text"
                  bind:value={formData.prenoms}
                  class="w-full form__input"
                  placeholder="Prenoms"
                  on:input={saveFormState}
                />
                {#if errors.prenoms}<p class="text-red-500 text-sm">
                    {errors.prenoms}
                  </p>{/if}
              </div>
              <!-- Lieu d'exercice -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1"
                  >Lieu d'exercice professionnel *</label
                >
                <input
                  type="text"
                  bind:value={formData.lieuExercicePro}
                  class="w-full form__input"
                  placeholder="Lieu d'exercice professionnel"
                  on:input={saveFormState}
                />
                {#if errors.lieuExercicePro}<p class="text-red-500 text-sm">
                    {errors.lieuExercicePro}
                  </p>{/if}
              </div>
              <!-- Prenoms -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1">Email *</label>
                <input
                  type="text"
                  bind:value={formData.emailAutre}
                  class="w-full form__input"
                  placeholder="Email"
                  on:input={saveFormState}
                />
                {#if errors.emailAutre}<p class="text-red-500 text-sm">
                    {errors.emailAutre}
                  </p>{/if}

                {#if emailAutreError && formData.emailAutre}
                  <p class="text-red-500 text-sm">{emailAutreError}</p>
                {/if}
              </div>
            </div>
          {/if}

          <!-- Étape 3 -->
          {#if step === 3}
            <h2
              class="text-3xl md:text-2xl font-bold my-4 text-center md:text-left"
            >
              Informations professionnelles (étape 3/6)
            </h2>

            <div class="bg-white p-6 rounded-lg shadow-md mb-4">
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
                          <label for={profession.id} class="cursor-pointer"
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
                <!-- Civilité -->
                <div class="form__group">
                  <label class="block text-2xl font-medium mb-1"
                    >Civilité *</label
                  >
                  <select
                    on:input={saveFormState}
                    bind:value={formData.civilite}
                    class="w-full form__input"
                  >
                    <option value="">Veuillez sélectionner une option</option>
                    {#each values.civilite as civilite}
                      <option value={civilite.code}>{civilite.libelle}</option>
                    {/each}
                  </select>
                  {#if errors.civilite}<p class="text-red-500 text-sm">
                      {errors.civilite}
                    </p>{/if}
                </div>
                <!-- email -->
                <div class="form__group">
                  <label class="form_label block mb-2">Adresse email *</label>
                  <input
                    on:input={saveFormState}
                    on:input={(e: any) =>
                      updateField("emailPro", e.target.value)}
                    type="email"
                    class="form__input w-full"
                    bind:value={formData.emailPro}
                    placeholder="Email professionnel"
                  />
                  {#if errors.emailPro}
                    <p class="text-red-500 text-sm">{errors.emailPro}</p>
                  {/if}
                  {#if emailProError && formData.emailPro}
                    <p class="text-red-500 text-sm">{emailProError}</p>
                  {/if}
                </div>

                <!-- Autres champs similaires -->
                {#each [{ key: "dateDiplome", label: "Date d'obtention  diplôme", type: "date" }, { key: "dateNaissance", label: "Date de naissance", type: "date" }, { key: "numero", label: "Contact", type: "tel" }, { key: "lieuDiplome", label: "Lieu d'obtention  diplôme" }, { key: "nationalite", label: "Nationalité" }, { key: "situation", label: "Situation matrimoniale" }, { key: "datePremierDiplome", label: "Date du premier diplôme", type: "date" }, { key: "poleSanitairePro", label: "Pole Sanitaire,District,Commune,Quartier,lot,ilot" }, { key: "diplome", label: "Dénomination du diplome" }, { key: "situationPro", label: "Situation professionnel" }] as field}
                  {#if field.key === "nationalite"}
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
                      {#if errors[field.key]}<p class="text-red-500 text-sm">
                          {errors[field.key]}
                        </p>{/if}
                    </div>
                  {/if}
                  {#if field.key === "situation"}
                    <!-- Situation matrimoniale -->
                    <div class="form__group">
                      <label class="block text-2xl font-medium mb-1"
                        >Situation matrimoniale *</label
                      >
                      <select
                        bind:value={formData.situation}
                        on:change={saveFormState}
                        class="w-full form__input"
                      >
                        <option value=""
                          >Veuillez sélectionner une option</option
                        >
                        <option value="Célibataire">Célibataire</option>
                        <option value="Marié(e)">Marié(e)</option>
                        <option value="Divorcé(e)">Divorcé(e)</option>
                        <option value="Veuf (Veuve)">Veuf (Veuve)</option>
                      </select>
                      {#if errors.situation}<p class="text-red-500 text-sm">
                          {errors.situation}
                        </p>{/if}
                    </div>
                  {/if}

                  {#if field.key != "nationalite" && field.key != "situation"}
                    <div class="form__group">
                      <label class="block text-2xl font-medium mb-1"
                        >{field.label} *</label
                      >
                      {#if field.type === "date"}
                        <input
                          type="date"
                          bind:value={formData[field.key]}
                          class="w-full form__input"
                          placeholder={field.label}
                          on:change={saveFormState}
                        />
                      {:else}
                        <input
                          type={field.type || "text"}
                          bind:value={formData[field.key]}
                          class="w-full form__input"
                          placeholder={field.label}
                          on:input={saveFormState}
                          on:input={(e) => {
                            if (field.key === "numero") validatePhone();
                          }}
                        />
                      {/if}
                      {#if errors[field.key]}<p class="text-red-500 text-sm">
                          {errors[field.key]}
                        </p>{/if}

                      {#if !isValid && field.key === "numero"}
                        <p style="color: red;" class="text-red-500 text-sm">
                          Numéro invalide. Il doit commencer par 07, 01 ou 05 et
                          contenir 10 chiffres.
                        </p>
                      {/if}
                    </div>
                  {/if}
                {/each}
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
                      <input
                        type={field.type}
                        class="form__input"
                        on:change={(e) => handleFileChange(e, field.key)}
                      />
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

                    <div
                      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2"
                    >
                      <div class="form__group">
                        <label class="form_label"
                          >Numero de l'organisation *</label
                        >
                        <input
                          on:input={saveFormState}
                          on:input={(e: any) =>
                            updateField("organisationNumero", e.target.value)}
                          type="text"
                          class="form__input"
                          bind:value={formData.organisationNumero}
                          placeholder="Numero de l'organisation"
                          on:input={(e) => {
                            validatePhoneOrganisation();
                          }}
                        />
                        {#if errors.organisationNumero}<p class="error">
                            {errors.organisationNumero}
                          </p>{/if}

                        {#if !isValidPhoneOrganisation && formData.organisationNumero}
                          <p style="color: red;" class="text-red-500 text-sm">
                            Numéro invalide. Il doit commencer par 07, 01 ou 05
                            et contenir 10 chiffres.
                          </p>
                        {/if}
                      </div>

                      <div class="form__group">
                        <label class="form_label">Année *</label>
                        <input
                          on:input={saveFormState}
                          on:input={(e: any) =>
                            updateField("organisationAnnee", e.target.value)}
                          type="text"
                          class="form__input"
                          bind:value={formData.organisationAnnee}
                          placeholder="Année"
                        />
                        {#if errors.organisationAnnee}<p class="error">
                            {errors.organisationAnnee}
                          </p>{/if}
                      </div>
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
                            on:click={() =>
                              openModal(localStorage.getItem("reference"))}
                            >ICI</a
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
              {#if isPaiementDone == false && paiementStatus}
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
              {#if isPaiementDone == true && paiementStatus}
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
<Modal isOpen={isModalOpen} {pdfUrl} onClose={closeModal} />
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
