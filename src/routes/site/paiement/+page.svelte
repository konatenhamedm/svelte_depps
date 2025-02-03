<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";


</script>

<body class="color-undefined page-loaded">
    <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(426px, 612px);"></div><div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(451px, 637px);"></div><div id="">
        <Header />
        <Slide />
     <style>
          button{
              border:2px solid #eee;
          }
      </style>
              <main>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"> 
          <!--İletişim Form Alanı-->
          <section class="iletisim-form-alani">
              <div class="container"><br>	
                  <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"> Inscription</h2>
                   <div class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow text-center animated" style="visibility: visible;"><br><br>
                      <h1 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucu">Effectué votre paiement</h1><br>
                      <h1>MONTANT : 15000 XOF</h1><br>
                      <div class="row">
                          <div class="col-md-2">
                              <form action="pay_customer" class="pay_customer">
                                  <button><img src="https://dashboard.paiementpro.net/_files/om.png" style="width:100%" alt=""></button>
                                  <input type="hidden" name="mode" value="OMCIV2">
                              </form>
                          </div>
                          <div class="col-md-2">
                              <form action="pay_customer" class="pay_customer">
                                  <button><img src="https://dashboard.paiementpro.net/_files/momo.png" style="width:100%" alt=""></button>
                                  <input type="hidden" name="mode" value="MOMOCI">
                              </form>
                          </div>
                          <div class="col-md-2">
                              <form action="pay_customer" class="pay_customer">
                                  <button><img src="https://dashboard.paiementpro.net/_files/flooz.png" style="width:100%" alt=""></button>
                                  <input type="hidden" name="mode" value="FLOOZ">
                              </form>
                          </div>
                          <div class="col-md-2">
                              <form action="pay_customer" class="pay_customer">
                                  <button><img src="https://dashboard.paiementpro.net/_files/waveci-1.png" style="width:100%" alt=""></button>
                                  <input type="hidden" name="mode" value="WAVECI">
                              </form>
                          </div>
                          <div class="col-md-2">
                              <form action="pay_customer" class="pay_customer">
                                  <button><img src="https://dashboard.paiementpro.net/_files/visa.png" style="width:100%" alt=""></button>
                                  <input type="hidden" name="mode" value="CARD">
                              </form>
                          </div>
                          <div class="col-md-2">
                              <form action="pay_customer" class="pay_customer">
                                  <button><img src="https://myonmci.ci/assets/images/tresor.png" style="width:100%" alt=""></button>
                                  <input type="hidden" name="mode" value="CARD">
                              </form>
                          </div>
                      </div>
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
              h2.h2-baslik-footer.h-yazi-margin-kucuk,.footer__list,.footer__sosyal {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }
          </style>  
          <Footer/>
  

</div></body>