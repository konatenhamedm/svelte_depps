<script>
  import Footer from "$components/Footer.svelte";
import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";


</script>


    <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(93px, 611px);"></div><div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(118px, 636px);"></div><div id="">
      <Header />
      <Slide />
      <style>
  .tablo:not(:last-child) {
      margin-bottom: 35px;
  }
  .dropify-wrapper .dropify-message p {
      text-align: center;
  }
  .dropify-wrapper .dropify-message span.file-icon {
      font-size: 50px;
      color: #CCC;
      display: none;
  }
  .dropify-wrapper {
      height: 100px !important;
  }
  .col-md-3{
      margin-top:15px !important;
  }
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Dropify/0.2.2/css/dropify.css" integrity="sha512-In/+MILhf6UMDJU4ZhDL0R0fEpsp4D3Le23m6+ujDWXwl3whwpucJG1PEmI3B07nyJx+875ccs+yX2CqQJUxUw==" crossorigin="anonymous" referrerpolicy="no-referrer">

<section class="hakkimizda-bolumu-anasayfa1" style="padding-top:150px">
  <div class="container">
      <div class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow animated" style="visibility: visible;">
          <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"> Inscription</h2>
          <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"> Documents à fournir</h2>
          <form action="three_customer" class="form three_customer" method="post">
              <div class="row" style="margin-bottom: 0px;font-size:15px">
                  <div class="col-md-3">
                      ▸ 02 photos d’identité de même tirage
                  </div>
                  <div class="col-md-3">
                      <div class="dropify-wrapper"><div class="dropify-message"><span class="file-icon"></span> <p>Importer un fichier(Jpg/PDF)</p><p class="dropify-error">Désolé, le fichier trop volumineux</p></div><div class="dropify-loader"></div><div class="dropify-errors-container"><ul></ul></div><input type="file" class="dropify" name="photo" data-default-file=""><button type="button" class="dropify-clear">Supprimer</button><div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p><p class="dropify-infos-message">Importer un fichier(Jpg/PDF)</p></div></div></div></div>
                  </div>
                  <div class="col-md-3">
                      ▸ Diplôme légalisé
                  </div>
                  <div class="col-md-3">
                      <div class="dropify-wrapper"><div class="dropify-message"><span class="file-icon"></span> <p>Importer un fichier(Jpg/PDF)</p><p class="dropify-error">Désolé, le fichier trop volumineux</p></div><div class="dropify-loader"></div><div class="dropify-errors-container"><ul></ul></div><input type="file" class="dropify" name="diplome_file" data-default-file=""><button type="button" class="dropify-clear">Supprimer</button><div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p><p class="dropify-infos-message">Importer un fichier(Jpg/PDF)</p></div></div></div></div>
                  </div>
                  <div class="col-md-3">
                      ▸ Copie de CNI(Carte nationale d’identité)
                  </div>
                  <div class="col-md-3">
                      <div class="dropify-wrapper"><div class="dropify-message"><span class="file-icon"></span> <p>Importer un fichier(Jpg/PDF)</p><p class="dropify-error">Désolé, le fichier trop volumineux</p></div><div class="dropify-loader"></div><div class="dropify-errors-container"><ul></ul></div><input type="file" class="dropify" name="cni" data-default-file=""><button type="button" class="dropify-clear">Supprimer</button><div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p><p class="dropify-infos-message">Importer un fichier(Jpg/PDF)</p></div></div></div></div>
                  </div>
                  <div class="col-md-3">
                      ▸ CV
                  </div>
                  <div class="col-md-3">
                      <div class="dropify-wrapper"><div class="dropify-message"><span class="file-icon"></span> <p>Importer un fichier(Jpg/PDF)</p><p class="dropify-error">Désolé, le fichier trop volumineux</p></div><div class="dropify-loader"></div><div class="dropify-errors-container"><ul></ul></div><input type="file" class="dropify" name="cv" data-default-file=""><button type="button" class="dropify-clear">Supprimer</button><div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p><p class="dropify-infos-message">Importer un fichier(Jpg/PDF)</p></div></div></div></div>
                  </div>
                  <div class="col-md-3">
                      ▸ Extrait de casier judiciaire (Datant de moins de 3 mois)
                  </div>
                  <div class="col-md-3">
                      <div class="dropify-wrapper"><div class="dropify-message"><span class="file-icon"></span> <p>Importer un fichier(Jpg/PDF)</p><p class="dropify-error">Désolé, le fichier trop volumineux</p></div><div class="dropify-loader"></div><div class="dropify-errors-container"><ul></ul></div><input type="file" class="dropify" name="casier" data-default-file=""><button type="button" class="dropify-clear">Supprimer</button><div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p><p class="dropify-infos-message">Importer un fichier(Jpg/PDF)</p></div></div></div></div>
                  </div>
                  <div class="col-md-3">
                      ▸ Certificat de résidence (Datant de moins de 3 mois)
                  </div>
                  <div class="col-md-3">
                      <div class="dropify-wrapper"><div class="dropify-message"><span class="file-icon"></span> <p>Importer un fichier(Jpg/PDF)</p><p class="dropify-error">Désolé, le fichier trop volumineux</p></div><div class="dropify-loader"></div><div class="dropify-errors-container"><ul></ul></div><input type="file" class="dropify" name="certificat" data-default-file=""><button type="button" class="dropify-clear">Supprimer</button><div class="dropify-preview"><span class="dropify-render"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner"></span></p><p class="dropify-infos-message">Importer un fichier(Jpg/PDF)</p></div></div></div></div>
                  </div>
              </div>
              <br>
              <div class="form__grup">
                  <a href="informations" class="buton buton--kirmizi">← RETOUR</a>
                  <button class="buton buton--kirmizi" id="three_customer">SUIVANT →</button>
              </div><br>
          </form>
      </div>
  </div>
</section>



          <style>
              .footerss p {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }
              h2.h2-baslik-footer.h-yazi-margin-kucuk,.footer__list,.footer__sosyal {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }
          </style>  
          <Footer/>
  

</div>