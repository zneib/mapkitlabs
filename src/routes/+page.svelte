<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  onMount(async () => {
    await import('https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js');
		mapkit.init({
			authorizationCallback: function(done) {
					done(PUBLIC_MAP_TOKEN);
			},
			language: "en"
		});

    const map = new mapkit.Map('mapContainer', { 
      center: new mapkit.Coordinate(37.334883, -122.008977),
      colorScheme: 'adaptive',
      showsMapTypeControl: true,
      showsUserLocationControl: true,
      showsZoomControl: true,
      isScrollEnabled: true,
      _allowWheelToZoom: true,
      showsScale: true,
    });
  });
</script>

<div id="mapContainer">
</div>
