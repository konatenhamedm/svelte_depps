<script lang="ts">
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";
  export let data; // Les données retournées par `load()`
  let user = data.user;
    
  
  </script>
  
     
     
     <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(385px, 650px);">
  
     </div>
     <div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(410px, 675px);"></div>
     <div id="">
         <Header user={user}/>
         <Slide user={user}/>
   
          <!-- Slider -->
          <section class="slider">
             

            <div class="swiper-container swiper-container-horizontal"> 
              <div class="swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(-6576px, 0px, 0px);"><div class="swiper-slide swiper-slide-duplicate" data-background="_files/slide-3.png" data-swiper-slide-index="0" style="background-image: url(&quot;_files/slide-3.png&quot;);">
                  <div class="slide-inner">
                      <h2>La Direction des Établissements Privés et des Professions Sanitaires en collaboration avec les acteurs du secteur</h2>
                      <div class="link">
                      </div>
                  </div>
                </div><div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev" data-background="_files/slide-2.png" data-swiper-slide-index="1" style="background-image: url(&quot;_files/slide-2.png&quot;);">
                  <div class="slide-inner">
                      <h2>La Direction des Établissements Privés et des Professions Sanitaires promeut l'adaptation et l'innovation pour relever les défis</h2>
                      <div class="link">
                      </div>
                  </div>
                </div> 
                <div class="swiper-slide swiper-slide-duplicate-active" data-background="_files/slide-3.png" data-swiper-slide-index="0" style="background-image: url(&quot;_files/slide-3.png&quot;);">
                  <div class="slide-inner">
                      <h2>La Direction des Établissements Privés et des Professions Sanitaires en collaboration avec les acteurs du secteur</h2>
                      <div class="link">
                      </div>
                  </div>
                </div>
                <div class="swiper-slide swiper-slide-prev swiper-slide-duplicate-next" data-background="_files/slide-2.png" data-swiper-slide-index="1" style="background-image: url(&quot;_files/slide-2.png&quot;);">
                  <div class="slide-inner">
                      <h2>La Direction des Établissements Privés et des Professions Sanitaires promeut l'adaptation et l'innovation pour relever les défis</h2>
                      <div class="link">
                      </div>
                  </div>
                </div>
              <div class="swiper-slide swiper-slide-duplicate swiper-slide-active" data-background="_files/slide-3.png" data-swiper-slide-index="0" style="background-image: url(&quot;_files/slide-3.png&quot;);">
                  <div class="slide-inner">
                      <h2>La Direction des Établissements Privés et des Professions Sanitaires en collaboration avec les acteurs du secteur</h2>
                      <div class="link">
                      </div>
                  </div>
                </div><div class="swiper-slide swiper-slide-duplicate swiper-slide-next swiper-slide-duplicate-prev" data-background="_files/slide-2.png" data-swiper-slide-index="1" style="background-image: url(&quot;_files/slide-2.png&quot;);">
                  <div class="slide-inner">
                      <h2>La Direction des Établissements Privés et des Professions Sanitaires promeut l'adaptation et l'innovation pour relever les défis</h2>
                      <div class="link">
                      </div>
                  </div>
                </div></div>
              <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"><span class="swiper-pagination-bullet swiper-pagination-bullet-active"><svg><circle r="18" cx="20" cy="20"></circle></svg></span><span class="swiper-pagination-bullet"><svg><circle r="18" cx="20" cy="20"></circle></svg></span></div>
              <div class="swiper-button-next"><span></span><b>SUIVANT</b></div>
            </div>
          </section>
          <!--Quality 1-->
          <section class="hm-services2" id="service">
                <div class="bosluk3"></div>
            <div class="tabloservices">
                <div class="tablo--1-ve-3">
                    <div class="services-kutu1 project-image reveal-effect masker wow" style="cursor: pointer; visibility: visible;">
                        <img src="site/img/quality1.png" alt="La Garantie de la Qualité Médicale" class="services-kutu1--icon">
                        <h3 class="baslik-s1 h-yazi-margin-kucuk">Qualité Médicale</h3>
                        <p class="services-kutu1--yazi1">
                          Rôle Central de la Direction des Établissements Privés et Sanitaires
                        </p>
                    </div>
                </div>
                <!--Quality 2-->
                <div class="tablo--1-ve-3">
                    <div class="services-kutu2 project-image reveal-effect masker wow" style="cursor: pointer; visibility: visible;">
                        <img src="site/img/quality2.png" alt="Sécurité et Hygiène" class="services-kutu2--icon">
                        <h3 class="baslik-sol h-yazi-margin-kucuk">Sécurité et Hygiène</h3>
                        <p class="services-kutu1--yazi2">
                          Engagement de la Direction dans les Établissements de Santé Privés
                        </p>
                    </div>
                </div>
                <!--Quality 3-->
                <div class="tablo--1-ve-3">
                    <div class="services-kutu3 project-image reveal-effect masker wow" style="cursor: pointer; visibility: visible;">
                        <img src="site/img/quality3.png" alt="Mission Essentielle" class="services-kutu3--icon">
                        <h3 class="baslik-s3 h-yazi-margin-kucuk">Mission Essentielle</h3>
                        <p class="services-kutu1--yazi3">
                          Professionnalisme sous l'Égide de la Direction Sanitaire
                        </p>
                    </div>
                </div>
            </div>
          </section>        
           <!--Hakkımızda Yazı Alanı-->
           <div class="bosluk8"></div>
           <section class="hakkimizda-bolumu-anasayfa1" id="propos">
           <div class="h-yazi-ozel h-yazi-margin-ozel">           
           </div>
           <div class="tablo">
               <div class="tablo--1-ve-3 project-image reveal-effect masker wow" style="visibility: visible;">
                <div class="galeri">
                    <img src="_files/2150796734-removebg-preview.png" alt="Medicare About" class="galeri__gorsel galeri__gorsel--8">
                </div>
  
               </div>           
               <!--Galeri Görsel Alanı-->
               <div class="tablo--1-ve-2 wow fadeInUp" style="visibility: visible; animation-name: fadeInUp;">
                   <h2 class="h2-baslik-anasayfa-ozel"> My DEPPS</h2><br><br>
                  <p class="paragraf">
                    Fidèle à notre mission, nous assurons la qualité des soins avec rigueur. La Direction des Établissements Privés et Sanitaires veille à chaque étape pour votre bien-être et votre sécurité, garantissant ainsi des standards élevés dans tous nos établissements partenaires                  
                   </p><p class="paragraf">
                      Leaders en santé, nous nous engageons à maintenir des normes élevées. La Direction des Établissements Privés et Sanitaires met tout en œuvre pour offrir des soins d'excellence, en collaboration avec nos partenaires, assurant ainsi votre confiance et votre bien-être à chaque instant.<br> <br>
                   <br>
                   <a href="E-DEPPS" class="buton buton--kirmizi">Voir plus →</a>
               </p></div>
           </div>
           </section>
           <div class="bosluk4"></div>
            <!--Count-->
          <section class="our-awards">
            <div class="container">
                <div class="h-yazi-ortalama h-yazi-margin-orta-3">
                    <h2 class="h2-baslik-hizmetler-beyaz"> Nos réalisations </h2>
                </div>
                <p class="h2-baslik-hizmetler-beyaz__paragraf">
                  Nous sommes très heureux de vous servir. Nous sommes heureux de continuer notre route
                </p>
                <div class="bosluk333"></div>
            <ul>
                <li class="wow fadeInUp" data-wow-delay="0s" style="visibility: hidden; animation-delay: 0s; animation-name: none;">
                 <figure><img src="site/img/awards1.png" alt="Image"></figure>
                 <h5>Médecin</h5>
                 <span class="odometer odometer-auto-theme" data-count="1452" data-status="yes"><div class="odometer-inside"><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value">0</span></span></span></span></span></div></span> </li>
                 <li class="wow fadeInUp" data-wow-delay="0.05s" style="visibility: hidden; animation-delay: 0.05s; animation-name: none;">
                 <figure><img src="site/img/awards2.png" alt="Image"></figure>
                 <h5>Patient</h5>
                 <span class="odometer odometer-auto-theme" data-count="5032" data-status="yes"><div class="odometer-inside"><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value">0</span></span></span></span></span></div></span> </li>
                 <li class="wow fadeInUp" data-wow-delay="0.15s" style="visibility: hidden; animation-delay: 0.15s; animation-name: none;">
                     <figure><img src="site/img/awards3.png" alt="Image"></figure>
                     <h5>Chirurgie</h5>
                     <span class="odometer odometer-auto-theme" data-count="9850" data-status="yes"><div class="odometer-inside"><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value">0</span></span></span></span></span></div></span> </li>
                 <li class="wow fadeInUp" data-wow-delay="0.10s" style="visibility: hidden; animation-delay: 0.1s; animation-name: none;">
                 <figure><img src="site/img/awards4.png" alt="Image"></figure>
                 <h5>Membres</h5>
                 <span class="odometer odometer-auto-theme" data-count="1200" data-status="yes"><div class="odometer-inside"><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value">0</span></span></span></span></span></div></span> </li>
                 <li class="wow fadeInUp" data-wow-delay="0.20s" style="visibility: hidden; animation-delay: 0.2s; animation-name: none;">
                 <figure><img src="site/img/awards5.png" alt="Image"></figure>
                 <h5>Récompenses</h5>
                 <span class="odometer odometer-auto-theme" data-count="1935" data-status="yes"><div class="odometer-inside"><span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner"><span class="odometer-ribbon"><span class="odometer-ribbon-inner"><span class="odometer-value">0</span></span></span></span></span></div></span> </li>
            </ul>
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