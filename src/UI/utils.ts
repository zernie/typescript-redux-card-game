export const isTouchDevice = () =>
  "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
