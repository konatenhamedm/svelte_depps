<script lang="ts">
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import Footer from "$components/Footer.svelte";
  import { onMount } from "svelte";
    import {BASE_URL_API_UPLOAD} from "$lib/api";

    type Comment = {
        author: string;
        date: string;
        content: string;
        avatarUrl: string;
    };

    type Topic = {
        id: number;
        title: string;
        author: string;
        date: string;
        avatarUrl: string;
        comments: Comment[];
    };

    export let data;
    let user = data?.user;

    let topics: Topic[] = [];

    let selectedTopic: Topic | null = null;
    let newComment = "";

    // Charger les forums depuis l'API
    async function fetchForums() {
        try {
            const response = await fetch("https://depps.leadagro.net/api/forum/actif");
            const result = await response.json();

            if (result.code === 200 && Array.isArray(result.data)) {
                topics = result.data.map((forum: any) => ({
                    id: forum.id,
                    title: forum.titre,
                    author: "Anonyme", // L'API ne fournit pas d'auteur pour le topic
                    date: "Récemment", // À adapter si l'API fournit une date
                    avatarUrl: forum.length > 0 ? `https://depps.leadagro.net/${forum.avis[0].user.avatar.path}/${forum.avis[0].user.avatar.alt}` : "https://randomuser.me/api/portraits/men/1.jpg",
                    comments: forum.avis.map((avis: any) => ({
                        author: avis.user.username,
                        date: "Il y a peu", // Modifier selon les besoins
                        content: avis.contenu,
                        avatarUrl: BASE_URL_API_UPLOAD+`${avis.user.avatar.path}/${avis.user.avatar.alt}`
                    }))
                }));
            }
        } catch (error) {
            console.error("Erreur lors du chargement des forums :", error);
        }
    }

    function selectTopic(topic: Topic) {
        selectedTopic = topic;
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("selectedTopic", JSON.stringify(topic));
        }
    }

    async function addComment() {
        if (selectedTopic && newComment.trim() !== "") {
            try {
                // Envoi de l'avis à l'API
                const response = await fetch("https://depps.leadagro.net/api/avis/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contenu: newComment,
                        forum: String(selectedTopic.id),
                        userUpdate: String(user.id)
                    })
                });

                const result = await response.json();

                if (result.code === 200) {
                    // Mise à jour des commentaires localement après l'ajout réussi
                    selectedTopic.comments.push({
                        author: user.name,
                        date: "Just now", // Date à adapter si nécessaire
                        content: newComment,
                        avatarUrl: BASE_URL_API_UPLOAD+`${result.user.avatar.path}/${result.user.avatar.alt}`

                    });
                    newComment = "";
                } else {
                    console.error("Erreur lors de l'ajout du commentaire:", result.message);
                }
            } catch (error) {
                console.error("Erreur lors de l'envoi du commentaire:", error);
            }
        }
    }

    onMount(() =>{
        fetchForums();
        console.log("content Data", user);
    })
</script>


    <Header {user} />
    <Slide {user} />
    
    <main class="mx-auto px-8 py-8 main-div" style="padding-top: 200px">
       
        <header class="bg-white py-6 px-4 shadow-sm pb-2">
            <h1 class="text-4xl font-bold text-forum-purple">Discussion Forum</h1>
        </header>

        <!-- Conteneur principal avec les sujets et les avis -->
        <div class="flex space-x-2 pt-2">
            <!-- Liste des sujets -->
            <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                <div class="bg-forum-purple text-white rounded-t-lg py-4 px-6">
                    <h2 class="text-xl font-semibold">Topics</h2>
                </div>
            
                <div class="bg-white h-[400px] overflow-y-auto">
                    {#each topics as topic}
                        <div
                            class="flex items-center py-4 px-6 border-b border-gray-100 hover:bg-purple-50 transition-colors cursor-pointer topic {selectedTopic && selectedTopic.title === topic.title ? 'selected' : ''}"
                            on:click={() => selectTopic(topic)}
                        >
                            <div class="flex-shrink-0 mr-4">
                                <img src={topic.avatarUrl} alt={topic.author} class="w-12 h-12 rounded-full object-cover" />
                            </div>
                            <div class="flex-grow">
                                <h3 class="text-lg font-semibold text-forum-purple">{topic.title}</h3>
                                <div class="text-sm text-gray-600">{topic.date}</div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Affichage des avis -->
            {#if selectedTopic}
                <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="bg-gray-100 text-black rounded-t-lg py-4 px-6">
                        <h2 class="text-xl font-semibold">{selectedTopic.title}</h2>
                        <p class="text-sm text-gray-600">By {selectedTopic.author} - {selectedTopic.date}</p>
                    </div>

                    <div class="p-6 h-[300px] overflow-y-auto">
                        {#each selectedTopic.comments as comment}
                            <div class="flex items-start space-x-4 mb-4">
                                <img src={comment.avatarUrl} alt={comment.author} class="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <p class="text-sm font-semibold">{comment.author} <span class="text-gray-500 text-xs">({comment.date})</span></p>
                                    <p class="text-gray-700">{comment.content}</p>
                                </div>
                            </div>
                        {/each}

                        {#if selectedTopic.comments.length === 0}
                            <p class="text-gray-500 text-center">Aucun commentaire pour ce sujet.</p>
                        {/if}
                    </div>

                    <!-- Champ pour ajouter un commentaire -->
                    <div class="p-6 border-t bg-gray-50 grid ">

                        <textarea name="avis" id="avis" cols="30" rows="4"  class="w-full border rounded-lg p-2" 
                        placeholder="Ajoutez un commentaire..." 
                        bind:value={newComment}
                        on:keydown={(e) => e.key === 'Enter' && addComment()}></textarea>
                        <button 
                            class="mt-2 bg-green-400 text-red-500 px-4 py-2 rounded-lg w-full"
                            on:click={addComment}
                        >
                            Publier
                        </button>
                    </div>
                </div>
            {:else}

            <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                <div class="flex items-start space-x-4 mb-4">
                   
                    <div>
                       
                    </div>
                </div>
                <p class="text-gray-500 text-center">Veillez choisir un sujet.</p>

                <!-- Champ pour ajouter un commentaire -->
                
            </div>
            {/if}
        </div>

    </main>
    
    <Footer />


<style>
    .main-div {
        margin-top: 30px;
        margin-bottom: 80px;
        border: 1px solid #e5e7eb;
        background: transparent;
        border-radius: 10px;
        padding: 20rem 316px 10rem !important;
    }

    .selected {
    background-color: #3498db;
    color: white;
}
</style>
