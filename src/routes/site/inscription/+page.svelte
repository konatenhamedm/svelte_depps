<script>
  import Footer from "$components/Footer.svelte";
  import Header from "$components/Header.svelte";
  import Slide from "$components/Slide.svelte";


</script>



    <div id="pointer-ring" style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(513.646px, 430.56px);"></div><div id="pointer-dot" style="border-color: rgb(113, 88, 190); transform: translate(494px, 261px);">


    </div><div id="">
     
        <Header />
        <Slide />
     <style>
  .tablo:not(:last-child) {
      margin-bottom: 35px;
  }
  .hidden{
      display:none;
  }
</style>
<section class="hakkimizda-bolumu-anasayfa1" style="padding-top:150px">
  <div class="tablo">
      <div class="tablo--1-ve-3 project-image reveal-effect masker wow" style="visibility: visible;">
          <div class="galeri">
              <img src="/_files/undraw_medicine_b1ol.png" alt="Medicare About" class="galeri__gorsel galeri__gorsel--8">
          </div>

      </div>           
      <!--Galeri Görsel Alanı-->
      <div class="tablo--1-ve-2 wow fadeInUp" style="visibility: visible; animation-name: fadeInUp;">
          <h2 class="h2-baslik-anasayfa-ozel">Professionnel de Santé</h2><br><br>
          <p class="paragraf">
              Un professionnel de santé est une personne qualifiée et formée pour fournir des soins médicaux, préventifs, diagnostiques, thérapeutiques et de réadaptation aux individus et aux communautés. Ces professionnels travaillent dans divers domaines de la santé, tels que la médecine, la dentisterie, la pharmacie, l'ergothérapie, la physiothérapie, la psychologie, la diététique, l'orthophonie, et bien d'autres encore.             
          </p>
          <br>
          <a href="/site/professionnel" style="color:white" class="buton buton--kirmizi">Cliquer →</a>
      </div>
  </div>
  <div class="tablo">        
      <div class="tablo--1-ve-2 wow fadeInUp" style="visibility: visible; animation-name: fadeInUp;">
          <h2 class="h2-baslik-anasayfa-ozel">Etablissement de Santé</h2><br><br>
          <p class="paragraf">
              Un établissement de santé est une structure organisée et équipée pour fournir des services de santé, notamment des soins médicaux, chirurgicaux, de diagnostic, de réadaptation et de prévention des maladies. Ces établissements peuvent varier en taille et en complexité, allant des petits cabinets médicaux aux grands hôpitaux universitaires.              
          </p>
          <br>
          <a href="/site/etablissement" style="color:white" class="buton buton--kirmizi">Cliquer →</a>
      </div>
      <div class="tablo--1-ve-3 project-image reveal-effect masker wow" style="visibility: visible;">
          <div class="galeri">
              <img src="/_files/undraw_Building_re_xfcm.png" alt="Medicare About" class="galeri__gorsel galeri__gorsel--8">
          </div>
      </div>   
  </div>
  <div class="tablo hidden">
      <div class="tablo--1-ve-3 project-image reveal-effect masker wow animated" style="visibility: visible;">
          <div class="galeri">
              <img src="/_files/undraw_Futuristic_interface_re_0cm6.png" alt="Medicare About" class="galeri__gorsel galeri__gorsel--8">
          </div>

      </div>           
      <!--Galeri Görsel Alanı-->
      <div class="tablo--1-ve-2 wow fadeInUp animated" style="visibility: visible; animation-name: fadeInUp;">
          <h2 class="h2-baslik-anasayfa-ozel">Contrôleur</h2><br><br>
          <p class="paragraf">
              Un contrôleur est un professionnel de la santé chargé d'évaluer et de vérifier la qualité des soins médicaux dispensés dans un établissement de santé ou par un praticien de la santé individuel. Leur rôle principal est de garantir que les normes de qualité et de sécurité des soins sont respectées et maintenues
          </p>
          <br>
          <form action="setdata_customer" class="setdata_customer">
              <input type="hidden" name="type" value="Contrôleur">    
              <button href="professionnel-de-sante" style="color:white" class="buton buton--kirmizi">Acceder à votre espace →</button>
          </form>
      </div>
  </div>
  <div class="tablo hidden">        
      <div class="tablo--1-ve-2 wow fadeInUp animated" style="visibility: visible; animation-name: fadeInUp;">
          <h2 class="h2-baslik-anasayfa-ozel">Administrateur DEPPS</h2><br><br>
          <p class="paragraf">
              Un administrateur DEPPS (ou dans un domaine similaire) serait chargé de superviser les opérations et les initiatives liées à l'évaluation de la performance des soins au sein d'un établissement de santé, d'une organisation de soins de santé ou d'un département spécifique
          </p>
          <br>
          <form action="setdata_customer" class="setdata_customer">
              <input type="hidden" name="type" value="Administrateur DEPPS">    
              <button href="professionnel-de-sante" style="color:white" class="buton buton--kirmizi">Acceder à votre espace →</button>
          </form>
      </div>
      <div class="tablo--1-ve-3 project-image reveal-effect masker wow animated" style="visibility: visible;">
          <div class="galeri">
              <img src="_files/undraw_Done_re_oak4.png" alt="Medicare About" class="galeri__gorsel galeri__gorsel--8">
          </div>
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
          

          <Footer />
  

</div>