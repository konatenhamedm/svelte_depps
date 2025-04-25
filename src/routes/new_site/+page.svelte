<script lang="ts">
    import Footer from "$components/_includes/new_site/Footer.svelte";
    import Header from "$components/_includes/new_site/Header.svelte";
  import { onMount } from "svelte";
    export let data; // Les données retournées par `load()`
    let user = data?.user;

    console.log("User data:", user);

</script>

<Header user={user}></Header>

<!-- Slider Section -->
<div id="home" class="section dart-no-padding-tb">
    <div id="revo_main_wrapper" class="rev_slider_wrapper fullwidthbanner-container">
        <div id="rev_slider_251_115" class="rev_slider fullwidthabanner" style="display:none;" data-version="5.4.1">
            <ul>
                <!-- SLIDE 1 -->
                <!-- Slide 1 -->
                <li data-index="rs-01" data-transition="fade" data-slotamount="default" data-easein="Power3.easeInOut" data-easeout="Power3.easeInOut" data-masterspeed="2000" data-fsmasterspeed="1500" class="rev_gradient">


                    <!-- Slide background -->
                    <img src="/new_site/images/front-end-img/banners/slider-1.jpg"
                         alt=""
                         data-bgposition="center center"
                         data-bgfit="cover"
                         data-bgrepeat="no-repeat"
                         class="rev-slidebg"
                         data-no-retina />

                    <!-- Text content -->
                    <div class="tp-caption tp-resizeme whitecolor"
                         data-x="center"
                         data-y="middle"
                         data-voffset="-50"
                         data-fontsize="['60','50','40','30']"
                         data-lineheight="['70','60','50','40']"
                         data-width="['auto','auto','auto','auto']"
                         data-height="none"
                         data-whitespace="nowrap"
                         data-type="text"
                         data-responsive_offset="on"
                         data-textalign="center"
                         data-transform_idle="o:1;"
                         data-transform_in="y:100;opacity:0;s:1000;e:Power2.easeOut;"
                         data-transform_out="opacity:0;s:300;e:Power2.easeInOut;"
                         data-start="500"
                         style="z-index: 6; white-space: nowrap; font-weight:700;">
                        Bienvenue à notre site
                    </div>

                    <div class="tp-caption tp-resizeme whitecolor"
                         data-x="center"
                         data-y="middle"
                         data-voffset="50"
                         data-fontsize="['24','22','20','18']"
                         data-lineheight="['30','28','26','24']"
                         data-width="['auto','auto','auto','auto']"
                         data-type="text"
                         data-responsive_offset="on"
                         data-textalign="center"
                         data-transform_idle="o:1;"
                         data-transform_in="y:100;opacity:0;s:1000;e:Power2.easeOut;"
                         data-transform_out="opacity:0;s:300;e:Power2.easeInOut;"
                         data-start="1000"
                         style="z-index: 7; font-weight: 400;">
                        Aenean tellus vitae ex rhoncus sollicitudin
                    </div>


                </li>


                <!-- SLIDE 2  -->
                <!-- Slide 2 -->
                <li data-index="rs-02" data-transition="fade" data-slotamount="default" data-easein="Power3.easeInOut" data-easeout="Power3.easeInOut" data-masterspeed="2000" data-fsmasterspeed="1500">

                    <!-- Slide background -->
                    <img src="/new_site/images/front-end-img/banners/slider-2.jpg"
                         alt=""
                         data-bgposition="center center"
                         data-bgfit="cover"
                         data-bgrepeat="no-repeat"
                         class="rev-slidebg"
                         data-no-retina />

                    <!-- Text content -->
                    <div class="tp-caption tp-resizeme whitecolor"
                         data-x="center"
                         data-y="middle"
                         data-voffset="-50"
                         data-fontsize="['60','50','40','30']"
                         data-lineheight="['70','60','50','40']"
                         data-width="['auto','auto','auto','auto']"
                         data-height="none"
                         data-whitespace="nowrap"
                         data-type="text"
                         data-responsive_offset="on"
                         data-textalign="center"
                         data-transform_idle="o:1;"
                         data-transform_in="y:100;opacity:0;s:1000;e:Power2.easeOut;"
                         data-transform_out="opacity:0;s:300;e:Power2.easeInOut;"
                         data-start="500"
                         style="z-index: 6; white-space: nowrap; font-weight:700;">
                        Découvrez nos services
                    </div>

                    <div class="tp-caption tp-resizeme whitecolor"
                         data-x="center"
                         data-y="middle"
                         data-voffset="50"
                         data-fontsize="['24','22','20','18']"
                         data-lineheight="['30','28','26','24']"
                         data-width="['auto','auto','auto','auto']"
                         data-type="text"
                         data-responsive_offset="on"
                         data-textalign="center"
                         data-transform_idle="o:1;"
                         data-transform_in="y:100;opacity:0;s:1000;e:Power2.easeOut;"
                         data-transform_out="opacity:0;s:300;e:Power2.easeInOut;"
                         data-start="1000"
                         style="z-index: 7; font-weight: 400;">
                        Un service de qualité adapté à vos besoins
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>
<!-- End Slider Section -->

