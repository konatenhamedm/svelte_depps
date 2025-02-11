<script lang="ts">
  import { onMount } from "svelte";
import type { User } from "../../types";


import { goto } from '$app/navigation';

async function logout() {
    await fetch('/auth/logout', { method: 'POST' });
    goto('/login'); // Redirection après déconnexion
}
  
</script>

<header class="main-header">
    <div class="flex items-center logo-box justify-start" style="background-color: white;">  
        <!-- Logo -->

     
        <a href="/admin" class="logo">
            <!-- logo-->
             <div class="logo-mini w-40">
                 <span class="light-logo"><img src="/_files/logo-depps.png" alt="logo"></span>
                 <span class="dark-logo"><img src="" alt="logo"></span>
             </div>
             <div class="logo-lg">
                 <span class="light-logo text-black " style="font-size: 18px;">DEPPS</span>
                 <span class="dark-logo"><img src="" alt="logo"></span>
             </div>
        </a>    
   </div>
   <!--  <div class="flex items-center logo-box justify-start">  
        
         <a href="index.html" class="logo">
            
              <div class="logo-mini w-60">
                  <span class="light-logo"><img src="https://mydepps.ci/_files/logo-depps.png" alt="logo"></span>
                  <span class="dark-logo"><img src="https://mydepps.ci/_files/logo-depps.png" alt="logo"></span>
              </div>
              <div class="logo-lg">
                  <span class="light-logo"></span>
                  <span class="dark-logo"></span>
              </div>
         </a>    
    </div>   --> 
    <!-- Header Navbar --> 
    <nav class="navbar navbar-static-top flow-root">
         <!-- Sidebar toggle button-->
         <div class="float-left">
            <ul class="header-megamenu nav flex items-center">
                <li class="btn-group nav-item inline-flex">
                 <a href="#" class="waves-effect waves-light nav-link push-btn bg-blue-600" data-toggle="push-menu" role="button">
                     <i data-feather="menu"></i>
                 </a>
                </li>
                <li class="btn-group inline-flex max-[991px]:hidden min-[992px]:inline-flex">
                 <div class="app-menu">
                     <div class="search-bx mx-5">
                        <form>
                            <div class="flex input-group">
                             <input type="search" class="form-control" placeholder="Search">
                             <div class="input-group-append">
                                    <button class="btn" type="submit" id="button-addon3"><i class="icon-Search"><span class="path1"></span><span class="path2"></span></i></button>
                             </div>
                            </div>
                        </form>
                     </div>
                 </div>
                </li>
            </ul> 
         </div>
     
        <div class="navbar-custom-menu r-side inline-flex items-center float-right">
             <ul class="nav navbar-nav inline-flex items-center">
                <li class="dropdown notifications-menu inline-flex rounded-md">
                    <label class="switch">
                         <a class="waves-effect waves-light btn-primary-light svg-bt-icon">
                            <input type="checkbox" data-mainsidebarskin="toggle" id="toggle_left_sidebar_skin">
                            <span class="switch-on"><i data-feather="moon"></i></span>
                            <span class="switch-off"><i data-feather="sun"></i></span>
                         </a>    
                    </label>
                </li>
                <li class="dropdown notifications-menu btn-group ">
                     <a id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="btn-primary-light svg-bt-icon hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" title="Notifications" type="button"><div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full top-[1.4rem] end-[0.7rem] dark:border-gray-900">8</div><i data-feather="bell"></i><div class="pulse-wave"></div>
                     </a>

                     <!-- Dropdown menu -->
                     <div id="dropdown" class="dropdown-menu z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow !w-max dark:bg-gray-700">
                             <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                 <li class="header">
                                        <div class="p-20 border-b">
                                             <div class="flexbox">
                                                    <div>
                                                         <div class="text-xl mb-0 mt-0">Notifications</div>
                                                    </div>
                                                    <div>
                                                         <a href="#" class="text-danger">Clear All</a>
                                                    </div>
                                             </div>
                                        </div>
                                 </li>
                               
                                 <li class="footer p-3 text-center border-t">
                                     <a href="component_notification.html">View all</a>
                                </li>
                             </ul>
                     </div>
                </li>
               
           
                <!-- User Account-->
                <li class="btn-group d-xl-inline-flex d-none">
                     <a href="#" id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider-2" class="justify-center btn-primary-light hover:text-white svg-bt-icon hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm !px-px !py-px text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"><img src="../../../images/avatar/avatar-6.png" class="avatar rounded-full !h-11 !w-11 mt-1" alt="" /></a>
                     <!-- Dropdown menu -->
                     <div id="dropdownDivider-2" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                             <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 drop-shadow-lg" aria-labelledby="dropdownDividerButton">
                                <!-- dlmjdk -->
                                 <li on:click={logout}>
                                     <a on:click={logout} href="javascript:void(0)" class="items-center m-0 text-base flex px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"><i class="fa fa-user-circle-o me-3 text-xl" aria-hidden="true" > </i>Se déconnecter</a>
                                 </li>
                             </ul>
                     </div>  
                </li>
             </ul>
        </div>
    </nav>
</header>