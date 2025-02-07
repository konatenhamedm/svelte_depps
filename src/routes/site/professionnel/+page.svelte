<script lang="ts">
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { onMount } from "svelte";

  import type {Civilite, Genre, Pays, Specialite, Ville } from "../../../types"

  import {getProfessions} from "$lib/constants";
  import { apiFetch } from "$lib/api";
  const professions = getProfessions();

  export let data; // Récupérer les données du layout
  let user = data?.user;
  const montant = 15000;

  let step = 1;
  let formData = {
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
    organisationAnnee: "",

    // Paiement informations
    transactionID: "",
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
    organisationAnnee: "",

    // Paiement informations
    transactionID: "",
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
      errors.civilite = formData.civilite ? "" : "Veuillez choisir une civilité";
      errors.nom = formData.nom ? "" : "Le nom est requis";
      errors.prenoms = formData.prenoms ? "" : "Le prenoms est requis";
      errors.nationate = formData.nationate ? "" : "Veuillez choisir une nationalité";
      errors.dateNaissance = formData.dateNaissance ? "" : "Veuillez choisir une date de naissance";
      errors.numero = formData.numero ? "" : "Le numero est requis";
      errors.address = formData.address ? "" : "Le adresse est requise";
      errors.lieuResidence = formData.lieuResidence ? "" : "Le lieu de résidence est requis";
      errors.diplome = formData.diplome ? "" : "Le diplôme est requis";
      errors.dateDiplome = formData.dateDiplome ? "" : "Veuillez choisir une date de diplome";
      errors.lieuDiplome = formData.lieuDiplome ? "" : "Le lieu du diplôme est requis";
      errors.situation = formData.situation ? "" : "La situation matrimoniale est requise";
      
      valid = !errors.genre && !errors.civilite && !errors.nom && !errors.prenoms && !errors.nationate && !errors.dateNaissance && !errors.numero && !errors.address && !errors.lieuResidence && !errors.diplome && !errors.dateDiplome && !errors.lieuDiplome && !errors.situation
    }

    if (step === 3) {
      errors.profession = formData.profession ? "" : "La profession est requise";
      errors.situationPro = formData.situationPro ? "" : "La situation professionnelle est requise";
      errors.specialite = formData.specialite ? "" : "La specialité est requise";
      errors.emailPro = formData.emailPro ? "" : "L'email professionnelle est requise";
      errors.contactPro = formData.contactPro ? "" : "Le contact professionnel est requis";
      errors.professionnel = formData.professionnel ? "" : "La structure est requise";
      errors.ville = formData.ville ? "" : "La ville est requise";
      errors.dateEmploi = formData.dateEmploi ? "" : "Veuillez choisir une date de premier emploi";

      valid = !errors.profession && !errors.situationPro && !errors.specialite && !errors.emailPro && !errors.contactPro && !errors.professionnel && !errors.ville && !errors.dateEmploi;
    }

    if (step === 4) {
      errors.photo = formData.photo ? "" : "La photo est requise";
      errors.cni = formData.cni ? "" : "La carte nationale d'identité est requise";
      errors.casier = formData.casier ? "" : "Le casier judiciaire est requis";
      errors.diplomeFile = formData.diplomeFile ? "" : "Le diplôme est requis";
      errors.certificat = formData.certificat ? "" : "Le certificat est requis";
      errors.cv = formData.cv ? "" : "Le CV est requis";

      valid = !errors.photo && !errors.cni && !errors.casier && !errors.diplomeFile && !errors.certificat && !errors.cv;
    }
    
    if (step === 5) {
      if(formData.appartenirOrganisation) {
        errors.organisationNom = formData.organisationNom ? "" : "Le nom de l'organisation est requis";
        errors.organisationNumero = formData.organisationNumero ? "" : "Le numero de l'organisation est requis";
        errors.organisationAnnee = formData.organisationAnnee ? "" : "L'année est requise";
        
        valid = !errors.organisationNom && !errors.organisationNumero && !errors.organisationAnnee;
      }
    }

    if (step === 6) {
      checkTransactionID(formData.transactionID).then(resultat => {
        if (resultat === false) {
          errors.transactionID = formData.transactionID ? "Cet identifiant de transaction n'est pas valide" : "L'identifiant de la transaction est requis";
        } else {
          isPaiementDone = true;
        }
        valid = isPaiementDone
      })
    }

    return valid
  }

  function nextStep() {
    if (validateStep()) {
      step++;
    }
  }

  function prevStep() {
    step--;
  }

  function submitForm() {
        if (validateStep()) {
            let data = new FormData();

            // Ajouter chaque champ au FormData
            Object.keys(formData).forEach(key => {
                if (formData[key] instanceof File) {
                    data.append(key, formData[key]); // Ajouter fichier
                } else {
                    data.append(key, formData[key]); // Ajouter texte
                }
            });

            console.log(data);

            // Envoyer les données via fetch
            fetch("http://depps.leadagro.net/api/professionnel/create", {
                method: "POST",
                body: data
            })
            .then(response => response.json())
            .then(result => {
                console.log("Réponse du serveur :", result);
                alert("Formulaire soumis avec succès !");
            })
            .catch(error => {
                console.error("Erreur lors de la soumission :", error);
                alert("Une erreur s'est produite !");
            });
        }
    }

    let isPaiementProcessing = false;
    let isPaiementDone = false;

    function clickPaiement() {
      isPaiementProcessing = true;

      initPaiement();
    }

    function initPaiement() {
      let data = new FormData();

      data.append("nom", formData.nom);
      data.append("prenoms", formData.prenoms);
      data.append("email", formData.email);
      data.append("numero", formData.numero);

      fetch("https://depps.leadagro.net/api/paiement/paiement", {
          method: "POST",
          body: data
      })
      .then(response => response.json())
      .then(result => {
          console.log("Réponse du serveur :", result);
          if(result.url) {
            const link = document.querySelector('#reloadPaiementLink');
            if (link) {
              link.setAttribute('href', result.url);
            }

            setTimeout(function() {
              const pLink = document.querySelector('#p-reloadPaiementLink');
              pLink?.classList.remove('d-none');
                window.open(result.url, '_blank');
            }, 3000);
          }
      })
      .catch(error => {
          console.error("Erreur lors de la soumission :", error);
          alert("Une erreur s'est produite !");
      });
    }

    async function checkTransactionID(idtransaction: string | undefined) {
      if(!idtransaction) return false;

      const res = await apiFetch(true, "/paiement/get/transaction/" + idtransaction)
      return res.data as boolean;
    }

  /**
   * @type {any[]}
   */
  let objects = [
    { name : "civilite", url : "/civilite",},
    { name : "genre", url : "/genre",},
    { name : "nationate", url : "/pays",},
    { name : "specialite", url : "/specialite",},
    { name : "ville", url : "/ville",},
  ];


  let values : { genre: Genre[], civilite: Civilite[], nationate: Pays[], specialite: Specialite[], ville: Ville[] } = 
    {genre : [], civilite: [], nationate: [], specialite: [], ville: []};
  
  async function fetchData() {
    try {
      let res = null;
      objects.forEach(async element => {
        res = await apiFetch(true,element.url)
        if (res) {
          if (Object.keys(values).includes(element.name)) {
            values[element.name as keyof typeof values] = res.data;
          } else {
            console.error(`Invalid key: ${element.name}`);
          }
        } else {
            console.error("Erreur lors de la récupération des données:", res.statusText);
        }
      });
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }
    }

    onMount(async () => {
        fetchData();
    });
    
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
    <h2 class="h2-baslik-anasayfa-ozel pb-10 text-uppercase">Inscription en tant que professionnel de santé</h2>
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
                Informations de connexion (étape 1/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-3">
                    
                    <div class="form__grup">
                      <label class="form_label">E-mail *</label>
                      <input
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
                      <label class="form_label">Confirmer le mot de passe *</label>
                      <input
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

            <!-- Étape 2 -->
            {#if step === 2}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations personnelles (étape 2/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-3">

                    <div class="form__grup">
                      <label class="form_label">Genre</label>
                      <select class="form__input" name="" id="" bind:value={formData.genre}>
                        <option value="" selected={!formData.genre}>Veuillez sélectionner une option</option>
                       {#each values.genre as genre}
                          <option value={genre.id} selected={formData.genre === genre.id}>{genre.libelle}</option>
                        {/each}
                      </select>
                      {#if errors.genre}<p class="error">
                        {errors.genre}
                      </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Civilité</label>
                      <select class="form__input" name="" id="" bind:value={formData.civilite}>
                        <option value="" selected={!formData.civilite}>Veuillez sélectionner une option</option>
                        {#each values.civilite as civilite}
                          <option value={civilite.code} selected={formData.civilite === civilite.code}>{civilite.libelle}</option>
                        {/each}
                      </select>
                      {#if errors.civilite}<p class="error">
                        {errors.civilite}
                      </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Nom</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.nom}
                        placeholder="Nom"
                      />
                      {#if errors.nom}<p class="error">
                          {errors.nom}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Prénoms</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.prenoms}
                        placeholder="Prénoms"
                      />
                      {#if errors.prenoms}<p class="error">
                          {errors.prenoms}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Nationalité</label>
                      <select class="form__input" name="" id="" bind:value={formData.nationate}>
                        <option value="" selected={!formData.nationate}>Veuillez sélectionner une option</option>
                        {#each values.nationate as nationate}
                          <option value={nationate.id} selected={formData.nationate === nationate.id}>{nationate.libelle}</option>
                        {/each}
                      </select>
                      {#if errors.nationate}<p class="error">
                        {errors.nationate}
                      </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Date de naissance</label>
                      <input
                        type="date"
                        class="form__input"
                        bind:value={formData.dateNaissance}
                        placeholder="Date de naissance"
                      />
                      {#if errors.dateNaissance}<p class="error">
                          {errors.dateNaissance}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Numero</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.numero}
                        placeholder="Numero"
                      />
                      {#if errors.numero}<p class="error">
                          {errors.numero}
                        </p>{/if}
                    </div>
                   
                    <div class="form__grup">
                      <label class="form_label">Adresse</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.address}
                        placeholder="Adresse"
                      />
                      {#if errors.address}<p class="error">
                          {errors.address}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Lieu de résidence</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.lieuResidence}
                        placeholder="Lieu de résidence"
                      />
                      {#if errors.lieuResidence}<p class="error">
                          {errors.lieuResidence}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Diplôme</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.diplome}
                        placeholder="Diplôme"
                      />
                      {#if errors.diplome}<p class="error">
                          {errors.diplome}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Date d'obtention du diplôme</label>
                      <input
                        type="date"
                        class="form__input"
                        bind:value={formData.dateDiplome}
                        placeholder="Date d'obtention du diplôme"
                      />
                      {#if errors.dateDiplome}<p class="error">
                          {errors.dateDiplome}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Lieu d'obtention du diplôme</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.lieuDiplome}
                        placeholder="Lieu d'obtention du diplôme"
                      />
                      {#if errors.lieuDiplome}<p class="error">
                          {errors.lieuDiplome}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Situation matrimoniale</label>
                      <select class="form__input" name="" id="" bind:value={formData.situation}>
                        <option value="" selected={!formData.situation}>Veuillez sélectionner une option</option>

                        <option value="Célibataire" selected={formData.situation === "Célibataire"}>Célibataire</option>
                        <option value="Marié(e)" selected={formData.situation === "Marié(e)"}>Marié(e)</option>
                        <option value="Divorcé(e)" selected={formData.situation === "Divorcé(e)"}>Divorcé(e)</option>
                        <option value="Veuf (Veuve)" selected={formData.situation === "Veuf (Veuve)"}>Veuf (Veuve)</option>
                      </select>
                      {#if errors.situation}<p class="error">
                          {errors.situation}
                        </p>{/if}
                    </div>

                  </div>
                </div>
              </div>
            {/if}

            <!-- Étape 3 -->
            {#if step === 3}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations professionnelles (étape 3/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  {#if errors.profession}<p class="error">
                    {errors.profession}
                  </p>{/if}
                  <div class="grid grid-cols-3">
                    {#each professions as professionGP}
                      <div class="form__grup mb-10">
                        <label class="form_label font-bold"><big>{professionGP.title}</big></label>

                        {#each professionGP.professions as profession}
                          <div class="">
                            <input
                              type="radio"
                              class="me-2"
                              id={profession.id}
                              name="rd_profession"
                              style="cursor: pointer;"
                              checked={profession.title == formData.profession}
                              on:change={() => formData.profession = profession.title}
                            />
                            <label for={profession.id} style="cursor: pointer;">{profession.title}</label>
                          </div>

                        {/each}
                      </div>
                    {/each}
                  </div>
  
                  <div class="grid grid-cols-3">
                    <div class="form__grup">
                      <label class="form_label">Situation professionnelle</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.situationPro}
                        placeholder="Situation Professionnelle"
                      />
                      {#if errors.situationPro}<p class="error">
                          {errors.situationPro}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Spécialité</label>
                      <select class="form__input" name="" id="" bind:value={formData.specialite}>
                        <option value="" selected={!formData.specialite}>Veuillez sélectionner une option</option>
                        {#each values.specialite as specialite}
                          <option value={specialite.id} selected={formData.specialite === specialite.id}>{specialite.libelle}</option>
                        {/each}
                      </select>
                      {#if errors.specialite}<p class="error">
                        {errors.specialite}
                      </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Email professionnel</label>
                      <input
                        type="email"
                        class="form__input"
                        bind:value={formData.emailPro}
                        placeholder="Email professionnel"
                      />
                      {#if errors.emailPro}<p class="error">
                          {errors.emailPro}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Contact professionnel</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.contactPro}
                        placeholder="Contact professionnel"
                      />
                      {#if errors.contactPro}<p class="error">
                          {errors.contactPro}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Structure d'exercice professionnel</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.professionnel}
                        placeholder="Structure d'exercice professionnel"
                      />
                      {#if errors.professionnel}<p class="error">
                          {errors.professionnel}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Ville</label>
                      <select class="form__input" name="" id="" bind:value={formData.ville}>
                        <option value="" selected={!formData.ville}>Veuillez sélectionner une option</option>
                        {#each values.ville as ville}
                          <option value={ville.code} selected={formData.ville === ville.code}>{ville.libelle}</option>
                        {/each}
                      </select>
                      {#if errors.ville}<p class="error">
                        {errors.ville}
                      </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Date de premier emploi</label>
                      <input
                        type="date"
                        class="form__input"
                        bind:value={formData.dateEmploi}
                        placeholder="Date de premier emploi"
                      />
                      {#if errors.dateEmploi}<p class="error">
                          {errors.dateEmploi}
                        </p>{/if}
                    </div>
                  </div>

                </div>
              </div>
            {/if}

            <!-- Étape 4 -->
            {#if step === 4}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations médiatiques (étape 4/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  <div class="grid grid-cols-3">

                    <div class="form__grup">
                      <label class="form_label">Photo</label>
                      <input
                        type="file"
                        class="form__input"
                        bind:value={formData.photo} on:change={(e) => formData.photo = e.target.files[0]}
                        placeholder="Veuillez charger votre Photo"
                      />
                      {#if errors.photo}<p class="error">
                          {errors.photo}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">CNI</label>
                      <input
                        type="file"
                        class="form__input"
                        bind:value={formData.cni} on:change={(e) => formData.cni = e.target.files[0]}
                        placeholder="Veuillez charger votre CNI"
                      />
                      {#if errors.cni}<p class="error">
                          {errors.cni}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Casier judiciaire</label>
                      <input
                        type="file"
                        class="form__input"
                        bind:value={formData.casier}
                        placeholder="Veuillez charger votre Casier judiciaire"
                      />
                      {#if errors.casier}<p class="error">
                          {errors.casier}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Diplôme</label>
                      <input
                        type="file"
                        class="form__input"
                        bind:value={formData.diplomeFile}
                        placeholder="Veuillez charger votre Diplôme"
                      />
                      {#if errors.diplomeFile}<p class="error">
                          {errors.diplomeFile}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Certificat</label>
                      <input
                        type="file"
                        class="form__input"
                        bind:value={formData.certificat}
                        placeholder="Veuillez charger votre Certificat"
                      />
                      {#if errors.certificat}<p class="error">
                          {errors.certificat}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">CV</label>
                      <input
                        type="file"
                        class="form__input"
                        bind:value={formData.cv}
                        placeholder="Veuillez charger votre CV"
                      />
                      {#if errors.cv}<p class="error">
                          {errors.cv}
                        </p>{/if}
                    </div>


                  </div>

                </div>
              </div>
            {/if}

            <!-- Étape 5 -->
            {#if step === 5}
              <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                Informations organisationnelles (étape 5/5)
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">
                  
                  <div class="grid grid-cols-3">

                    <div class="form__grup">
                      <label class="form_label">Appartenez vous à une organisation ?</label>
                      <select class="form__input" name="" id="" bind:value={formData.appartenirOrganisation}>
                        <option value={false} selected={!formData.appartenirOrganisation}>Non</option>
                        <option value={true} selected={formData.appartenirOrganisation}>Oui</option>
                        
                      </select>
                      {#if errors.appartenirOrganisation}<p class="error">
                        {errors.appartenirOrganisation}
                      </p>{/if}
                    </div>

                    {#if formData.appartenirOrganisation}
                    <div class="form__grup">
                      <label class="form_label">Nom de l'organisation</label>
                      <input
                        type="email"
                        class="form__input"
                        bind:value={formData.organisationNom}
                        placeholder="Nom de l'organisation"
                      />
                      {#if errors.organisationNom}<p class="error">
                          {errors.organisationNom}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Numero de l'organisation</label>
                      <input
                        type="email"
                        class="form__input"
                        bind:value={formData.organisationNumero}
                        placeholder="Numero de l'organisation"
                      />
                      {#if errors.organisationNumero}<p class="error">
                          {errors.organisationNumero}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Année</label>
                      <input
                        type="email"
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
                VEUILLEZ PROCéDER AU PAIEMENT
              </h2>
              <div class="tablo">
                <div class="tablo--1h-ve-2">

                  {#if isPaiementProcessing}
                  
                  <div class="grid grid-cols-2 gap-20">
                      <div class="">
                        <p>Vous serez redirigés vers le lien de paiement. Merci de patienter quelques instants</p>
                        <p id="p-reloadPaiementLink" class="d-none">Si ce n'est pas le cas : <a target="_blank" href="javascript:void(0);" id="reloadPaiementLink" class="text-blue-500">Veuillez cliquer ici pour procéder au paiement</a></p>
                        
                        <br><p>Une fois le paiement effectué, veuillez renseigner l'identifiant de la transaction pour valider votre inscription.</p>
                      </div>
                      <div class="form__grup">
                        <label class="form_label">Transaction ID</label>
                        <input
                          type="text"
                          class="form__input"
                          bind:value={formData.transactionID}
                          placeholder="Transaction ID"
                        />
                        {#if errors.transactionID}<p class="error">
                            {errors.transactionID}
                          </p>{/if}
                      </div>
                    </div>

                  {:else}

                  <h1>MONTANT : {montant} XOF</h1><br>
                  <div class="grid grid-cols-6 gap-20">
                      <div class="border rounded-xl p-0">
                        <img class="rounded-xl bouncingImage" on:click={clickPaiement} src="https://dashboard.paiementpro.net/_files/om.png" style="width:100%" alt="">
                      </div>
                      <div class="border rounded-xl p-0">
                        <img class="rounded-xl bouncingImage" on:click={clickPaiement} src="https://dashboard.paiementpro.net/_files/momo.png" style="width:100%" alt="">
                      </div>
                      <div class="border rounded-xl p-0">
                        <img class="rounded-xl bouncingImage" on:click={clickPaiement} src="https://dashboard.paiementpro.net/_files/flooz.png" style="width:100%" alt="">
                      </div>
                      <div class="border rounded-xl p-0">
                        <img class="rounded-xl bouncingImage" on:click={clickPaiement} src="https://dashboard.paiementpro.net/_files/waveci-1.png" style="width:100%" alt="">
                      </div>
                      <div class="border rounded-xl p-0">
                        <img class="rounded-xl bouncingImage" on:click={clickPaiement} src="https://dashboard.paiementpro.net/_files/visa.png" style="width:100%" alt="">
                      </div>
                      <div class="border rounded-xl p-0">
                        <img class="rounded-xl bouncingImage" on:click={clickPaiement} src="https://myonmci.ci/assets/images/tresor.png" style="width:100%" alt="">
                      </div>
                  </div>
                  {/if}
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
                  on:click={nextStep}>PASSER AU PAIEMENT →</button
                >
              {:else}
                {#if isPaiementProcessing}
                  <button type="submit" on:click={submitForm} class="buton buton--kirmizi"
                    >VALIDER</button
                  >
                {/if}                
              {/if}
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>

  <style>
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

