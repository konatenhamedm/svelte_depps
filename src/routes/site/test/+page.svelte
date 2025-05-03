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
    Ville
  } from "../../../types.js";
  import { getProfessions } from "$lib/constants";

  const professions = getProfessions();

  export let data; // Récupérer les données du layout
let user = data?.user;

let step = 1;

let formData = {
  // Informations générales
  id: null,
  typePersonneId: null,
  nature: "",
  type: "",
  gps: "",
  niveau: "",
  contact: "",
  entrepriseName: "",
  emailEntreprise: "",
  space: "",

  // Promoteur
  genreId: null,
  nomComplet: "",
  emailPro: "",
  profession: "",
  contacts: "",
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
  photoRespo: "",
  photoPhysiqueId: null,
  cniPhysiqueId: null,
  diplomeFilePhysiqueId: null,
  cvPhysiqueId: null,
  dfePhysiqueId: null,

  // Autres informations
  inscriptionProfessionId: null,
};

// Définition des erreurs
let errors = {
  // Informations générales
  nature: "",
  type: "",
  gps: "",
  niveau: "",
  contact: "",
  entrepriseName: "",
  emailEntreprise: "",
  space: "",

  // Promoteur
  genreId: "",
  nomComplet: "",
  emailPro: "",
  profession: "",
  contacts: "",
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
  photoRespo: "",
  photoPhysiqueId: "",
  cniPhysiqueId: "",
  diplomeFilePhysiqueId: "",
  cvPhysiqueId: "",
  dfePhysiqueId: "",

  // Autres informations
  inscriptionProfessionId: "",
};

