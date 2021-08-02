<script>
  import {onMount} from 'svelte';
  import Tailwind from 'components/Tailwind.svelte';
  import Home from 'pages/Home.svelte';
  import Complaint from 'pages/Complaint.svelte';
  import User from 'pages/User.svelte';
  import Footer from 'partials/Footer.svelte';
  import Header from 'partials/Header.svelte';
  import Authentication from 'partials/Authentication.svelte';
  import {getUrlParams} from 'util/misc.js';
  import {Users} from './client';

  const pages = [
    {page: 'home', Component: Home},
    {page: 'complaint', Component: Complaint},
    {page: 'user', Component: User},
    {page: 'signin', Component: Authentication},
    {page: 'signup', Component: Authentication},
  ];

  const authenticationPages = ['signin', 'signup'];
  const params = getUrlParams();
  const pageExists = pages.map(val => val.page)
    .concat(authenticationPages)
    .includes(params.page);

  if (!pageExists) {
    window.location.search = '?page=home'
  }

  onMount(async () => {
    const userId = localStorage.getItem('userId');
    const sessionId = localStorage.getItem('sessionId');
    let {records: [user]} = await Users({
      params: {
        'maxRecords': 1,
        'filterByFormula': `SEARCH('${userId}', {id})`,
        'filterByFormula': `SEARCH('${sessionId}', {sessionId})`
      }
    });

    // Redirect to signin by default if signed out
    if (!user && !authenticationPages.includes(params.page)) {
      window.location.search = '?page=signin';
    }

    // Redirect from signin/singup if signed in already
    if (!!user && authenticationPages.includes(params.page)) {
      window.location.search = '?page=home';
    }
  })
</script>

<Tailwind />

<div class="bg-gray-50 h-screen">
  <div class="px-12 max-w-screen-md mx-auto">
    <Header />
      {#each pages as {page, Component}}
        {#if page === params.page}
          <Component />
        {/if}
      {/each}
    <Footer />
  </div>
</div>
