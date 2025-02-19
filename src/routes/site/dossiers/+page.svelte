<script>
    import { onMount } from 'svelte';
    import Slide from "$components/Slide.svelte";
    import Header from "$components/Header.svelte";
    import Footer from "$components/Footer.svelte";
    import {apiFetch} from "$lib/api";

    export let data;
    let user = data?.user;
    let activeTab = 'step2';
    let formData = {
        // Personal Informations
        genre: "",
        civilite: "",
        nom: "",
        prenoms: "",
        nationalite: "",
        dateNaissance: "",
        numero: "",
        address: "",
        lieuResidence: "",
        diplome: "",
        dateDiplome: "",
        lieuDiplome: "",
        situation: "",

        // Professional informations
        profession: "",
        situationPro: "",
        specialite: "",
        emailPro: "",
        contactPro: "",
        professionnel: "",
        ville: "",
        dateEmploi: "",

        // Media informations
        photo: "",
        cni: "",
        casier: "",
        diplomeFile: "",
        certificat: "",
        cv: "",

        // Organization informations
        appartenirOrganisation: false,
        organisationNom: "",
        organisationNumero: "",
        organisationAnnee: ""
    };

    const specialites = ['Spécialité 1', 'Spécialité 2'];
    const nationalites = ['Nationalité 1', 'Nationalité 2'];
    const genres = ['Masculin', 'Féminin', 'Autre'];
    const civilites = ['M.', 'Mme', 'Mlle'];
    const situations = ['Célibataire', 'Marié(e)', 'Divorcé(e)', 'Veuf(ve)'];
    const situationsPro = ['Salarié', 'Indépendant', 'Sans emploi', 'Étudiant'];

    const handleSubmit = async () => {
        try {
            const userId = user?.id || '/* insert user id */';
            const response = await fetch(`https://depps.leadagro.net/api/user/admin/update/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Mise à jour réussie!');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    async function getUserInfos() {
        try {
            const userId = user?.id;
            const response = await apiFetch(true, `/professionnel/get/one/${userId}`);
            console.log("response before condition", response);
            if (response.code) {
                formData = await response.data
                console.log("content formData", formData);
            } else {
                console.error("Erreur API", response.status);
            }
        } catch (error) {
            console.error("Erreur de récupération des données", error);
        }
    }

    onMount(() => {
        getUserInfos();
    });
</script>

<Header user={user} />
<Slide user={user} />
<div class="w-full mx-auto p-4 content-sec">
    <!-- Tabs Navigation -->
    <div class="mb-4 border-b border-gray-200">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center">
            <li class="mr-2">
                <button
                        class="inline-block p-4 btn-tabs {activeTab === 'step2' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}"
                        on:click={() => activeTab = 'step2'}
                >
                    Informations de Base
                </button>
            </li>
            <li class="mr-2">
                <button
                        class="inline-block p-4 btn-tabs {activeTab === 'step3' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}"
                        on:click={() => activeTab = 'step3'}
                >
                    Informations Professionnelles
                </button>
            </li>
            <li class="mr-2">
                <button
                        class="inline-block p-4 btn-tabs {activeTab === 'step4' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}"
                        on:click={() => activeTab = 'step4'}
                >
                    Documents
                </button>
            </li>
            <li class="mr-2">
                <button
                        class="inline-block btn-tabs p-4 {activeTab === 'step5' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}"
                        on:click={() => activeTab = 'step5'}
                >
                    Organisation
                </button>
            </li>
        </ul>
    </div>

    <!-- Tab Contents -->
    <div class="mt-6">
        <!-- Step 2: Informations Personnelles -->
        {#if activeTab === 'step2'}
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Genre</label>
                        <select
                                bind:value={formData.genre}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Sélectionner un genre</option>
                            {#each genres as genre}
                                <option value={genre}>{genre}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Civilité</label>
                        <select
                                bind:value={formData.civilite}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Sélectionner une civilité</option>
                            {#each civilites as civilite}
                                <option value={civilite}>{civilite}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                                type="text"
                                bind:value={formData.nom}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Prénoms</label>
                        <input
                                type="text"
                                bind:value={formData.prenoms}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Nationalité</label>
                        <select
                                bind:value={formData.nationalite}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Sélectionner une nationalité</option>
                            {#each nationalites as nationalite}
                                <option value={nationalite}>{nationalite}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Date de Naissance</label>
                        <input
                                type="date"
                                bind:value={formData.dateNaissance}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Numéro</label>
                        <input
                                type="text"
                                bind:value={formData.numero}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Adresse</label>
                        <input
                                type="text"
                                bind:value={formData.address}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Lieu de Résidence</label>
                        <input
                                type="text"
                                bind:value={formData.lieuResidence}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Situation Matrimoniale</label>
                        <select
                                bind:value={formData.situation}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Sélectionner une situation</option>
                            {#each situations as situation}
                                <option value={situation}>{situation}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Diplôme</label>
                        <input
                                type="text"
                                bind:value={formData.diplome}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Date d'obtention du diplôme</label>
                        <input
                                type="date"
                                bind:value={formData.dateDiplome}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Lieu d'obtention du diplôme</label>
                        <input
                                type="text"
                                bind:value={formData.lieuDiplome}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
        {/if}

        <!-- Step 3: Informations Professionnelles -->
        {#if activeTab === 'step3'}
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Profession</label>
                        <input
                                type="text"
                                bind:value={formData.profession}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Situation Professionnelle</label>
                        <select
                                bind:value={formData.situationPro}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Sélectionner une situation</option>
                            {#each situationsPro as situation}
                                <option value={situation}>{situation}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Spécialité</label>
                        <select
                                bind:value={formData.specialite}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Sélectionner une spécialité</option>
                            {#each specialites as specialite}
                                <option value={specialite}>{specialite}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Email Professionnel</label>
                        <input
                                type="email"
                                bind:value={formData.emailPro}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Contact Professionnel</label>
                        <input
                                type="text"
                                bind:value={formData.contactPro}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Professionnel</label>
                        <input
                                type="text"
                                bind:value={formData.professionnel}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Ville d'exercice</label>
                        <input
                                type="text"
                                bind:value={formData.ville}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Date d'emploi</label>
                        <input
                                type="date"
                                bind:value={formData.dateEmploi}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
        {/if}

        <!-- Step 4: Documents -->
        {#if activeTab === 'step4'}
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Photo</label>
                        <input
                                type="file"
                                accept="image/*"
                                on:change={(e) => formData.photo = e.target.files[0]}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">CNI</label>
                        <input
                                type="file"
                                on:change={(e) => formData.cni = e.target.files[0]}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Casier judiciaire</label>
                        <input
                                type="file"
                                on:change={(e) => formData.casier = e.target.files[0]}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Diplôme</label>
                        <input
                                type="file"
                                on:change={(e) => formData.diplomeFile = e.target.files[0]}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Certificat</label>
                        <input
                                type="file"
                                on:change={(e) => formData.certificat = e.target.files[0]}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700">CV</label>
                        <input
                                type="file"
                                on:change={(e) => formData.cv = e.target.files[0]}
                                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
        {/if}

        <!-- Step 5: Organisation -->
        {#if activeTab === 'step5'}
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="col-span-2 space-y-2">
                        <label class="block text-sm font-medium text-gray-700">Appartenir à une organisation ?</label>
                        <div class="flex space-x-4">
                            <label class="inline-flex items-center">
                                <input
                                        type="radio"
                                        bind:group={formData.appartenirOrganisation}
                                        value={true}
                                        class="form-radio text-blue-600"
                                />
                                <span class="ml-2">Oui</span>
                            </label>
                            <label class="inline-flex items-center">
                                <input
                                        type="radio"
                                        bind:group={formData.appartenirOrganisation}
                                        value={false}
                                        class="form-radio text-blue-600"
                                />
                                <span class="ml-2">Non</span>
                            </label>
                        </div>
                    </div>

                    {#if formData.appartenirOrganisation}
                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Nom de l'organisation</label>
                            <input
                                    type="text"
                                    bind:value={formData.organisationNom}
                                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Numéro de l'organisation</label>
                            <input
                                    type="text"
                                    bind:value={formData.organisationNumero}
                                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div class="space-y-2">
                            <label class="block text-sm font-medium text-gray-700">Année d'adhésion</label>
                            <input
                                    type="number"
                                    bind:value={formData.organisationAnnee}
                                    class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    {/if}
                </div>
            </div>
        {/if}
    </div>

    <!-- Submit Button -->
    <div class="mt-6 flex justify-end">
        <button
                on:click={handleSubmit}
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
            Modifier
        </button>
    </div>
</div>

<style>
    .content-sec {
        margin-top: 160px;
    }
    .btn-tabs {
        color: black !important;
        font-size: 14px;
    }
</style>
<Footer></Footer>