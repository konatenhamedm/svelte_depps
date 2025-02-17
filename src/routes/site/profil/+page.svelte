<script>
    import { onMount } from "svelte";
    import Footer from "$components/Footer.svelte";
    import Header from "$components/Header.svelte";
    import Slide from "$components/Slide.svelte";
    import {apiFetch} from "$lib/api";

    let user = {
        nom: "",
        prenoms: "",
        phone: "",
        email: "",
        password: "",
        avatar: null
    };

    let message = "";
    let avatarPreview = "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg";

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            user.avatar = file;
            avatarPreview = URL.createObjectURL(file);
        }
    }

    async function updateUser() {
        const formData = new FormData();
        formData.append("nom", user.nom);
        formData.append("prenoms", user.prenoms);
        formData.append("phone", user.phone);
        formData.append("email", user.email);
        formData.append("password", user.password);
        if (user.avatar) {
            formData.append("avatar", user.avatar);
        }
        formData.append("userUpdate", "1");

        try {
            const response = await apiFetch(true,"/user/membre/update/1","POST",formData)
            const result = await response.json();
            if (response.ok) {
                message = "Modification réussie !";
            } else {
                message = `Erreur : ${result.message || "Échec de la modification."}`;
            }
        } catch (error) {
            message = "Erreur de connexion au serveur.";
        }
    }
</script>

<Header />
<Slide />

<main style="padding-top: 200px">
    <section class="iletisim-form-alani">
        <div class="tablo">
            <div class="tablo--1-ve-2">
                <h2 class="h2-baslik-anasayfa-ozel h-yazi-margin-kucuk">Informations & Accès</h2>
                <form on:submit|preventDefault={updateUser} class="form update_customer">
                    <div>
                        <div class="dropify-wrapper">
                            <input type="file" class="dropify" name="avatar" accept="image/*" on:change={handleFileUpload}>
                            <img src="{avatarPreview}" alt="Avatar" class="dropify-preview" style="width: 100px; height: 100px; border-radius: 50%;">
                        </div>
                    </div>
                    <br><br>

                    <div class="tablo">
                        <div class="tablo--1-ve-2">
                            <div class="form__grup">
                                <input type="text" class="form__input" bind:value={user.nom} placeholder="Nom" required>
                                <label class="form__label">Nom</label>
                            </div>
                            <div class="form__grup">
                                <input type="text" class="form__input" bind:value={user.prenoms} placeholder="Prénom" required>
                                <label class="form__label">Prénom</label>
                            </div>
                        </div>
                        <div class="tablo--1-ve-2">
                            <div class="form__grup">
                                <input type="tel" class="form__input" bind:value={user.phone} placeholder="Téléphone" required>
                                <label class="form__label">Téléphone</label>
                            </div>
                            <div class="form__grup">
                                <input type="email" class="form__input" bind:value={user.email} readonly placeholder="E-mail" required>
                                <label class="form__label">E-mail</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="form__grup">
                            <input type="password" class="form__input" bind:value={user.password} placeholder="Mot de passe">
                            <label class="form__label">Nouveau mot de passe</label>
                        </div>
                    </div>

                    <div class="form__grup">
                        <button class="buton buton--kirmizi" style="width:100%">MODIFIER</button>
                        <p style="color: green;">{message}</p>
                        <br><br>
                        <a href="paiements" class="buton buton--kirmizi text-center" style="width:100%; background:black">HISTORIQUE DE PAIEMENT</a>
                    </div>
                </form>
            </div>
        </div>
    </section>
</main>

<Footer />

<style>
    .form__grup {
        margin-bottom: 15px;
    }
    .buton {
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .dropify-preview {
        display: block;
        margin-top: 10px;
    }
</style>
