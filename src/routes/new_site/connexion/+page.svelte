<script>
import Header from "$components/_includes/new_site/Header.svelte";
import Footer from "$components/_includes/new_site/Footer.svelte";
    import { onMount } from "svelte";
    export let data;
    let user = data?.user;

onMount(() => {
        if (!window.location.href.includes('reloaded=true')) {
            window.location.href = window.location.href + (window.location.href.includes('?') ? '&' : '?') + 'reloaded=true';
        }
    });
</script>

<Header user={user}></Header>


<!---page Title --->
<section class="bg-img pt-150 pb-20" data-overlay="7" style="background-image: url(https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/background/bg-8.jpg);">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="text-center">						
                    <h2 class="page-title text-white">Login</h2>
                    <ol class="breadcrumb bg-transparent justify-content-center">
                        <li class="breadcrumb-item"><a href="#" class="text-white-50"><i class="fa fa-home"></i></a></li>
                        <li class="breadcrumb-item text-white active" aria-current="page">Login</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</section>
<!--Page content -->

<section class="py-50">
    <div class="container">
        <div class="row justify-content-center g-0">
            <div class="col-lg-5 col-md-5 col-12">
                <div class="box box-body">
                    <div class="content-top-agile pb-0 pt-20">
                        <h2 class="text-primary">Let's Get Started</h2>
                        <p class="mb-0">Sign in to continue to Rhythm.</p>							
                    </div>
                    <div class="p-40">
                        <form action="#" method="post">
                            <div class="form-group">
                                <div class="input-group mb-15">
                                    <span class="input-group-text bg-transparent"><i class="fa fa-user"></i></span>
                                    <input type="text" class="form-control ps-15 bg-transparent" placeholder="Username">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="input-group mb-15">
                                    <span class="input-group-text  bg-transparent"><i class="fa fa-lock"></i></span>
                                    <input type="password" class="form-control ps-15 bg-transparent" placeholder="Password">
                                </div>
                            </div>
                              <div class="row">
                                <div class="col-6">
                                  <div class="checkbox ms-5">
                                    <input type="checkbox" id="basic_checkbox_1">
                                    <label for="basic_checkbox_1" class="form-label">Remember Me</label>
                                  </div>
                                </div>
                                <!-- /.col -->
                                <div class="col-6">
                                 <div class="fog-pwd text-end">
                                    <a href="javascript:void(0)" class="hover-warning"><i class="fa fa-locked"></i> Forgot pwd?</a><br>
                                  </div>
                                </div>
                                <!-- /.col -->
                                <div class="col-12 text-center">
                                  <button type="submit" class="btn btn-info w-p100 mt-15">SIGN IN</button>
                                </div>
                                <!-- /.col -->
                              </div>
                        </form>	
                        <div class="text-center">
                            <p class="mt-15 mb-0">Don't have an account? <a href="https://rhythm-admin-template.multipurposethemes.com/front-end/register.html" class="text-warning ms-5">Register</a></p>
                        </div>	
                    </div>
                </div>								

              <!--   <div class="text-center">
                  <p class="mt-20">- Login With -</p>
                  <p class="d-flex gap-items-2 mb-0 justify-content-center">
                      <a class="btn btn-social-icon btn-round btn-facebook" href="#"><i class="fa fa-facebook"></i></a>
                      <a class="btn btn-social-icon btn-round btn-twitter" href="#"><i class="fa fa-twitter"></i></a>
                      <a class="btn btn-social-icon btn-round btn-instagram" href="#"><i class="fa fa-instagram"></i></a>
                    </p>	
                </div> -->
            </div>
        </div>
    </div>
</section>	

<Footer></Footer>