<section class="py-0" data-aos="fade-up">
    <div class="row g-0">
        <div class="col-lg-4 col-12">
            <div class="bg-primary p-45">
                <div class="d-flex align-items-start">
                    <img src="site/img/quality1.png" alt="La Garantie de la Qualité Médicale" class="services-kutu1--icon">

                    <div class="feature-info">
                        <h3 class="text-white fw-500" style="font-size: 23px !important;">Qualité Médicale</h3>
                        <p class="text-white-70">Rôle Central de la Direction des Établissements Privés et Sanitaires.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-12">
            <div class="bg-success2 p-45">
                <div class="d-flex align-items-start">
                    <img src="site/img/quality2.png" alt="Sécurité et Hygiène" class="services-kutu2--icon">
                    <div class="feature-info">
                        <h3 class="text-white fw-500" style="font-size: 23px !important;">Sécurité et Hygiène</h3>
                        <p class="text-white-70">Engagement de la Direction dans les Établissements de Santé Privés.</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4 col-12">
            <div class="bg-success3 p-45">
                <div class="d-flex align-items-start">
                    <img src="site/img/quality3.png" alt="Mission Essentielle" class="services-kutu3--icon">
                    <div class="feature-info">
                        <h3 class="text-white fw-500" style="font-size: 23px !important;">Mission Essentielle</h3>
                        <p class="text-white-70">Professionnalisme sous l'Égide de la Direction Sanitaire</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- About Section -->
<section class="py-50 about-area">
    <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="col-lg-6 col-md-12 p-0">
                <div class="about-image">
                    <img src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/about-img1.jpg" alt="image">
                </div>
            </div>
            <div class="col-lg-6 col-md-12 p-0">
                <div class="about-content">
                    <span>A propos de nous</span>
                    <h2 class="h2-baslik-anasayfa-ozel">My DEPPS</h2>
                    <p class="paragraf">
                        Fidèle à notre mission, nous assurons la qualité des soins avec rigueur. La Direction des
                        Établissements Privés et Sanitaires veille à chaque étape pour votre bien-être et votre sécurité,
                        garantissant ainsi des standards élevés dans tous nos établissements partenaires
                    </p>
                    <p class="paragraf">
                        Leaders en santé, nous nous engageons à maintenir des normes élevées.
                        La Direction des Établissements Privés et Sanitaires met tout en œuvre pour offrir des soins d'excellence,
                        en collaboration avec nos partenaires, assurant ainsi votre confiance et votre bien-être à chaque instant.

                    </p>
                    <div class="entry-button">
                        <a href="#" class="btn btn-primary btn-sm">Voir plus → </a>
                    </div>

                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-lg-50 py-md-20">
    <div class="container">
        <div class="row mt-30">
            <div class="col-md-4">
                <a href="#" class="box text-center pull-up">
                    <div class="box-body p-50">
                        <span class="text-primary fs-60 icon-Add-user"><span class="path1"></span><span class="path2"></span></span>
                        <div class="fw-600 fs-20 mb-10 mt-25">Our Mission</div>
                        <div class="text-fade fs-16">Create an account and access your saved settings on any device.</div>
                    </div>
                </a>
            </div>
            <div class="col-md-4">
                <a href="#" class="box text-center pull-up">
                    <div class="box-body p-50">
                        <span class="text-primary fs-60 icon-Search"><span class="path1"></span><span class="path2"></span></span>
                        <div class="fw-600 fs-20 mb-10 mt-25">Our Planning</div>
                        <div class="text-fade fs-16">Don't just find. Be found. Put your CV in front of great employers.</div>
                    </div>
                </a>
            </div>
            <div class="col-md-4">
                <a href="#" class="box text-center pull-up">
                    <div class="box-body p-50">
                        <span class="text-primary fs-60 icon-Armchair"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                        <div class="fw-600 fs-20 mb-10 mt-25">Our Vision</div>
                        <div class="text-fade fs-16">Your next career move starts here. Choose Job from thousands of companies</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>



<Footer></Footer>