<script>
  import Modal from 'components/Modal.svelte';
  import Heroicons from 'components/Heroicons.svelte';
  import {writable} from 'svelte/store';
  import {Users} from '../client';

  const signin = writable({email: null, password: null});
  const signup = writable({firstName: null, lastName: null, email: null, password: null});

  const authenticationPages = ['?page=signin', '?page=signup']
  const modalIsOpen = authenticationPages.includes(window.location.search);

  const signOut = () => {
    // TODO: clear out the session id
    localStorage.clear();
    window.location.search = '?page=signin';
  }

  const signIn = async () => {
    let {records: [user]} = await Users({
      params: {
        'maxRecords': 1,
        'filterByFormula': `SEARCH('${$signin.email}', {email})`,
        'filterByFormula': `SEARCH('${$signin.password}', {password})`,
        'fields%5B%5D': 'email'
      }
    });

    if (!!user) {
      window.location.search = '?page=home'

      localStorage.setItem('userId', user.id)
      localStorage.setItem('userData', JSON.stringify(user.fields))
    } else {
      // TODO: Show some error message
      console.log('not logged in.');
    }
  }

  const signUp = async () => {
    // TODO: Require email to be unique
    let {records: [user]} = await Users({
      method: 'POST',
      data: {'records': [
        {'fields': {
          'firstName': $signup.firstName,
          'lastName': $signup.lastName,
          'email': $signup.email,
          'password': $signup.password,
        }}
      ]}
    });

    if (!!user) {
      window.location.search = '?page=home'

      localStorage.setItem('userId', user.id)
      localStorage.setItem('userData', JSON.stringify(user.fields))
    } else {
      // TODO: Show some error message
      console.log('couldnt create user.');
    }
  }
</script>

<div on:click={signOut} class="absolute top-5 right-10 rounded bg-gray-200 p-2 cursor-pointer">
  Sign out
</div>

<Modal isOpen={modalIsOpen}>
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
        <Heroicons icon="lock" />
      </div>

      {#if window.location.search === '?page=signin'}
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title mt-4">
            Sign back in.
          </h3>
          <div class="mt-2">
            <form on:submit|preventDefault={signIn}>
              <input
                type="text"
                placeholder="Email"
                bind:value={$signin.email}
                class="rounded border border-gray-200 p-2 w-10/12 mt-2 mx-auto"
              >
              <input
                type="password"
                placeholder="Password"
                bind:value={$signin.password}
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

      {:else if window.location.search === '?page=signup'}
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title mt-4">
            Get started.
          </h3>
          <div class="mt-2">
            <form on:submit|preventDefault={signUp}>
              <input
                type="text"
                placeholder="First name"
                bind:value={$signup.firstName}
                class="rounded border border-gray-200 p-2 w-10/12 mt-2 mx-auto"
              >
              <input
                type="text"
                placeholder="Last name"
                bind:value={$signup.lastName}
                class="rounded border border-gray-200 p-2 w-10/12 mt-2 mx-auto"
              >
              <input
                type="text"
                placeholder="Email"
                bind:value={$signup.email}
                class="rounded border border-gray-200 p-2 w-10/12 mt-2 mx-auto"
              >
              <input
                type="password"
                placeholder="Password"
                bind:value={$signup.password}
                class="rounded border border-gray-200 p-2 w-10/12 mt-2 mx-auto"
              >
              <input
                value="Sign up"
                type="submit"
                class="my-2 p-2 bg-blue-200 rounded cursor-pointer hover:bg-blue-300"
              >
            </form>
          </div>
        </div>
      {/if}

    </div>
  </div>
</Modal>