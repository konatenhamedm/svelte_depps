<script>
    import { onMount } from "svelte";

    
    onMount(() => {
        if (!window.location.href.includes('reloaded=true')) {
            window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'reloaded=true';
        }
    });
</script>