<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";


</script>

    <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(971px, 355px);"></div><div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(996px, 380px);"></div><div id="">
      
      <Header />
      <Slide />
      
      <main style="padding-top:200px">
          <!--İletişim Form Alanı-->
          <section class="iletisim-form-alani">
              <div class="tablo">
                   <div class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow animated" style="visibility: visible;">
                       <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk"> Informations &amp; accès </h2>
                       <form action="update_customer" class="form update_customer" method="post">
                          <input name="token" value="e085d0dbc7e2dd74640cc4aec7c58f0ff08037abecaf9cb1b6578ff0521dbefbfb5ccdf67a35891e" type="hidden">                            <div>
                              <div class="dropify-wrapper has-preview"><div class="dropify-message"><span class="file-icon"></span> <p></p><p class="dropify-error">Désolé, le fichier trop volumineux</p></div><div class="dropify-loader" style="display: none;"></div><div class="dropify-errors-container"><ul></ul></div><input type="file" class="dropify" name="avatar" data-default-file="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"><button type="button" class="dropify-clear">Supprimer</button><div class="dropify-preview" style="display: block;"><span class="dropify-render"><img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"></span><div class="dropify-infos"><div class="dropify-infos-inner"><p class="dropify-filename"><span class="file-icon"></span> <span class="dropify-filename-inner">default-avatar-icon-of-social-media-user-vector.jpg</span></p><p class="dropify-infos-message"></p></div></div></div></div><br><br>
                          </div>
                           <div class="tablo" style="margin-bottom: 0px;">
                              <div class="tablo--1-ve-2">
                                  <div class="form__grup">
                                      <input type="text" class="form__input" style="width:100%" placeholder="Nom" id="txt_isim" name="firstname" value="Test">
                                      <label for="first_name" class="form__label">Nom</label>
                                  </div>
                                  <div class="form__grup">
                                      <input type="text" class="form__input" style="width:100%" placeholder="Prénom" id="txt_isim" name="lastname" value="03 Dec" required="">
                                      <label for="last_name" class="form__label">Prénom</label>
                                  </div>
                              </div>
                              <div class="tablo--1-ve-2">
                                  <div class="form__grup">
                                      <input type="tel" class="form__input phone-ci" style="width:100%" placeholder="Téléphone" id="txt_eposta" name="phone" value="2250747947237" required="" inputmode="text">
                                      <label for="phone" class="form__label">Téléphone</label>
                                  </div>
                                  <div class="form__grup">
                                      <input type="email" readonly="" class="form__input" style="width:100%" placeholder="E-mail" id="txt_eposta" name="email" value="coulibalymama73@gmail.com" required="">
                                      <label for="email" class="form__label">E-mail</label>
                                  </div>
                              </div>
                           </div>
                          <div>
                              <div class="form__grup">
                                  <input type="text" class="form__input" style="width:100%" placeholder="Mot de passe" id="txt_eposta" name="password">
                                  <label for="password" class="form__label">Nouveau mot de passe</label>
                              </div>
                          </div>
                           <div class="form__grup">
                               <button class="buton buton--kirmizi" style="width:100%" id="update_customer">MODIFIER</button><br><br>
                                                               <a href="paiements" class="buton buton--kirmizi text-center" style="width:100%;text-align:center;background:black">HISTORIQUE DE PAIEMENT</a>
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
              h2.h2-baslik-footer.h-yazi-margin-kucuk,.footer__list,.footer__sosyal {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start !important;
                  align-items: start !important;
              }
          </style>  
          <Footer/>
  

</div>