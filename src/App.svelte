<script>
  import {onMount} from 'svelte';
  import {Users} from './client';
  import Tailwind from 'components/Tailwind.svelte';
  import Main from 'partials/Main.svelte';
  import Footer from 'partials/Footer.svelte';
  import Header from 'partials/Header.svelte';

  onMount(async () => {
    const email = 'bryantleebrock@gmail.com'
    const password = '123'
  
    // 
    let {records: [user]} = await Users({
      params: {
        'maxRecords': 1,
        'filterByFormula': `SEARCH('${email}', {email})`,
        'filterByFormula': `SEARCH('${password}', {password})`,
        'fields%5B%5D': 'email'
      }
    });

    if (!!user) {
      console.log('logged in.')
    }
  })
</script>

<Tailwind />

<div class="px-12 max-w-screen-xl mx-auto">
  <Header />
  <Main />
  <Footer />
</div>
