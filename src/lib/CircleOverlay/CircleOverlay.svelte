<script>
  let { map, mapkitGlobal } = $props();
  import circleOverlay from '$lib/icons/circleOverlay.svg'
	import MenuButton from '$lib/MenuButton.svelte';

  let overlayFillColor = $state("rgb(0, 122, 255)");
  let overlayFillOpacity = $state(0.1);
  let overlayFillRule = $state("nonzero");
  let overlayLineCap = $state("round");
  let overlayLineDash = $state("");
  let overlayLineDashOffset = $state(0);
  let overlayLineJoin = $state("round");
  let overlayLineWidth = $state(1);
  let overlayStrokeColor = $state("rgb(0, 122, 255)");
  let overlayStrokeOpacity = $state(1);

  function addCircleOverlay() {
    if (map && mapkitGlobal) {
      const stats = [
        { name: "San Francisco", coordinate: [37.783333, -122.416667], population: 852469 },
        { name: "Oakland", coordinate: [37.804444, -122.270833], population: 390724 },
        { name: "San Jose", coordinate: [37.333333, -121.9], population: 1000536 }, 
      ];

      const style = new mapkit.Style({
          strokeColor: overlayStrokeColor,
          strokeOpacity: overlayStrokeOpacity,
          lineWidth: overlayLineWidth,
          // lineJoin: "round",
          fillColor: overlayFillColor,
          fillOpacity: overlayFillOpacity,
          fillRule: overlayFillRule,
          lineCap: overlayLineCap,
          // lineDash: overlayLineDash?.length > 0 ? Array.from(overlayLineDash) : []
          lineDashOffset: overlayLineDashOffset,
          lineJoin: overlayLineJoin
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

  function removeAllOverlays() {
    if (map && mapkitGlobal) {   
      if (map?._impl?._overlaysController?._items.length > 0) {
        map.removeOverlays(map?._impl?._overlaysController?._items);
        polygonOverlayAdded = false;
      }
    }
  }

  function resetOverlayWithNewData() {
    if (map && mapkitGlobal) {
      removeAllOverlays();
      addCircleOverlay();
    }
  }

  function closePopover() {
    const popoverId = $state(document.getElementById('circle-overlay-popover'));
    popoverId.hidePopover();
  }

</script>

<MenuButton target="circle-overlay-popover" topValue="210px" text="Circle Overlay" />
<!-- <button class="menu-btn" onclick={addCircleOverlay} style:top="210px">
  <img src={circleOverlay} alt="circle overlay" />
  <span>Circle Overlay</span>
</button> -->
<div popover id="circle-overlay-popover" class="popover">
  <div class="top-row">
    <h2>Overlay Properties</h2>
    <a class="code-link" href="https://gist.github.com/zneib/3034e5fe15fb8620a052cf95e60468f5" target="_blank" aria-label="Code Sample">
      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
    <button class="close-btn" onclick={closePopover}>&times;</button>
  </div>
  <div class="section-wrapper">
    <aside class="option-section">
      <div>
        <label for="fillColor">Fill Color</label>
        <input bind:value={overlayFillColor} class="annotation-input" type="text" name="fillColor" id="fillColor" placeholder="rgb(0, 122, 255)" onblur={resetOverlayWithNewData} />
      </div>
      <div>
        <label for="fillOpacity">Fill Opacity</label>
        <input bind:value={overlayFillOpacity} class="annotation-input" type="number" name="fillOpacity" id="fillOpacity" placeholder="0.1 - 1" step="0.1" min="0.1" max="1" oninput={resetOverlayWithNewData} onblur={resetOverlayWithNewData} />
      </div>
      <div>
        <label for="fillRule">Fill Rule</label>
        <select bind:value={overlayFillRule} class="annotation-input" name="fillRule" id="fillRule" onchange={resetOverlayWithNewData}>
          <option value="nonzero">Non-Zero</option>
          <option value="evenodd">Even-Odd</option>
        </select>
      </div>
      <div>
        <label for="lineCap">Line Cap</label>
        <select bind:value={overlayLineCap} class="annotation-input" name="lineCap" id="lineCap" onchange={resetOverlayWithNewData}>
          <option value="butt">Butt</option>
          <option value="round">Round</option>
          <option value="square">Square</option>
        </select>
      </div>
      <!-- <div>
        <label for="lineDash">Line Dash</label>
        <input bind:value={overlayLineDash} class="annotation-input" type="text" name="lineDash" id="lineDash" placeholder="[10, 5]" onblur={resetOverlayWithNewData} />
      </div> -->
      <div>
        <label for="lineDashOffset">Line Dash Offset</label>
        <input bind:value={overlayLineDashOffset} class="annotation-input" type="number" name="lineDashOffset" id="lineDashOffset" placeholder="0" oninput={resetOverlayWithNewData} onblur={resetOverlayWithNewData} />
      </div>
      <div>
        <label for="lineJoin">Line Join</label>
        <select bind:value={overlayLineJoin} class="annotation-input" name="lineJoin" id="lineJoin" onchange={resetOverlayWithNewData}>
          <option value="round">Round</option>
          <option value="bevel">Bevel</option>
          <option value="miter">Miter</option>
        </select>
      </div>
      <div>
        <label for="lineWidth">Line Width</label>
        <input bind:value={overlayLineWidth} class="annotation-input" type="number" name="lineWidth" id="lineWidth" placeholder="1" oninput={resetOverlayWithNewData} onblur={resetOverlayWithNewData} />
      </div>
      <div>
        <label for="strokeColor">Stroke Color</label>
        <input bind:value={overlayStrokeColor} class="annotation-input" type="text" name="strokeColor" id="strokeColor" placeholder="rgb(0, 122, 255)" onblur={resetOverlayWithNewData} />
      </div>
      <div>
        <label for="strokeOpacity">Stroke Opacity</label>
        <input bind:value={overlayStrokeOpacity} class="annotation-input" type="number" name="strokeOpacity" id="strokeOpacity" placeholder="0.1 - 1" step="0.1" min="0.1" max="1" oninput={resetOverlayWithNewData} onblur={resetOverlayWithNewData} />
      </div>
    </aside>
  </div>
  <div class="button-row">
    <button class="custom-btn" onclick={removeAllOverlays}>Remove All Overlays</button>
    <button class="custom-btn" onclick={polygonOverlayAdded ? removeCustomPolygonOverlay : addPolygonOverlay}>Toggle Custom Overlay</button>
  </div>
</div>

<style>
  ::backdrop {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .button-row {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    width: 100%;
    margin-top: 10px;
  }
  .custom-btn {
    background-color: transparent;
    color: var(--gray-one);
    border: 1px solid var(--gray-one);
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    width: fit-content;
    margin-top: 10px;
    text-transform: uppercase;
  }
  .section-wrapper {
    display: flex;
    gap: 20px;
    width: 100%;
  }
  .option-section {
    display: flex;
    flex-direction: column;
    align-items: end;
  }
  .popover:popover-open {
    position: absolute;
    top: 250px;
    left: 10px;
    margin: 0;
    border-radius: 4px;
    border: none;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255,255,255,1);
  }
  label {
    font-size: 0.8rem;
    padding-right: 2px;
  }
  .annotation-input {
    width: 200px;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid var(--gray-six);
    border-radius: 4px;
    font-size: 0.8rem;
  }
  .close-btn {
    background-color: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .code-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.6rem;
    text-transform: uppercase;
    color: var(--gray-one);
    margin-left: auto;
  }
  .top-row {
    display: flex;
    align-items: baseline;
    width: 100%;
    gap: 10px;
    h2 {
      margin-top: 0;
    }
  }
</style>