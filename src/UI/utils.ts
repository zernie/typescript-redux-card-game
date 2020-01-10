export const isTouch = () =>
  "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
