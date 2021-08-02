<script>
  import Heroicons from 'components/Heroicons.svelte';
  import {Comments, Threads} from '../client';
  import {getUserName, sortBy} from '../util/misc.js';

  export let value;
  
  const currentUserId = localStorage.getItem('userId');

  let liked = !!value.likes?.includes(currentUserId);
  let showCommentThreads = false;
  let threads = [];

  const [commentUserId] = value.userId;
  const commentFirstName = getUserName('first', value);
  const commentLastName = getUserName('last', value);

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

    if (threads.length) {
      return showCommentThreads = true;
    }

    const commentId = value.id;

    const {records: res} = await Threads({params: {
      'filterByFormula': `commentId = '${commentId}'`
    }});
    threads = sortBy('createdTime', res, 'desc')


    if (!!threads) {
      showCommentThreads = true;
    } else {
      console.error('Failed to fetch comment threads.')
    }
  }
</script>

<div class="rounded shadow p-2 mt-2">
  <div class="flex flex-col flex-grow mx-2">
    <div class="flex">
      <div class="flex items-center mr-1 text-gray-400"><Heroicons icon="user-circle" /></div>
      <a
        href={`?page=user&id=${commentUserId}`}
        class="text-blue-500 hover:text-blue-600 text-sm"
      >
        {commentFirstName} {commentLastName}
      </a>
    </div>
    <span class="text-sm py-1">{value.text}</span>
    {#if showCommentThreads}
      <div class="flex flex-col border-l border-gray-200 pl-10 mt-2 mb-3">
        <a
          href={'/' + window.location.search}
          on:click|preventDefault={toggleThreads}
          class="text-gray-400 text-xs mb-3"
        >
          Hide
        </a>
        {#each threads as {fields: thread}}
          <a
            href={`?page=user&id=${thread.userId}`}
            class="text-blue-500 hover:text-blue-600 text-xs mt-2"
          >
            {getUserName('first', thread)} {getUserName('last', thread)}
          </a>
          <div class="text-xs text-gray-700">{thread.text}</div>
        {/each}
      </div>
    {/if}
    <div class="flex">
      <div class="flex text-center text-xs text-gray-400">
        <a
          href={'/' + window.location.search}
          on:click|preventDefault={toggleCommentLiked}
          class="flex items-center mr-1"
          >
          <Heroicons icon="heart" classes="fill-on-hover" fill={liked ? 'fill' : ''} size={4} />
        </a>
        <span class="mt-1">{value.likes?.length || 0}</span>
      </div>
      <div class="flex text-center text-xs text-gray-400 ml-6 hover:text-gray-800">
        <a
          href={'/' + window.location.search}
          on:click|preventDefault={toggleThreads}
          class="flex items-center mr-1"
          >
          <Heroicons icon="chat-alt-2" size={4} />
          <span class="mt-1 ml-1">{value.threads?.length || 0}</span>
        </a>
      </div>
    </div>
  </div>
</div>