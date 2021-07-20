<script>
  import Tailwind from 'components/Tailwind.svelte';
  import Main from 'partials/Main.svelte';
  import Footer from 'partials/Footer.svelte';
  import Header from 'partials/Header.svelte';
  import Cookies from './components/Cookies.svelte';

  const inDevMode = true;
</script>

<Tailwind />

<div class="px-12 max-w-screen-xl mx-auto">
  <Header />
  <Main />
  <Footer />
</div>

<Cookies devMode={inDevMode} />
