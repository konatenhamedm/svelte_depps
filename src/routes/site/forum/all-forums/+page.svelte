<script lang="ts">
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import Footer from "$components/Footer.svelte";
  import { onMount } from "svelte";

    type Comment = {
        author: string;
        date: string;
        content: string;
        avatarUrl: string;
    };

    type Topic = {
        title: string;
        author: string;
        date: string;
        avatarUrl: string;
        comments: Comment[];
    };

    export let data;
    let user = data?.user;

    const topics: Topic[] = [
        {
            title: "At vero eos et accusam et justo duo dolores et ea rebum.",
            author: "SampleName",
            date: "1 day ago",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            comments: [
                {
                    author: "User1",
                    date: "1 hour ago",
                    content: "This is a comment on the first topic.",
                    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
                }
            ]
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            author: "AnotherUser",
            date: "2 days ago",
            avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
            comments: []
        }
    ];

    let selectedTopic: Topic | null = null;
    let newComment = "";

    // Vérifier si on est bien côté client avant d'accéder à localStorage
    function loadSelectedTopic() {
        if (typeof window !== "undefined" && window.localStorage) {
            const storedTopic = localStorage.getItem("selectedTopic");
            if (storedTopic) {
                const parsedTopic = JSON.parse(storedTopic);
                selectedTopic = topics.find(t => t.title === parsedTopic.title) || null;
            }
        }
    }

    function selectTopic(topic: Topic) {
        selectedTopic = topic;
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("selectedTopic", JSON.stringify(topic));
        }
    }

    function addComment() {
        if (selectedTopic && newComment.trim() !== "") {
            selectedTopic.comments.push({
                author: user?.name || "Anonymous",
                date: "Just now",
                content: newComment,
                avatarUrl: user?.avatarUrl || "https://randomuser.me/api/portraits/men/1.jpg"
            });
            newComment = "";
        }
    }

    // Charger le sujet sélectionné après le rendu côté client
    onMount(() => {
        loadSelectedTopic();
    });
</script>


    <Header {user} />
    <Slide {user} />
    
    <main class="mx-auto px-4 py-8 main-div" style="padding-top: 200px">
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

                    <!-- Liste des commentaires -->
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
                       <!--  <input 
                            type="text" 
                            class="w-full border rounded-lg p-2" 
                            placeholder="Ajoutez un commentaire..." 
                            bind:value={newComment}
                            on:keydown={(e) => e.key === 'Enter' && addComment()}
                        /> -->

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
        padding: 2rem;
    }

    .selected {
    background-color: #3498db;
    color: white;
}
</style>
