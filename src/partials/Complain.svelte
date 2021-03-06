<script>
  import Modal from "components/Modal.svelte";
  import Spinner from "components/Spinner.svelte";
  import {Complaints} from '../client.js';
  import {complaining, complaintValues, complaints} from '../store.js';

  $: isEditing = Boolean($complaintValues.id);

  let complaintSaveLoading = false;
  let errorCreatingComplaint = false;
  let inputClass = `
    rounded border border-gray-200 px-2 py-1 
    w-full focus:outline-none focus:border
    focus:border-green-400 my-1
  `;

  const cancelComplaint = () => {
    complaintValues.set({})
    complaining.set(false)
  }

  const submitComplaint = async () => {
    const {title, body, tags, status, amount, payment} = $complaintValues;

    if (!title || !body) {
      return errorCreatingComplaint = true;
    }

    let data = {
      "fields": {
        "title": title,
        "body": body,
        "tags": typeof tags === 'string'
          ? tags.trim().split(",") || []
          : (tags || []),
        "status": status,
        "payment": payment,
        "amount": amount || 0.00,
        "employed": [],
        "userId": [localStorage.getItem("userId")]
      }
    };

    if (isEditing) {
      data = {...data, "id": $complaintValues.id}
    }

    errorCreatingComplaint = false;
    complaintSaveLoading = true;

    const {records: result} = await Complaints({
      method: isEditing ? 'PATCH' : 'POST',
      data: {'records': [data], "typecast": true}
    })

    complaints.set(result.concat($complaints));
    complaining.set();

    complaintSaveLoading = false;
  }
</script>

<!-- Modal for building a complaint -->
<Modal isOpen={$complaining}>
  <div class="p-8">
    <!-- Exit button/icon -->
    <div class="absolute right-7 top-7 p-1 rounded cursor-pointer hover:bg-gray-100" on:click={cancelComplaint}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <!-- Main form -->
    <form on:submit|preventDefault={submitComplaint}>
      <h1 class="font-bold text-xl mb-4 text-gray-700">{isEditing ? 'Edit' : 'Add'} Complaint</h1>
      <p class="mb-6 text-sm text-gray-500">
        Tell people whatever problem you are dealing with,
        dreams you want to make a reality, and random odd balls
        you want to throw at your local public.
      </p>
      {#if errorCreatingComplaint}
        <div class="rounded my-1 px-2 py-3 bg-red-100 text-red-500 text-sm">
          Please fill out at least the title, description, and payment type.
        </div>
      {/if}
      <input
        type="text"
        placeholder="Title"
        bind:value={$complaintValues.title}
        class={inputClass}
      >
      <textarea
        placeholder="Description"
        bind:value={$complaintValues.body}
        class={`${inputClass} h-36`}
      />
      <input
        type="text"
        placeholder="e.g. 'software,excel,facebook', etc."
        bind:value={$complaintValues.tags}
        class={inputClass}
      >
      <h3 class="text-gray-500 font-semibold mt-4 mb-1">Payment Type</h3>
      <div class="flex">
        <div class="px-2 py-1 bg-gray-200 w-min rounded cursor-pointer">
          <select
            bind:value={$complaintValues.payment}
            class="bg-gray-200 focus:outline-none cursor-pointer"
          >
            <option>Negotiable</option>
            <option>Hourly</option>
            <option>Fixed</option>
          </select>
        </div>
        <input
          type="number"
          placeholder="Amount"
          bind:value={$complaintValues.amount}
          class={`${inputClass.slice(0, -4)} ml-4`}
        >
      </div>
      <h3 class="text-gray-500 font-semibold mt-4 mb-1">Status</h3>
      <div class="px-2 py-1 bg-gray-200 w-min rounded cursor-pointer">
        <select
          bind:value={$complaintValues.status}
          class="bg-gray-200 focus:outline-none cursor-pointer"
        >
          <option>Open</option>
          <option>Pending</option>
          <option>Closed</option>
        </select>
      </div>
      <div class="flex items-center text-xs text-gray-400 mt-6 encourage">
        Ready, set...
      </div>
      {#if complaintSaveLoading}
        <div class="my-3"><Spinner /></div>
      {:else}
        <input
          type="submit"
          value={isEditing ? 'Update' : 'Create'}
          class="rounded bg-green-700 text-white py-2 cursor-pointer hover:bg-green-800 transition mt-5 w-full"
        >
      {/if}
    </form>
  </div>
</Modal>

<style lang="postcss">
  .encourage::before {
    content: '';
    @apply flex-grow border-b border-gray-200 mr-2;
  }
  .encourage::after {
    content: '';
    @apply flex-grow border-b border-gray-200 ml-2;
  }
</style>