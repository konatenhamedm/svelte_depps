

<script lang="ts">
    import { onMount } from 'svelte';
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    export let data;
    let user = data.user;
    // Chargement des scripts dynamiquement
    onMount(async () => {
        await import('/static/new_site/js/vendors.min');
        await import('/static/new_site/js/template.js');

    });
</script>

<svelte:head>
    <!-- Import des CSS du template -->
    <link rel="stylesheet" href="/static/new_site/css/vendors_css.css">
    <link rel="stylesheet" href="/static/new_site/css/style.css">
    <link rel="stylesheet" href="/static/new_site/css/vendors_css.css">
</svelte:head>

<div id="app-container">
    <Header user={user} />

    <!-- Slider Revolution (simplifié pour Svelte) -->
    <section class="slider-section bg-primary">
        <div class="rev-slider">
            <div class="slide" style="background-image: url('/images/front-end-img/banners/slider-1.jpg')">
                <div class="slide-content">
                    <h2>Bienvenue à DEPPS</h2>
                    <p>La Direction des Établissements Privés et des Professions Sanitaires</p>
                    <a href="/site/depps" class="btn btn-primary">En savoir plus</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-50">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="feature-box bg-primary text-white">
                        <div class="feature-icon">
                            <i class="ti-heart"></i>
                        </div>
                        <h3>Qualité Médicale</h3>
                        <p>Rôle Central de la Direction des Établissements Privés et Sanitaires</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box bg-success text-white">
                        <div class="feature-icon">
                            <i class="ti-star"></i>
                        </div>
                        <h3>Sécurité et Hygiène</h3>
                        <p>Engagement de la Direction dans les Établissements de Santé Privés</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="feature-box bg-info text-white">
                        <div class="feature-icon">
                            <i class="fa fa-phone"></i>
                        </div>
                        <h3>Mission Essentielle</h3>
                        <p>Professionnalisme sous l'Égide de la Direction Sanitaire</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about-section py-50 bg-light">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <img src="/_files/2150796734-removebg-preview.png" alt="My DEPPS" class="img-fluid">
                </div>
                <div class="col-md-6">
                    <h2 class="section-title">My DEPPS</h2>
                    <p class="section-text">
                        Fidèle à notre mission, nous assurons la qualité des soins avec rigueur. La Direction des Établissements Privés et Sanitaires veille à chaque étape pour votre bien-être et votre sécurité, garantissant ainsi des standards élevés dans tous nos établissements partenaires.
                    </p>
                    <p class="section-text">
                        Leaders en santé, nous nous engageons à maintenir des normes élevées. La Direction des Établissements Privés et Sanitaires met tout en œuvre pour offrir des soins d'excellence, en collaboration avec nos partenaires, assurant ainsi votre confiance et votre bien-être à chaque instant.
                    </p>
                    <a href="/site/depps" class="btn btn-primary">Voir plus →</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section py-50 bg-dark text-white" style="background-image: url('/images/front-end-img/background/bg-3.jpg')">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-3 col-6">
                    <div class="stat-box">
                        <i class="fa fa-user-md"></i>
                        <h3 class="counter">1452</h3>
                        <p>Médecins</p>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-box">
                        <i class="fa fa-users"></i>
                        <h3 class="counter">5032</h3>
                        <p>Patients</p>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-box">
                        <i class="fa fa-procedures"></i>
                        <h3 class="counter">9850</h3>
                        <p>Chirurgies</p>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-box">
                        <i class="fa fa-award"></i>
                        <h3 class="counter">1935</h3>
                        <p>Récompenses</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <Footer />
</div>

<style>
    /* Styles globaux */
    :global(body) {
        font-family: 'Roboto', sans-serif;
        line-height: 1.6;
    }

    /* Section Slider */
    .slider-section {
        padding: 100px 0;
        color: white;
        text-align: center;
    }

    .slide-content {
        max-width: 800px;
        margin: 0 auto;
    }

    .slide-content h2 {
        font-size: 3rem;
        margin-bottom: 20px;
    }

    /* Features Section */
    .features-section {
        background: #f9f9f9;
    }

    .feature-box {
        padding: 30px;
        border-radius: 5px;
        text-align: center;
        height: 100%;
        transition: transform 0.3s;
    }

    .feature-box:hover {
        transform: translateY(-10px);
    }

    .feature-icon {
        font-size: 2.5rem;
        margin-bottom: 20px;
    }

    /* About Section */
    .about-section {
        background: white;
    }

    .section-title {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #333;
    }

    .section-text {
        margin-bottom: 20px;
        color: #666;
    }

    /* Stats Section */
    .stats-section {
        position: relative;
        background-size: cover;
        background-position: center;
    }

    .stats-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
    }

    .stat-box {
        position: relative;
        z-index: 1;
        padding: 20px;
    }

    .stat-box i {
        font-size: 3rem;
        margin-bottom: 15px;
    }

    .stat-box h3 {
        font-size: 2.5rem;
        margin-bottom: 10px;
    }

    /* Responsive */
    @media (max-width: 768px) {
        .slide-content h2 {
            font-size: 2rem;
        }

        .feature-box, .stat-box {
            margin-bottom: 20px;
        }
    }
</style>