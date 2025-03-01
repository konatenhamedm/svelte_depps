<script lang="ts">
	import InputSimple from "$components/inputs/InputSimple.svelte";
  import { BASE_URL_API_UPLOAD } from "$lib/api";
	import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
	export let open: boolean = false;
	export let sizeModal: any = "lg";
	export let data: Record<string, string> = {};
	let path = "";
	let libelle = "";

	function init(form: HTMLFormElement) {
		path = BASE_URL_API_UPLOAD + data?.path.path + "/" + data?.path.alt;
		libelle = data.libelle || "";
	}
</script>

<Modal
	bind:open
	title={Object.keys(data).length ? "Détails icon" : "Détails icon"}
	size={sizeModal}
	class="m-4 modale_general"
>
	<!-- Modal body -->
	<div class="space-y-6 p-0">
		<form action="#" use:init>
			<div class="grid grid-cols-1 gap-6">
				<InputSimple
					fieldName="libelle"
					label="Libelle"
					field={libelle}
					placeholder="entrez le libelle"
					disabled={true}
				/>
				<InputSimple
					fieldName="code"
					label="code"
					field={path}
					placeholder="entrez l'url"
					disabled={true}
				/>
			</div>
		</form>
	</div>

	<!-- Modal footer -->
	<div slot="footer" class="w-full">
		<div class="w-full grid grid-cols-3">
			<div class="col-span-2"></div>
			<div class="flex justify-end">
				<Button
					color="alternative"
					style="background-color: red !important; color: white;"
					on:click={() => (open = false)}
					type="submit">{"Fermer"}</Button
				>
			</div>
		</div>
	</div>
</Modal>