// Fonction de validation des étapes
function validateStep() {
  let valid = true;

  if (step === 1) {
    errors.nature = formData.nature ? "" : "La nature est requise";
    errors.type = formData.type ? "" : "Le type est requis";
    errors.gps = formData.gps ? "" : "Les coordonnées GPS sont requises";
    errors.niveau = formData.niveau ? "" : "Le niveau est requis";
    errors.contact = formData.contact ? "" : "Le contact est requis";
    errors.entrepriseName = formData.entrepriseName ? "" : "Le nom de l'entreprise est requis";
    errors.emailEntreprise = formData.emailEntreprise ? "" : "L'email de l'entreprise est requis";
    
    valid = Object.values(errors).every((e) => e === "");
  }

  if (step === 2) {
    errors.genreId = formData.genreId ? "" : "Le genre est requis";
    errors.nomComplet = formData.nomComplet ? "" : "Le nom complet est requis";
    errors.emailPro = formData.emailPro ? "" : "L'email professionnel est requis";
    errors.profession = formData.profession ? "" : "La profession est requise";
    errors.contacts = formData.contacts ? "" : "Les contacts sont requis";
    errors.lieuResidence = formData.lieuResidence ? "" : "Le lieu de résidence est requis";
    errors.numeroCni = formData.numeroCni ? "" : "Le numéro de CNI est requis";

    valid = Object.values(errors).every((e) => e === "");
  }

  if (step === 3) {
    errors.nomCompletTechnique = formData.nomCompletTechnique ? "" : "Le nom du technicien est requis";
    errors.emailProTechnique = formData.emailProTechnique ? "" : "L'email professionnel du technicien est requis";
    errors.professionTechnique = formData.professionTechnique ? "" : "La profession du technicien est requise";
    errors.contactProTechnique = formData.contactProTechnique ? "" : "Le contact professionnel du technicien est requis";
    errors.lieuResidenceTechnique = formData.lieuResidenceTechnique ? "" : "Le lieu de résidence du technicien est requis";
    errors.numeroOrdreTechnique = formData.numeroOrdreTechnique ? "" : "Le numéro d'ordre du technicien est requis";

    valid = Object.values(errors).every((e) => e === "");
  }

  if (step === 4) {
    errors.photoRespo = formData.photoRespo ? "" : "La photo du responsable est requise";
    errors.photoPhysiqueId = formData.photoPhysiqueId ? "" : "La photo physique est requise";
    errors.cniPhysiqueId = formData.cniPhysiqueId ? "" : "La CNI physique est requise";
    errors.diplomeFilePhysiqueId = formData.diplomeFilePhysiqueId ? "" : "Le fichier du diplôme est requis";
    errors.cvPhysiqueId = formData.cvPhysiqueId ? "" : "Le CV est requis";
    errors.dfePhysiqueId = formData.dfePhysiqueId ? "" : "Le DFE est requis";

    valid = Object.values(errors).every((e) => e === "");
  }

  if (step === 5) {
    errors.inscriptionProfessionId = formData.inscriptionProfessionId ? "" : "L'inscription à la profession est requise";

    valid = Object.values(errors).every((e) => e === "");
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
    let data = new FormData();
    

    
    // Ajout de la référence stockée en local
    const reference = localStorage.getItem("reference");
    if (reference) {
      data.append("reference", reference);
    }

    // Ajouter les fichiers au FormData

    Object.keys(formData).forEach((key) => {
    
       
        data.append(key, formData[key]);
    
      });

 /*      Object.keys(selectedFiles).forEach((key) => {
      const fileData = selectedFiles[key];
      if (fileData.data) {
        // Convertir le Base64 en Blob pour l'envoi
        const byteCharacters = atob(fileData.data.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/octet-stream" });

        data.append(key, blob, fileData.name);
      }
    }); */

      console.log(data);


    

    fetch("http://depps.leadagro.net/api/professionnel/create", {
      method: "POST",
      body: data
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.errors && Object.keys(result.errors).length > 0) {
          console.log(result.errors);
        } else {
          window.location.href = "/site/connexion";
          localStorage.clear();
        }
      })
      .catch((error) => {
        console.log("Erreur lors de la soumission du formulaire:", error);
      });
  }
}


  // 🔹 Gestion du paiements
  function clickPaiement() {
    isPaiementProcessing = true;
    saveFormState(); // 🔥 Sauvegarder avant de partir

    initPaiement();
  }

  function initPaiement() {
    let data = new FormData();
    data.append("nom", formData.nom);
    data.append("prenoms", formData.prenoms);
    data.append("email", formData.email);
    data.append("numero", formData.numero);

    fetch("https://app.mydepps.net/api/paiement/paiement", {
      method: "POST",
      body: data
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.url) {
          localStorage.setItem("reference", result.reference);
         
            window.location.href = result.url + "?return=1"; // 🔥 Ajout du paramètre `return`
        
        }
      })
      .catch((error) => {
        console.error("Erreur paiements :", error);
        isPaiementProcessing = false;
      });
  }

  async function checkTransactionID(idtransaction: any) {
    if (!idtransaction) return false;

    try {
      const res = await fetch(
        `https://app.mydepps.net/api/paiement/get/transaction/${idtransaction}`
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

  onMount(async () => {
    fetchData();
  });
  onMount(() => {
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
  <Header data={user} />
  <Slide data={user} />
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
            <!-- Étape 1 -->
          {#if step === 1}
  <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
    Etablissement de Sante (étape 1/4)
  </h2>
  <div class="tablo">
    <div class="tablo--1h-ve-2">
      <div class="grid grid-cols-3">
        
        <!-- Champ Nature -->
        <div class="form__grup">
          <label class="form_label">Nature</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("nature", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.nature}
            placeholder="Nature"
          />
          {#if errors.nature}<p class="error">{errors.nature}</p>{/if}
        </div>

        <!-- Champ Type -->
        <div class="form__grup">
          <label class="form_label">Type</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("type", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.type}
            placeholder="Type"
          />
          {#if errors.type}<p class="error">{errors.type}</p>{/if}
        </div>

        <!-- Champ GPS -->
        <div class="form__grup">
          <label class="form_label">GPS</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("gps", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.gps}
            placeholder="GPS"
          />
          {#if errors.gps}<p class="error">{errors.gps}</p>{/if}
        </div>

        <!-- Champ Niveau -->
        <div class="form__grup">
          <label class="form_label">Niveau</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("niveau", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.niveau}
            placeholder="Niveau"
          />
          {#if errors.niveau}<p class="error">{errors.niveau}</p>{/if}
        </div>

        <!-- Champ Contact -->
        <div class="form__grup">
          <label class="form_label">Contact</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("contact", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.contact}
            placeholder="Contact"
          />
          {#if errors.contact}<p class="error">{errors.contact}</p>{/if}
        </div>

        <!-- Champ Nom de l'entreprise -->
        <div class="form__grup">
          <label class="form_label">Nom de l'entreprise</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("entrepriseName", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.entrepriseName}
            placeholder="Nom de l'entreprise"
          />
          {#if errors.entrepriseName}<p class="error">{errors.entrepriseName}</p>{/if}
        </div>

        <!-- Champ Email de l'entreprise -->
        <div class="form__grup">
          <label class="form_label">E-mail de l'entreprise</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("emailEntreprise", e.target.value)}
            type="email"
            class="form__input"
            bind:value={formData.emailEntreprise}
            placeholder="E-mail de l'entreprise"
          />
          {#if errors.emailEntreprise}<p class="error">{errors.emailEntreprise}</p>{/if}
        </div>

        <!-- Champ Espace -->
        <div class="form__grup">
          <label class="form_label">Espace</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("space", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.space}
            placeholder="Espace"
          />
          {#if errors.space}<p class="error">{errors.space}</p>{/if}
        </div>

      </div>
    </div>
  </div>
{/if}

            <!-- Étape 2 -->
           {#if step === 2}
  <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
    Informations du promoteur (étape 1/4)
  </h2>
  <div class="tablo">
    <div class="tablo--1h-ve-2">
      <div class="grid grid-cols-3">
        
        <!-- Champ Genre ID -->
        <div class="form__grup">
          <label class="form_label">Genre ID</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("genreId", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.genreId}
            placeholder="Genre ID"
          />
          {#if errors.genreId}<p class="error">{errors.genreId}</p>{/if}
        </div>

        <!-- Champ Nom Complet -->
        <div class="form__grup">
          <label class="form_label">Nom complet</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("nomComplet", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.nomComplet}
            placeholder="Nom complet"
          />
          {#if errors.nomComplet}<p class="error">{errors.nomComplet}</p>{/if}
        </div>

        <!-- Champ Email Pro -->
        <div class="form__grup">
          <label class="form_label">E-mail professionnel</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("emailPro", e.target.value)}
            type="email"
            class="form__input"
            bind:value={formData.emailPro}
            placeholder="E-mail professionnel"
          />
          {#if errors.emailPro}<p class="error">{errors.emailPro}</p>{/if}
        </div>

        <!-- Champ Profession -->
        <div class="form__grup">
          <label class="form_label">Profession</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("profession", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.profession}
            placeholder="Profession"
          />
          {#if errors.profession}<p class="error">{errors.profession}</p>{/if}
        </div>

        <!-- Champ Contacts -->
        <div class="form__grup">
          <label class="form_label">Contacts</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("contacts", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.contacts}
            placeholder="Contacts"
          />
          {#if errors.contacts}<p class="error">{errors.contacts}</p>{/if}
        </div>

        <!-- Champ Lieu de Résidence -->
        <div class="form__grup">
          <label class="form_label">Lieu de résidence</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("lieuResidence", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.lieuResidence}
            placeholder="Lieu de résidence"
          />
          {#if errors.lieuResidence}<p class="error">{errors.lieuResidence}</p>{/if}
        </div>

        <!-- Champ Numéro de CNI -->
        <div class="form__grup">
          <label class="form_label">Numéro de CNI</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("numeroCni", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.numeroCni}
            placeholder="Numéro de CNI"
          />
          {#if errors.numeroCni}<p class="error">{errors.numeroCni}</p>{/if}
        </div>

      </div>
    </div>
  </div>
{/if}


            <!-- Étape 3 -->
           {#if step === 3}
  <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
    Informations du technicien (étape 3/4)
  </h2>
  <div class="tablo">
    <div class="tablo--1h-ve-2">
      <div class="grid grid-cols-3">
        
        <!-- Champ Nom Complet Technique -->
        <div class="form__grup">
          <label class="form_label">Nom complet</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("nomCompletTechnique", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.nomCompletTechnique}
            placeholder="Nom complet"
          />
          {#if errors.nomCompletTechnique}<p class="error">{errors.nomCompletTechnique}</p>{/if}
        </div>

        <!-- Champ Email Pro Technique -->
        <div class="form__grup">
          <label class="form_label">E-mail professionnel</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("emailProTechnique", e.target.value)}
            type="email"
            class="form__input"
            bind:value={formData.emailProTechnique}
            placeholder="E-mail professionnel"
          />
          {#if errors.emailProTechnique}<p class="error">{errors.emailProTechnique}</p>{/if}
        </div>

        <!-- Champ Profession Technique -->
        <div class="form__grup">
          <label class="form_label">Profession</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("professionTechnique", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.professionTechnique}
            placeholder="Profession"
          />
          {#if errors.professionTechnique}<p class="error">{errors.professionTechnique}</p>{/if}
        </div>

        <!-- Champ Contact Pro Technique -->
        <div class="form__grup">
          <label class="form_label">Contact professionnel</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("contactProTechnique", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.contactProTechnique}
            placeholder="Contact professionnel"
          />
          {#if errors.contactProTechnique}<p class="error">{errors.contactProTechnique}</p>{/if}
        </div>

        <!-- Champ Lieu de Résidence Technique -->
        <div class="form__grup">
          <label class="form_label">Lieu de résidence</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("lieuResidenceTechnique", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.lieuResidenceTechnique}
            placeholder="Lieu de résidence"
          />
          {#if errors.lieuResidenceTechnique}<p class="error">{errors.lieuResidenceTechnique}</p>{/if}
        </div>

        <!-- Champ Numéro d'Ordre Technique -->
        <div class="form__grup">
          <label class="form_label">Numéro d'ordre</label>
          <input
            on:input={saveFormState}
            on:input={(e: any) => updateField("numeroOrdreTechnique", e.target.value)}
            type="text"
            class="form__input"
            bind:value={formData.numeroOrdreTechnique}
            placeholder="Numéro d'ordre"
          />
          {#if errors.numeroOrdreTechnique}<p class="error">{errors.numeroOrdreTechnique}</p>{/if}
        </div>

      </div>
    </div>
  </div>
{/if}


            <!-- Étape 4 -->
            {#if step === 4}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations médiatiques (étape 4/4)
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
                  <div class="grid grid-cols-3">
                    {#each ["photo", "cni", "attestationInscription", "diplomeFile", "dfe", "cv"] as fieldName}
                      <div class="form__grup">
                        <label class="form_label">{fieldName.toUpperCase()}</label>
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

          

            <!-- Boutons de navigation -->
            <div class="form__grup">
              {#if step > 1}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={prevStep}>← RETOUR</button
                >
              {/if}

              {#if step < 4}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={nextStep}>SUIVANT →</button
                >
              {:else if step === 3}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={nextStep}>SUIVANT →</button
                >
              {:else}
                <!-- disabled={!isPaiementDone} -->
                 <button
                    type="submit"
                    on:click={submitForm}
                    class="buton buton--kirmizi"
                    disabled={!isPaiementDone}
                  >
                    VALIDER
                  </button> 
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
