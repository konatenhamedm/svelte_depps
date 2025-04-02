<script lang="ts">
    import { BASE_URL_API } from "$lib/api";
    import { Button, Modal } from "flowbite-svelte";
    import { format } from "date-fns";
    import jsPDF from 'jspdf';
    import { onMount } from "svelte";

    export let open: boolean = false;
    export let sizeModal: any = "xl";
    export let userUpdateId: any;
    export let data: any;

    let isLoading = false;
    let pdfUrl = "";
    const url_image = "https://depps.leadagro.net/uploads/";

    // Formatage des données
    let formattedData = {
        numero: data?.personne?.number || "N/A",
        nom: data?.personne?.nom || "N/A",
        prenoms: data?.personne?.prenoms || "N/A",
        civilite: data?.personne?.civilite || "N/A",
        dateNaissance: data?.personne?.dateNaissance ? format(new Date(data.personne.dateNaissance), "dd/MM/yyyy") : "N/A",
        nationalite: data?.personne?.nationate || "N/A",
        email: data?.email || "N/A",
        profession: data?.personne?.profession?.libelle || "N/A",
        dateDiplome: data?.personne?.dateDiplome ? format(new Date(data.personne.dateDiplome), "dd/MM/yyyy") : "N/A",
        diplome: data?.personne?.diplome || "N/A",
        lieuDiplome: data?.personne?.lieuDiplome || "N/A",
        poleSanitaire: data?.personne?.poleSanitaire || "N/A",
        lieuExercicePro: data?.personne?.lieuExercicePro || "N/A",
        organisationNom: data?.personne?.organisationNom || "N/A",
        appartenirOrganisation: data?.personne?.appartenirOrganisation === "oui" ? "Oui" : "Non",
        photo: data?.personne?.photo?.path ? `${url_image}${data.personne.photo.path}/${data.personne.photo.alt}` : null
    };

    function generatePDF() {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 15;
        const lineHeight = 7;
        let yPos = margin;

        // Logo centré en haut
        const logoWidth = 30;
        const logoHeight = 30;
        const logoX = (pageWidth - logoWidth) / 2;
        doc.addImage('https://mydepps.pages.dev/_files/logo-depps.png', 'PNG', logoX, yPos, logoWidth, logoHeight);
        yPos += logoHeight + 10;

        // Titre principal sous le logo
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('FICHE D\'INSCRIPTION', pageWidth / 2, yPos, { align: 'center' });
        yPos += 10;

        // Sous-titre
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Ministère de la Santé et de l\'Hygiène Publique', pageWidth / 2, yPos, { align: 'center' });
        doc.text('Direction des Etudes, des Effectifs et de la Planification des Professionnels de Santé', pageWidth / 2, yPos + 5, { align: 'center' });

        // Ligne de séparation
        yPos += 15;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;

        // Section Informations Personnelles
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(59, 130, 246);
        doc.text('INFORMATIONS PERSONNELLES', margin, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);

        // Colonnes pour les informations
        const col1 = margin;
        const col2 = pageWidth / 2;

        // Première colonne
        doc.text(`Contact: ${formattedData.numero}`, col1, yPos);
        doc.text(`Nom: ${formattedData.nom}`, col1, yPos + lineHeight);
        doc.text(`Prénoms: ${formattedData.prenoms}`, col1, yPos + (lineHeight * 2));
        doc.text(`Civilité: ${formattedData.civilite}`, col1, yPos + (lineHeight * 3));

        // Deuxième colonne
        doc.text(`Date de naissance: ${formattedData.dateNaissance}`, col2, yPos);
        doc.text(`Nationalité: ${formattedData.nationalite}`, col2, yPos + lineHeight);
        doc.text(`Email: ${formattedData.email}`, col2, yPos + (lineHeight * 2));

        yPos += (lineHeight * 4) + 10;

        // Section Informations Professionnelles
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(59, 130, 246);
        doc.text('INFORMATIONS PROFESSIONNELLES', margin, yPos);
        yPos += 10;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);

        // Première colonne
        doc.text(`Profession: ${formattedData.profession}`, col1, yPos);
        doc.text(`Date du diplôme: ${formattedData.dateDiplome}`, col1, yPos + lineHeight);
        doc.text(`Diplôme: ${formattedData.diplome}`, col1, yPos + (lineHeight * 2));

        // Deuxième colonne
        doc.text(`Lieu d'obtention: ${formattedData.lieuDiplome}`, col2, yPos);
        doc.text(`Ilot,lot: ${formattedData.poleSanitaire}`, col2, yPos + lineHeight);
        doc.text(`Lieu d'exercice: ${formattedData.lieuExercicePro}`, col2, yPos + (lineHeight * 2));

        yPos += (lineHeight * 3) + 5;
        doc.text(`Appartient à une organisation: ${formattedData.appartenirOrganisation}`, col1, yPos);

        if (formattedData.appartenirOrganisation === "Oui") {
            doc.text(`Nom de l'organisation: ${formattedData.organisationNom}`, col1, yPos + lineHeight);
            yPos += lineHeight;
        }

        yPos += 15;

        // Pied de page
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Fiche générée le ${format(new Date(), "dd/MM/yyyy à HH:mm:ss")}`, pageWidth / 2, 280, { align: 'center' });
        doc.text('DEPS - Ministère de la Santé et de l\'Hygiène Publique', pageWidth / 2, 285, { align: 'center' });

        // Convertir en URL pour affichage
        const pdfBlob = doc.output('blob');
        pdfUrl = URL.createObjectURL(pdfBlob);
    }

    onMount(() => {
        if (open) {
            generatePDF();
        }
    });

    // Fermer la modal parente quand celle-ci s'ouvre
    $: if (open) {
        const parentModal = document.querySelector('.modale_general');
        if (parentModal) {
            parentModal.style.display = 'none';
        }
    }

    function handleClose() {
        const parentModal = document.querySelector('.modale_general');
        if (parentModal) {
            parentModal.style.display = 'block';
        }
        open = false;
    }
</script>

<Modal
        bind:open
        title=""
        size={sizeModal}
        class="m-4"
        on:close={handleClose}
>
    <div class="space-y-6 p-4">
        {#if isLoading}
            <div class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        {:else if pdfUrl}
            <iframe
                    src={pdfUrl}
                    title="Fiche d'inscription"
                    width="100%"
                    height="600px"
                    class="border rounded-lg shadow-sm"
            ></iframe>
        {/if}
    </div>

    <div slot="footer" class="w-full flex justify-end">
        <Button
                color="alternative"
                style="background-color: gray !important; color: white;"
                on:click={handleClose}
        >
            Fermer
        </Button>
    </div>
</Modal>

<style>
    /* Masquer la modal parente quand celle-ci est ouverte */
    .modal-backdrop {
        z-index: 9999 !important;
    }
    .modal-container {
        z-index: 10000 !important;
    }
</style>