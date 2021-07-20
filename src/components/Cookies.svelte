<script>
  export let devMode;
  let accepted = false;

  if(localStorage.getItem('cookie')) {
    accepted = true;
  }

  const setAccepted = () => {
    localStorage.setItem('cookie', 'somerandomcookiestring')
    accepted = true;
  }
  const setUnaccepted = () => {
    localStorage.removeItem('cookie')
    accepted = false;
  }
</script>

{#if !accepted}
  <div class="rounded-md shadow absolute bottom-6 w-full px-16">
    <div class="p-3 flex justify-between">
      <span class="max-w-2xl text-xs">
        IKEA US and our digital partners use cookies on this site. 
        Some are strictly necessary to run the site and others are used for measuring site usage, 
        enabling personalisation and for advertising, marketing and social media.
      </span>
      <button on:click={setAccepted} class="text-md rounded-2xl py-1 px-12 bg-gray-800 text-white">Ok</button>
    </div>
  </div>

{:else}
  {#if devMode}
    <button on:click={setUnaccepted} class="absolute bottom-6 left-6 p-2 rounded bg-gray-800 text-white text-xs">Unaccept cookies</button>
  {/if}
{/if}

