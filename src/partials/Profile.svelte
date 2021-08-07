<script>
  import {user} from '../store.js';

  $: fields = $user.fields;
  $: name = fields ? `${fields.firstName} ${fields.lastName}` : '';
  $: email = fields?.email || '';
</script>

<div class="rounded bg-white p-4 shadow flex min-w-min">
  <img src="user-default.png" alt="default user" class="h-12 w-12 opacity-40">
  <div class="ml-4 flex flex-col justify-end">
    <div class="font-bold text-lg">{name}</div>
    <div class="text-xs text-gray-500">{email}</div>
  </div>
</div>