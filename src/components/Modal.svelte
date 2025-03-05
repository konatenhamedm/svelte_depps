<script>
    export let isOpen = false;
    export let pdfUrl = 'https://depps.leadagro.net/uploads/media_deeps/document-01cv_professionnel_gris_simple_20241007_221431_00001.pdf';  // URL du PDF
    export let onClose = () => {};
  </script>
  
  {#if isOpen}
    <div class="modal">
      <div class="modal-content">
        <button class="close-btn" on:click={onClose}>Fermer</button>
        <div class="pdf-viewer">
          <!-- Afficher le PDF avec un iframe -->
          <iframe src={pdfUrl} width="100%" height="700px" type="application/pdf">
            Ce navigateur ne prend pas en charge l'affichage de PDF.
          </iframe>
        </div>
       <!--  <button class="download-btn" on:click={() => window.location.href = pdfUrl}>Télécharger</button> -->
      </div>
    </div>
  {/if}
  <style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 900px;
      position: relative;
    }
    .close-btn {
      position: absolute;
      top: -13px;
      color: black !important;
      right: 10px;
      background-color: transparent;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }
    .download-btn {
      margin-top: 10px;
    }
    .pdf-viewer {
      margin-top: 20px;
    }
  </style>