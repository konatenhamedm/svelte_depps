<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  interface Format {
  title: string;
  link: string;
}
    export let titre: string = "";
    export let subTitles: Format[] = [];
    

</script>



<section class="bg-img pt-150 pb-20" data-overlay="7" style="background-image: url(https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/background/bg-8.jpg);">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="text-center">
                    <h2 class="page-title text-white" style="font-size: 30px">{titre}</h2>
                    <ol class="breadcrumb bg-transparent justify-content-center">
                        <li class="breadcrumb-item"><a href="/new_site" class="text-white-50"><i class="fa fa-home"></i></a></li>

                        {#each subTitles as subTitle}
                            <li class="breadcrumb-item text-white active" aria-current="page"><a href="${subTitle.link}" class="text-white-50">/{subTitle.title}</a></li>
                        {/each}
                       <!--  <li class="breadcrumb-item text-white active" aria-current="page">Inscription</li> -->
                    </ol>
                </div>
            </div>
        </div>
    </div>
</section>