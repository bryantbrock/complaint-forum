<script>
  import { isAuthenticated, user, complaining } from "../store.js";

  const signOut = () => {
    localStorage.clear();
    user.set({});
    window.location.search = '?page=signin';
  }
</script>

<div class={`p-4 flex ${$isAuthenticated ? 'justify-between' : 'justify-center'}`}>
  <!-- {#if !!document.referrer && $isAuthenticated}
    <div class="flex">
      <a 
        on:click|preventDefault={() => window.history.back()}
        href={document.referrer}
        class="flex items-center text-green-400 mr-6 px-2 border border-green-400 rounded bg-green-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </a>
    </div>
  {/if} -->
  <div class="flex flex-col">
    <a href="/?page=home" class="font-bold text-xl">
      Complaint Forum
    </a>
  </div>
  {#if $isAuthenticated}
    <div class="flex">
      <div 
        on:click={() => complaining.set(true)}
        class="rounded bg-green-700 px-2 py-1 text-sm text-white cursor-pointer mr-2 hover:bg-green-600 transition-colors"
      >
        Complain
      </div>
      <div
        on:click={signOut}
        class="rounded bg-red-50 px-2 py-1 text-sm text-red-500 cursor-pointer border border-red-300"
      >
        Sign out
      </div>
    </div>
  {/if}
</div>