<script lang="ts">

import Header from "$components/_includes/new_site/Header.svelte";
import Footer from "$components/_includes/new_site/Footer.svelte";
export let data;
let user = data.user;
</script>


<Header user={user}></Header>

<!---page Title --->
<section class="bg-img pt-150 pb-50" data-overlay="7" style="background-image: url(https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/background/bg-8.jpg);">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="text-center">
                    <h2 class="page-title text-white">About us</h2>
                    <ol class="breadcrumb bg-transparent justify-content-center">
                        <li class="breadcrumb-item"><a href="#" class="text-white-50"><i class="mdi mdi-home-outline"></i></a></li>
                        <li class="breadcrumb-item text-white active" aria-current="page">About us</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</section>
<!--Page content -->
<section class="py-50 about-area">
    <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="col-lg-6 col-md-12 p-0">
                <div class="about-image">
                    <img src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/about-img1.jpg" alt="image">
                </div>
            </div>
            <div class="col-lg-6 col-md-12 p-0">
                <div class="about-content">
                    <span>About Us</span>
                    <h2>Short Story About Rhythm Hospital Since 2001</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>
                    <ul>
                        <li><i class="fa fa-check"></i> Donec cursus magna quis aliquam malesuada.</li>
                        <li><i class="fa fa-check"></i> Curabitur eleifend dui ut est dapibus, eu tempus elit feugiat.</li>
                        <li><i class="fa fa-check"></i> Mauris vel metus ac ante consectetur varius non nec velit.</li>
                        <li><i class="fa fa-check"></i> Sed malesuada augue sed dui tincidunt luctus.</li>
                        <li><i class="fa fa-check"></i> Aenean dapibus arcu et convallis sollicitudin.</li>
                        <li><i class="fa fa-check"></i> Duis efficitur ex id hendrerit maximus.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-lg-50 py-md-20">
    <div class="container">
        <div class="row mt-30">
            <div class="col-md-4">
                <a href="#" class="box text-center pull-up">
                    <div class="box-body p-50">
                        <span class="text-primary fs-60 icon-Add-user"><span class="path1"></span><span class="path2"></span></span>
                        <div class="fw-600 fs-20 mb-10 mt-25">Our Mission</div>
                        <div class="text-fade fs-16">Create an account and access your saved settings on any device.</div>
                    </div>
                </a>
            </div>
            <div class="col-md-4">
                <a href="#" class="box text-center pull-up">
                    <div class="box-body p-50">
                        <span class="text-primary fs-60 icon-Search"><span class="path1"></span><span class="path2"></span></span>
                        <div class="fw-600 fs-20 mb-10 mt-25">Our Planning</div>
                        <div class="text-fade fs-16">Don't just find. Be found. Put your CV in front of great employers.</div>
                    </div>
                </a>
            </div>
            <div class="col-md-4">
                <a href="#" class="box text-center pull-up">
                    <div class="box-body p-50">
                        <span class="text-primary fs-60 icon-Armchair"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                        <div class="fw-600 fs-20 mb-10 mt-25">Our Vision</div>
                        <div class="text-fade fs-16">Your next career move starts here. Choose Job from thousands of companies</div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>

<section class="our-mission-area py-50">
    <div class="container-fluid p-0">
        <div class="row m-0">
            <div class="col-lg-6 col-md-12 p-0">
                <div class="our-mission-content">
                    <span class="sub-title">Our Mission &amp; Vision</span>
                    <h2>Good Health, Good Life</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <ul>
                        <li>
                            <div class="icon">
                                <i class="fa fa-user-md"></i>
                            </div>
                            <span>Professional Staff</span>
                            Lorem ipsum dolor sit amet sit, consectetur adipiscing elit.
                        </li>
                        <li>
                            <div class="icon">
                                <i class="fa fa-user"></i>
                            </div>
                            <span>Newborn Care</span>
                            Lorem ipsum dolor sit amet sit, consectetur adipiscing elit.
                        </li>
                        <li>
                            <div class="icon">
                                <i class="mdi mdi-microscope"></i>
                            </div>
                            <span>Sufficient Lab Tests</span>
                            Lorem ipsum dolor sit amet sit, consectetur adipiscing elit.
                        </li>
                        <li>
                            <div class="icon">
                                <i class="mdi mdi-tooth"></i>
                            </div>
                            <span>Tooth Extraction</span>
                            Lorem ipsum dolor sit amet sit, consectetur adipiscing elit.
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6 col-md-12 p-0">
                <div class="our-mission-image mt-0 mt-lg-0 mt-md-30">
                    <img src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/mission-img1.jpg" alt="image">
                </div>
            </div>
        </div>
    </div>
    <div class="shape3">
        <img src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/3.png" alt="image">
    </div>
</section>

