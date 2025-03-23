<script lang="ts">
    import Footer from "$components/Footer.svelte";
  import GoogleMap from "$components/GoogleMap.svelte";
    import Slide from "$components/Slide.svelte";

    let email = '';
    let firstName = '';
    let lastName = '';
    let phoneNumber = '';
    let message = '';

    export let data;
    let user = data.user;

    let faqOpen = [false, false, false, false]; // Pour gérer l'état des réponses des FAQ

    const toggleFaq = (index:any) => {
        faqOpen[index] = !faqOpen[index];
    };
</script>

    <Slide user={user}/>
    <main class="">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63561.74820863039!2d-4.082955703637691!3d5.323482559365998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eb0ac6bb768d%3A0x1bb04b0baf73417c!2sDirection%20des%20%C3%A9tablissements%20et%20professions%20sanitaires!5e0!3m2!1sfr!2sci!4v1712870937241!5m2!1sfr!2sci" width="100%" height="500px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

      <!--   <main> -->
            <!-- İletişim İcon Alanı -->
            <section class="iletisim-icon-alani ">
                <div class="tablo">
                    <!-- téléphone 1 -->
                    <div class="tablo--1-ve-3">
                        <div class="ozellik-kutu-iletisim wow fadeInUp"  style="cursor:pointer;">
                            <i class="ozellik-kutu-iletisim--icon icon-basic-headset"></i>
                            <h3 class="baslik-4 h-yazi-margin-kucuk-2">Support</h3>
                            <p class="ozellik-kutu-iletisim--yazi">
                                CONTACT_1
                            </p>
                        </div>
                    </div>
                    <!-- mail 2 -->
                    <div class="tablo--1-ve-3">
                        <div class="ozellik-kutu-iletisim wow fadeInUp"  style="cursor:pointer;">
                            <i class="ozellik-kutu-iletisim--icon icon-basic-paperplane"></i>
                            <h3 class="baslik-4 h-yazi-margin-kucuk-2">Mail</h3>
                            <p class="ozellik-kutu-iletisim--yazi">
                                EMAIL
                            </p>
                        </div>
                    </div>
                    <!-- adres 3 -->
                    <div class="tablo--1-ve-3">
                        <div class="ozellik-kutu-iletisim wow fadeInUp"  style="cursor:pointer;">
                            <i class="ozellik-kutu-iletisim--icon icon-basic-map"></i>
                            <h3 class="baslik-4 h-yazi-margin-kucuk-2">Office</h3>
                            <p class="ozellik-kutu-iletisim--yazi">
                                COMMUNE
                            </p>
                        </div>
                    </div>
                </div>
                <div class="tablo w-full ">
                    <div class="tablo--1-ve-2 ">
                        <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">Formulaire de contact</h2>
                        <form action="https://garantiwebtasarim.com/medicare/contactform.php" class="form" method="post">
                            <div class="form__grup">
                                <input type="text" class="form__input" placeholder="Nom complet" id="txt_isim" name="nom" required>
                                <label for="name" class="form__label">Nom complet</label>
                            </div>
                            <div class="form__grup">
                                <input type="email" class="form__input" placeholder="Adresse e-mail" id="txt_eposta" name="email" required>
                                <label for="email" class="form__label">Adresse e-mail</label>
                            </div>
                            <div class="form__grup">
                                <input type="text" class="form__input" placeholder="Numéro de téléphone" id="txt_telefon" name="telefon" required>
                                <label for="telefon" class="form__label">Numéro de téléphone</label>
                            </div>
                            <div class="form__grup">
                                <textarea rows="3" cols="66" maxlength="90" name="message" id="txt_mesaj" placeholder="Votre message" class="form__input"></textarea>
                                <label for="message" class="form__label">Votre message...</label>
                            </div>
                            <div class="form__grup">
                                <button class="buton buton--kirmizi" id="btn_Gonder">ENVOYER</button>
                            </div><br>
                        </form>
                    </div>
                    <div class="tablo--1-ve-2 wow fadeInUp">
                        <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">Vous nous connaissez ?</h2>
                        <p class="paragraphe">
                            L’accès à E-DEPPS est le moyen digital pour la demande et la délivrance des documents administratifs des établissements sanitaires privés et des professionnels de santé.<br><br>C’est aussi, pour la population, un accès aisé aux informations relatives à la santé.<br><br>Pour une meilleure coordination des interventions du secteur de la santé et aboutir au renforcement du cadre de régulation du secteur privé de la santé en particulier, plusieurs activités ont été réalisées.
                        </p>
                    </div>
                </div>
            </section>
        <br>
            <!-- İletişim Form Alanı -->
            <section class="iletisim-form-alani mt-0">
                
            </section>
        <!-- </main> -->
    </main>
    <Footer/>

<style>
    .text-center.content-value p {
      text-align: center;
      font-size: 14px;
    }
    .h2-baslik-anasayfa-ozel_autre {
      font-size: 1.5rem;
      font-weight: 900;
      text-transform: uppercase;
  
      background-image: linear-gradient(to right, #4b9bd8, #7158be);
      -webkit-background-clip: text;
      color: transparent;
      letter-spacing: 0.1rem;
    }
  </style>