<script lang="ts">
  import { A } from "flowbite-svelte";
  import { stringify } from "postcss";


export let title :any = "";
export let valeur :any = "";
export let descr :any = "";
</script>

<div>
    <div class="box pull-up">
      <div class="box-body">
        <div class="flex justify-between items-center">
          <div class="bs-5 ps-10 border-primary">
            <p class="text-fade mb-10">{title}</p>
            <h2 class="my-0 fw-700 text-3xl">{valeur}</h2>
          </div>
          <div class="icon">
            <i
              class="fa-solid fa-users bg-primary-light me-0 fs-24 rounded-3"
            ></i>
          </div>
        </div>
        <p class="text-success mb-0 mt-10">
          <i class="fa-solid fa-arrow-up"></i> {descr}
        </p>
      </div>
    </div>
  </div>
  