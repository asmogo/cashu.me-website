// Split point for framer-motion's feature bundle. LazyMotion only defers the
// bundle when `features` is an async loader — a static import lands it in the
// initial chunk regardless. Keeping the re-export in its own module gives the
// bundler a clean boundary to split on.
export { domAnimation as default } from "framer-motion";
