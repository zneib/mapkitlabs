<script>
  let { map, mapkitGlobal } = $props();
  import icon from '$lib/icons/polygonOverlay.svg'

  let polygonOverlayAdded = $state(false);

  let polygonOverlay = null;

  let overlayFillColor = $state("#02fcad");
  let overlayFillOpacity = $state(0.2);
  let overlayFillRule = $state("nonzero");
  let overlayLineCap = $state("round");

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
          lineDash: [2, 2, 6, 2, 6, 2],
          fillColor: overlayFillColor,
          fillOpacity: overlayFillOpacity,
          fillRule: overlayFillRule,
          lineCap: overlayLineCap,
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

  function resetOverlayWithNewData() {
    if (map && mapkitGlobal) {
      removeAllOverlays();
      addPolygonOverlay();
    }
  }

  function closePopover() {
    const popoverId = $state(document.getElementById('polygon-overlay-popover'));
    popoverId.hidePopover();
  }

</script>

<button class="menu-btn" popovertarget="polygon-overlay-popover" onclick={polygonOverlayAdded ? removeAllOverlays : addPolygonOverlay} style:top="260px">
  <img src={icon} alt="polygon overlay" />
  <span>Polygon Overlay</span>
</button>
<div popover id="polygon-overlay-popover" class="popover">
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
        <input bind:value={overlayFillColor} class="annotation-input" type="text" name="fillColor" id="fillColor" placeholder="#000000" onblur={resetOverlayWithNewData} />
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
    </aside>
  </div>
  <div class="button-row">
    <button class="custom-btn" onclick={removeAllOverlays}>Remove All Overlays</button>
    <button class="custom-btn" onclick={polygonOverlayAdded ? removeCustomPolygonOverlay : addPolygonOverlay}>Toggle Custom Overlay</button>
  </div>
</div>

<!-- <button class="menu-btn check-btn" onclick={checkOverlaySelection} style:top="310px">
  <img src={accessory} alt="accessory" />
  <span>Check Selection</span>
</button> -->

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
    top: 300px;
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
  .annotation-input-small {
    padding: 5px;
    margin-top: 5px;
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