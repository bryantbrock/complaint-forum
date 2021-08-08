<script>
  import {onMount} from 'svelte';
  import {writable} from 'svelte/store';
  import {getUrlParams, sortBy} from 'util/misc.js';
  import {Complaints, Comments} from '../client.js';
  import Spinner from 'components/Spinner.svelte';
  import Comment from 'partials/Comment.svelte';

  const newComment = writable({text: null})
  const comments = writable([]);
  const statusColors = {
    Open: 'bg-green-50 text-green-600 border border-green-400',
    Pending: 'bg-yellow-50 text-yellow-600 border border-yellow-400',
    Closed: 'bg-red-50 text-red-600 border border-red-400'
  }

  let complaint = null;
  let complaintLoading = true;
  let commentsLoading = true;
  let commentSaveLoading = false;

  const removeComment = commentId => {
    Comments({
      method: 'DELETE',
      id: commentId
    });

    $comments = $comments.filter(({id}) => id !== commentId)
  }

  const saveComment = async () => {
    if (!$newComment.text) {
      return;
    }

    commentSaveLoading = true;
    const {records: success} = await Comments({
      method: 'POST',
      data: {'records': [
        {'fields': {
          'text': $newComment.text,
          'complaintId': [getUrlParams().id],
          'userId': [localStorage.getItem('userId')]
        }}
      ]}
    });

    if (!!success) {
      commentSaveLoading = false;
      $newComment.text = '';
      $comments = [...$comments, success[0]]
    } else {
      commentSaveLoading = false;
      console.error('Comment failed to save. Please try again.')
    }
  }

  const getComments = async id => {
    const {records: res} = await Comments({params: {
      'filterByFormula': `complaintId = '${id}'`
    }});
    $comments = sortBy('createdTime', res, 'desc');
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
    <div class="pt-4 mx-4">
      <div class="mb-12">
        <span class={`rounded-lg py-1 px-2 ${statusColors[complaint.status]}`}>{complaint.status}</span>
        <h1 class="mt-2 text-lg font-bold">{complaint.title}</h1>
        <p>{complaint.body}</p>
      </div>

      <div class="flex items-center mb-2 text-sm text-gray-600 comments">Comments</div>
      <div class="rounded border border-gray-200 p-2 bg-white mb-4">
        <form on:submit|preventDefault={saveComment}>
          <input
            type="text"
            placeholder="New comment..."
            bind:value={$newComment.text}
            class="rounded p-2 w-full text-sm focus:outline-none mb-2"
          >
          {#if commentSaveLoading}
            <div class="my-2"><Spinner /></div>
          {:else}
            <input
              type="submit"
              value="Comment"
              class="rounded bg-green-500 text-white px-2 py-1 text-sm cursor-pointer hover:bg-green-600 transition ml-2 mb-2"
            >
          {/if}
        </form>
      </div>
      {#if commentsLoading}
        <Spinner />
      {:else if $comments.length}
        <div>
          {#each $comments as {fields}}
            <Comment value={fields} remove={removeComment} />
          {/each}
        </div>
      {:else}
        <div class="mt-4 text-center text-sm text-gray-500">No comments to show.</div>
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