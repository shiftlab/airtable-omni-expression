/**
 * Replaces SMIL `repeatCount="indefinite"` with `1` so the animation runs once
 * and remains on the final frame (with `fill="freeze"` in the asset).
 */
export declare function stripIndefiniteSmilRepeat(svgRoot: SVGSVGElement): void;
