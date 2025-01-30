<script>
    export let message = '';
    export let type = 'info'; // Peut être 'info', 'success', 'error'
    export let duration = 5000; // Durée en millisecondes
    let isVisible = true;

    // Masquer la notification après un certain temps
    setTimeout(() => {
        isVisible = false;
    }, duration);
</script>

<style>
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        z-index: 1000;
        font-size: 1rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: opacity 0.5s ease-in-out;
    }

    .success {
        background-color: #4caf50;
    }

    .error {
        background-color: #f44336;
    }

    .info {
        background-color: #2196f3;
    }

    .hide {
        opacity: 0;
        pointer-events: none;
    }
</style>

{#if isVisible}
    <div class="notification bg-{type} {isVisible ? '' : 'hide'}">
        {message}
    </div>
{/if}
