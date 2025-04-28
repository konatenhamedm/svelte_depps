<script>
	import Sub_header  from '$components/_includes/new_site/Sub_header.svelte';
    import Footer from '$components/_includes/new_site/Footer.svelte';
    import Header from '$components/_includes/new_site/Header.svelte';

    export let data;
  let user = data?.user;

</script>

<Header user={user}></Header>

<Sub_header titre="Mot de passe oublié" subTitles={[{ title: "Réinitialisez votre mot de passse", link: "/new_site/reset_password" }]}></Sub_header>


<section class="py-50">
    <div class="container">
        <div class="row justify-content-center g-0">
            <div class="col-lg-4 col-md-4 col-12">
                <div class="box box-body mb-0">
                    <div class="content-top-agile pb-0 pt-20">
                        <h2 class="text-primary">Récupérer le mot de passe</h2>							
                    </div>
                    <div class="p-40">
                        <form action="https://rhythm-admin-template.multipurposethemes.com/front-end/index.html" method="post">
                            <div class="form-group">
                                <div class="input-group mb-15">
                                    <span class="input-group-text bg-transparent"><i class="fa fa-envelope"></i></span>
                                    <input type="email" class="form-control ps-15 bg-transparent" placeholder="Votre Email">
                                </div>
                            </div>
                              <div class="row">
                                <div class="col-12 text-center">
                                  <button type="submit" class="btn btn-info w-p100 mt-15">Soumettre</button>
                                </div>
                              </div>
                        </form>		
                    </div>
                </div>		
            </div>
        </div>
    </div>
</section>	
<Footer></Footer>

