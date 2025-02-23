<script lang="ts">
  import { onMount } from "svelte";
  import type { Stats, StatsDashboard, User } from "../../types";
  import { getAuthCookie } from "$lib/auth";
  import Check from "$components/inputs/Check.svelte";
  import InputImage from "$components/inputs/InputImage.svelte";
  import Donut from "$components/statistiques/Donut.svelte";
  import CardInfo from "$components/CardInfo.svelte";
  import { apiFetch } from "$lib/api";

  let isChecked = true;
  export let data; // Les données retournées par `load()`

let user = data.user;

 
  let infoImg = {
    signedUrl: "",
    key: ""
  };
let dataEtablissement:any;
let dataProfessionnel:any;
let dataProfessionnelAjour:any;

 
  
/* 
  async function onFileSelected(file: any) {
    if (file) {
      const uploadResult = await handleImageUpload(file);

      if (uploadResult) {
        infoImg.signedUrl = uploadResult.signedUrl;
        infoImg.key = uploadResult.key;
      } else {
        console.error("Image upload failed.");
      }
    }
  }
 */
  let choix : any = "";
  let currentDate = new Date();
let formattedDate = currentDate.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

let main_data: StatsDashboard;
  let stats: any = [];

  let loading = false;


  async function fetchData() {
    loading = true; // Active le spinner de chargement
    try {
      const res = await apiFetch(true, "/statistique/info-dashboard");
      console.log(res['data'])

      if (res) {
       
        main_data = res['data'] as StatsDashboard;
        dataEtablissement = main_data.countEtablissement;
        dataProfessionnelAjour = main_data.professionnelAjour;
        dataProfessionnel = main_data.countProfessionnel;
       
      
      } else {
        console.error(
          "Erreur lors de la récupération des données:",
          res.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      loading = false; // Désactive le spinner de chargement
    }
  }

  onMount(async () => {
    await fetchData();
  });
</script>

<div class="">
  <section class="content">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4">
      <CardInfo title={'Visite total'} descr={formattedDate} valeur={'5'}/>
     <CardInfo title={'Professionnel(s) de santé'} descr={"à jour"} valeur={dataProfessionnelAjour}/>
    <CardInfo title={'Professionnel(s) de santé'} descr={"sur la plateforme"} valeur={dataProfessionnel}/>
      <CardInfo title={'Etablissement(s) de santé'} descr={'sur la plateforme'} valeur={dataEtablissement}/>
       
    </div>

<!--  
{JSON.stringify(user)} -->
   <!--  <Check label="Accepter les conditions" bind:checked={isChecked} />

    <select
    id="role"
    bind:value={choix}
    class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
>
    <option value="" disabled selected>Choisir un rôle</option>
    <option value="admin">Administrateur</option>
    <option value="user">Utilisateur</option>
    <option value="moderateur">Modérateur</option>
    <option value="invite">Invité</option>
</select>

 

    <Donut /> -->
  </section>
</div>
