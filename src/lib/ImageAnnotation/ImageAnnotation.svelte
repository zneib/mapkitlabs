<script>
  let { map, mapkitGlobal } = $props();
  import image from '$lib/icons/image.svg'
  import arches from '$lib/ImageAnnotation/arches.jpg'
  import arches2x from '$lib/ImageAnnotation/arches2x.jpg'
  import MenuButton from '$lib/MenuButton.svelte';

  let annotationAdded = $state(false);
  let imageAnnotationTitle = $state("Arches National Park");
  let imageAnnotationSubtitle = $state("Utah, USA");
  let imageAnnotationColor = $state("#360b5b");
  let imageAnnotationSelected = $state(true);
  let imageAnnotationDraggable = $state(true);

  function addImageAnnotation() {
    if (map && mapkitGlobal) {
      map.removeAnnotation(map.selectedAnnotation);
      const annotation = new mapkitGlobal.ImageAnnotation(new mapkitGlobal.Coordinate(38.7261934, -109.5630074), {
        title: imageAnnotationTitle || "Arches National Park",
        subtitle: imageAnnotationSubtitle || "Utah, USA",
        color: imageAnnotationColor || "d1513a",
        selected: imageAnnotationSelected,
        url: { 1: arches },
      });
      map.addAnnotation(annotation);
      annotationAdded = true;
    }
  }
  function removeCustomImageAnnotation() {
    if (map && mapkitGlobal) {
      map.removeAnnotation(map.selectedAnnotation);
      annotationAdded = false;
    }
  }
  function removeAllAnnotations() {
    if (map && mapkitGlobal) {
      map.removeAnnotations(map._impl._annotationsController._items);
      annotationAdded = false;
    }
  }
  function resetAnnotationWithNewData() {
    if (map && mapkitGlobal) {
      map.removeAnnotations(map._impl._annotationsController._items); // Remove all annotations
      const annotation = new mapkitGlobal.ImageAnnotation(new mapkitGlobal.Coordinate(38.7261934, -109.5630074), {
        title: imageAnnotationTitle,
        subtitle: imageAnnotationSubtitle,
        color: imageAnnotationColor,
        selected: imageAnnotationSelected,
        draggable: imageAnnotationDraggable,
        url: { 1: arches },
      });
      map.addAnnotation(annotation);
    }
  }
  function closePopover() {
    const popoverId = $state(document.getElementById('image-annotation-popover'));
    popoverId.hidePopover();
  }
</script>

<MenuButton target="image-annotation-popover" topValue="110px" text="Image Annotation" />
<div popover id="image-annotation-popover" class="popover">
  <div class="top-row">
    <h2>Annotation Properties</h2>
    <a class="code-link" href="https://gist.github.com/zneib/523d841992ba0686472646375dc5a714" target="_blank" aria-label="Code Sample">
      <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
      </svg>
    </a>
    <button class="close-btn" onclick={closePopover}>&times;</button>
  </div>
<div class="section-wrapper">
    <aside class="option-section">
      <div>
        <label for="imageAnnotationTitle">Title</label>
        <input bind:value={imageAnnotationTitle} class="annotation-input" type="text" name="imageAnnotationTitle" id="imageAnnotationTitle" placeholder="Enter a Title" onblur={resetAnnotationWithNewData} />
      </div>
      <div>
        <label for="imageAnnotationSub">Subtitle</label>
        <input bind:value={imageAnnotationSubtitle} class="annotation-input" type="text" name="imageAnnotationSubtitle" id="imageAnnotationSub" placeholder="Enter a Subtitle" onblur={resetAnnotationWithNewData} />
      </div>
    </aside>
    <aside class="option-section">
      <div>
        <label for="imageAnnotationSelected">Selected</label>
        <input bind:checked={imageAnnotationSelected} class="annotation-input-small" type="checkbox" name="imageAnnotationSelected" id="imageAnnotationSelected" onchange={resetAnnotationWithNewData} />
      </div>
      <div>
        <label for="imageAnnotationDraggable">Draggable</label>
        <input bind:checked={imageAnnotationDraggable} class="annotation-input-small" type="checkbox" name="imageAnnotationDraggable" id="imageAnnotationDraggable" onchange={resetAnnotationWithNewData} />
      </div>
    </aside>
  </div>
  <div class="button-row">
    <button class="custom-btn" onclick={removeAllAnnotations}>Remove All Annotations</button>
    <button class="custom-btn" onclick={annotationAdded ? removeCustomMarkerAnnotation : addAnnotation}>Toggle Custom Annotation</button>
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
    top: 150px;
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