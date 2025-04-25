<script>
import Header from "$components/_includes/new_site/Header.svelte";
import Footer from "$components/_includes/new_site/Footer.svelte";
export let data; // Les données retournées par `load()`
let user = data?.user;
</script>

<Header user={user}></Header>

<!---page Title --->
<section class="bg-img pt-150 pb-20" data-overlay="7" style="background-image: url(https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/background/bg-8.jpg);">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="text-center">
                    <h2 class="page-title text-white" style="font-size: 30px">Contactez-nous</h2>
                    <ol class="breadcrumb bg-transparent justify-content-center">
                        <li class="breadcrumb-item"><a href="#" class="text-white-50"><i class="mdi mdi-home-outline"></i></a></li>
                        <li class="breadcrumb-item text-white active" aria-current="page">Contactez-nous</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</section>
<!--Page content -->

<section class="py-50">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-7 col-12">
                <form class="contact-form" action="#">
                    <div class="text-start mb-30">
                        <h2 style="font-size: 30px">Prendre contact</h2>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Nom complet">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="email" class="form-control" placeholder="Votre Email">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="tel" class="form-control" placeholder="Téléphone">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Subject">
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <textarea name="message" rows="5" class="form-control" required="" placeholder="Message"></textarea>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <button name="submit" type="submit" value="Submit" class="btn btn-primary"> Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-5 col-12 mt-30 mt-md-0">
                <div class="box box-body p-40 bg-dark mb-0">
                    <h2 class="box-title text-white" style="font-size: 22px !important;">Vous nous connaissez ?</h2>
                    <p style="font-size: 14px">L’accès à E-DEPPS est le moyen digital pour la demande et la délivrance des documents administratifs des établissements sanitaires privés et des professionnels de santé.
                        C’est aussi, pour la population, un accès aisé aux informations relatives à la santé.
                        Pour une meilleure coordination des interventions du secteur de la santé et aboutir au renforcement du cadre de régulation du secteur privé de la santé en particulier, plusieurs activités ont été réalisées.</p>
                    <div class="widget fs-18 my-20 py-20 by-1 border-light">
                        <ul class="list list-unstyled text-white-80">
                            <li class="ps-40"><i class="ti-location-pin"></i>123, Lorem Ipsum, Dummy City,<br>FL-12345 USA</li>
                            <li class="ps-40 my-20"><i class="ti-mobile"></i>(225) 27 20 32 46 32 / (225) 05 66 05 60 60</li>
                            <li class="ps-40"><i class="ti-email"></i>secretariatdeps2@gmail.com</li>
                        </ul>
                    </div>
                    <h4 class="mb-20" style="font-size: 18px !important;">Suivez-nous</h4>
                    <ul class="list-unstyled d-flex gap-items-1">
                        <li><a href="#" class="waves-effect waves-circle btn btn-social-icon btn-circle btn-facebook"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="#" class="waves-effect waves-circle btn btn-social-icon btn-circle btn-twitter"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#" class="waves-effect waves-circle btn btn-social-icon btn-circle btn-linkedin"><i class="fa fa-linkedin"></i></a></li>
                        <li><a href="#" class="waves-effect waves-circle btn btn-social-icon btn-circle btn-youtube"><i class="fa fa-youtube"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<section>
    <div class="row">
        <div class="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.6220978063075!2d-4.023990024767952!3d5.3214955946569935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb0ac6bb768d%3A0x1bb04b0baf73417c!2sDirection%20des%20%C3%89tablissements%20Priv%C3%A9s%20et%20Professions%20Sanitaires!5e0!3m2!1sen!2sci!4v1745511550068!5m2!1sen!2sci" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</section>
<Footer></Footer>