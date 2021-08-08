<script>
  import Heroicons from 'components/Heroicons.svelte';
  import Spinner from 'components/Spinner.svelte';
  import {writable} from 'svelte/store';
  import {Comments, Threads} from '../client';
  import {getUserName, sortBy} from '../util/misc.js';

  export let value;
  export let remove;
  
  const currentUserId = localStorage.getItem('userId');
  const newThread = writable({text: null});
  
  let liked = !!value.likes?.includes(currentUserId);
  let threads = [];
  let showCommentThreads = false;
  let threadSaveLoading = false;
  let threadsLoading = false;

  const [commentUserId] = value.userId;
  const commentFirstName = getUserName('first', value);
  const commentLastName = getUserName('last', value);

  const removeThread = threadId => {
    Threads({
      method: 'DELETE',
      id: threadId
    });

    threads = threads.filter(({id}) => id !== threadId)
  }

  const saveThread = async () => {
    if (!$newThread.text) {
      return;
    }

    threadSaveLoading = true;
    const {records: success} = await Threads({
      method: 'POST',
      data: {'records': [
        {'fields': {
          'text': $newThread.text,
          'commentId': [value.id],
          'userId': [currentUserId]
        }}
      ]}
    });

    if (!!success) {
      threadSaveLoading = false;
      $newThread.text = '';
      threads = [...threads, success[0]]
    } else {
      threadSaveLoading = false;
      console.error('Thread failed to save. Please try again.')
    }
  }

  const likeComment = async () => {
    const {records: [result]} = await Comments({
      method: 'PATCH',
      data: {'records': [{'id': value.id, 'fields': {
        'likes': value.likes
      }}]}
    });

    if (!result) {
      console.error('Failed to like comment. Please try again.');
    }
  }

  const toggleCommentLiked = () => {
    if (!!value.likes) {
      value.likes = value.likes.includes(currentUserId)
        ? value.likes.filter(liker => liker !== currentUserId)
        : [currentUserId, ...value.likes];
    } else {
      value.likes = [currentUserId];
    }
    liked = !liked;

    likeComment();
  }

  const toggleThreads = async () => {

    if (showCommentThreads) {
      return showCommentThreads = false;
    }

    if (threads.length || !value.threads) {
      return showCommentThreads = true;
    }

    threadsLoading = true;
    showCommentThreads = true;

    const commentId = value.id;

    const {records: res} = await Threads({params: {
      'filterByFormula': `commentId = '${commentId}'`
    }});
    threads = sortBy('createdTime', res, 'desc')


    if (!!threads) {
      threadsLoading = false;
    } else {
      threadsLoading = false;
      showCommentThreads = false;
      console.error('Failed to fetch comment threads.')
    }
  }

  console.log(liked)
</script>

<div class="rounded shadow p-2 mt-2 bg-white">
  <div class="flex flex-col flex-grow mx-2">

    <!-- Comment user -->
    <div class="flex justify-between">
      <div class="flex">
        <div class="flex items-center mr-1 text-gray-400"><Heroicons icon="user" size={4} /></div>
        <a
          href={`?page=user&id=${commentUserId}`}
          class="text-green-500 hover:text-green-600 text-sm"
        >
          {commentFirstName} {commentLastName}
        </a>
      </div>
      <div class="text-xs text-gray-400">
        <p>{new Date(value.created).toDateString()}</p>
      </div>
    </div>

    <!-- Body of comment -->
    <span class="text-sm py-2">{value.text}</span>

    <!-- Threads -->
    {#if showCommentThreads && !threadsLoading}
      <div class="flex flex-col border-l border-gray-200 pl-10 mt-2 mb-3">
        <a
          href={'/' + window.location.search}
          on:click|preventDefault={toggleThreads}
          class="text-gray-400 text-sm mb-3"
        >
          Hide
        </a>
        {#each threads as {fields: thread}}
          <div class="flex">
            <a
              href={`?page=user&id=${thread.userId}`}
              class="text-green-500 hover:text-green-600 text-xs mt-2"
            >
              {getUserName('first', thread)} {getUserName('last', thread)}
            </a>
            {#if thread.userId[0] === currentUserId}
              <div class="text-gray-400 ml-1 hover:text-gray-500 flex items-end">
                <a
                  href={'/' + window.location.search}
                  on:click|preventDefault={() => removeThread(thread.id)}
                  class="flex items-end mr-1"
                  >
                  <Heroicons icon="x" size={4} />
                </a>
              </div>
            {/if}
          </div>
          <div class="text-sm text-gray-700">{thread.text}</div>
        {/each}
        <div class="rounded border border-gray-200 p-1 mt-4 bg-white">
          <form on:submit|preventDefault={saveThread}>
            <input
              type="text"
              placeholder="New thread..."
              bind:value={$newThread.text}
              class="rounded p-1 w-full text-sm focus:outline-none mb-2"
            >
            {#if threadSaveLoading}
              <div class="my-1"><Spinner /></div>
            {:else}
              <input
                type="submit"
                value="Submit"
                class="rounded bg-green-500 text-white px-2 py-1 ml-1 text-sm cursor-pointer hover:bg-green-600 transition"
              >
            {/if}
          </form>
        </div>
      </div>
    {:else if showCommentThreads && threadsLoading}
      <div class="my-4"><Spinner /></div>
    {/if}

    <!-- Comment details -->
    <div class="flex">
      <div class="flex text-center text-sm text-gray-400">
        <a
          href={'/' + window.location.search}
          on:click|preventDefault={toggleCommentLiked}
          class="flex items-center mr-1"
          >
          {#if liked}
            <Heroicons icon="heart" classes="fill-on-hover" fill={true} size={4} />
          {:else}
            <Heroicons icon="heart" classes="fill-on-hover" size={4} />
          {/if}
        </a>
        <span class="mt-1">{value.likes?.length || 0}</span>
      </div>
      <div class="flex text-center text-sm text-gray-400 ml-6 hover:text-gray-800">
        <a
          href={'/' + window.location.search}
          on:click|preventDefault={toggleThreads}
          class="flex items-center mr-1"
          >
          <Heroicons icon="chat-alt-2" size={4} />
          <span class="mt-1 ml-1">{threads.length || value.threads?.length || 0}</span>
        </a>
      </div>
      {#if commentUserId === currentUserId}
        <div class="text-gray-400 ml-6 hover:text-gray-500 flex items-center">
          <a
            href={'/' + window.location.search}
            on:click|preventDefault={() => remove(value.id)}
            class="flex items-center mr-1"
            >
            <Heroicons icon="trash" size={4} />
          </a>
        </div>
      {/if}
    </div>
  </div>
</div>