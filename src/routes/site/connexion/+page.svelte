<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";


</script>


    <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(308px, 648px);"></div><div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(333px, 673px);"></div><div id="">
        <Header />
        <Slide />   
        <main style="padding-top:200px">
          <!--İletişim Form Alanı-->
          <section class="iletisim-form-alani">
              <div class="tablo">
                   <div class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow animated" style="visibility: visible;">
                       <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"> Connexion </h2>
                       <form action="login_customer" class="form login_customer" method="post">
                          <input name="token" value="2ab526b357c8673cc0d716c6898de772e274bc93412f7c60044d360d7d4a497e43fcd594a96add98" type="hidden">                             <div class="form__grup">
                               <label for="email" class="form_label">E-mail</label>
                               <input type="text" class="form__input" style="width:100%" placeholder="E-mail" id="txt_isim" name="login" required="">
                           </div>
                           <div class="form__grup">
                               <label for="password" class="form_label">Mot de passe</label>
                               <input type="password" class="form__input" style="width:100%" placeholder="Mot de passe" id="txt_eposta" name="password" required="">
                           </div>
                           <!--<div class="g-recaptcha" data-sitekey="6LfdUvcUAAAAAOtLHGqdBIbmdxkTAidF5rRxPtGd"></div><br>-->
                           <div class="form__grup">
                               <br>
                               <button class="buton buton--kirmizi" style="width:100%" id="login_customer">SE CONNECTER</button>
                           </div><br>
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
              h2.h2-baslik-footer.h-yazi-margin-kucuk,.footer__list,.footer__sosyal {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }
          </style>  
          <Footer />
  

</div>
