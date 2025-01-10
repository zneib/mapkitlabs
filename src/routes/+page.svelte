<script>
  import { PUBLIC_MAP_TOKEN } from '$env/static/public';
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

<style>
  :global(root, body, *) {
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  :global(body) {
    margin: 0px;
    padding: 0px;
  }
  #mapContainer {
    width: 100%;
    height: 100vh;
    height: 100svh;
    position: relative;
  }
  .menu-btn {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
    border: 2px solid var(--blue-ten);
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      padding-left: 5px;
    }
  }
</style>