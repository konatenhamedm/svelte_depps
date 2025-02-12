<script lang="ts">
    import Footer from "$components/Footer.svelte";
    import Header from "$components/Header.svelte";
    export let data;
    let user = data.user;

    const stats = [
        { number: "50K+", label: "Patients suivis" },
        { number: "1000+", label: "Professionnels de santé" },
        { number: "99.9%", label: "Disponibilité" },
        { number: "24/7", label: "Support médical" }
    ];

    const team = [
        {
            name: "Dr. Sarah Martin",
            role: "Directrice Médicale",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop"
        },
        {
            name: "Dr. David Chen",
            role: "Directeur Recherche",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop"
        },
        {
            name: "Dr. Emma Wilson",
            role: "Responsable Éthique Médicale",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=500&fit=crop"
        }
    ];

    const values = [
        {
            icon: "⚕️",
            title: "Excellence Médicale",
            description: "Notre engagement envers les plus hauts standards de pratique médicale guide chacune de nos actions."
        },
        {
            icon: "🔬",
            title: "Innovation Thérapeutique",
            description: "Nous intégrons les dernières avancées médicales pour offrir les meilleurs soins possibles."
        },
        {
            icon: "🤝",
            title: "Approche Humaine",
            description: "Nous plaçons l'humain au cœur de notre pratique, avec empathie et bienveillance."
        },
        {
            icon: "🛡️",
            title: "Éthique & Confidentialité",
            description: "La protection des données de santé et le respect du secret médical sont nos priorités absolues."
        }
    ];
</script>


<div id="">
    <Header user={user}/>
    <main class="min-h-screen bg-gray-50">
        <!-- Hero Section -->
        <div class="relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-r from-gradient-start to-gradient-end opacity-10"></div>
            <div class="max-w-[118rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
                <div class="text-center">
                    <h1 class="text-5xl md:text-6xl font-bold text-gray-900  mb-6">
                        Au Service de Votre Santé
                    </h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto text-center">
                        Notre centre médical allie expertise médicale et technologies de pointe pour offrir des soins d'excellence à nos patients.
                    </p>
                </div>
            </div>
        </div>

        <!-- Stats Section -->
        <div class="bg-white py-20">
            <div class="max-w-[118rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {#each stats as stat}
                        <div class="text-center">
                            <div class="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                            <div class="text-gray-600">{stat.label}</div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Notre Histoire Section -->
        <div class="py-24 bg-gray-50">
            <div class="max-w-[118rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 class="text-4xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
                        <p class="text-gray-600 mb-6">
                            Fondé en 2020 par une équipe de médecins visionnaires, notre centre médical est né de la volonté d'allier excellence médicale et innovation technologique pour améliorer la prise en charge des patients.
                        </p>
                        <p class="text-gray-600 mb-6">
                            Notre engagement constant envers la qualité des soins et la formation continue de notre personnel nous permet d'offrir une médecine de pointe, humaine et accessible.
                        </p>
                        <div class="h-1 w-20 bg-gradient-to-r from-gradient-start to-gradient-end rounded-full"></div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-gradient-to-br from-gradient-start to-gradient-end rounded-2xl h-64 transform -rotate-6"></div>
                        <div class="bg-primary rounded-2xl h-64 transform rotate-6 mt-12"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Nos Valeurs Section -->
        <div class="bg-white py-24">
            <div class="max-w-[118rem] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">Nos Valeurs</h2>
                <div class="grid md:grid-cols-4 gap-8">
                    {#each values as value}
                        <div class="text-center content-value">
                            <div class="text-4xl mb-4">{value.icon}</div>
                            <h3 class="text-xl font-semibold mb-4">{value.title}</h3>
                            <p class="text-gray-600">{value.description}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Team Section -->
        <div class="bg-gray-50 py-24">
            <div class="max-w-[118rem] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl font-bold text-center mb-16">Notre Équipe Médicale</h2>
                <div class="grid md:grid-cols-3 gap-12">
                    {#each team as member}
                        <div class="text-center member">
                            <div class="mb-6">
                                <img
                                        src={member.image}
                                        alt={member.name}
                                        class="w-48 h-48 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                                />
                            </div>
                            <h3 class="text-xl font-semibold mb-2">{member.name}</h3>
                            <p class="text-gray-600">{member.role}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Engagement Section -->
        <div class="bg-gradient-to-r from-gradient-start to-gradient-end py-24 text-white">
            <div class="max-w-[118rem] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-8">Notre Engagement</h2>
                <p class="text-xl opacity-90 max-w-3xl mx-auto text-center">
                    Chaque jour, notre équipe s'engage à fournir des soins d'excellence, à rester à la pointe de l'innovation médicale et à placer le bien-être de nos patients au cœur de nos priorités.
                </p>
            </div>
        </div>
    </main>
    <Footer/>
</div>

<style>
    .text-center.content-value p {
        text-align: center;
        font-size: 14px;
    }


</style>