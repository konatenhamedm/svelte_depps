<script lang="ts">
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  import { onMount } from "svelte";

  import type {Civilite, Genre, Pays } from "../../../types"

  import {getProfessions} from "$lib/constants";
  import { apiFetch } from "$lib/api";
  const professions = getProfessions()

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
      errors.situation = formData.situation ? "" : "Le situation est requis";
      
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

    return valid;
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
      console.log("Données envoyées :", formData);
      alert("Formulaire soumis !");
    }
  }

  /**
   * @type {any[]}
   */
  let objects = [
    { name : "civilite", url : "/civilite",},
    { name : "genre", url : "/genre",},
    { name : "nationate", url : "/pays",},
  ];


  let values : { genre: Genre[], civilite: Civilite[], nationate: Pays[] } = {genre : [], civilite: [], nationate: []};

  // /**
  //  * @type {any[]}
  //  */
  // let civilites = [];
  
  // /**
  //  * @type {any[]}
  //  */
  // let genres = [];
  
  // /**
  //  * @type {any[]}
  //  */
  // let nationates = [];
  
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

        // const resCivilites = await apiFetch(true,"/civilite")
        // if (resCivilites) {
        //     civilites = resCivilites.data;
        // } else {
        //     console.error("Erreur lors de la récupération des données:", resCivilites.statusText);
        // }
        
        // const resGenres = await apiFetch(true,"/genre")
        // if (resGenres) {
        //     genres = resGenres.data;
        // } else {
        //     console.error("Erreur lors de la récupération des données:", resGenres.statusText);
        // }
        
        // const resNationates = await apiFetch(true,"/pays")
        // if (resNationates) {
        //     nationates = resNationates.data;
        // } else {
        //     console.error("Erreur lors de la récupération des données:", resNationates.statusText);
        // }


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
  <Header />
  <Slide />
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
                Informations de connexion (étape 1/4)
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
                Informations personnelles (étape 2/4)
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
                Informations professionnelles (étape 3/4)
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
                      <label class="form_label">Adresse Email</label>
                      <input
                        type="text"
                        class="form__input"
                        value={formData.email}
                        readonly
                      />
                    </div>

                    
                    
                    
                    
                    <div class="form__grup">
                      <label class="form_label">Numero</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.numero}
                        placeholder="Contact"
                      />
                      {#if errors.numero}<p class="error">
                          {errors.numero}
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

                    <!-- <div class="form__grup">
                      <label class="form_label">Nationalité</label>
                      <select class="form__input" name="" id="" bind:value={formData.nationalite}>
                        <option value="Côte d'Ivoire" selected={formData.nationalite === "Côte d'Ivoire"}>Côte d'Ivoire</option>
                      </select>
                    </div>
                    
                    
                    <div class="form__grup">
                      <label class="form_label">Date d'obtention de premier emploi</label>
                      <input
                        type="date"
                        class="form__input"
                        bind:value={formData.datePremierEmploi}
                        placeholder="Date d'obtention de premier emploi"
                      />
                      {#if errors.datePremierEmploi}<p class="error">
                          {errors.datePremierEmploi}
                        </p>{/if}
                    </div>

                    <div class="form__grup">
                      <label class="form_label">Pôle sanitaire, District, Ville, Commune, Quartier, Lot, Ilot</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.poleSanitaire}
                        placeholder="Pôle sanitaire, District, Ville, Commune, Quartier, Lot, Ilot"
                      />
                      {#if errors.poleSanitaire}<p class="error">
                          {errors.poleSanitaire}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Dénomination du diplôme</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.diplome}
                        placeholder="Dénomination du diplôme"
                      />
                      {#if errors.diplome}<p class="error">
                          {errors.diplome}
                        </p>{/if}
                    </div>
                    
                    <div class="form__grup">
                      <label class="form_label">Situation professionnelle</label>
                      <input
                        type="text"
                        class="form__input"
                        bind:value={formData.situationProfessionnelle}
                        placeholder="Situation professionnelle"
                      />
                      {#if errors.situationProfessionnelle}<p class="error">
                          {errors.situationProfessionnelle}
                        </p>{/if}
                    </div> -->

                  </div>

                </div>
              </div>
            {/if}

            <!-- Étape 4 -->
            {#if step === 4}
              <div class="tablo">
                <div class="tablo--1-ve-2">
                  <div class="form__grup">
                    <label class="form_label">Adresse complète *</label>
                    <input
                      type="text"
                      class="form__input"
                      bind:value={formData.address}
                      placeholder="Pôle sanitaire, ville..."
                    />
                    {#if errors.address}<p class="error">
                        {errors.address}
                      </p>{/if}
                  </div>
                  <div class="form__grup">
                    <label class="form_label">Structure d’exercice *</label>
                    <input
                      type="text"
                      class="form__input"
                      bind:value={formData.professionnel}
                      placeholder="Structure"
                    />
                    {#if errors.professionnel}<p class="error">
                        {errors.professionnel}
                      </p>{/if}
                  </div>
                  <div class="form__grup">
                    <label class="form_label">Lieu d’exercice *</label>
                    <input
                      type="text"
                      class="form__input"
                      bind:value={formData.address}
                      placeholder="Lieu"
                    />
                    {#if errors.address}<p class="error">
                        {errors.address}
                      </p>{/if}
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

              {#if step < 3}
                <button
                  type="button"
                  class="buton buton--kirmizi"
                  on:click={nextStep}>SUIVANT →</button
                >
              {:else}
                <button type="submit" class="buton buton--kirmizi"
                  >VALIDER</button
                >
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
  </style>
  <Footer />
</div>

