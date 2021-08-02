<script>
  import {onMount} from 'svelte';
  import {writable} from 'svelte/store';
  import {Complaints} from '../client';
  import {sortBy} from '../util/misc';
  import Complaint from '../partials/Complaint.svelte';
  import Spinner from 'components/Spinner.svelte';

  let search = writable('');
  let timer;
  let complaints = [];
  let loading = true;

  onMount(() => getComplaints());

  const getComplaints = async () => {
    let {records: data} = await Complaints();

    complaints = sortBy('createdTime', data);
    loading = false;
  };

  const searchForComplaints = async value => {
    loading = true;
    ({records: complaints} = await Complaints({
      params: {
        'filterByFormula': `OR(
          SEARCH('${value}', {title}),
          SEARCH('${value}', {body}))
        `,
      }
    }));
    loading = false;
  }

  const debounce = value => {
		clearTimeout(timer);
		timer = setTimeout(() => searchForComplaints(value), 750);
	}
</script>

<div>
  <!-- Debounced search -->
  <input
    type="text"
    placeholder="Search complaints..."
    on:input={({target: {value}}) => debounce(value)}
    class="rounded border border-gray-200 p-2 w-full text-sm focus:outline-none focus:border focus:border-blue-400"
  >
  <!-- Complaints -->
  {#if loading}
    <div class="my-10">
      <Spinner />
    </div>
  {:else}
    <div class="flex flex-col">
      {#each complaints as complaint}
        <Complaint value={complaint.fields}></Complaint>
      {/each}
    </div>
  {/if}
</div>