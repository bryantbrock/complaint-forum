<script>
  import {onMount} from 'svelte';
  import {writable} from 'svelte/store';
  import {Complaints} from '../client';
  import {sortBy} from '../util/misc';
  import Complaint from '../partials/Complaint.svelte';

  const search = writable('');
  let complaints = [];

  onMount(() => getComplaints());

  const getComplaints = async () => {
    let {records: data} = await Complaints();

    complaints = sortBy('createdTime', data);
  };

  const searchForComplaints = async () => {
    ({records: complaints} = await Complaints({
      params: {
        'filterByFormula': `OR(
          SEARCH('${$search}', {title}),
          SEARCH('${$search}', {body}))
        `,
      }
    }));
  }
</script>

<div>
  <!-- Complaint form -->
  <form on:submit|preventDefault={searchForComplaints} class="flex my-2">
    <input
      type="text"
      placeholder="Search complaints..."
      bind:value={$search}
      class="rounded border border-gray-200 p-2 w-full text-sm"
    >
    <input
      value="Go"
      type="submit"
      class="ml-2 px-4 py-1 text-sm bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
    >
  </form>
  <!-- Complaints -->
  <div class="flex flex-col">
    {#each complaints as complaint}
      <Complaint value={complaint.fields}></Complaint>
    {/each}
  </div>
</div>