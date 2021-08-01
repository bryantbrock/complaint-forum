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
    <div>{user.id}</div>
    <h1>{user.firstName}</h1>
    <p>{user.lastName}</p>
    <p>{user.email}</p>
  {/if}
</div>