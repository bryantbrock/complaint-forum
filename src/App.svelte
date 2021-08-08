<script>
  import {onMount} from 'svelte';
  import Tailwind from 'components/Tailwind.svelte';
  import Home from 'pages/Home.svelte';
  import Complaint from 'pages/Complaint.svelte';
  import User from 'pages/User.svelte';
  import Footer from 'partials/Footer.svelte';
  import Complain from 'partials/Complain.svelte';
  import Header from 'partials/Header.svelte';
  import Authentication from 'partials/Authentication.svelte';
  import {getUrlParams} from 'util/misc.js';
  import {isAuthenticated} from './store.js';
  import {getUser} from './actions.js';
  import {publicPages} from './constants.js';

  const pages = [
    {page: 'home', Component: Home},
    {page: 'complaint', Component: Complaint},
    {page: 'user', Component: User},
    {page: 'signin', Component: Authentication},
    {page: 'signup', Component: Authentication},
  ];  

  const params = getUrlParams();
  const pageExists = pages.map(val => val.page).includes(params.page);

  // Redirect to home on 404
  if (!pageExists) {
    window.location.search = '?page=home';
  }

  onMount(async () => {
    await getUser();

    // Redirect to 'signin' by default if signed out
    if (!$isAuthenticated && !publicPages.includes(params.page)) {
      window.location.search = '?page=signin';
    }

    // Redirect from signin/singup if signed in already
    if ($isAuthenticated && publicPages.includes(params.page)) {
      window.location.search = '?page=home';
    }
  })
</script>

<Tailwind />

<div class="bg-gray-100 min-h-screen base">

  <!-- Static views -->
  <div class="max-w-screen-lg mx-auto">
    <Header />
      {#each pages as {page, Component}}
        {#if page === params.page}
          <Component />
        {/if}
      {/each}
    <Footer />
  </div>

  <!-- Modal views -->
  <Complain />
</div>