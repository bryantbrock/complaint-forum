<script>
  import { writable } from "svelte/store";
  import Modal from "components/Modal.svelte";
  import Spinner from "components/Spinner.svelte";
  import Heroicons from "components/Heroicons.svelte";
  import { getUrlParams } from "util/misc.js";
  import { complaints, Complaints } from '../client.js';

  const authPages = ['signin', 'signup'];
  const loggedIn = !authPages.includes(getUrlParams().page);
  const newComplaint = writable({
    title: null,
    body: null,
    tags: [],
    status: 'Open',
    employed: [],
  })

  let complaining = false;
  let complaintSaveLoading = false;
  let errorCreatingComplaint = false;
  let inputClass = "rounded border border-gray-200 p-2 my-1 w-full focus:outline-none focus:border focus:border-blue-400"

  const createComplaint = async () => {
    const {title, body, tags, status, employed} = $newComplaint;

    if (!title || !body) {
      return errorCreatingComplaint = true;
    }

    errorCreatingComplaint = false;
    complaintSaveLoading = true;

    const {records: result} = await Complaints({
      method: 'POST',
      data: {'records': [
        {
          "fields": {
            "title": title,
            "body": body,
            "tags": tags.split(","),
            "status": status,
            "employed": employed,
            "userId": [localStorage.getItem("userId")]
          }
        }
      ], "typecast": true}
    })

    $complaints = result.concat($complaints);

    complaintSaveLoading = false;
    complaining = false;
  }

  const signOut = () => {
    // TODO: clear out the session id
    localStorage.clear();
    window.location.search = '?page=signin';
  }
</script>

<div class={`py-4 flex ${loggedIn ? 'justify-between' : 'justify-center'}`}>
  {#if !!document.referrer && loggedIn}
    <div class="flex">
      <a 
        on:click|preventDefault={() => window.history.back()}
        href={document.referrer}
        class="flex items-center text-blue-400 mr-6 p-1 border border-blue-400 rounded bg-blue-50"
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
  {#if loggedIn}
    <div class="flex">
      <div on:click={() => complaining = true} class="rounded bg-blue-700 px-2 py-1 text-sm text-white cursor-pointer mr-2 hover:bg-blue-600 transition-colors">
        Complain
      </div>
      <div on:click={signOut} class="rounded bg-red-50 px-2 py-1 text-sm text-red-500 cursor-pointer border border-red-300">
        Sign out
      </div>
    </div>
  {/if}
</div>

<!-- Modal for building a complaint -->
<Modal isOpen={complaining}>
  <div class="p-8">
    <div class="absolute right-7 top-7 p-1 rounded cursor-pointer hover:bg-gray-100" on:click={() => complaining = false}>
      <Heroicons icon="x" size={6} />
    </div>
    <form on:submit|preventDefault={createComplaint}>
      <h1 class="font-bold text-xl mb-4 text-gray-700">New Complaint</h1>
      <p class="mb-6 text-sm text-gray-500">Tell people whatever problem you are dealing with, dreams you want to make a reality, and random odd balls you want to throw at your local public.</p>
      {#if errorCreatingComplaint}
        <div class="rounded my-1 px-2 py-3 bg-red-100 text-red-500 text-sm">Please fill out at least the title and description.</div>
      {/if}
      <input
        type="text"
        placeholder="Title"
        bind:value={$newComplaint.title}
        class={inputClass}
      >
      <textarea
        placeholder="Description"
        bind:value={$newComplaint.body}
        class={inputClass}
      />
      <input
        type="text"
        placeholder="e.g. 'software,excel,facebook', etc."
        bind:value={$newComplaint.tags}
        class={inputClass}
      >
      <h3 class="text-gray-700 font-semibold text-lg mt-4 mb-2">Status</h3>
      <div class="px-2 py-1 bg-gray-200 w-min rounded cursor-pointer">
        <select
          bind:value={$newComplaint.status}
          class="bg-gray-200 focus:outline-none cursor-pointer"
        >
          <option>Open</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
      </div>
      <div class="flex items-center text-xs text-gray-400 mt-6 encourage">Ready, set...</div>
      {#if complaintSaveLoading}
        <div class="my-3"><Spinner /></div>
      {:else}
        <input
          type="submit"
          value="Create"
          class="rounded bg-blue-700 text-white py-2 cursor-pointer hover:bg-blue-800 transition mt-5 w-full"
        >
      {/if}
    </form>
  </div>
</Modal>

<style lang="postcss">
  .encourage::before {
    content: '';
    @apply flex-grow border-b border-gray-200 mr-2;
  }
  .encourage::after {
    content: '';
    @apply flex-grow border-b border-gray-200 ml-2;
  }
</style>