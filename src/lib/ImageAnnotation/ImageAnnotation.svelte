<script>
  let { map, mapkitGlobal } = $props();
  import accessory from '$lib/icons/accessory.svg'
  import arches from '$lib/ImageAnnotation/arches.jpg'
  import arches2x from '$lib/ImageAnnotation/arches2x.jpg'

  let annotationAdded = $state(false);
  let imageAnnotationTitle = $state("Arches National Park");
  let imageAnnotationSubtitle = $state("Utah, USA");
  let imageAnnotationColor = $state("#360b5b");
  let imageAnnotationSelected = $state(true);

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
        url: { 1: arches },
      });
      map.addAnnotation(annotation);
    }
  }
</script>

<button class="menu-btn" popovertarget="image-annotation-popover" style:top="160px">
  <img src={accessory} alt="accessory" />
  <span>Image Annotation Options</span>
</button>
<div popover id="image-annotation-popover" class="popover">
  <p>See the sample code <a href="https://gist.github.com/zneib/523d841992ba0686472646375dc5a714" target="_blank">here</a></p>
  <div class="annotation-input">
    <label for="imageAnnotationTitle">Title</label>
    <input bind:value={imageAnnotationTitle} class="annotation-input" type="text" name="imageAnnotationTitle" id="imageAnnotationTitle" placeholder="Enter a title for the image annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="imageAnnotationSub">Subtitle</label>
    <input bind:value={imageAnnotationSubtitle} class="annotation-input" type="text" name="imageAnnotationSubtitle" id="imageAnnotationSub" placeholder="Enter a sub title for the image annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="imageAnnotationColor">Color</label>
    <input bind:value={imageAnnotationColor} class="annotation-input" type="color" name="imageAnnotationColor" id="imageAnnotationColor" placeholder="Enter a color for the image annotation" onblur={resetAnnotationWithNewData} />
  </div>
  <div class="annotation-input">
    <label for="imageAnnotationSelected">Selected</label>
    <input bind:checked={imageAnnotationSelected} class="annotation-input" type="checkbox" name="imageAnnotationSelected" id="imageAnnotationSelected" onchange={resetAnnotationWithNewData} />
  </div>
  <div class="button-row">
    <button class="toggle" onclick={removeAllAnnotations}>Remove All Annotations</button>
    <button class="toggle" onclick={annotationAdded ? removeCustomImageAnnotation : addImageAnnotation}>Toggle Custom Annotation</button>
  </div>
</div>

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
    width: 100%;
    margin-top: 10px;
  }
  .toggle {
    background-color: transparent;
    color: var(--gray-one);
    border: 1px solid var(--gray-one);
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    width: fit-content;
    margin-top: 10px;
    text-transform: uppercase;
  }

  .popover:popover-open {
    position: absolute;
    top: 200px;
    left: 10px;
    margin: 0;
    border-radius: 8px;
    padding: 10px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255,255,255,1);
  }
  div.annotation-input {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  label {
    font-size: 1rem;
    padding-right: 10px;
  }
  input.annotation-input {
    width: 400px;
    padding: 5px;
    margin-top: 5px;
    border: 1px solid var(--gray-six);
    border-radius: 4px;
    font-size: 1rem;
  }
</style>