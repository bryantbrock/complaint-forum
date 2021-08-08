<script>
  import Heroicons from 'components/Heroicons.svelte';
  import Modal from '../components/Modal.svelte';
  import { Complaints } from '../client';
  import { getUserName } from '../util/misc.js';
  import { complaining, complaintValues, complaints } from '../store';

  export let value;
  export let customClass;
  
  const currentUserId = localStorage.getItem('userId');

  let saved = !!value.savers?.includes(currentUserId);
  let confirmDelete = false;
  let headerTextColor = 'text-gray-800';

  const [complaintUserId] = value.userId;
  const firstName = getUserName('first', value);
  const lastName = getUserName('last', value);

  const editComplaint = () => {
    complaintValues.set(value);
    complaining.set(true);
  }

  const deleteComplaint = () => {
    Complaints({method: 'DELETE', id: value.id});

    complaints.set($complaints.filter(complaint => complaint.id !== value.id));
    confirmDelete = false;
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

    Complaints({
      method: 'PATCH',
      data: {'records': [{'id': value.id, 'fields': {'savers': value.savers}}]}
    });
  }

  const handleMouseOver = () => headerTextColor = 'text-green-700';
  const handleMouseLeave = () => headerTextColor = 'text-gray-800';
</script>

<a
  href={`/?page=complaint&id=${value.id}`}
  class={`border-b border-gray-200 p-6 bg-white hover:bg-gray-50 ${customClass}`}
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseLeave}
>
  <div class="flex flex-col pl-2 flex-grow">
    <div class="flex justify-between">
      <div class={`font-semibold ${headerTextColor}`}>{value.title}</div>
      <p class="text-xs text-gray-400">{new Date(value.created).toDateString()}</p>
    </div>
    <div class="flex">
      <span class="text-xs font-semibold mt-1 text-gray-500">{value.payment}-price: {value.amount ? `$${value.amount}` : 'Unspecified'}</span>
    </div>
    <span class="text-sm my-2">{value.body}</span>
    <div class="my-1">
      {#each value.tags as tag}
        <span class="px-2 py-1 font-light rounded-lg bg-gray-100 text-sm mr-2">{tag}</span>
      {/each}
    </div>
    <div class={`flex ${currentUserId === complaintUserId && 'justify-between'}`}>
      <div class="flex">
        <div class="text-xs text-gray-400 flex mt-2">
          <a
            href={'/' + window.location.search}
            on:click|preventDefault|stopPropagation={toggleComplaintSaved}
            class="mr-1"
          >
            <Heroicons icon="heart" classes="fill-on-hover" fill={saved} size={4} />
          </a>
          <span>{value.savers?.length || 0}</span>
        </div>
        <div class="text-xs text-gray-400 flex p-2 ml-3">
          <div class="flex items-center mr-1"><Heroicons icon="chat-alt" size={4} /></div>
          <span>{value.comments?.length || 0}</span>
        </div>
        <div class="text-xs text-gray-400 flex p-2 ml-3">
          <div class="flex items-center mr-1"><Heroicons icon="user" size={4} /></div>
          <a
            href={`?page=user&id=${complaintUserId}`}
            on:click|stopPropagation
            class="text-green-500 hover:text-green-600"
          >
            {firstName} {lastName}
          </a>
        </div>
      </div>
      <!-- Edit and Delete -->
      {#if currentUserId === complaintUserId}
        <div class="flex">
          <div
            class="text-xs text-gray-400 flex rounded-full p-2 hover:bg-gray-100 mr-1 cursor-pointer border"
            on:click|preventDefault={editComplaint}
          >
            <Heroicons icon="pencil" size={4} />
          </div>
          <div
            class="text-xs text-gray-400 flex rounded-full p-2 hover:bg-gray-100 cursor-pointer border"
            on:click|preventDefault={() => confirmDelete = true}
          >
            <Heroicons icon="trash" size={4} />
          </div>
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
    <p class="mr-8">Are you sure you want to delete this complaint?</p>
    <form on:submit={deleteComplaint}>
      <input
        type="submit"
        value="Delete"
        class="rounded bg-red-500 text-white py-2 px-8 cursor-pointer hover:bg-red-600 transition mt-5"
      >
    </form>
  </div>
</Modal>