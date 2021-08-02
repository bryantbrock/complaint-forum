<script>
  import Heroicons from "../components/Heroicons.svelte";

  const signOut = () => {
    // TODO: clear out the session id
    localStorage.clear();
    window.location.search = '?page=signin';
  }
</script>

<div class="my-4 flex justify-between">
  {#if !!document.referrer}
    <div class="flex">
      <a 
        on:click|preventDefault={() => window.history.back()}
        href={document.referrer}
        class="flex items-center text-blue-400 mr-6 p-1 border border-blue-400 rounded"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </a>
      <!-- <a 
        on:click|preventDefault={() => window.history.forward()}
        href={document.referrer}
        class="flex items-center text-blue-400 p-1 border border-blue-400 rounded"
      >
        <Heroicons icon="arrow-right" />
      </a> -->
    </div>
  {/if}
  <div class="flex flex-col">
    <a href="/?page=home" class="font-bold text-xl">
      Complaint Forum
    </a>
  </div>
  <div>
    <div on:click={signOut} class="rounded bg-red-100 px-2 py-1 text-sm text-red-500 cursor-pointer">
      Sign out
    </div>
    <div class="flex-grow" />
  </div>
</div>