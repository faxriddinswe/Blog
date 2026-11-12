/** A container coming up in a terminal, with a blinking cursor. */
export function TerminalScene() {
  return (
    <div className="scene-term" aria-hidden="true">
      <span className="scene-term__line">$ docker compose up -d</span>
      <span className="scene-term__line scene-term__ok">
        ✔ api&nbsp;&nbsp;&nbsp;started
      </span>
      <span className="scene-term__line scene-term__ok">
        ✔ db&nbsp;&nbsp;&nbsp;&nbsp;healthy
      </span>
      <span className="scene-term__line">
        $ <span className="scene-term__cursor" />
      </span>
    </div>
  );
}