<section class="py-50 bg-white">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-7 col-12 text-center">
                <h1 class="mb-15">What Our Patient Say</h1>
                <hr class="w-100 bg-primary">
            </div>
        </div>
        <div class="row mt-30">
            <div class="col-12">
                <div class="owl-carousel owl-theme owl-btn-1" data-nav-arrow="true" data-nav-dots="false" data-items="1" data-md-items="1" data-sm-items="1" data-xs-items="1" data-xx-items="1">
                    <div class="item">
                        <div class="text-center">
                            <div class="bg-primary-light w-50 mx-auto rounded-circle overflow-hidden">
                                <img src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/avatar/4.jpg" class="avatar-lg w-auto" alt="">
                            </div>
                            <div class="max-w-750 mx-auto">
                                <div class="testimonial-info">
                                    <h4 class="name mb-0 mt-10">Mica Packer</h4>
                                    <p>Miami</p>
                                </div>
                                <div class="testimonial-content">
                                    <ul class="cours-star">
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                    </ul>
                                    <p class="fs-16">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="text-center">
                            <div class="bg-primary-light w-50 mx-auto rounded-circle overflow-hidden">
                                <img src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/avatar/5.jpg" class="avatar-lg w-auto" alt="">
                            </div>
                            <div class="max-w-750 mx-auto">
                                <div class="testimonial-info">
                                    <h4 class="name mb-0 mt-10">Peter Doe</h4>
                                    <p>Tampa</p>
                                </div>
                                <div class="testimonial-content">
                                    <ul class="cours-star">
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                    </ul>
                                    <p class="fs-16">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="text-center">
                            <div class="bg-primary-light w-50 mx-auto rounded-circle overflow-hidden">
                                <img src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/avatar/9.jpg" class="avatar-lg w-auto" alt="">
                            </div>
                            <div class="max-w-750 mx-auto">
                                <div class="testimonial-info">
                                    <h4 class="name mb-0 mt-10">Johen Packer</h4>
                                    <p>Miami</p>
                                </div>
                                <div class="testimonial-content">
                                    <ul class="cours-star">
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li class="active"><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                        <li><i class="fa fa-star"></i></li>
                                    </ul>
                                    <p class="fs-16">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section
    class="py-100"
    data-jarallax='{{"speed":0.4}}'
    style="background-image: url(https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/background/bg-3.jpg);"
    data-overlay="5"
>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8 col-12">
                <div class="text-center text-white">
                    <h2 class="mb-15 fs-40">Why You Choose Us</h2>
                    <h4>High Quality Health Care Services</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div class="mt-5"><a href="#" class="btn btn-primary">Contact Now!</a></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section class="py-50">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h2>Our Team</h2>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-lg-3 col-md-6">
                <div class="box">
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/avatar/375x200/1.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="text-center">
                            <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>
                            <h4 class="my-10"><a href="#">Tristan</a></h4>
                            <h6 class="user-info mt-0 mb-10 text-fade">Gastroenterologists</h6>
                            <p class="text-fade w-p85 mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3 col-md-6">
                <div class="box">
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/avatar/375x200/8.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="text-center">
                            <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>
                            <h4 class="my-10"><a href="#">Michael</a></h4>
                            <h6 class="user-info mt-0 mb-10 text-fade">Endocrinologists</h6>
                            <p class="text-fade w-p85 mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3 col-md-6">
                <div class="box">
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/avatar/375x200/2.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="text-center">
                            <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>
                            <h4 class="my-10"><a href="#">Sophia</a></h4>
                            <h6 class="user-info mt-0 mb-10 text-fade">Dermatologists</h6>
                            <p class="text-fade w-p85 mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-3 col-md-6">
                <div class="box">
                    <div class="box-header no-border p-0">
                        <a href="#">
                            <img class="img-fluid" src="https://rhythm-admin-template.multipurposethemes.com/images/front-end-img/avatar/375x200/4.jpg" alt="">
                        </a>
                    </div>
                    <div class="box-body">
                        <div class="text-center">
                            <div class="user-contact list-inline text-center">
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-facebook"><i class="fa fa-facebook"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-instagram"><i class="fa fa-instagram"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-twitter"><i class="fa fa-twitter"></i></a>
                                <a href="#" class="btn btn-circle mb-5 btn-xs btn-warning"><i class="fa fa-envelope"></i></a>
                            </div>
                            <h4 class="my-10"><a href="#">Johen Doe</a></h4>
                            <h6 class="user-info mt-0 mb-10 text-fade">Cardiologists</h6>
                            <p class="text-fade w-p85 mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="bg-light py-30">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-9 col-12">
                <div class="text-md-start text-center">
                    <h2><strong> Rhythm: </strong> fully responsive template in the market</h2>
                    <p class="mb-0">Exclusive multi-purpose lightweight responsive with powerful features.</p>
                </div>
            </div>
            <div class="col-md-3 col-12">
                <div class="text-md-right text-center mt-30 mt-md-0">
                    <a class="btn btn-primary" href="#">Purchase Now</a>
                </div>
            </div>
        </div>
    </div>
</section>

<Footer></Footer>