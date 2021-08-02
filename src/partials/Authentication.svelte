<script>
  import Modal from 'components/Modal.svelte';
  import Heroicons from 'components/Heroicons.svelte';
  import {writable} from 'svelte/store';
  import Spinner from 'components/Spinner.svelte';
  import {Users} from '../client';
  import {v4 as uuid} from 'uuid';

  const signin = writable({email: null, password: null});
  const signup = writable({firstName: null, lastName: null, email: null, password: null});

  let signinError = false;
  let signupError = false;
  let signinLoading = false;
  let signupLoading = false;

  const signIn = async () => {
    signinLoading = true
    const {email, password} = $signin;

    if (!email || !password) {
      signinError = true;
      signinLoading = false;
      return;
    }

    let {records: [user]} = await Users({
      params: {
        'maxRecords': 1,
        'filterByFormula': `AND(password = '${$signin.password}',email = '${$signin.email}')`,
        'fields%5B%5D': 'email'
      }
    });

    if (!!user) {
      const sessionId = uuid();
      const data = {
        'records': [{
          'id': user.id,
          'fields': {'sessionId': sessionId},
        }]
      };
      const {records: [success]} = await Users({method: 'PATCH', data});

      if (!!success) {
        signinError = false;
        signinLoading = false;

        localStorage.setItem('userId', user.id);
        localStorage.setItem('sessionId', sessionId);
  
        window.location.search = '?page=home';
      } else {
        signinLoading = false;
        // TODO: Show some error message
        console.error('Could not save sessionId. Please login again.')
      }
    } else {
      signinLoading = false;
      signinError = true;
      console.error('Failed to login with provided credentials.');
    }
  }

  const signUp = async () => {
    signupLoading = true;
    const {firstName, lastName, email, password} = $signup;

    if (!firstName || !lastName || !email || !password) {
      signupLoading = false;
      signupError = true;
      return;
    }

    // TODO: Require email to be unique
    let {records: [user]} = await Users({
      method: 'POST',
      data: {'records': [
        {'fields': {
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'password': password,
        }}
      ]}
    });

    if (!!user) {
      signupError = false;

      const sessionId = uuid();
      const data = {
        'records': [{
          'id': user.id,
          'fields': {'sessionId': sessionId},
        }]
      };
      const {records: success} = await Users({method: 'PATCH', data});

      if (!!success?.length) {
        signupLoading = false;
        localStorage.setItem('userId', user.id);
        localStorage.setItem('sessionId', sessionId);
  
        window.location.search = '?page=home';
      } else {
        signupLoading = false;
        // TODO: Show some error message
        console.error('Could not save sessionId. Check your network connection.')
      }
    } else {
      signupLoading = false;
      // TODO: Show some error message
      console.error('Failed to create user. Please try again.');
    }
  }
</script>

<!-- <Modal isOpen={modalIsOpen}> -->
  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded shadow">
    <div class="">

      {#if window.location.search === '?page=signin'}
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <!-- <div class="text-center mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <Heroicons icon="lock" size ={6} />
          </div> -->
          <h3 class="text-center text-lg leading-6 font-medium text-gray-900 mt-4" id="modal-title">
            Sign back in.
          </h3>
          <div class="mt-2">
            {#if signinError}
              <div class="rounded my-1 px-2 py-3 bg-red-100 text-red-500 text-sm">Unable to login with provided credentials.</div>
            {/if}
            <form on:submit|preventDefault={signIn} class="flex flex-col w-full">
              <input
                type="email"
                placeholder="Email"
                bind:value={$signin.email}
                class="rounded border border-gray-200 p-2 w-full mt-2 mx-auto"
              >
              <input
                type="password"
                placeholder="Password"
                bind:value={$signin.password}
                class="rounded border border-gray-200 p-2 w-full mt-2 mx-auto"
              >
              {#if signinLoading}
                <div class="my-4"><Spinner /></div>
              {:else}
                <input
                  value="Sign in"
                  type="submit"
                  class="my-2 p-2 bg-blue-700  text-white rounded cursor-pointer hover:bg-blue-600"
                >
              {/if}
            </form>
            <hr class="my-4 text-gray-500" >
            <div class="flex flex-col text-center">
              <span>Don't have an account? <a href="/?page=signup" class="text-blue-300 hover:text-blue-500 pt-1">Sign up.</a></span>
            </div>
          </div>
        </div>

      {:else if window.location.search === '?page=signup'}
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <!-- <div class="text-center mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <Heroicons icon="lock" size ={6} />
          </div> -->
          <h3 class="text-center text-lg leading-6 font-medium text-gray-900 mt-4" id="modal-title">
            Get started.
          </h3>
          <div class="mt-2">
            {#if signupError}
              <div class="rounded my-1 px-2 py-3 bg-red-100 text-red-500 text-sm">Please fill in all required fields.</div>
            {/if}
            <form on:submit|preventDefault={signUp} class="flex flex-col w-full">
              <input
                type="text"
                placeholder="First name"
                bind:value={$signup.firstName}
                class="rounded border border-gray-200 p-2 w-full mt-2 mx-auto"
              >
              <input
                type="text"
                placeholder="Last name"
                bind:value={$signup.lastName}
                class="rounded border border-gray-200 p-2 w-full mt-2 mx-auto"
              >
              <input
                type="email"
                placeholder="email"
                bind:value={$signup.email}
                class="rounded border border-gray-200 p-2 w-full mt-2 mx-auto"
              >
              <input
                type="password"
                placeholder="Password"
                bind:value={$signup.password}
                class="rounded border border-gray-200 p-2 w-full mt-2 mx-auto"
              >
              {#if signinLoading}
                <div class="my-4"><Spinner /></div>
              {:else}
                <input
                  value="Sign up"
                  type="submit"
                  class="my-2 p-2 bg-blue-700  text-white rounded cursor-pointer hover:bg-blue-600"
                >
              {/if}
            </form>
            <hr class="my-4 text-gray-500" >
            <div class="flex flex-col text-center">
              <span>Already have an account? <a href="/?page=signin" class="text-blue-300 hover:text-blue-500 pt-1">Sign in.</a></span>
            </div>
          </div>
        </div>
      {/if}

    </div>
  </div>
<!-- </Modal> -->

<style lang="postcss">
  input:not([type=submit]):focus {
    @apply outline-none border border-blue-400;
  }
</style>