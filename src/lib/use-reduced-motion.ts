"use client";

import { useSyncExternalStore } from "react";

let media: MediaQueryList | undefined;
const getMedia = () =>
  (media ??= window.matchMedia("(prefers-reduced-motion: reduce)"));
const getSnapshot = () => getMedia().matches;
const getServerSnapshot = () => false;

function subscribe(notify: () => void) {
  const query = getMedia();
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

// Subscribe to the browser directly: Motion 11 captures the preference in
// mount-time state, which can be stale across hydration and deferred chunks.
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
