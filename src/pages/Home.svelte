<script>
  import {onMount} from 'svelte';
  import {writable} from 'svelte/store';
  import {Complaints} from '../client';
  import {sortBy} from '../util/misc';
  import Complaint from '../partials/Complaint.svelte';

  const newComplaint = writable({text: null});
  let complaints = [];

  onMount(() => getComplaints());

  const getComplaints = async () => {
    let {records: data} = await Complaints();

    complaints = sortBy('createdTime', data);
  };

  const onSubmit = async () => {
    const {records: [complaint]} = await Complaints({
      method: 'POST',
      data: {
        records: [{fields: {
          body: $newComplaint.text,
          userId: [`${localStorage.getItem('userId')}`],
        }}]
      }
    })

    complaints = [complaint, ...complaints];
  }
</script>

<div>
  <!-- Complaint form -->
  <form on:submit|preventDefault={onSubmit}>
    <input
      type="text"
      placeholder="What is on your mind?"
      bind:value={$newComplaint.text}
      class="rounded-lg border-2 border-gray-200 p-4 w-full"
    >
    <input
      value="Complain"
      type="submit"
      class="my-2 p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
    >
  </form>
  <!-- Complaints -->
  <div class="flex flex-col">
    {#each complaints as complaint}
      <Complaint value={complaint.fields}></Complaint>
    {/each}
  </div>
</div>