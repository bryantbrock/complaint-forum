<script>
  import Heroicons from 'components/Heroicons.svelte';
  import {Complaints} from '../client';
import Modal from '../components/Modal.svelte';
  import {getUserName} from '../util/misc.js';

  export let value;
  export let remove;
  
  const currentUserId = localStorage.getItem('userId');

  let saved = !!value.savers?.includes(currentUserId);
  let confirmDelete = false;

  const [complaintUserId] = value.userId;
  const firstName = getUserName('first', value);
  const lastName = getUserName('last', value);

  const deleteComplaint = () => {
    remove(value.id);
    confirmDelete = false;
  }

  const saveComplaint = async () => {
    const result = Complaints({
      method: 'PATCH',
      data: {'records': [{'id': value.id, 'fields': {
        'savers': value.savers
      }}]}
    });

    if (!result) {
      console.error('Failed to save complaint. Please try again.')
    }
  }

  const toggleComplaintSaved = () => {
    if (!!value.savers) {
      value.savers = value.savers.includes(currentUserId)
        ? value.savers.filter(saver => saver !== currentUserId)
        : [currentUserId, ...value.savers];
    } else {
      value.savers = [currentUserId];
    }
    saved = !saved;

    saveComplaint();
  }
</script>

<a href={`/?page=complaint&id=${value.id}`} class="rounded shadow p-6 mt-2 hover:shadow-lg bg-white transition">
  <div class="flex flex-col pl-2 flex-grow">
    <div class="flex justify-between">
      <h1 class="font-semibold">{value.title}</h1>
      <p class="text-xs text-gray-400">{new Date(value.created).toDateString()}</p>
    </div>
    <span class="text-sm my-2">{value.body}</span>
    <div class={`flex ${currentUserId === complaintUserId && 'justify-between'}`}>
      <div class="flex">
        <div class="text-xs text-gray-400 flex mt-2">
          <a
            href={'/' + window.location.search}
            on:click|preventDefault|stopPropagation={toggleComplaintSaved}
            class="mr-1"
          >
          {#if saved}
            <Heroicons icon="heart" classes="fill-on-hover" fill={true} size={4} />
          {:else}
            <Heroicons icon="heart" classes="fill-on-hover" size={4} />
          {/if}
          </a>
          <span>{value.savers?.length || 0}</span>
        </div>
        <div class="text-xs text-gray-400 flex p-2 ml-5">
          <div class="flex items-center mr-1"><Heroicons icon="chat-alt" size={4} /></div>
          <span>{value.comments?.length || 0}</span>
        </div>
        <div class="text-xs text-gray-400 flex p-2 ml-5">
          <div class="flex items-center mr-1"><Heroicons icon="user" size={4} /></div>
          <a
            href={`?page=user&id=${complaintUserId}`}
            on:click|stopPropagation
            class="text-blue-300 hover:text-blue-400"
          >
            {firstName} {lastName}
          </a>
        </div>
      </div>
      {#if currentUserId === complaintUserId}
        <div class="text-xs text-gray-400 flex rounded-full p-2 hover:bg-gray-100" on:click|preventDefault={() => confirmDelete = true}>
          <Heroicons icon="trash" size={4} />
        </div>
      {/if}
    </div>
  </div>
</a>

<Modal isOpen={confirmDelete}>
  <div class="p-8">
    <div class="absolute right-7 top-7 p-1 rounded cursor-pointer hover:bg-gray-100" on:click={() => confirmDelete = false}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <p>Are you sure you want to delete this complaint?</p>
    <form on:submit={deleteComplaint}>
      <input
        type="submit"
        value="Delete"
        class="rounded bg-red-500 text-white py-2 px-8 cursor-pointer hover:bg-red-600 transition mt-5"
      >
    </form>
  </div>
</Modal>