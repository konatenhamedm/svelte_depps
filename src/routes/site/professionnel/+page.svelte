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

  export let data; // Récupérer les données du layout
  let user = data?.user;
  let paiementStatus: boolean;

  let step = 1;
  let formData = {
    email: "",
    password: "",
    confirmPassword: "",
    genre: "",
    civilite: "",
    nom: "",
    prenoms: "",
    nationate: "",
    dateNaissance: "",
    numero: "",
    address: "",
    lieuResidence: "",
    diplome: "",
    dateDiplome: "",
    lieuDiplome: "",
    situation: "",
    profession: "",
    situationPro: "",
    specialite: "",
    emailPro: "",
    contactPro: "",
    professionnel: "",
    ville: "",
    dateEmploi: "",
    photo: "",
    cni: "",
    casier: "",
    diplomeFile: "",
    certificat: "",
    cv: "",
    appartenirOrganisation: false,
    organisationNom: "",
    organisationNumero: "",
    organisationAnnee: ""
  };

  let errors = {
    // Login informations
    email: "",
    password: "",
    confirmPassword: "",

    // Personal Informations
    genre: "",
    civilite: "",
    nom: "",
    prenoms: "",
    nationate: "",
    dateNaissance: "",
    numero: "",
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

      valid = !errors.password && !errors.confirmPassword && !errors.email;
    }

    if (step === 2) {
      errors.genre = formData.genre ? "" : "Veuillez choisir un genre";
      errors.civilite = formData.civilite
        ? ""
        : "Veuillez choisir une civilité";
      errors.nom = formData.nom ? "" : "Le nom est requis";
      errors.prenoms = formData.prenoms ? "" : "Le prenoms est requis";
      errors.nationate = formData.nationate
        ? ""
        : "Veuillez choisir une nationalité";
      errors.dateNaissance = formData.dateNaissance
        ? ""
        : "Veuillez choisir une date de naissance";
      errors.numero = formData.numero ? "" : "Le numero est requis";
      errors.address = formData.address ? "" : "Le adresse est requise";
      errors.lieuResidence = formData.lieuResidence
        ? ""
        : "Le lieu de résidence est requis";
      errors.diplome = formData.diplome ? "" : "Le diplôme est requis";
      errors.dateDiplome = formData.dateDiplome
        ? ""
        : "Veuillez choisir une date de diplome";
      errors.lieuDiplome = formData.lieuDiplome
        ? ""
        : "Le lieu du diplôme est requis";
      errors.situation = formData.situation
        ? ""
        : "La situation matrimoniale est requise";

      valid =
        !errors.genre &&
        !errors.civilite &&
        !errors.nom &&
        !errors.prenoms &&
        !errors.nationate &&
        !errors.dateNaissance &&
        !errors.numero &&
        !errors.address &&
        !errors.lieuResidence &&
        !errors.diplome &&
        !errors.dateDiplome &&
        !errors.lieuDiplome &&
        !errors.situation;
    }

    if (step === 3) {
      errors.profession = formData.profession
        ? ""
        : "La profession est requise";
      errors.situationPro = formData.situationPro
        ? ""
        : "La situation professionnelle est requise";
      errors.specialite = formData.specialite
        ? ""
        : "La specialité est requise";
      errors.emailPro = formData.emailPro
        ? ""
        : "L'email professionnelle est requise";
      errors.contactPro = formData.contactPro
        ? ""
        : "Le contact professionnel est requis";
      errors.professionnel = formData.professionnel
        ? ""
        : "La structure est requise";
      errors.ville = formData.ville ? "" : "La ville est requise";
      errors.dateEmploi = formData.dateEmploi
        ? ""
        : "Veuillez choisir une date de premier emploi";

      valid =
        !errors.profession &&
        !errors.situationPro &&
        !errors.specialite &&
        !errors.emailPro &&
        !errors.contactPro &&
        !errors.professionnel &&
        !errors.ville &&
        !errors.dateEmploi;
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

      valid = true;
      /*  !errors.photo &&
        !errors.cni &&
        !errors.casier &&
        !errors.diplomeFile &&
        !errors.certificat &&
        !errors.cv; */
    }

    if (step === 5) {
      if (formData.appartenirOrganisation) {
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
          !errors.organisationAnnee;
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

  function updateFormData(fieldName: any, file: any) {
    if (file) {
      // Lire le fichier en Base64 pour le stocker dans localStorage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Ajouter le fichier à selectedFiles
        selectedFiles = {
          ...selectedFiles,
          [fieldName]: { name: file.name, data: reader.result }
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

  // ✅ Vérifier si on revient après un paiements
  onMount(() => {
    /*  localStorage.clear(); */

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

        if (result) {
          goto("/site/connexion");
          localStorage.clear(); // Nettoyer les données du localStorage
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
    /* localStorage.setItem('reference', ''); */ // Nettoyer les données du localStorage
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
  async function checkPaiementStatus(idSpecialite: any) {
    if (!idSpecialite) return false;

    try {
      const res = await fetch(
        `https://depps.leadagro.net/api/specialite/get/status/paiement/${idSpecialite}`
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

  $: if (formData.specialite) {
    console.log("PALMER", formData.specialite);

    checkPaiementStatus(2).then((resultat) => {
      paiementStatus = resultat;

      console.log("PALMER", resultat);
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
    { name: "genre", url: "/genre" },
    { name: "nationate", url: "/pays" },
    { name: "specialite", url: "/specialite" },
    { name: "ville", url: "/ville" }
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

    const EXPIRATION_TIME = 60 * 60 * 1000; // 1 heure en millisecondes
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
              Informations de connexion (étape 1/6)
            </h2>
            <div class="w-full mb-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex flex-col form__group">
                  <label class="text-3xl font-medium mb-1">E-mail *</label>
                  <input
                    required
                    on:input={saveFormState}
                    on:input={(e) => updateField("email", e.target.value)}
                    type="email"
                    class="form__input w-full"
                    bind:value={formData.email}
                    placeholder="E-mail"
                  />
                  {#if errors.email}
                    <p class="text-red-500 text-sm">{errors.email}</p>
                  {/if}
                </div>

                <div class="flex flex-col form__group">
                  <label class="text-3xl font-medium mb-1">Mot de passe *</label
                  >
                  <input
                    on:input={saveFormState}
                    on:input={(e) => updateField("password", e.target.value)}
                    type="password"
                    class="form__input w-full px-3"
                    bind:value={formData.password}
                    placeholder="Mot de passe"
                  />
                  {#if errors.password}
                    <p class="text-red-500 text-sm">{errors.password}</p>
                  {/if}
                </div>

                <div class="flex flex-col form__group">
                  <label class="text-3xl font-medium mb-1"
                    >Confirmer le mot de passe *</label
                  >
                  <input
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
                  {/if}
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
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4"
            >
              <!-- Genre -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1">Genre *</label>
                <select bind:value={formData.genre} class="w-full form__input">
                  <option value="">Veuillez sélectionner une option</option>
                  {#each values.genre as genre}
                    <option value={genre.id}>{genre.libelle}</option>
                  {/each}
                </select>
                {#if errors.genre}<p class="text-red-500 text-sm">
                    {errors.genre}
                  </p>{/if}
              </div>

              <!-- Civilité -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1">Civilité *</label
                >
                <select
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

              <!-- Nom -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1">Nom *</label>
                <input
                  type="text"
                  bind:value={formData.nom}
                  class="w-full form__input"
                  placeholder="Nom"
                />
                {#if errors.nom}<p class="text-red-500 text-sm">
                    {errors.nom}
                  </p>{/if}
              </div>

              <!-- Autres champs similaires -->
              {#each [{ key: "prenoms", label: "Prénoms" }, { key: "nationate", label: "Nationalité" }, { key: "dateNaissance", label: "Date de naissance", type: "date" }, { key: "numero", label: "Numéro" }, { key: "address", label: "Adresse" }, { key: "lieuResidence", label: "Lieu de résidence" }, { key: "diplome", label: "Diplôme" }, { key: "dateDiplome", label: "Date obtention  diplôme", type: "date" }, { key: "lieuDiplome", label: "Lieu obtention  diplôme" }] as field}
                {#if field.key === "nationate"}
                  <div class="form__group">
                    <label class="block text-3xl font-medium mb-1"
                      >Nationalité *</label
                    >
                    <select
                      on:change={saveFormState}
                      class="w-full form__input"
                      name=""
                      id=""
                      bind:value={formData.nationate}
                    >
                      <option value="" selected={!formData.nationate}
                        >Veuillez sélectionner une option</option
                      >
                      {#each values.nationate as nationate}
                        <option
                          value={nationate.id}
                          selected={formData.nationate === nationate.id}
                          >{nationate.libelle}</option
                        >
                      {/each}
                    </select>
                    {#if errors[field.key]}<p class="text-red-500 text-sm">
                        {errors[field.key]}
                      </p>{/if}
                  </div>
                {:else}
                  <div class="form__group">
                    <label class="block text-3xl font-medium mb-1"
                      >{field.label} *</label
                    >
                    <input
                      type={field.type || "text"}
                      bind:value={formData[field.key]}
                      class="w-full form__input"
                      placeholder={field.label}
                    />
                    {#if errors[field.key]}<p class="text-red-500 text-sm">
                        {errors[field.key]}
                      </p>{/if}
                  </div>
                {/if}
              {/each}

              <!-- Situation matrimoniale -->
              <div class="form__group">
                <label class="block text-3xl font-medium mb-1"
                  >Situation matrimoniale *</label
                >
                <select
                  bind:value={formData.situation}
                  class="w-full form__input"
                >
                  <option value="">Veuillez sélectionner une option</option>
                  <option value="Célibataire">Célibataire</option>
                  <option value="Marié(e)">Marié(e)</option>
                  <option value="Divorcé(e)">Divorcé(e)</option>
                  <option value="Veuf (Veuve)">Veuf (Veuve)</option>
                </select>
                {#if errors.situation}<p class="text-red-500 text-sm">
                    {errors.situation}
                  </p>{/if}
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
                {#if errors.profession}
                  <p class="text-red-500 text-sm">{errors.profession}</p>
                {/if}
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {#each professions as professionGP}
                    <div class="form__group mb-4">
                      <label class="form_label font-bold block mb-2">
                        <big>{professionGP.libelle}</big>
                      </label>

                      {#each professionGP.professions as profession}
                        <div class="flex items-center space-x-2">
                          <input
                            on:input={saveFormState}
                            on:input={(e: any) =>
                              updateField("profession", e.target.value)}
                            type="radio"
                            class="cursor-pointer"
                            id={profession.id}
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
              </div>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"
              >
                <div class="form__group">
                  <label class="form_label block mb-2"
                    >Situation professionnelle *</label
                  >
                  <input
                    on:input={saveFormState}
                    on:input={(e: any) =>
                      updateField("situationPro", e.target.value)}
                    type="text"
                    class="form__input w-full"
                    bind:value={formData.situationPro}
                    placeholder="Situation Professionnelle"
                  />
                  {#if errors.situationPro}
                    <p class="text-red-500 text-sm">{errors.situationPro}</p>
                  {/if}
                </div>

                <div class="form__group">
                  <label class="form_label block mb-2">Spécialité *</label>
                  <select
                    on:change={saveFormState}
                    class="form__input w-full"
                    bind:value={formData.specialite}
                  >
                    <option value="" selected={!formData.specialite}
                      >Veuillez sélectionner une option</option
                    >
                    {#each values.specialite as specialite}
                      <option
                        value={specialite.id}
                        selected={formData.specialite === specialite.id}
                      >
                        {specialite.libelle}
                      </option>
                    {/each}
                  </select>
                  {#if errors.specialite}
                    <p class="text-red-500 text-sm">{errors.specialite}</p>
                  {/if}
                </div>

                <div class="form__group">
                  <label class="form_label block mb-2"
                    >Email professionnel *</label
                  >
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
                </div>

                <div class="form__group">
                  <label class="form_label block mb-2"
                    >Contact professionnel *</label
                  >
                  <input
                    on:input={saveFormState}
                    on:input={(e: any) =>
                      updateField("contactPro", e.target.value)}
                    type="text"
                    class="form__input w-full form__input"
                    bind:value={formData.contactPro}
                    placeholder="Contact professionnel"
                  />
                  {#if errors.contactPro}
                    <p class="text-red-500 text-sm">{errors.contactPro}</p>
                  {/if}
                </div>

                <div class="form__group">
                  <label class="form_label block mb-2"
                    >Structure exercice professionnel *</label
                  >
                  <input
                    on:input={saveFormState}
                    on:input={(e: any) =>
                      updateField("professionnel", e.target.value)}
                    type="text"
                    class="form__input w-full form__input"
                    bind:value={formData.professionnel}
                    placeholder="Structure d'exercice professionnel"
                  />
                  {#if errors.professionnel}
                    <p class="text-red-500 text-sm">{errors.professionnel}</p>
                  {/if}
                </div>

                <div class="form__group">
                  <label class="form_label block mb-2">Ville *</label>
                  <select
                    on:change={saveFormState}
                    class="form__input w-full form__input"
                    bind:value={formData.ville}
                  >
                    <option value="" selected={!formData.ville}
                      >Veuillez sélectionner une option</option
                    >
                    {#each values.ville as ville}
                      <option
                        value={ville.code}
                        selected={formData.ville === ville.code}
                      >
                        {ville.libelle}
                      </option>
                    {/each}
                  </select>
                  {#if errors.ville}
                    <p class="text-red-500 text-sm">{errors.ville}</p>
                  {/if}
                </div>

                <div class="form__group">
                  <label class="form_label block mb-2"
                    >Date de premier emploi *</label
                  >
                  <input
                    on:input={saveFormState}
                    on:input={(e: any) =>
                      updateField("dateEmploi", e.target.value)}
                    type="date"
                    class="form__input w-full form__input"
                    bind:value={formData.dateEmploi}
                    placeholder="Date de premier emploi"
                  />
                  {#if errors.dateEmploi}
                    <p class="text-red-500 text-sm">{errors.dateEmploi}</p>
                  {/if}
                </div>
              </div>
            </div>
          {/if}

          <!-- Étape 4 -->
          {#if step === 4}
            <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
              Informations médiatiques (étape 4/6)
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
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
                >
                  {#each ["photo", "cni", "casier", "diplomeFile", "certificat", "cv"] as fieldName}
                    <div class="form__group">
                      <label class="form_label">{fieldName.toUpperCase()}</label
                      >
                      <input
                        type="file"
                        class="form__input"
                        on:change={(e) => handleFileChange(e, fieldName)}
                      />
                      {#if fileNames[fieldName]}
                        <p>{fileNames[fieldName]}</p>
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

          <!-- Étape 5 -->
          {#if step === 5}
            <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
              Informations organisationnelles (étape 5/6)
            </h2>
            <div class="tablo">
              <div class="tablo--1h-ve-2">
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
                >
                  <div class="form__group">
                    <label class="form_label"
                      >Appartenez vous à une organisation ?</label
                    >
                    <select
                      on:change={saveFormState}
                      class="form__input"
                      name=""
                      id=""
                      bind:value={formData.appartenirOrganisation}
                    >
                      <option
                        value={false}
                        selected={!formData.appartenirOrganisation}>Non</option
                      >
                      <option
                        value={true}
                        selected={formData.appartenirOrganisation}>Oui</option
                      >
                    </select>
                    {#if errors.appartenirOrganisation}<p class="error">
                        {errors.appartenirOrganisation}
                      </p>{/if}
                  </div>

                  {#if formData.appartenirOrganisation}
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
                      />
                      {#if errors.organisationNumero}<p class="error">
                          {errors.organisationNumero}
                        </p>{/if}
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
                  {/if}
                </div>
              </div>
            </div>
          {/if}

          <!-- Étape 6 : Paiement -->
          {#if step === 6}
            <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
              
              {#if !paiementStatus }
              VEUILLEZ VALIDER POUR FINALISER VOTRE INSCRIPTION

              {:else }
              {#if isPaiementDone == false}
              VEUILLEZ PROCéDER AU PAIEMENT
            {/if}
            {#if isPaiementDone == true}
              INFORMATIONS SUR LE PAIEMENT
            {/if}
              {/if }
              
             
            </h2>
            <div class="tablo">
              <div class="tablo--1h-ve-2">
                <!--   on:click={clickPaiement} -->
                <div class="grid grid-cols-1 gap-6 flex justify-center">
                  <div class="">
                    {#if !paiementStatus }
                    <p>
                      Vous pouvez soumettre le formulaire afin de finaliser votre inscription.
                    </p>
                    <br />
                    {:else }
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
                          openModal(localStorage.getItem("reference"))}>ICI</a
                      >
                    </p>
                    <br />
                    <p>
                      Veillez vous connecter avec vos identifiants en cliquant
                      sur le bouton ci-dessous
                    </p>
                    <br />
                  {/if}

                    {/if}
                   
                    <br />
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
              {#if isPaiementDone == false && paiementStatus }
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
</style>
