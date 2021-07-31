<script>
  import {onMount} from 'svelte';
  import Tailwind from 'components/Tailwind.svelte';
  import Home from 'pages/Home.svelte';
  import Complaint from 'pages/Complaint.svelte';
  import Footer from 'partials/Footer.svelte';
  import Header from 'partials/Header.svelte';
  import Authentication from 'partials/Authentication.svelte';
  import {getUrlParams} from 'util/misc.js';

  const pages = [
    {page: 'home', Component: Home},
    {page: 'complaint', Component: Complaint},
  ];

  const authenticationPages = ['signin', 'signup'];
  const params = getUrlParams();
  const pageExists = pages.map(val => val.page)
    .concat(authenticationPages)
    .includes(params.page);

  onMount(() => {
    const userId = localStorage.getItem('userId');
    const sessionId = localStorage.getItem('sessionId');

    // TODO: check to make sure the session id is valid

    // Redirect to signin by default if signed out
    if (!userId && !authenticationPages.includes(params.page)) {
      window.location.search = '?page=signin';
    }

    // Redirect from signin/singup if signed in already
    if (userId && authenticationPages.includes(params.page)) {
      window.location.search = '?page=home';
    }
  })
</script>

<Tailwind />

<div class="px-12 max-w-screen-lg mx-auto">
  <Header />
    {#each pages as {page, Component}}
      {#if page === params.page}
        <Component />
      {/if}
    {/each}

    {#if !pageExists}
      <div>Not Found</div>
    {/if}
  <Footer />

  <!-- Signin & Signup modals -->
  <Authentication />
</div>
