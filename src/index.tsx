import { useMemo } from "react";
import { isNeutralHex, getColorBrightness, lightenHex } from "./colorUtils";
import {
  OmniAnimationFileName,
  SVG_CONTENT_MAP,
  STATIC_SVG_CONTENT_MAP,
} from "./animationAssets";

export { OmniAnimationFileName };

export interface OmniExpressionProps {
  fileName: OmniAnimationFileName;
  width?: number;
  height?: number;
  primaryColor: string;
  secondaryColor?: string;
  /** When true, renders the static (non-animated) version of the asset. Use for prefers-reduced-motion. */
  prefersReducedMotion?: boolean;
}

/** Converts rgb(r,g,b) in SVG content to #rrggbb so hex-based color replacement works. */
function normalizeRgbToHex(svg: string): string {
  return svg.replace(
    /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
    (_match, r, g, b) => {
      const toHex = (n: number) =>
        Math.min(255, Math.max(0, n)).toString(16).padStart(2, "0");
      return `#${toHex(Number(r))}${toHex(Number(g))}${toHex(Number(b))}`;
    }
  );
}

function normalizeHex(hex: string): string {
  const normalized = hex.toLowerCase();
  if (normalized.length === 4) {
    return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
  }
  return normalized;
}

/** Case-insensitive #hex matcher (avoids partial matches via trailing lookahead). */
function hexToReplacePattern(normalizedHex: string): string {
  const value = normalizedHex.slice(1);
  return value
    .split("")
    .map((char) => {
      const upper = char.toUpperCase();
      const lower = char.toLowerCase();
      return upper === lower ? char : `[${lower}${upper}]`;
    })
    .join("");
}

export function OmniExpression({
  fileName,
  width = 96,
  height,
  primaryColor,
  secondaryColor,
  prefersReducedMotion = false,
}: OmniExpressionProps) {
  const { dataUrl } = useMemo(() => {
    const rawContent =
      prefersReducedMotion && STATIC_SVG_CONTENT_MAP[fileName]
        ? STATIC_SVG_CONTENT_MAP[fileName]!
        : SVG_CONTENT_MAP[fileName];
    const svgContent = rawContent ? normalizeRgbToHex(rawContent) : "";

    if (!svgContent) return { dataUrl: "" };

    const fillColorRegex =
      /fill\s*=\s*(["'])#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\1/gi;
    const seen = new Set<string>();
    const normalizedFills: string[] = [];
    let match: RegExpExecArray | null;

    fillColorRegex.lastIndex = 0;
    while ((match = fillColorRegex.exec(svgContent)) !== null) {
      const normalizedHex = normalizeHex(`#${match[2]}`);
      if (!isNeutralHex(normalizedHex) && !seen.has(normalizedHex)) {
        seen.add(normalizedHex);
        normalizedFills.push(normalizedHex);
      }
    }

    const sortedColors = [...normalizedFills].sort(
      (a, b) => getColorBrightness(a) - getColorBrightness(b)
    );

    let calculatedSecondary: string;

    if (secondaryColor) {
      calculatedSecondary = secondaryColor;
    } else if (sortedColors.length >= 2) {
      const originalPrimaryBrightness = getColorBrightness(sortedColors[0]);
      const originalSecondaryBrightness = getColorBrightness(sortedColors[1]);

      const brightnessDiff =
        originalSecondaryBrightness - originalPrimaryBrightness;
      const maxPossibleBrightness = 1.0 - originalPrimaryBrightness;
      const lighteningPercent =
        maxPossibleBrightness > 0
          ? (brightnessDiff / maxPossibleBrightness) * 100
          : 40;

      calculatedSecondary = lightenHex(
        primaryColor,
        Math.min(100, Math.max(0, lighteningPercent))
      );
    } else {
      calculatedSecondary = lightenHex(primaryColor, 40);
    }

    const colorReplacements: Array<{ oldNormalized: string; new: string }> =
      sortedColors.map((norm, index) => ({
        oldNormalized: norm,
        new:
          index === 0
            ? normalizeHex(primaryColor)
            : normalizeHex(calculatedSecondary),
      }));

    const sortedReplacements = [...colorReplacements].sort((a, b) => {
      const aLen = a.oldNormalized.length;
      const bLen = b.oldNormalized.length;
      if (aLen !== bLen) return bLen - aLen;
      return (
        getColorBrightness(a.oldNormalized) -
        getColorBrightness(b.oldNormalized)
      );
    });

    let modifiedSvg = svgContent;
    for (const { oldNormalized, new: newColor } of sortedReplacements) {
      const pattern = hexToReplacePattern(oldNormalized);
      modifiedSvg = modifiedSvg.replace(
        new RegExp(`#${pattern}(?![0-9a-fA-F])`, "gi"),
        newColor
      );
    }

    const svgBlob = new Blob([modifiedSvg], {
      type: "image/svg+xml;charset=utf-8",
    });

    return {
      dataUrl: URL.createObjectURL(svgBlob),
    };
  }, [fileName, prefersReducedMotion, primaryColor, secondaryColor]);

  if (!dataUrl) return null;

  return (
    <div>
      <iframe
        src={dataUrl}
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "100%",
          border: "none",
        }}
        title="Animated SVG"
      />
    </div>
  );
}
