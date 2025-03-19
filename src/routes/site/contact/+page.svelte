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

<div id="">
    <Slide user={user}/>
    <main class="flex ">
        <div class="max-w-[134rem] mx-auto px-4 sm:px-6 lg:px-8 pt-[150px]">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Left Column -->
                <div>
                    <h1 class="text-4xl font-bold  mb-6 h2-baslik-anasayfa-ozel_autre">Contactez-nous</h1>
                    <p class="paragraf mb-8">
                        Envoyez-nous un e-mail, appelez-nous ou remplissez le formulaire pour savoir comment Snappy peut résoudre vos problèmes de messagerie.
                    </p>

                    <div class="space-y-4">
                        <p class="text-primary">info@snappy.io</p>
                        <p class="text-primary">321-221-231</p>
                        <p class="font-medium h2-baslik-anasayfa-ozel_autre">Support client</p>
                    </div>

                    <div class="mt-12 grid grid-cols-3 gap-8">
                        <div>
                            <h3 class="font-medium mb-2 ">Support client</h3>
                            <p class="text-md   paragraf">Notre équipe de support est disponible 24h/24 et 7j/7 pour répondre à toutes vos préoccupations ou questions.</p>
                        </div>
                        <div>
                            <h3 class="font-medium mb-2">Avis et suggestions</h3>
                            <p class="text-md   paragraf">Nous prenons vos retours très au sérieux et travaillons en continu pour améliorer Snappy. Vos suggestions sont essentielles pour façonner l'avenir de Snappy.</p>
                        </div>
                        <div>
                            <h3 class="font-medium mb-2">Demandes médias</h3>
                            <p class="text-md   paragraf">Pour toute question liée aux médias, demandes de presse, contactez-nous à media@snappy.com.</p>
                        </div>
                    </div>
                </div>

                <!-- Right Column - Contact Form -->
                <div class="bg-white rounded-2xl shadow-lg p-8">
                    <h2 class="text-2xl font-semibold mb-6 h2-baslik-anasayfa-ozel_autre">Prenez contact</h2>
                    <p class="  paragraf mb-8">Vous pouvez nous joindre à tout moment</p>

                    <form class="space-y-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <input
                                        type="text"
                                        bind:value={firstName}
                                        placeholder="Prénom"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <input
                                        type="text"
                                        bind:value={lastName}
                                        placeholder="Nom"
                                        class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        <input
                                type="email"
                                bind:value={email}
                                placeholder="Votre e-mail"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />

                        <div class="flex gap-2">
                            <select class="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent">
                                <option>+62</option>
                            </select>
                            <input
                                    type="tel"
                                    bind:value={phoneNumber}
                                    placeholder="Numéro de téléphone"
                                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <textarea
                                bind:value={message}
                                placeholder="Comment pouvons-nous vous aider ?"
                                rows="4"
                                class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        ></textarea>

                        <button
                                type="submit"
                                class="w-full py-3 px-6 text-white font-medium rounded-lg bg-gradient-to-r from-gradient-start to-gradient-end hover:opacity-90 transition-opacity"
                        >
                            Envoyer
                        </button>

                        <p class="text-sm text-center   paragraf">
                            En nous contactant, vous acceptez nos
                            <a href="#" class="text-primary">Conditions d'utilisation</a>
                            et notre
                            <a href="#" class="text-primary">Politique de confidentialité</a>
                        </p>
                    </form>
                </div>
            </div>

            <!-- Map Section -->
            <div class="mt-24 grid grid-cols-1 md:grid-cols-1 gap-12">
               <!--  <div class="bg-gray-200 rounded-lg h-80">

                    <GoogleMap apiKey="AIzaSyDvlpPz-3nRwnzYQHvKXtnF_kApD9yR8IE" latitude={5.345317} longitude={-4.024429} zoom={14} />

                </div> -->
               <!--  <div>
                    <h2 class="text-2xl font-semibold mb-6">Notre emplacement</h2>
                    <h3 class="text-3xl font-bold mb-8">Connecter proche et lointain</h3>

                    <div>
                        <h4 class="font-medium mb-4">Siège social</h4>
                        <p class="  paragraf">Snappy Inc.</p>
                        <p class="  paragraf">San Francisco, USA</p>
                        <p class="  paragraf">123 Tech Boulevard, Suite 456</p>
                        <p class="  paragraf">San Francisco, CA 92345</p>
                        <p class="  paragraf">États-Unis</p>
                    </div>
                </div> -->
            </div>

            <!-- FAQ Section -->
        <!--     <div class="mt-24">
                <h2 class="text-3xl font-bold mb-8">FAQ</h2>
                <h3 class="text-4xl font-bold mb-4">Vous avez des questions ?</h3>
                <p class="  paragraf mb-8">Si vous avez des questions, nous répondrons à toutes vos interrogations.</p>

                <div class="space-y-4">
                    <div class="p-4 border rounded-lg">
                        <button class="w-full text-left font-medium title-faq"  on:click={() => toggleFaq(0)}>
                            Qu'est-ce qui rend Snappy différent des autres applications de messagerie ?
                        </button>
                        {#if faqOpen[0]}
                            <p class="mt-2   paragraf">Snappy se distingue par sa rapidité, son interface intuitive et sa sécurité de bout en bout.</p>
                        {/if}
                    </div>
                    <div class="p-4 border rounded-lg">
                        <button class="w-full text-left font-medium text-black title-faq" on:click={() => toggleFaq(1)}>
                            Quelle est la sécurité de mes conversations sur Snappy ?
                        </button>
                        {#if faqOpen[1]}
                            <p class="mt-2   paragraf">Toutes vos conversations sur Snappy sont cryptées pour garantir la confidentialité de vos échanges.</p>
                        {/if}
                    </div>
                    <div class="p-4 border rounded-lg">
                        <button class="w-full text-left font-medium title-faq" on:click={() => toggleFaq(2)}>
                            Puis-je personnaliser mon expérience Snappy ?
                        </button>
                        {#if faqOpen[2]}
                            <p class="mt-2   paragraf">Oui, vous pouvez personnaliser les notifications, le thème et bien plus encore pour rendre votre expérience unique.</p>
                        {/if}
                    </div>
                    <div class="p-4 border rounded-lg">
                        <button class="w-full text-left font-medium title-faq" on:click={() => toggleFaq(3)}>
                            Quelles fonctionnalités de groupe Snappy propose-t-il ?
                        </button>
                        {#if faqOpen[3]}
                            <p class="mt-2   paragraf">Snappy propose des fonctionnalités de groupe avancées, telles que des discussions de groupe, des appels vidéo en groupe, et la gestion des membres du groupe.</p>
                        {/if}
                    </div>
                </div>
            </div> -->
        </div>
    </main>
    <Footer/>
</div>
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