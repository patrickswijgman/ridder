/**
 * Whether or not the web page (document) is visible or not.
 */
export function isWebPageVisible() {
  return document.visibilityState === "visible";
}
