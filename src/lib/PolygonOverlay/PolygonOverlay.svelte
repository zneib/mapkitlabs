<script>
  let { map, mapkitGlobal } = $props();
  import accessory from '$lib/icons/accessory.svg'

  let polygonOverlayAdded = $state(false);

  let polygonOverlay = null;

  function addPolygonOverlay() {
    if (map && mapkitGlobal) {
      const points = [ [41, -109.05], [41, -102.05], [37, -102.05], [37, -109.05] ];

      // Map the raw coordinate points to MapKit JS Coordinate objects:
      const coords = points.map(function(point) {
          return new mapkit.Coordinate(point[0], point[1]);
      });
      const style = new mapkit.Style({
          strokeColor: "#02fcad",
          strokeOpacity: .2,
          lineWidth: 2,
          lineJoin: "round",
          lineDash: [2, 2, 6, 2, 6, 2]
      });

      const rectangle = new mapkit.PolygonOverlay(coords, { style: style });
      polygonOverlay = rectangle; // Store reference to the overlay
      map.addOverlay(rectangle);
      polygonOverlayAdded = true;
    }
  }

  // Function to check if the polygon overlay is currently selected
  function checkOverlaySelection() {
    if (map && polygonOverlay) {
      const isSelected = map.selectedOverlay === polygonOverlay;
      console.log('Polygon overlay selected:', isSelected);
      return isSelected;
    }
    return false;
  }

  function removeAllOverlays() {
    if (map && mapkitGlobal) {   
      if (map?._impl?._overlaysController?._items.length > 0) {
        map.removeOverlays(map?._impl?._overlaysController?._items);
        polygonOverlayAdded = false;
      }
    }
  }

</script>

<button class="menu-btn" onclick={polygonOverlayAdded ? removeAllOverlays : addPolygonOverlay} style:top="260px">
  <img src={accessory} alt="accessory" />
  <span>{#if polygonOverlayAdded} Remove Polygon Overlay {:else} Add Polygon Overlay {/if}</span>
</button>

<button class="menu-btn check-btn" onclick={checkOverlaySelection} style:top="310px">
  <img src={accessory} alt="accessory" />
  <span>Check Selection</span>
</button>

<style>
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