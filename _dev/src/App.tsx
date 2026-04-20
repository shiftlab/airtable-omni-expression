import { useMemo, useState } from "react";
import {
  OmniAnimationFileName,
  OmniExpression,
} from "@shiftlab/airtable-omni-expression";

const ALL_ANIMATIONS = Object.values(OmniAnimationFileName).sort();

type LoopMode = "default" | "on" | "off";

export default function App() {
  const [fileName, setFileName] = useState<OmniAnimationFileName>(
    OmniAnimationFileName.OMNI_Greeting_001_SunEnergy
  );
  const [loopMode, setLoopMode] = useState<LoopMode>("default");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#7c37ef");

  const shouldLoop = useMemo(() => {
    if (loopMode === "default") return undefined;
    return loopMode === "on";
  }, [loopMode]);

  return (
    <>
      <h1>OmniExpression — local dev</h1>
      <p className="hint">
        Uses <code>file:..</code> against built <code>dist/</code>. From repo
        root run <code>npm run build</code> after changing library source, then
        refresh this page.
      </p>

      <div className="panel">
        <label>
          Animation
          <select
            value={fileName}
            onChange={(e) =>
              setFileName(e.target.value as OmniAnimationFileName)
            }
          >
            {ALL_ANIMATIONS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          shouldLoop
          <select
            value={loopMode}
            onChange={(e) => setLoopMode(e.target.value as LoopMode)}
          >
            <option value="default">default (greetings: once)</option>
            <option value="on">true (loop)</option>
            <option value="off">false (play once)</option>
          </select>
        </label>

        <label style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={prefersReducedMotion}
            onChange={(e) => setPrefersReducedMotion(e.target.checked)}
          />
          prefersReducedMotion
        </label>

        <label>
          primaryColor
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </label>
      </div>

      <div className="preview">
        <OmniExpression
          fileName={fileName}
          width={200}
          primaryColor={primaryColor}
          prefersReducedMotion={prefersReducedMotion}
          shouldLoop={shouldLoop}
        />
        <span className="hint">
          Greetings default to one play + freeze; loaders/expressions default to
          loop. Toggle <code>shouldLoop</code> above to override.
        </span>
      </div>
    </>
  );
}
