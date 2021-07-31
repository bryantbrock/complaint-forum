<script>
  import {onMount} from 'svelte';
  import {getUrlParams} from 'util/misc.js';
  import {Complaints} from '../client.js';
  import Spinner from 'components/Spinner.svelte';

  let complaint = null;
  let loading = true;

  onMount(async () => {
    const id = getUrlParams().id;

    ({fields: complaint} = await Complaints({id}));
    loading = false;
  });
</script>

<div>
  {#if loading}
    <Spinner />
  {:else}
    <div>{complaint.status}</div>
    <h1>{complaint.title}</h1>
    <p>{complaint.body}</p>
  {/if}
</div>