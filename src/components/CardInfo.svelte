<script lang="ts">
  import { A } from "flowbite-svelte";
  import { stringify } from "postcss";


export let title :any = "";
export let valeur :any = "";
export let descr :any = "";
</script>

<div>
    <div class="box pull-up">
      <div class="box-body">
        <div class="flex justify-between items-center">
          <div class="bs-5 ps-10 border-primary">
            <p class="text-fade mb-10">{title}</p>
            <h2 class="my-0 fw-700 text-3xl">{valeur}</h2>
          </div>
          <div class="icon">
            <i
              class="fa-solid fa-users bg-primary-light me-0 fs-24 rounded-3"
            ></i>
          </div>
        </div>
        <p class="text-success mb-0 mt-10">
          <i class="fa-solid fa-arrow-up"></i> {descr}
        </p>
      </div>
    </div>
  </div>
  


  // step 1 : Informations de connexion
  new OA\Property(property: "password", type: "string"), 
  new OA\Property(property: "confirmPassword", type: "string"), 
  new OA\Property(property: "email", type: "string"),

  // step 2 : Informations personnelles
  new OA\Property(property: "genre", type: "string"), //champs select
  new OA\Property(property: "civilite", type: "string"), //champs select
  new OA\Property(property: "nom", type: "string"), 
  new OA\Property(property: "prenoms", type: "string"),
  new OA\Property(property: "nationate", type: "string"), //champs  select
  new OA\Property(property: "dateNaissance", type: "string"), //champs date
  new OA\Property(property: "numero", type: "string"), 
  new OA\Property(property: "address", type: "string"), 
  new OA\Property(property: "lieuResidence", type: "string"),
  new OA\Property(property: "diplome", type: "string"), 
  new OA\Property(property: "dateDiplome", type: "string"), //champs date
  new OA\Property(property: "lieuDiplome", type: "string"), 
  new OA\Property(property: "situation", type: "string"), // Situation matrimoniale
  
  // step 3 : Informations professionnelles
  new OA\Property(property: "profession", type: "string"), // bouton radio
  new OA\Property(property: "situationPro", type: "string"), 
  new OA\Property(property: "specialite", type: "string"), //champs select
  new OA\Property(property: "emailPro", type: "string"), 
  new OA\Property(property: "contactPro", type: "string"), 
  new OA\Property(property: "professionnel", type: "string"), // Structure d’exercice professionnel
  new OA\Property(property: "ville", type: "string"), //champs  select
  new OA\Property(property: "dateEmploi", type: "string"), //champs date

  // step 4 : Informations médiatiques 
  new OA\Property(property: "photo", type: "string", format: "binary"), //champs image
  new OA\Property(property: "cni", type: "string", format: "binary"), //champs image
  new OA\Property(property: "casier", type: "string", format: "binary"), //champs image
  new OA\Property(property: "diplomeFile", type: "string", format: "binary"), //champs image
  new OA\Property(property: "certificat", type: "string", format: "binary"), //champs image
  new OA\Property(property: "cv", type: "string", format: "binary"), //champs image

  // step 5 : Informations organisationnelles
  new OA\Property(property: "appartenirOrganisation", type: "string"), // oui ou non
  new OA\Property(property: "organisationNom", type: "string"),
  new OA\Property(property: "organisationNumero", type: "string"),
  new OA\Property(property: "organisationAnnee", type: "string"),