<script>
  import {onMount} from 'svelte';
  import {Users} from './client';
  import Tailwind from 'components/Tailwind.svelte';
  import Main from 'partials/Main.svelte';
  import Footer from 'partials/Footer.svelte';
  import Header from 'partials/Header.svelte';
  import Signin from 'partials/Signin.svelte';
</script>

<Tailwind />

<div class="px-12 max-w-screen-xl mx-auto">
  <Header />
  <Main />
  <Footer />

  <!-- Modal -->
  <Signin />
</div>
