<script>
  import {onMount} from 'svelte';
  import {Complaints} from '../client';
  import {sortBy} from '../util/misc';
  import Complaint from '../partials/Complaint.svelte';
  import Profile from '../partials/Profile.svelte';
  import Spinner from 'components/Spinner.svelte';
  import {complaints} from '../store.js';

  let timer;
  let loading = true;

  $: hasComplaints = $complaints.length > 0

  onMount(() => getComplaints());

  const getComplaints = async () => {
    if (hasComplaints) {
      return;
    }
  
    let {records: data} = await Complaints();

    complaints.set(sortBy('createdTime', data));
    loading = false;
  };

  const searchForComplaints = async value => {
    loading = true;
    const {records: values} = await Complaints({
      params: {
        'filterByFormula': `OR(
          SEARCH('${value}', LOWER(title)),
          SEARCH('${value}', LOWER(body))
        )`,
      }
    });

    $complaints = values;
    loading = false;
  }

  const debounce = value => {
		clearTimeout(timer);
		timer = setTimeout(() => searchForComplaints(value), 400);
	}
</script>

<div class="flex">
  <div class="w-full md:w-8/12">
    <!-- Debounced search -->
    <div class="mx-4">
      <input
        type="text"
        placeholder="Search complaints..."
        on:input={({target: {value}}) => debounce(value)}
        class="rounded border border-gray-200 p-3 w-full text-sm focus:outline-none focus:border focus:border-green-400"
      >
    </div>
    <!-- Complaints -->
    {#if loading}
      <div class="my-10">
        <Spinner />
      </div>
    {:else if $complaints.length > 0}
      <div class="flex flex-col m-4 shadow-sm border rounded">
        {#each $complaints as complaint, idx}
          <Complaint
            value={complaint.fields}
            customClass={
              idx === 0 ? 'rounded-t' :
              idx === $complaints.length-1 ? 'rounded-b' : ''
            }
          />
        {/each}
      </div>
    {:else}
      <div class="text-gray-500 text-center mt-6">No results found.</div>
    {/if}
  </div>
  <!-- Profile Display -->
  <div class="w-0 md:ml-2 md:w-4/12">
    <Profile />
  </div>
</div>