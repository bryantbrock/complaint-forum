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
        <Heroicons icon="arrow-left" />
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