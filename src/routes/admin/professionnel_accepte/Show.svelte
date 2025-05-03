<script lang="ts">
import InputCheck from "$components/inputs/InputCheck.svelte";
import InputSimple from "$components/inputs/InputSimple.svelte";
import {
    Button,
    Modal
} from "flowbite-svelte";
import {
    TrashBinSolid
} from "flowbite-svelte-icons";

export let open: boolean = false;
export let sizeModal: any = "lg";
export let data: Record < string, string > = {};
 const  url_image = "https://app.mydepps.net/uploads/";
let number = "";
let nom = "";
let prenoms = "";
let emailPro = "";
let address = "";
let addressPro = "";
let professionnel = "";
let profession = "";
let civilite = "";
let dateNaissance = "";
let contactPro = "";
let lieuResidence = "";
let situation = "";
let dateDiplome = "";
let dateEmploi = "";
let diplome = "";
let situationPro = "";
let casier = "";
let userEmail = "";
let userPhone = "";
let typeUser = "";
let appartenirOrganisation = "";
let photo = "";
let cni = "";
let cv = "";
let CVpath = "";
let CValt = "";

let Photopath = "";
let Photoalt = "";
let diplomeFilePath = "";
let diplomeFileAlt = "";
let cniPath = "";
let cniAlt = "";
let casierPath = "";
let casierAlt = "";
let certificatPath = "";
let certificatAlt = "";

function init(form: HTMLFormElement) {
    console.log(`je suis la data `, data);
    number = data.number || "";
    nom = data.nom || "";
    prenoms = data.prenoms || "";
    emailPro = data.emailPro || "";
    address = data.address || "";
    addressPro = data.addressPro || "";
    professionnel = data.professionnel || "";
    profession = data.profession || "";
    civilite = data.civilite.libelle || "";
    dateNaissance = data.dateNaissance || "";
    contactPro = data.contactPro || "";
    dateDiplome = data.dateDiplome || "";
    dateEmploi = data.dateEmploi || "";
    diplome = data.diplome || "";
    situationPro = data.situationPro || "";
    casier = data.casier || "";
    lieuResidence = data.lieuResidence || "";
    situation = data.situation || "";
    userPhone = data.user?.phone || "";
    appartenirOrganisation = data.appartenirOrganisation || "";
    photo = data.photo || "";
    cni = data.cni || "";
	CVpath = data.cv.path || "";
	CValt = data.cv.alt || "";

	Photopath = data.photo.path || "";
	Photoalt = data.photo.alt || "";

	diplomeFilePath = data.diplomeFile.path || "";
	diplomeFileAlt = data.diplomeFile.alt || "";

	cniPath = data.cni.path || "";
	cniAlt = data.cni.alt || "";

	casierPath = data.casier.path || "";
	casierAlt = data.casier.alt || "";

	certificatPath = data.certificat.path || "";
	certificatAlt = data.certificat.alt || "";
	
}
</script>

