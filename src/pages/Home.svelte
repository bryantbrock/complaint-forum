<script>
  import {onMount} from 'svelte';
  import {Complaints} from '../client';
  import {sortBy} from '../util/misc';
  import Complaint from '../partials/Complaint.svelte';
  import Spinner from 'components/Spinner.svelte';
  import {complaints} from '../client.js';

  let timer;
  let loading = true;

  onMount(() => getComplaints());

  const deleteComplaint = id => {
    Complaints({method: 'DELETE', id});

    $complaints = $complaints.filter(complaint => complaint.id !== id);
  }

  const getComplaints = async () => {
    if ($complaints.length > 0) {
      return;
    }
  
    let {records: data} = await Complaints();

    $complaints = sortBy('createdTime', data);
    loading = false;
  };

  const searchForComplaints = async value => {
    loading = true;
    ({records: values} = await Complaints({
      params: {
        'filterByFormula': `OR(
          SEARCH('${value}', LOWER(title)),
          SEARCH('${value}', LOWER(body))
        )`,
      }
    }));

    $complaints.set(values);
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
  {:else if $complaints.length > 0}
    <div class="flex flex-col">
      {#each $complaints as complaint}
        <Complaint value={complaint.fields} remove={deleteComplaint}></Complaint>
      {/each}
    </div>
  {:else}
    <div class="text-gray-500 text-center mt-6">No results found.</div>
  {/if}
</div>