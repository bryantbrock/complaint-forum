<script>
  export let value;
</script>

<a href={`/?page=complaint&id=${value.id}`} class="rounded shadow py-4 px-2 mt-2 hover:bg-gray-50">
  {value.title}
</a>