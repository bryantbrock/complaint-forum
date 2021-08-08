<script>
  export let icon;
  export let classes  = '';
  export let fill = false;
  export let size = 5;

  const iconDimensions = {
    'lock': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    'trash': 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    'x': 'M6 18L18 6M6 6l12 12',
    'pencil': 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
    'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    'user-circle': 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    'heart': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    'chat-alt': 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    'chat-alt-2': 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
    'arrow-left': 'M10 19l-7-7m0 0l7-7m-7 7h18',
    'arrow-right': 'M14 5l7 7m0 0l-7 7m7-7H3',
    'dollar': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  };
  

  let applyClasses;
  let dimension;

  // This will only update if any of the dependencies change.
  // dependencies are auto-tracked; size, classes, fill, icon
  $: {
    applyClasses = `h-${size} w-${size} ${classes} ${fill ? 'fill' : 'no-fill'}`;
    dimension = iconDimensions[icon];
  };
</script>


<svg xmlns="http://www.w3.org/2000/svg" class={applyClasses} viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={dimension} clip-rule="evenodd" fill-rule="evenodd" />
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