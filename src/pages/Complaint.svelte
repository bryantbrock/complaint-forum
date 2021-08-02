<script>
  import {onMount} from 'svelte';
  import {getUrlParams} from 'util/misc.js';
  import {Complaints, Comments} from '../client.js';
  import Spinner from 'components/Spinner.svelte';
  import Comment from 'partials/Comment.svelte';

  const statusColors = {
    Open: 'bg-green-100',
    Pending: 'bg-yellow-100',
    Closed: 'bg-red-100'
  }

  let complaint = null;
  let comments = [];
  let complaintLoading = true;
  let commentsLoading = true;

  const getComments = async id => {
    ({records: comments} = await Comments({params: {
        'filterByFormula': `complaintId = '${id}'`
      }}));
    commentsLoading = false;
  }

  onMount(async () => {
    const id = getUrlParams().id;

    ({fields: complaint} = await Complaints({id}));
    complaintLoading = false;

    if (complaint.comments?.length) {
      getComments(id);
    } else {
      commentsLoading = false;
    }
  });
</script>

<div>
  {#if complaintLoading}
    <Spinner />
  {:else}
    <div class="pt-4">
      <div class="mb-12">
        <span class={`rounded-lg py-1 px-2 ${statusColors[complaint.status]}`}>{complaint.status}</span>
        <h1 class="mt-2 text-lg font-bold">{complaint.title}</h1>
        <p>{complaint.body}</p>
      </div>

      {#if commentsLoading}
        <Spinner />
      {:else if comments.length}
        <div>
          <div class="flex items-center text-sm text-gray-600 comments">Comments</div>
          {#each comments as {fields}}
            <Comment value={fields} />
          {/each}
        </div>
      {:else}
        <div class="text-center text-sm text-gray-500">No comments to show.</div>
      {/if}
    </div>
  {/if}
</div>

<style lang="postcss">
  .comments::after {
    content: '';
    @apply flex-grow border-b border-gray-200 ml-2;
  }
</style>