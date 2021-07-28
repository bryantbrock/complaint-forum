<script>
  import {onMount} from 'svelte';
  import {writable} from 'svelte/store';
  import {Complaints} from '../client';
  import {sortBy} from '../util/misc';

  const newComplaint = writable({text: null});
  const user = writable({});

  let complaints = [];

  onMount(async () => {
    let {records: data} = await Complaints();

    ([$user] = [].filter(user => user.fields.email === 'bryantleebrock@gmail.com'));
    complaints = sortBy('createdTime', data);
  })

  const onSubmit = async () => {
    const {records: [complaint]} = await Complaints({
      method: 'POST',
      data: {
        records: [{fields: {
          text: $newComplaint.text,
          userId: $user.id,
        }}]
      }
    })

    complaints = [complaint, ...complaints];
  }
</script>

<div>

  {#if $user.fields}
    <div>Welcome, {$user.fields.firstName}</div>
  {/if}

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

  <div>
    {#each complaints as complaint}
      <div>{complaint.fields.text}</div>
    {/each}
  </div>

</div>