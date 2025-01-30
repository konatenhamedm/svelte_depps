<script>

export let libelle;
export let parent;
       /*  export let lien; */
        export let descr;

</script>

<div class="content-header">
    <div class="sm:flex items-center justify-between">
        <h4 class="page-title text-2xl font-medium">{libelle}</h4>
        <div class="inline-block items-center">
            <nav>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item pr-1"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                    <li class="breadcrumb-item pr-1" aria-current="page"> {parent}</li>
                    <li class="breadcrumb-item active" aria-current="page"> {descr}</li>
                </ol>
            </nav>
        </div>
    </div>
</div>
