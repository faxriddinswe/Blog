import { preloader } from "@/lib/motion/tokens";
import { mq } from "@/lib/motion/media";

/**
 * Runs synchronously before first paint (see Next docs: preventing flash
 * before hydration). Decides whether the CSS preloader plays: only on the
 * first visit of a browser session and never with reduced motion.
 */
const script = `(function(){var d=document.documentElement;try{if(matchMedia(${JSON.stringify(
  mq.reducedMotion,
)}).matches||sessionStorage.getItem(${JSON.stringify(
  preloader.storageKey,
)})){d.dataset.preloader="skip"}else{sessionStorage.setItem(${JSON.stringify(
  preloader.storageKey,
)},"1");d.dataset.preloader="show"}}catch(e){d.dataset.preloader="skip"}})();`;

export function PreloaderScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
