<script lang="ts">
    import Footer from "$components/Footer.svelte";
    import Slide from "$components/Slide.svelte";
    import { apiFetch } from "$lib/api";
    import { onMount } from "svelte";

    export let data;
    let user = data?.user;

    let users: any = [];
    let loading = true;


    async function getUsers() {
        try {
            const data = await apiFetch(true, "/user");
            users = data.data.map((p) => ({
                id: p.id,
                username: p.username,
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
</script>


<div id="chatbox">
    <Slide user={user} />

    <section class="chatbox-container w-100">
        <div class="chatbox">
            <!-- Liste des utilisateurs -->
            <div class="user-list">
                <h2>Utilisateurs</h2>
                <ul>
                    {#each users as user}
                        <li>
                            <button class="bg-gradient-to-r from-gradient-start to-gradient-end" on:click={() => selectUser(user)}>{user.username}</button>
                        </li>
                    {/each}
                </ul>
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
    #chatbox {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .chatbox-container {
        display: flex;
        width: 100%;
        background-color: #f7f7f7;
        padding-top: 95px;
    }

    .chatbox {
        display: flex;
        width: 100%;
    }

    .user-list {
        width: 30%;
        background-color: #ffffff;
        border-right: 2px solid #e5e5e5;
        padding: 20px;
        height: 90vh;
        box-sizing: border-box;
        overflow-y: auto; /* Active le scroll vertical */
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
        height: 90vh;
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
</style>
