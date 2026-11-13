/** A tiny browser window whose layout blocks assemble themselves. */
export function BrowserScene() {
  return (
    <div className="scene-browser" aria-hidden="true">
      <div className="scene-browser__bar">
        <i />
        <i />
        <i />
      </div>
      <div className="scene-browser__body">
        <span className="scene-browser__block scene-browser__block--hero" />
        <span className="scene-browser__block" />
        <span className="scene-browser__block" />
        <span className="scene-browser__block" />
      </div>
    </div>
  );
}
