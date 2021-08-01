<script>
  import Heroicons from 'components/Heroicons.svelte';
  import {Complaints} from '../client';
  import {getUserName} from '../util/misc.js';

  export let value;
  
  const currentUserId = localStorage.getItem('userId');

  let saved = !!value.savers?.includes(currentUserId);

  const [complaintUserId] = value.userId;
  const firstName = getUserName('first', value);
  const lastName = getUserName('last', value);

  const saveComplaint = async () => {
    const {records: [result]} = Complaints({
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

<a href={`/?page=complaint&id=${value.id}`} class="rounded shadow p-4 mt-2 hover:bg-gray-50">
  <div class="flex flex-col pl-2 flex-grow">
    <span class="font-semibold">{value.title}</span>
    <span class="text-sm">{value.body}</span>
    <div class="flex">
      <div class="text-xs text-gray-400 flex mt-2">
        <a
          href={'/' + window.location.search}
          on:click|preventDefault|stopPropagation={toggleComplaintSaved}
          class="mr-1"
        >
          <Heroicons icon="heart" classes="fill-on-hover" fill={saved ? 'fill' : ''} size={4} />
        </a>
        <span>{value.savers?.length || 0}</span>
      </div>
      <div class="text-xs text-gray-400 flex mt-2 ml-5">
        <div class="flex items-center mr-1"><Heroicons icon="chat-alt" size={4} /></div>
        <span>{value.comments?.length || 0}</span>
      </div>
      <div class="text-xs text-gray-400 flex mt-2 ml-5">
        <div class="flex items-center mr-1"><Heroicons icon="user-circle" /></div>
        <a
          href={`?page=user&id=${complaintUserId}`}
          on:click|stopPropagation
          class="text-blue-300 hover:text-blue-400"
        >
          {firstName} {lastName}
        </a>
      </div>
    </div>
  </div>
</a>