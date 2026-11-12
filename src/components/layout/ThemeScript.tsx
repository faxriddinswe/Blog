import { InlineScript } from "./InlineScript";

export const THEME_KEY = "fx:theme";

/**
 * Pre-paint theme: the saved choice, otherwise dark (the brand default).
 * Runs before first paint so there is no light/dark flash.
 */
const script = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)});document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})();`;

export function ThemeScript() {
  return <InlineScript html={script} />;
}
