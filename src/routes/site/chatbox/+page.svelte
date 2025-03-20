<script lang="ts">
    import Footer from "$components/Footer.svelte";
    import Slide from "$components/Slide.svelte";
    import { apiFetch } from "$lib/api";
    import { onMount } from "svelte";
    import UserListSkeleton from "$components/_skeletons/userList.svelte";
  import Header from "$components/Header.svelte";
    import {goto} from "$app/navigation";


    export let data;
    let user = data?.user;

    let users: any = [];
    let loading = true;


    async function getUsers() {
        try {
            const data = await apiFetch(true, "/user");
            users = data.data.map((p) => ({
                id: p.id,
                username: p.email,
                nom: p.typeUser == "PROFESSIONNEL" ? p.personne.nom + " " + p.personne.prenoms : p.typeUser == "ETABLISSEMENT" ? p.email : p.email
            }));
            console.log("data returned", users);
        } catch (error) {
            console.error("Erreur lors de la récupération des usernames:", error);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        getUsers();
    });

    let selectedUser: any = null;

    interface Message {
        sender: string;
        text: string;
    }

    let messages: Message[] = [];

    async function getMessages(sender: string, receiver: string) {
        try {
            const data = await apiFetch(true, `/message/get/all/${sender}/${receiver}`);
            if (data.data) {  // Vérification que data.data existe
                messages = data.data.map((msg: any) => {
                    const isSentByCurrentUser = msg.sender.id === user.id;

                    return {
                        sender: isSentByCurrentUser ? 'Vous' : msg.sender.username,
                        text: msg.message,
                    };
                });
                console.log("Messages après mapping:", messages);
                setTimeout(scrollToBottom, 50);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des messages:", error);
        }
    }

    function selectUser(userCurrent: any) {
        selectedUser = userCurrent;
        messages = [];
        if (user?.id && selectedUser.id) {
            getMessages(user.id, selectedUser.id);
        }
    }

    let newMessage = '';

    async function sendMessage() {
        if (newMessage.trim() !== '') {
            const messageToSend = newMessage;

            // Ajout immédiat du message à l'interface
            messages = [...messages, { sender: 'Vous', text: messageToSend }];
            newMessage = '';
            setTimeout(scrollToBottom, 50);

            let data = {
                sender: user?.id,
                receiver: selectedUser?.id,
                message: messageToSend,
                userUpdate: selectedUser?.id
            };

            console.log("Message envoyé - données:", data);

            try {
                const response = await apiFetch(true, "/message/create", "POST", data);
                console.log("Réponse du serveur après envoi:", response);
            } catch (error) {
                console.error("Erreur lors de l'envoi du message:", error);
                // En cas d'erreur, on pourrait vouloir retirer le message de l'interface
                messages = messages.slice(0, -1);
            }
        }
    }



    function scrollToBottom() {
        const chatContainer = document.getElementById('chat-container');
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    function navigateToDashboard() {
        goto("/site/dashboard");
    }
</script>


<div id="chatbox">
    <Header user={user} />
    <Slide user={user} />
    <div class="file-ariane flex items-center space-x-2 text-sm text-gray-600 mb-4">
        <button on:click={navigateToDashboard} class="flex items-center hover:text-blue-600">
            <!-- Icône SVG pour "Tableau de bord" -->
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
            >
                <path
                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                />
            </svg>
            Tableau de bord
        </button>
        <span>/</span>
        <span class="text-gray-800">Liste des conversations</span> <!-- Nom de la page actuelle -->
    </div>
    <section class="mx-auto px-8 py-8 main-div" style="margin-top: 90px !important;">
       <!-- <header class="bg-white py-6 px-4 shadow-sm pb-2">
            <h1 class="text-4xl font-bold text-forum-purple">Liste des conversations</h1>
          </header>-->
      
        <div class="chatbox flex space-x-2 pt-2">
            <!-- Liste des utilisateurs -->
             
            <div class="user-list">
                <h2>Utilisateurs</h2>
                {#if loading}
                    <UserListSkeleton/>
                {:else}
                    <ul>
                        {#each users as user}
                            <li>
                                <button class="bg-gradient-to-r from-gradient-start to-gradient-end" on:click={() => selectUser(user)}>{user.nom}</button>
                            </li>
                        {/each}
                    </ul>
                {/if}
            </div>

            <!-- Section des messages -->
            <div class="messages-container">
                {#if selectedUser}
                    <div class="chat-container" id="chat-container">
                        <h3>Conversation avec {selectedUser.username}</h3>
                        <div class="messages">
                            {#each messages as message}
                                <div class="message" class:sent={message.sender === 'Vous'} class:received={message.sender !== 'Vous'}>
                                    <div class="message-text">{message.text}</div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <div class="input-container">
                        <input type="text" bind:value={newMessage} placeholder="Écrire un message..." />
                        <button on:click={sendMessage}>Envoyer</button>
                    </div>
                {:else}
                    <div class="no-user-selected">
                        <p>Sélectionnez un utilisateur pour commencer la conversation.</p>
                    </div>
                {/if}
            </div>
        </div>
    </section>

    <Footer />
</div>

<style>
    

    .chatbox {
        display: flex;
        width: 100%;
    }

    .user-list {
        width: 30%;
        background-color: #ffffff;
        border-right: 2px solid #e5e5e5;
        padding: 20px;
        height: 70vh;
        box-sizing: border-box;
        overflow-y: auto;
    }


    .user-list h2 {
        font-size: 1.5rem;
        margin-bottom: 20px;
    }

    .user-list button {
        width: 100%;
        padding: 10px;
        background-color: #f0f0f0;
        border: none;
        text-align: left;
        font-size: 1rem;
        border-radius: 5px;
        margin-bottom: 10px;
        transition: background-color 0.3s;
    }

    .user-list button:hover {
        background-color: #ddd;
    }

    
    .chatbox {
        margin-top: 10px;
        display: flex;
       
        
        /* height: 70vh; */
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
    }

    .chat-container {
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin: 20px 0;
    }

    .messages {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }


    .message {
        display: flex;
        max-width: 70%;
        padding: 10px;
        border-radius: 15px;
        word-wrap: break-word;
    }

    .message.sent {
        align-self: flex-end;
        background-color: #5290d3;
        color: white;
        border-top-right-radius: 0;
    }

    .message.received {
        align-self: flex-start;
        background-color: #e5e5e5;
        color: black;
        border-top-left-radius: 0;
    }

    .message-text {
        padding: 10px;
        border-radius: 8px;
        max-width: 100%;
        word-wrap: break-word;
        background-color: #e5e5e5;
    }

    .messages-container {
        width: 70%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        height: 70vh;
        box-sizing: border-box;
    }

    .message.sent .message-text {
        background:#5290d3;
        color: white;
    }

    .input-container {
        padding: 10px;
        display: flex;
        gap: 10px;
        border-top: 1px solid #e5e5e5;
        background-color: #fff;
    }

    .input-container input {
        flex: 1;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ddd;
        font-size: 1rem;
    }

    .input-container button {
        padding: 10px 20px;
        background-color: #3b82f6;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .input-container button:hover {
        background-color: #2563eb;
    }

    .no-user-selected {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        font-size: 1.2rem;
        color: #888;
    }

    .main-div {
    margin-top: 30px;
    margin-bottom: 40px;
    border: 1px solid #e5e7eb;
    background: transparent;
    border-radius: 10px;
    padding: 10rem 232px 0rem !important;
  }

  .selected {
    background-color: #3498db;
    color: white;
  }

    .file-ariane {
        position: absolute;
        width: 100%;
        top: 112px;
        background: #4292cecc;
        padding: 22px;
        color: white;
        font-size: 14px;
    }

    .file-ariane span {
        color: white;
    }
</style>
