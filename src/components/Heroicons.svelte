<script>
  export let icon;
  export let classes;
  export let fill = false;
  export let size = 5;
</script>

{#if icon === 'lock'}
  <svg xmlns="http://www.w3.org/2000/svg" class={`h-${size} w-${size} ${classes} ${fill ? 'fill' : 'no-fill'}`} viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
{:else if icon === 'user-circle'}
  <svg xmlns="http://www.w3.org/2000/svg" class={`h-${size} w-${size} ${classes} fill`} viewBox="0 0 24 24">
    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
  </svg>
{:else if icon === 'heart'}
  <svg xmlns="http://www.w3.org/2000/svg" class={`h-${size} w-${size} ${classes} ${fill ? 'fill' : 'no-fill'}`} viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
{:else if icon === 'chat-alt'}
  <svg xmlns="http://www.w3.org/2000/svg" class={`h-${size} w-${size} ${classes} ${fill ? 'fill' : 'no-fill'}`} viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
  </svg>
{:else if icon === 'chat-alt-2'}
  <svg xmlns="http://www.w3.org/2000/svg" class={`h-${size} w-${size} ${classes} ${fill ? 'fill' : 'no-fill'}`} viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
  </svg>
{/if}

<style>
  svg.fill-on-hover {
    fill: none;
  }
  svg.fill-on-hover:hover {
    fill: currentColor;
  }
  svg.fill {
    fill: currentColor;
  }
  svg.no-fill {
    fill: none;
  }
</style>