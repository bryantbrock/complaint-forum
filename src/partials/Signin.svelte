<script>
  import Modal from 'components/Modal.svelte';
  import Heroicons from 'components/Heroicons.svelte';
  import {writable} from 'svelte/store';
  import {Users} from '../client';
  import {onMount} from 'svelte';

  const login = writable({email: null, password: null});
  let isOpen = false;

  onMount(() => {
    const signedIn = localStorage.getItem('userId')

    if (!signedIn) {
      isOpen = true
    }
  });

  const onSubmit = async () => {
    let {records: [user]} = await Users({
      params: {
        'maxRecords': 1,
        'filterByFormula': `SEARCH('${$login.email}', {email})`,
        'filterByFormula': `SEARCH('${$login.password}', {password})`,
        'fields%5B%5D': 'email'
      }
    });

    if (!!user) {
      console.log('logged in.');
      isOpen = false;
    } else {
      console.log('not logged in.');
    }
  }
</script>

<Modal isOpen={isOpen}>
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
        <Heroicons icon="lock" />
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title mt-4">
          Get started.
        </h3>
        <div class="mt-2">
          <form on:submit|preventDefault={onSubmit}>
            <input
              type="text"
              placeholder="Email"
              bind:value={$login.email}
              class="rounded border border-gray-200 p-2 w-10/12 mt-2 mx-auto"
            >
            <input
              type="password"
              placeholder="Password"
              bind:value={$login.password}
              class="rounded border border-gray-200 p-2 w-10/12 mt-2 mx-auto"
            >
            <input
              value="Sign in"
              type="submit"
              class="my-2 p-2 bg-blue-200 rounded cursor-pointer hover:bg-blue-300"
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</Modal>