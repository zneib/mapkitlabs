<script>
  let { map, mapkitGlobal } = $props();
  import accessory from '$lib/icons/accessory.svg'
  import arches from '$lib/ImageAnnotation/arches.jpg'
  import arches2x from '$lib/ImageAnnotation/arches2x.jpg'

  let imageAnnotationTitle = "Arches National Park";
  let imageAnnotationSubtitle = "Utah, USA";
  let imageAnnotationColor = "#360b5b";

  function addImageAnnotation() {
    if (map && mapkitGlobal) {
      map.removeAnnotation(map.selectedAnnotation);
      const annotation = new mapkitGlobal.ImageAnnotation(new mapkitGlobal.Coordinate(38.7261934, -109.5630074), {
        title: imageAnnotationTitle || "Arches National Park",
        subtitle: imageAnnotationSubtitle || "Utah, USA",
        color: imageAnnotationColor || "d1513a",
        selected: true,
        url: { 1: arches },
      });
      map.addAnnotation(annotation);
    }
  }
</script>

<button class="menu-btn" onclick={addImageAnnotation} style:top="160px">
  <img src={accessory} alt="accessory" />
  <span>Image Annotation</span>
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