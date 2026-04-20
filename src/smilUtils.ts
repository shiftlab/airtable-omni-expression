const SMIL_REPEAT_ELEMENTS = [
  "animate",
  "animateTransform",
  "animateMotion",
  "set",
] as const;

/**
 * Replaces SMIL `repeatCount="indefinite"` with `1` so the animation runs once
 * and remains on the final frame (with `fill="freeze"` in the asset).
 */
export function stripIndefiniteSmilRepeat(svgRoot: SVGSVGElement): void {
  for (const tag of SMIL_REPEAT_ELEMENTS) {
    svgRoot.querySelectorAll(tag).forEach((el) => {
      if (el.getAttribute("repeatCount") === "indefinite") {
        el.setAttribute("repeatCount", "1");
      }
    });
  }
}
