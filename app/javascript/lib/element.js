/* eslint-disable import/prefer-default-export */
export function scrollIntoView(element) {
  const windowBottom = window.innerHeight || document.documentElement.clientHeight;
  const bounding = element.getBoundingClientRect();

  if(bounding.top >= 0 && bounding.bottom <= windowBottom) { return; }

  window.scrollTo(0, bounding.top + window.pageYOffset);
}
