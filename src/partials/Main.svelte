<script>
  import {complaint} from '../store.js';
  import {Complaints} from '../client.js';

  const onSubmit = async () => {
    await Complaints({
      method: 'POST',
      data: {
        records: [{fields: {text: $complaint.text}}]
      }
    })
  }
</script>

<div>
  <form on:submit|preventDefault={onSubmit}>
    <input
      type="text"
      placeholder="What is on your mind?"
      bind:value={$complaint.text}
      class="rounded-lg border-2 border-gray-200 p-4 w-full"
    >
    <input
      value="Complain"
      type="submit"
      class="my-2 p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
    >
  </form>
</div>