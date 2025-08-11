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

  const professions = getProfessions();

  export let data; // Récupérer les données du layout
  let user = data?.user;
  let isPaiementProcessing = false;
  $: isPaiementDone = false;
  $: message = "";
  let step = 1;
  $: hideForPhysic = false;
  $: hideForOther = true;

  let formData = {
    // Login informations
    password: "",
    confirmPassword: "",
    email: "",
    // Informations generales ( à update en fonction du type)
    typePersonne: "A",
    nom: "",
    prenoms: "",
    telephone: "",
    bp: "",
    emailAutre: "",
    adresse: "",
    nomRepresentant: "",
    denomination: "",
    // Pour la derniere step
    documents: [],
  };

  // Définition des erreurs
  let errors = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Informations générales
    // Informations generales ( à update en fonction du type)
    typePersonne: "",
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
    

    // Champ obligatoire pour tous
    errors.typePersonne = formData.typePersonne
        ? ""
        : "Le type est requis";

    // Champs pour Personne Physique
    if (!hideForOther) {
        errors.nom = formData.nom ? "" : "Le nom est requis";
        errors.prenoms = formData.prenoms ? "" : "Les prénoms sont requis";
        errors.telephone = formData.telephone ? "" : "Le téléphone est requis";
        errors.bp = formData.bp ? "" : "La boîte postale est requise";
        errors.emailAutre = formData.emailAutre ? "" : "L'email est requis";
        errors.adresse =  "" ;
        errors.nomRepresentant = "" ;
        errors.denomination = "" ;
    }

    // Champs pour Personne Morale
    if (!hideForPhysic) {
        errors.adresse = formData.adresse ? "" : "L'adresse est requise";
        errors.nomRepresentant = formData.nomRepresentant ? "" : "Le nom du représentant est requis";
        errors.denomination = formData.denomination ? "" : "La dénomination est requise";
        errors.nom =  "" ;
        errors.prenoms =  "";
        errors.telephone =  "" ;
        errors.bp =  "" ;
        errors.emailAutre = "" ;
    }



    // Déterminer si tout est valide
    valid = Object.values(errors).every(errorMsg => errorMsg === "");
}

    if (step === 3) {
      // errors.genre = formData.genre ? "" : "Le genre est requis";
      // errors.nomCompletPromoteur = formData.nomCompletPromoteur
      //   ? ""
      //   : "Le nom complet est requis";
      // errors.emailPro = formData.emailPro
      //   ? ""
      //   : "L'email professionnel est requis";
      // errors.profession = formData.profession
      //   ? ""
      //   : "La profession est requise";
      // errors.contactsPromoteur = formData.contactsPromoteur
      //   ? ""
      //   : "Les contacts sont requis";
      // errors.lieuResidence = formData.lieuResidence
      //   ? ""
      //   : "Le lieu de résidence est requis";
      // errors.numeroCni = formData.numeroCni
      //   ? ""
      //   : "Le numéro de CNI est requis";

      valid = true;
      // Object.values(errors).every((e) => e === "");
    }

    if (step === 4) {
      valid = isPaiementDone;
    }

    return valid;
  }



  ////Fonction asynchrone pour recuperer le groupe de documents pour le type de personne
  async function getTypeDoc(typePersonneId: any) {
    let res = null;
    console.log("Type personne ID transmis", typePersonneId);
    res = await apiFetch(true, `${objects[1].url}/${formData.typePersonne}`);
    if (res) {
      console.log("Resultat de ma requete", res);
      if (Object.keys(values).includes(objects[1].name)) {
        values[objects[1].name as keyof typeof values] = res.data;
      } else {
        console.error(`Invalid key: ${objects[1].name}`);
      }
    } else {
      console.error(
        "Erreur lors de la récupération des données:",
        res.statusText
      );
    }
  }

  // 🔹 Fonction pour sauvegarder l'état actuel du formulaire
  function saveFormState() {
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.setItem("formData", JSON.stringify(formData));
      localStorage.setItem("step", step.toString());
      ///recuperer les informations du type de document lorsque le type de personne est selectionné
      if (formData.typePersonne > 0) {
        getTypeDoc(formData.typePersonne);
      }
      if (values.typePersonne[formData.typePersonne - 1].libelle == "MORALE") {
        console.log("ici");
        hideForOther = false;
        hideForPhysic = true;
        formData.nom = "";
        formData.prenoms = "";
        formData.telephone = "";
        formData.bp = "";
        formData.emailAutre = "";
      } else if (
        values.typePersonne[formData.typePersonne - 1].libelle == "PHYSIQUE"
      ) {
        console.log("la");
        formData.adresse = "";
        formData.nomRepresentant = "";
        formData.denomination = "";
        hideForPhysic = false;
        hideForOther = true;
      }
      console.log("affichage physique",hideForOther);
      console.log("affichage morale",hideForPhysic);
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

  let authenticating_submit = false;
  // 🔹 Soumission du formulaire
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
      formDatas.append("type", "etablissement");

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
              type: "application/octet-stream",
            });
            formDatas.append(fieldName, blob, fileData.name);
          }
        });
      }

      authenticating = true;

      fetch(`${BASE_URL_API}/paiement/paiement`, {
        method: "POST",
        body: formDatas,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("erreur", result);
          if (result.errors && Object.keys(result.errors).length > 0) {
            authenticating = false;
            messagefile = result.errors;
            console.log(result.errors);
          } else {
            if (result.url) {
              localStorage.setItem("reference", result.reference);

              // window.location.href = result.url + "?return=1"; // 🔥 Ajout du paramètre `return`
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

  let authenticating = false;
  async function initPaiement() {
    authenticating = true;
    console.log("Init payment");
    // Créer un FormData pour les données du formulaire
    let formDatas = new FormData();

    Object.keys(formData).forEach((key) => {
      formDatas.append(key, formData[key]);
    });

    const reference = localStorage.getItem("reference");
    if (reference) {
      formDatas.append("reference", reference);
    }
    formDatas.append("type", "etablissement");

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
            type: "application/octet-stream",
          });
          formDatas.append(fieldName, blob, fileData.name);
        }
      });
    }

   await fetch(`${BASE_URL_API}/paiement/paiement/`, {
      method: "POST",
      body: formDatas,
    })
      .then((response) => response.json())
      .then((result) => {
        authenticating = false;
        console.log(result)
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
    { name: "typeDocument", url: "/libelleGroupe/all" },
  ];

  let values: {
    genre: Genre[];
    civilite: Civilite[];
    nationate: Pays[];
    specialite: Specialite[];
    typePersonne: Pays[];
    ville: Ville[];
    typeDocument: any[];
  } = {
    genre: [],
    civilite: [],
    nationate: [],
    specialite: [],
    ville: [],
    typePersonne: [],
    typeDocument: [],
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

<!-- <div
  id="pointer-ring"
  style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(308px, 648px);"
></div>
<div
  id="pointer-dot"
  style="border-color: rgb(113, 88, 190); transform: translate(333px, 673px);"
></div> -->
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
                Informations de connexion (étape 1/3)
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
                Etablissement de Sante (étape 2/3)
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
                          >Veuillez sélectionner une option</option
                        >
                        {#each values.typePersonne as typePersonne}
                          <option
                            value={typePersonne.id}
                            selected={formData.typePersonne === typePersonne.id}
                            >{typePersonne.libelle}</option
                          >
                        {/each}
                      </select>
                      {#if errors.typePersonne}<p class="error">
                          {errors.typePersonne}
                        </p>{/if}
                    </div>

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
                  <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">{document.libelle}</h2>
                  <div class="grid grid-cols-2">
                      {#each document.typeDocuments as requiredFile, index}
                        
                        <div class="form__grup">
                          <label class="form_label"
                            >{requiredFile.libelle} *</label
                          >

                          <input
                            accept="image/*, .pdf"
                            type="file"
                            class="form__input"
                            on:change={(e) =>
                              updateField("documents", e.target.files[0])}
                            placeholder="contacts Promoteur"
                          />

                          {#if errors.documents}
                            <p class="error">{errors.documents}</p>
                          {/if}
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
