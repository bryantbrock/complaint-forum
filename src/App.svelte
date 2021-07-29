<script>
  import {onMount} from 'svelte';
  import Tailwind from 'components/Tailwind.svelte';
  import Main from 'partials/Main.svelte';
  import Footer from 'partials/Footer.svelte';
  import Header from 'partials/Header.svelte';
  import Authentication from 'partials/Authentication.svelte';

  const authenticationPages = ['?page=signin', '?page=signup']

  onMount(() => {
    const signedIn = localStorage.getItem('userId');

    // Redirect to signin by default if signed out
    if (!signedIn && !authenticationPages.includes(window.location.search)) {
      window.location.search = '?page=signin';
    }

    // Redirect from signin/singup
    if (signedIn && authenticationPages.includes(window.location.search)) {
      window.location.search = '?page=home';
    }
  })
</script>

<Tailwind />

<div class="px-12 max-w-screen-xl mx-auto">
  <Header />
  <Main signedIn={window.location.search === '?page=home'} />
  <Footer />

  <!-- Signin & Signup modals -->
  <Authentication />
</div>