<Modal bind:open title="Détails " size={sizeModal} class="m-4 modale_general">
    <div class="space-y-6 p-4">
        <form action="#" use:init>
            <!-- Première section : Informations personnelles -->
            <div class="grid grid-cols-2 gap-6">
                <div class="space-y-6">
                    <InputSimple fieldName="nom" label="Nom" field={nom} disabled={true} />
                    <InputSimple fieldName="prenoms" label="Prénom(s)" field={prenoms} disabled={true} />
                    <InputSimple fieldName="dateNaissance" label="Date de naissance" field={dateNaissance} disabled={true} />
                    <InputSimple fieldName="civilite" label="Civilité" field={civilite} disabled={true} />
                    <InputSimple fieldName="lieuResidence" label="Lieu de résidence" field={address} disabled={true} />

                </div>
                <div class="space-y-6">
                    <InputSimple fieldName="userEmail" label="Email utilisateur" field={userEmail} disabled={true} />
                    <InputSimple fieldName="userPhone" label="Téléphone utilisateur" field={userPhone} disabled={true} />
                    <InputSimple fieldName="typeUser" label="Type utilisateur" field={typeUser} disabled={true} />
                    <InputSimple fieldName="casier" label="Casier" field={casier} disabled={true} />
                    <InputSimple fieldName="situation" label="Situation" field={situation} disabled={true} />
                </div>
            </div>

            <!-- Deuxième section : Informations professionnelles -->
            <div class="grid grid-cols-2 gap-6 mt-6">
                <div class="space-y-6">
                    <InputSimple fieldName="profession" label="Profession" field={profession} disabled={true} />
                    <InputSimple fieldName="professionnel" label="Structure d’exercice professionnel" field={professionnel} disabled={true} />
                    <InputSimple fieldName="contactPro" label="Contact professionnel" field={contactPro} disabled={true} />
                    <InputSimple fieldName="addressPro" label="Adresse professionnelle" field={addressPro} disabled={true} />
                </div>
                <div class="space-y-6">
                    <InputSimple fieldName="situationPro" label="Situation professionnelle" field={situationPro} disabled={true} />
                    <InputSimple fieldName="diplome" label="Diplôme" field={diplome} disabled={true} />
                    <InputSimple fieldName="dateDiplome" label="Date du diplôme" field={dateDiplome} disabled={true} />
                    <InputSimple fieldName="dateEmploi" label="Date d'emploi" field={dateEmploi} disabled={true} />
                </div>

            </div>

            <div class="grid grid-cols-2 gap-6 mt-6">
                <div class="space-y-6">

                   <div class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
						
                        <a href={url_image + CVpath + '/' + CValt} target="_blank">
                            Voir le CV
                        </a>
                    </div>
					<div class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
						
                        <a href="{url_image + diplomeFilePath + '/' + diplomeFileAlt}"  target="_blank">
                            Voir le diplome
                        </a>
                    </div>
					
						<div class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
						
                        <a href="{url_image + casierPath + '/' + casierAlt}"  target="_blank">
                            Voir le casier
                        </a>
                    </div>
                </div>
                <div class="space-y-6">
                    
                    <div class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
						
                        <a href={url_image + certificatPath + '/' + certificatAlt} target="_blank">
                            Voir le certificat
                        </a>
                    </div>
					<div class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
						
						<a href={url_image + Photopath + '/' + Photoalt} target="_blank">
							Voir la photo
						</a>
					</div>

					 <div class="w-full h-9 flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
						
                        <a href={url_image + cniPath + '/' + cniAlt} target="_blank">
                            Voir cni
                        </a>
                    </div>
                </div>
             
            </div>

            <div class="grid grid-cols-2 gap-6 mt-6">
                <div class="space-y-6">

                    <div class="flex items-center justify-between space-x-2">
                        <fieldset>
                            <legend>Appartenance à une organisation</legend>
                            <div class="flex items-center">
                                <div class="mr-2">
                                    <InputCheck checked= {appartenirOrganisation === 'non' ? true : false} label="Non" disabled={true}/>
                                </div>
                                <div>
                                    <InputCheck checked={appartenirOrganisation === 'oui' ? true : false} label="Oui" disabled={true} />
                                </div>
                            </div>
                        </fieldset>
                    </div>

                    </form>
                </div>

                <!-- Modal footer -->
                <div slot="footer" class="w-full">
                    <div class="w-full grid grid-cols-3">
                        <div class="col-span-2">
                            <Button
                                color="alternative"
                                style="background-color: green !important; color: white;"
                                on:click={() => (open = false)}
                                type="submit">{"Accepter dossier"}</Button
                                >
                                <Button
                                    color="alternative"
                                    style="background-color: red !important; color: white;"
                                    on:click={() => (open = false)}
                                    type="submit">{"Refuser dossier"}</Button
                                    >
                                    </div>
                                    <div class="flex justify-end">
                                        <Button
                                            color="alternative"
                                            style="background-color: red !important; color: white;"
                                            on:click={() => (open = false)}
                                            type="submit">{"Fermer"}</Button
                                            >
                                            </div>
                                            </div>
                                            </div>
                                            </Modal>
