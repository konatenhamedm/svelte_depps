<script lang="ts">
    import Footer from "$components/Footer.svelte";
    import Slide from "$components/Slide.svelte";

    export let data;
    let user = data?.user;

    let users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" }
    ];

    let selectedUser : any = null;

    interface Message {
        sender: string;
        text: string;
    }

    let messages: Message[] = [];

    function selectUser(user: any) {
        selectedUser = user;
        messages = [
            { sender: 'Alice', text: "Bonjour, comment ça va ?" },
            { sender: 'Vous', text: "Ça va bien, merci ! Et toi ?" },
            { sender: 'Alice', text: "Je vais bien, merci !" },
        ];
        setTimeout(scrollToBottom, 50);
    }

    let newMessage = '';

    function sendMessage() {
        if (newMessage.trim() !== '') {
            messages = [...messages, { sender: 'Vous', text: newMessage }];
            newMessage = '';
            setTimeout(scrollToBottom, 50);
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
                            <button class="bg-gradient-to-r from-gradient-start to-gradient-end" on:click={() => selectUser(user)}>{user.name}</button>
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- Section des messages -->
            <div class="messages-container">
                {#if selectedUser}
                    <div class="chat-container" id="chat-container">
                        <h3>Conversation avec {selectedUser.name}</h3>
                        <div class="messages">
                            {#each messages as message}
                                <div class="message" class:sent={message.sender === 'Vous'}>
                                    <div class="message-text ">{message.text}</div>
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

    .messages-container {
        width: 70%;
        display: flex;
        flex-direction: column;
        padding: 20px;
        height: 90vh;
        box-sizing: border-box;
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
        gap: 10px;
    }

    .message.sent {
        flex-direction: row-reverse;
    }

    .message-text {
        padding: 10px;
        border-radius: 8px;
        max-width: 80%;
        word-wrap: break-word;
        background-color: #e5e5e5;
    }

    .message.sent .message-text {
        background-color: #3b82f6;
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
