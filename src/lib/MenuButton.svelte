<script>
  let { target, topValue, text } = $props();
  import marker from '$lib/icons/marker.svg'
  import image from '$lib/icons/image.svg'
  import accessory from '$lib/icons/accessory.svg'
  import circleOverlay from '$lib/icons/circleOverlay.svg'
  import icon from '$lib/icons/polygonOverlay.svg'

  let iconSrc = $state('');

  switch (text) {
    case 'Marker Annotation':
      iconSrc = marker;
      break;
    case 'Image Annotation':
      iconSrc = image;
      break;
    case 'Accessory Annotation':
      iconSrc = accessory;
      break;
    case 'Circle Overlay':
      iconSrc = circleOverlay;
      break;
    case 'Polygon Overlay':
      iconSrc = icon;
      break;
    default:
      iconSrc = marker;
  }

</script>

<button class="menu-btn" popovertarget={target} popovertargetaction="toggle" style:top={topValue}>
  <img src={iconSrc} alt={text} />
  <span>{text}</span>
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