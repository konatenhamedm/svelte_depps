<script lang="ts">
    import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';

    export let label: string;
    export let field: any;
    export let fieldName: string;
    export let placeholder: string = "";
    export let disabled: boolean = false;
    // export let requis: boolean = false; // Si nécessaire, décommentez et utilisez correctement
</script>

<Label class="col-span-6 space-y-1 sm:col-span-3 text-black text-md">
    <span>{label}</span>
    <Input 
        name={fieldName} 
        bind:value={field} 
        class="border outline-none form-input font-normal rounded block w-full border-gray-200 text-md text-black focus:border-gray-300 focus:ring-0 bg-white" 
        placeholder={placeholder} 
        disabled={disabled}
        {...$$restProps}
    />
</Label>
