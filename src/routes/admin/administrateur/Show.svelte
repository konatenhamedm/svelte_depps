<script lang="ts">
	import InputSimple from "$components/inputs/InputSimple.svelte";
	import { Button, Input, Label, Modal, Textarea } from "flowbite-svelte";
	export let open: boolean = false;
	export let sizeModal: any = "lg";
	export let data: Record<string, string> = {};
		let username: string = "";
  let prenoms: string = "";
  let nom: string = "";
  let phone: string = "";
  let password: string = "";
  let email: string = "";

	function init(form: HTMLFormElement) {
		nom = data?.nom;
    prenoms = data?.prenoms;
    username = data?.username;
    phone = data?.phone;
    email = data?.email;
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
			<div class="grid grid-cols-6 gap-6">
			  <InputSimple
				fieldName="username"
				label="Username"
				bind:field={username}
				placeholder="entrez le pseudo"
				class="w-full"
			  ></InputSimple>
	  
			  <InputSimple
				fieldName="email"
				label="Email"
				bind:field={email}
				placeholder="entrez email"
				class="w-full"
			  ></InputSimple>
			</div>
	  
			<div class="grid grid-cols-6 gap-6">
			  <InputSimple
				fieldName="nom"
				label="Nom"
				bind:field={nom}
				placeholder="entrez le nom"
				class="w-full"
			  ></InputSimple>
	  
			  <InputSimple
				fieldName="prenoms"
				label="Prénoms"
				bind:field={prenoms}
				placeholder="entrez le(s) prénoms"
				class="w-full"
			  ></InputSimple>
			</div>
	  
			<div class="grid grid-cols-1 gap-6">
			  <InputSimple
				fieldName="phone"
				label="Telephone"
				bind:field={phone}
				placeholder="entrez le number de telephone"
				class="w-full"
			  ></InputSimple>
			 
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
