<script>
    import Slide from "$components/Slide.svelte";
    import Footer from "$components/Footer.svelte";

    let files = [
        { name: "Nom du rapport_Q1.csv", size: "15 MB", progress: 100 },
        { name: "Nom du rapport_Q2.csv", size: "15 MB", progress: 80 },
        { name: "Nom du rapport_Q3.csv", size: "15 MB", progress: 40 },
    ];

    export let data;
    let user = data?.user;

    let uploading = true;
    function attachFiles() {
        uploading = false;
    }

    function removeFile(index) {
        files = files.filter((_, i) => i !== index);
    }

    let fileInput;

    function triggerFileInput() {
        fileInput.click();
    }

    function handleFileUpload(event) {
        const newFiles = Array.from(event.target.files).map(file => ({
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            progress: 0
        }));
        files = [...files, ...newFiles];
    }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files).map(file => ({
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            progress: 0
        }));
        files = [...files, ...droppedFiles];
    }

    function allowDrop(event) {
        event.preventDefault();
    }
</script>

<div id="guide-user">
    <Slide user={user} />
    <div class="max-w-[100rem] mx-auto bg-white shadow-lg rounded-lg p-6 main-div">
        <h2 class="text-lg font-semibold">Télécharger et joindre des fichiers</h2>
        <p class="text-sm text-gray-500">Formats pris en charge : csv, xls, xlsx, pdf</p>

        <!-- Zone de glisser-déposer -->
        <div
                class="border-2 border-dashed border-gray-300 rounded-lg mt-4 p-6 flex flex-col items-center text-center cursor-pointer"
                on:click={triggerFileInput}
                on:dragover={allowDrop}
                on:drop={handleDrop}
        >
            <input
                    type="file"
                    accept=".csv,.xls,.xlsx,.pdf"
                    multiple
                    bind:this={fileInput}
                    class="hidden"
                    on:change={handleFileUpload}
            />

            <div class="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-[#52c8e9] to-[#7158be] rounded-full">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v12m0 0l3-3m-3 3l-3-3m12 5a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h1m10 0h1a2 2 0 012 2v6"></path>
                </svg>
            </div>
            <p class="mt-2 text-[#4b9bd8] font-medium">Cliquez pour télécharger ou faites glisser et déposez</p>
            <p class="text-xs text-gray-400">Taille maximale du fichier : 50 MB.</p>
        </div>

        <!-- Liste des fichiers -->
        <div class="mt-4 space-y-3">
            {#each files as file, index}
                <div class="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 flex items-center justify-center bg-green-100 rounded-full">
                            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 12h16m-7 4h7"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium">{file.name}</p>
                            <p class="text-xs text-gray-500">{file.size}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div class="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div class="bg-gradient-to-r from-[#52c8e9] to-[#7158be] h-full" style="width: {file.progress}%"></div>
                        </div>
                        <button on:click={() => removeFile(index)} class="text-red-500 hover:text-red-700">
                            ✕
                        </button>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Boutons -->
        <div class="flex justify-end mt-6 space-x-3">
            <button class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg bg-black hover:bg-gray-100">Annuler</button>
            <button on:click={attachFiles} class="px-4 py-2 text-white rounded-lg bg-[#4b9bd8] hover:bg-blue-600">
                Joindre les fichiers
            </button>
        </div>
    </div>
    <Footer />
</div>

<style>
    .main-div {
        margin-top: 170px;
        margin-bottom: 130px;
    }
</style>
