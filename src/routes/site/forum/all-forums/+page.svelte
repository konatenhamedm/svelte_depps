<script lang="ts">
    // Types
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import Footer from "$components/Footer.svelte";

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

    // Données des sujets
    const topics: Topic[] = [
        {
            title: "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd",
            author: "SampleName",
            date: "1 day ago",
            avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            comments: [
                {
                    author: "User1",
                    date: "1 hour ago",
                    content: "This is a comment on the first topic.",
                    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
                },
                {
                    author: "User2",
                    date: "2 hours ago",
                    content: "Another comment on the first topic.",
                    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg"
                },
                {
                    author: "User3",
                    date: "3 hours ago",
                    content: "Yet another comment on the first topic.",
                    avatarUrl: "https://randomuser.me/api/portraits/women/46.jpg"
                }
            ]
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            author: "AnotherUser",
            date: "2 days ago",
            avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
            comments: [
                {
                    author: "User4",
                    date: "4 hours ago",
                    content: "This is a comment on the second topic.",
                    avatarUrl: "https://randomuser.me/api/portraits/men/47.jpg"
                },
                {
                    author: "User5",
                    date: "5 hours ago",
                    content: "Another comment on the second topic.",
                    avatarUrl: "https://randomuser.me/api/portraits/women/48.jpg"
                }
            ]
        },
        {
            title: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            author: "YetAnotherUser",
            date: "3 days ago",
            avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
            comments: [
                {
                    author: "User6",
                    date: "6 hours ago",
                    content: "This is a comment on the third topic.",
                    avatarUrl: "https://randomuser.me/api/portraits/women/49.jpg"
                },
                {
                    author: "User7",
                    date: "7 hours ago",
                    content: "Another comment on the third topic.",
                    avatarUrl: "https://randomuser.me/api/portraits/men/50.jpg"
                }
            ]
        },
        // Ajoute d'autres topics ici...
    ];

    let selectedTopic: Topic | null = null;
    let newComment = "";

    function selectTopic(topic: Topic) {
        selectedTopic = topic;
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
</script>

<div>
    <Header {user} />
    <Slide {user} />
    <main class=" mx-auto px-4 py-8 main-div">
        <!-- En-tête du forum -->
        <header class="bg-white py-6 px-4 shadow-sm">
            <h1 class="text-4xl font-bold text-forum-purple">Discussion Forum</h1>
        </header>

        <!-- Conteneur principal du forum -->
        <div class="mt-1 flex gap-2">
            <!-- Liste des sujets -->
            <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                <div class="bg-forum-purple text-white rounded-t-lg py-4 px-6">
                    <h2 class="text-xl font-semibold">Topics</h2>
                </div>

                <div class="bg-white">
                    {#each topics as topic}
                        <div
                                class="flex items-center py-4 px-6 border-b border-gray-100 hover:bg-purple-50 transition-colors cursor-pointer"
                                on:click={() => selectTopic(topic)}
                        >
                            <!-- Avatar -->
                            <div class="flex-shrink-0 mr-4">
                                <img src={topic.avatarUrl} alt={topic.author} class="w-12 h-12 rounded-full object-cover" />
                            </div>

                            <!-- Titre et durée -->
                            <div class="flex-grow">
                                <h3 class="text-lg font-semibold text-forum-purple">{topic.title}</h3>
                                <div class="text-sm text-gray-600">{topic.date}</div>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Section des commentaires -->
            {#if selectedTopic}
                <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="bg-forum-purple text-white rounded-t-lg py-4 px-6">
                        <h2 class="text-xl font-semibold">{selectedTopic.title}</h2>
                    </div>

                    <div class="p-6">
                        <!-- Liste des commentaires -->
                        {#each selectedTopic.comments as comment}
                            <div class="flex items-start mb-6">
                                <img src={comment.avatarUrl} alt={comment.author} class="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <div class="flex items-center text-gray-600 mb-2">
                                        <span class="font-medium">{comment.author}</span>
                                        <span class="mx-2">•</span>
                                        <span>{comment.date}</span>
                                    </div>
                                    <p class="text-gray-800">{comment.content}</p>
                                </div>
                            </div>
                        {/each}

                        <!-- Formulaire de commentaire -->
                        <div class="mt-8">
                            <textarea
                                    bind:value={newComment}
                                    class="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forum-purple"
                                    placeholder="Write your comment..."
                                    rows="4"
                            ></textarea>
                            <div class="flex justify-end mt-4">
                                <button
                                        on:click={addComment}
                                        class="bg-forum-purple bg-purple-900 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                                >
                                    Publier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            {:else}

            <div class="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
                <div class="bg-forum-purple text-white rounded-t-lg py-4 px-6">
                    <h2 class="text-xl font-semibold"></h2>
                </div>

                <div class="p-6">
                    <!-- Liste des commentaires -->
                   

                  
                </div>
            </div>
            {/if}
        </div>
    </main>
    <Footer></Footer>
</div>

<style>
    .main-div {
        margin-top: 30px;
        margin-bottom: 80px;
        border: 1px solid #e5e7eb;
        background: transparent;
        border-radius: 10px;
        padding: 20rem 226px 10rem !important;
    }
</style>