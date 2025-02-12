<script lang="ts">
    import Footer from "$components/Footer.svelte";
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import { onMount } from "svelte";
    import type { User } from "../../../types";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { BASE_URL_API_UPLOAD } from "$lib/api";
  
   
  
    export let data; // Récupérer les données du layout
    let user = data?.user;
  // Exemple de données pour les utilisateurs et les messages
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

  // Exemple de conversation avec deux utilisateurs
  function selectUser(user: any) {
    selectedUser = user;
    // Messages simulés pour la conversation entre l'utilisateur actuel et la personne sélectionnée
    messages = [
      { sender: 'Alice', text: "Bonjour, comment ça va ?" },
      { sender: 'Vous', text: "Ça va bien, merci ! Et toi ?" },
      { sender: 'Alice', text: "Je vais bien, merci !" },
    ];
    // Scroll jusqu'en bas immédiatement après la sélection de l'utilisateur
    setTimeout(scrollToBottom, 50); // Retarder un peu pour laisser le DOM se mettre à jour
  }

  let newMessage = '';

  // Fonction pour envoyer un message
  function sendMessage() {
    if (newMessage.trim() !== '') {
      messages = [...messages, { sender: 'Vous', text: newMessage }];
      newMessage = '';
      setTimeout(scrollToBottom, 50); // Retarder un peu pour laisser le DOM se mettre à jour
    }
  }

  // Fonction pour faire défiler vers le bas de la conversation
  function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  

  </script>
  
  <div
    id="pointer-ring"
    style="border-color: rgb(82, 200, 233); padding: 25px; transform: translate(203px, 610px);"
  ></div>
  <div
    id="pointer-dot"
    style="border-color: rgb(113, 88, 190); transform: translate(228px, 635px);"
  ></div>
  <div id="">
   <!--  <Header user={user} /> -->
    <Slide user={user} />
    <style>
      .tablo:not(:last-child) {
        margin-bottom: 35px;
      }
      .blinking_live {
        animation: blink-live 2s cubic-bezier(0, 0.2, 0.8, 1) infinite;
      }
  
      @keyframes blink-live {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .container-div {
        position: relative;
        width: 100%;
        height: 300px;
        background-size: cover;
        background-position: center;
        display: flex;
        border-radius: 20px;
        justify-content: center;
        align-items: center;
      }
  
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        background: #092962b5;
        z-index: 1;
      }
  
      .text {
        position: absolute;
        bottom: 20px;
        left: 20px;
        color: white;
        font-size: 38px;
        z-index: 2;
      }
      .col-md-4 {
        margin-bottom: 20px;
      }
      .row > * {
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: 20px;
        padding-left: calc(var(--bs-gutter-x) * 0.5);
        margin-top: var(--bs-gutter-y);
      }
  
      @media only screen and (max-width: 600px) {
        .hakkimizda-bolumu-anasayfa1 {
          padding-top: 150px;
        }
      }
  
      @media only screen and (min-width: 600px) {
        .hakkimizda-bolumu-anasayfa1 {
          padding-top: 20px;
        }
      }
      @keyframes blink {
        0% {
          background-color: red;
        }
        50% {
          background-color: transparent;
        }
        100% {
          background-color: red;
        }
      }
  
      .badge-blink {
        animation: blink 1s infinite;
        padding: 5px 10px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
      }
    </style>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
  
    <section class="hakkimizda-bolumu-anasayfa1">
      <div class="container">
        <div
          class="tablo--1-ve-2 masqueur à effet de révélation d'image de projet wow animated"
          style="visibility: visible;"
        >
        <div class="flex h-screen">
            <!-- Liste des utilisateurs (Colonne gauche) -->
            <div class="w-1/4 bg-gray-100 p-4 border-r">
              <h2 class="text-xl font-bold mb-4">Utilisateurs</h2>
              <ul>
                {#each users as user}
                  <li class="mb-2">
                    <button
                      on:click={() => selectUser(user)}
                      class="w-full text-left bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                    >
                      {user.name}
                    </button>
                  </li>
                {/each}
              </ul>
            </div>
          
            <!-- Section des messages (Colonne droite) -->
            <div class="w-3/4 flex flex-col">
              {#if selectedUser}
                <div class="flex-1 p-4 overflow-y-auto bg-white flex h-screen" id="chat-container">
                  <h2 class="text-xl font-bold mb-4">Conversation avec {selectedUser.name}</h2>
                  <div class="space-y-4">
                    {#each messages as message}
                      <div class="flex items-start space-x-2">
                        {#if message.sender === 'Vous'}
                          <!-- Message de l'utilisateur actuel -->
                          <div class="ml-auto text-right">
                            <div class="bg-blue-500 text-white p-3 rounded-lg max-w-xs shadow-lg">
                              {message.text}
                            </div>
                          </div>
                        {:else}
                          <!-- Message de l'autre utilisateur -->
                          <div class="text-left">
                            <div class="bg-gray-200 p-3 rounded-lg max-w-xs shadow-lg">
                              {message.text}
                            </div>
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </div>
          
                <!-- Zone de saisie de message -->
                <div class="p-4 bg-gray-100 border-t">
                  <div class="flex">
                    <input
                      type="text"
                      bind:value={newMessage}
                      placeholder="Écrire un message..."
                      class="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      on:click={sendMessage}
                      class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              {:else}
                <div class="flex-1 flex items-center justify-center">
                  <p class="text-xl text-gray-500">Sélectionnez un utilisateur pour commencer la conversation.</p>
                </div>
              {/if}
            </div>
          </div>
          
          
        </div>
      </div>
    </section>
  
    <style>
      .footerss p {
        display: flex;
        flex-wrap: wrap;
        justify-content: start !important;
        align-items: start !important;
      }
      h2.h2-baslik-footer.h-yazi-margin-kucuk,
      .footer__list,
      .footer__sosyal {
        display: flex;
        flex-wrap: wrap;
        justify-content: start !important;
        align-items: start !important;
      }
      

       /* Style personnalisé pour la chatbox */
       #chat-container {
             /*  max-height: 88vh; */ /* Limiter la hauteur de la conversation */
            }
          
            /* Style des messages */
            .bg-blue-500 {
              background-color: #3b82f6; /* Bleu de WhatsApp */
            }
          
            .bg-gray-200 {
              background-color: #f3f4f6; /* Gris pour les messages entrants */
            }
          
            .shadow-lg {
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre légère */
            }
          
            /* Animation de défilement doux */
            #chat-container {
              scroll-behavior: smooth;
            }
  
  
    </style>
    <Footer />
  </div>
  