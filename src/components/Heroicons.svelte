<script>
  export let icon;
  export let classes  = '';
  export let fill = false;
  export let size = 5;

  const icons = {
    'lock': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    'trash': 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    'heart': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    'chat-alt': 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    'chat-alt-2': 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
    'arrow-left': 'M10 19l-7-7m0 0l7-7m-7 7h18',
    'arrow-right': 'M14 5l7 7m0 0l-7 7m7-7H3',
  };

  const d = icons[icon];
  const applyClasses = `h-${size} w-${size} ${classes} ${fill ? 'fill' : 'no-fill'}`;
</script>


<svg xmlns="http://www.w3.org/2000/svg" class={applyClasses} viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={d} clip-rule="evenodd" fill-rule="evenodd" />
</svg>

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