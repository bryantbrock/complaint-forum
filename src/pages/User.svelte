<script>
  import {onMount} from 'svelte';
  import {getUrlParams} from 'util/misc.js';
  import {Users} from '../client.js';
  import Spinner from 'components/Spinner.svelte';

  let user = null;
  let loading = true;

  onMount(async () => {
    const id = getUrlParams().id;

    ({fields: user} = await Users({id}));
    loading = false;
  });
</script>

<div>
  {#if loading}
    <Spinner />
  {:else}
    <div class="shadow rounded w-full flex flex-col items-center justify-center p-6">
      <!-- <img> -->
      <div class="font-bold text-xl text-center">{user.firstName} {user.lastName}</div>
      <div class="text-sm text-gray-700 text-center">{user.email}</div>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-col mt-6">
        <div class="flex items-center text-lg font-semibold section">Skills</div>
        <div></div>
      </div>
      <div class="flex flex-col mt-6">
        <div class="flex items-center text-lg font-semibold section">Jobs</div>
        <div></div>
      </div>
      <div class="flex flex-col mt-6">
        <div class="flex items-center text-lg font-semibold section">Activity</div>
        <div></div>
      </div>
    </div>
  {/if}
</div>

<style lang="postcss">
  .section::after {
    content: '';
    @apply flex-grow border-b border-gray-200 ml-2;
  }
</style>