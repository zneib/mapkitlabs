<script>
  let { map, mapkitGlobal } = $props();
  import circleOverlay from '$lib/icons/circleOverlay.svg'

  function addCircleOverlay() {
    if (map && mapkitGlobal) {
      // console.log(map._impl._overlaysController)      
      if (map?._impl?._overlaysController?._items.length > 0) {
        map.removeOverlays(map?._impl?._overlaysController?._items);
      }
    }
    if (map && mapkitGlobal) {
      const stats = [
        { name: "San Francisco", coordinate: [37.783333, -122.416667], population: 852469 },
        { name: "Oakland", coordinate: [37.804444, -122.270833], population: 390724 },
        { name: "San Jose", coordinate: [37.333333, -121.9], population: 1000536 }, 
      ];


      const style = new mapkit.Style({
        lineWidth: 4, // 2 CSS pixels.
        strokeColor: "#816a8c",
        fillColor: "#816a8c"
      });


      const circles = stats.map(function(stat) {
        const coordinate = new mapkit.Coordinate(stat.coordinate[0], stat.coordinate[1]),
            radius = stat.population / 85, // The radius is in meters.
            circle = new mapkit.CircleOverlay(coordinate, radius);
        circle.data = { population: stat.population };
        circle.style = style;
        return circle;
      });
      map.addOverlays(circles);
    }
  }

</script>

<button class="menu-btn" onclick={addCircleOverlay} style:top="210px">
  <img src={circleOverlay} alt="circle overlay" />
  <span>Circle Overlay</span>
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