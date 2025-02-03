<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";


</script>


    <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(232px, 606px);"></div><div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(257px, 631px);"></div><div id="">
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
  input[type="radio"] {
      width: 20px; /* Largeur */
      height: 20px; /* Hauteur */
      cursor: pointer;
  }
  .hidden{
      display:none !important;
  }
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
<section class="hakkimizda-bolumu-anasayfa1" style="padding-top:150px">
  <div class="container">
      <div class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow animated" style="visibility: visible;">
          <form action="end_customer" class="form end_customer" method="post">
              <div class="row" style="margin-bottom: 0px;font-size:15px">
                  <div class="col-md-12">
                      <h1 class="text-center h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">
                          Appartenez vous à une 
                          Organisation 
                          Professionnelle ?
                      </h1>
                  </div><br><br>
                  <div class="row">
                      <div class="col-md-1">
                          <label for="oui" class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"><input required="" name="has_organisation" id="oui" value="oui" type="radio" radio=""> OUI</label>
                      </div>
                      <div class="col-md-1">
                          <label for="non" class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"><input name="has_organisation" id="non" value="non" type="radio"> NON</label>
                      </div>
                  </div><br><br>
                  <div class="row data">
                      <div class="col-md-12">
                          <div class="form__grup">
                              <input type="text" class="form__input" style="width:100%" placeholder="Nom de l'organisation" id="txt_eposta" name="name_organisation" value="">
                              <label for="name" class="form__label">Nom de l'organisation</label>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form__grup">
                              <input type="text" class="form__input" style="width:100%" placeholder="N°" id="txt_eposta" name="numero_organisation" value="">
                              <label for="name" class="form__label">N°</label>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form__grup">
                              <input type="number" class="form__input" style="width:100%" placeholder="Année" id="txt_eposta" name="anne_organisation" value="">
                              <label for="name" class="form__label">Année</label>
                          </div>
                      </div>
                  </div>
              </div>
              <br><br>
              <div class="form__grup">
                  <a href="documents" class="buton buton--kirmizi">← RETOUR</a>
                  <button class="buton buton--kirmizi success" id="three_customer">TERMINER →</button>
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

