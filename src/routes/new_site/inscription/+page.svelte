<script>
    import Header from "$components/_includes/new_site/Header.svelte";
    import Footer from "$components/_includes/new_site/Footer.svelte";
    import Sub_header from "$components/_includes/new_site/Sub_header.svelte";
    import { onMount } from "svelte";

    export let data; 
    let user = data?.user;

    onMount(() => {
        if (!window.location.href.includes('reloaded=true')) {
            window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'reloaded=true';
        }
    });
    
</script>

<Header user={user}/>



<Sub_header titre="Inscription" subTitles={[{ title: "Inscription", link: "inscription" }]}></Sub_header>
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
            <a href="/new_site/professionnel" style="color:white" class="buton buton--kirmizi">Cliquer →</a>
        </div>
    </div>
    <div class="tablo">
        <div class="tablo--1-ve-2 wow fadeInUp" style="visibility: visible; animation-name: fadeInUp;">
            <h2 class="h2-baslik-anasayfa-ozel">Etablissement de Santé</h2><br><br>
            <p class="paragraf">
                Un établissement de santé est une structure organisée et équipée pour fournir des services de santé, notamment des soins médicaux, chirurgicaux, de diagnostic, de réadaptation et de prévention des maladies. Ces établissements peuvent varier en taille et en complexité, allant des petits cabinets médicaux aux grands hôpitaux universitaires.
            </p>
            <br>
            <a href="/new_site/etablissement" style="color:white" class="buton buton--kirmizi">Cliquer →</a>
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
                <a href="professionnel-de-sante" style="color:white" class="buton buton--kirmizi">Acceder à votre espace →</a>
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
                <a href="professionnel-de-sante" style="color:white" class="buton buton--kirmizi">Acceder à votre espace →</a>
            </form>
        </div>
        <div class="tablo--1-ve-3 project-image reveal-effect masker wow animated" style="visibility: visible;">
            <div class="galeri">
                <img src="_files/undraw_Done_re_oak4.png" alt="Medicare About" class="galeri__gorsel galeri__gorsel--8">
            </div>
        </div>
    </div>
</section>


<Footer></Footer>