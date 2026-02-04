import { useMemo } from "react";
import { isNeutralHex, getColorBrightness, lightenHex } from "./colorUtils";
import { OmniAnimationFileName, SVG_CONTENT_MAP } from "./animationAssets";

export { OmniAnimationFileName };

interface OmniExpressionProps {
  fileName: OmniAnimationFileName;
  width?: number;
  height?: number;
  primaryColor: string;
  secondaryColor?: string;
  tertiaryColor?: string;
}

/**
 * Animated Omni expression component using data URL approach
 * This creates a data URL from the SVG and uses it in an iframe
 */
export function OmniExpression({
  fileName,
  width = 96,
  height,
  primaryColor,
  secondaryColor,
  tertiaryColor,
}: OmniExpressionProps) {
  const svgContent = SVG_CONTENT_MAP[fileName];

  const { dataUrl } = useMemo(() => {
    if (!svgContent)
      return {
        dataUrl: "",
        effectiveSecondaryColor: secondaryColor || lightenHex(primaryColor, 40),
        effectiveTertiaryColor: tertiaryColor || lightenHex(primaryColor, 70),
      };

    // Helper function to normalize hex color to 6-digit format
    const normalizeHex = (hex: string): string => {
      const normalized = hex.toLowerCase();
      if (normalized.length === 4) {
        // Convert #abc to #aabbcc
        return `#${normalized[1]}${normalized[1]}${normalized[2]}${normalized[2]}${normalized[3]}${normalized[3]}`;
      }
      return normalized;
    };

    // Identify all hex colors in fill attributes, style attributes, and gradient stops
    // Store both the original format (for replacement) and normalized (for comparison)
    const fillColorRegex =
      /fill\s*=\s*(["'])#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\1/gi;
    const styleFillColorRegex =
      /style\s*=\s*["'][^"']*fill\s*:\s*#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})[^"']*["']/gi;
    const stopColorRegex =
      /stop-color\s*=\s*(["'])#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\1/gi;
    const colorMap = new Map<
      string,
      { original: string; normalized: string }
    >();
    let match: RegExpExecArray | null;

    // Extract colors from fill attributes
    fillColorRegex.lastIndex = 0;
    while ((match = fillColorRegex.exec(svgContent)) !== null) {
      const originalHex = `#${match[2]}`;
      const normalizedHex = normalizeHex(originalHex);

      if (!isNeutralHex(normalizedHex)) {
        // Store the original format as it appears in SVG for accurate replacement
        if (!colorMap.has(normalizedHex)) {
          colorMap.set(normalizedHex, {
            original: originalHex,
            normalized: normalizedHex,
          });
        }
      }
    }

    // Extract colors from style attributes
    styleFillColorRegex.lastIndex = 0;
    while ((match = styleFillColorRegex.exec(svgContent)) !== null) {
      const originalHex = `#${match[1]}`;
      const normalizedHex = normalizeHex(originalHex);

      if (!isNeutralHex(normalizedHex)) {
        // Store the original format as it appears in SVG for accurate replacement
        if (!colorMap.has(normalizedHex)) {
          colorMap.set(normalizedHex, {
            original: originalHex,
            normalized: normalizedHex,
          });
        }
      }
    }

    // Extract colors from stop-color attributes (gradient stops)
    stopColorRegex.lastIndex = 0;
    while ((match = stopColorRegex.exec(svgContent)) !== null) {
      const originalHex = `#${match[2]}`;
      const normalizedHex = normalizeHex(originalHex);

      if (!isNeutralHex(normalizedHex)) {
        // Store the original format as it appears in SVG for accurate replacement
        if (!colorMap.has(normalizedHex)) {
          colorMap.set(normalizedHex, {
            original: originalHex,
            normalized: normalizedHex,
          });
        }
      }
    }

    // Store animation colors separately - we'll map them to the same replacements as static colors
    // This prevents animation colors from affecting the brightness-based mapping of static colors
    const animationColorMap = new Map<string, string>(); // normalized -> original

    // Extract colors from fill animations - check values, from, and to attributes
    const fillAnimateRegex =
      /<animate[^>]*attributeName\s*=\s*["']fill["'][^>]*>/gi;
    fillAnimateRegex.lastIndex = 0;
    while ((match = fillAnimateRegex.exec(svgContent)) !== null) {
      const animateElement = match[0];

      // Extract from values attribute
      const valuesMatch = animateElement.match(
        /values\s*=\s*["']([^"']*)["']/i
      );
      if (valuesMatch && valuesMatch[1]) {
        const valuesString = valuesMatch[1];
        // Match full hex colors - try 6-digit first, then 3-digit
        // Must ensure we match complete colors, not partial matches
        // Split by semicolon first, then extract colors from each segment
        const segments = valuesString.split(";");
        segments.forEach((segment) => {
          // Try to match 6-digit hex first
          const hex6Match = segment.match(/^#([0-9a-fA-F]{6})$/i);
          if (hex6Match) {
            const originalHex = `#${hex6Match[1]}`;
            const normalizedHex = normalizeHex(originalHex);
            if (!isNeutralHex(normalizedHex) && !colorMap.has(normalizedHex)) {
              animationColorMap.set(normalizedHex, originalHex);
            }
          } else {
            // Try 3-digit hex
            const hex3Match = segment.match(/^#([0-9a-fA-F]{3})$/i);
            if (hex3Match) {
              const originalHex = `#${hex3Match[1]}`;
              const normalizedHex = normalizeHex(originalHex);
              if (
                !isNeutralHex(normalizedHex) &&
                !colorMap.has(normalizedHex)
              ) {
                animationColorMap.set(normalizedHex, originalHex);
              }
            }
          }
        });
      }

      // Extract from "from" attribute
      const fromMatch = animateElement.match(
        /from\s*=\s*["']#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})["']/i
      );
      if (fromMatch && fromMatch[1]) {
        const originalHex = `#${fromMatch[1]}`;
        const normalizedHex = normalizeHex(originalHex);
        if (!isNeutralHex(normalizedHex) && !colorMap.has(normalizedHex)) {
          animationColorMap.set(normalizedHex, originalHex);
        }
      }

      // Extract from "to" attribute
      const toMatch = animateElement.match(
        /to\s*=\s*["']#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})["']/i
      );
      if (toMatch && toMatch[1]) {
        const originalHex = `#${toMatch[1]}`;
        const normalizedHex = normalizeHex(originalHex);
        if (!isNeutralHex(normalizedHex) && !colorMap.has(normalizedHex)) {
          animationColorMap.set(normalizedHex, originalHex);
        }
      }
    }

    // Sort colors from darkest to lightest using normalized versions
    const sortedColors = Array.from(colorMap.entries()).sort((a, b) => {
      return (
        getColorBrightness(a[1].normalized) -
        getColorBrightness(b[1].normalized)
      );
    });

    // Calculate effective secondary and tertiary colors based on original color relationships
    let calculatedSecondary: string;
    let calculatedTertiary: string;

    if (secondaryColor) {
      calculatedSecondary = secondaryColor;
    } else if (sortedColors.length >= 2) {
      // Calculate the brightness ratio between the original colors
      const originalPrimaryBrightness = getColorBrightness(
        sortedColors[0][1].normalized
      );
      const originalSecondaryBrightness = getColorBrightness(
        sortedColors[1][1].normalized
      );

      // Calculate the brightness difference as a percentage
      // If original secondary is X% brighter than primary, apply similar lightening
      const brightnessDiff =
        originalSecondaryBrightness - originalPrimaryBrightness;
      const maxPossibleBrightness = 1.0 - originalPrimaryBrightness;
      const lighteningPercent =
        maxPossibleBrightness > 0
          ? (brightnessDiff / maxPossibleBrightness) * 100
          : 40; // Fallback to 40% if calculation fails

      calculatedSecondary = lightenHex(
        primaryColor,
        Math.min(100, Math.max(0, lighteningPercent))
      );
    } else {
      calculatedSecondary = lightenHex(primaryColor, 40);
    }

    if (tertiaryColor) {
      calculatedTertiary = tertiaryColor;
    } else if (sortedColors.length >= 3) {
      // For 3-color SVGs, calculate tertiary based on the brightness relationship
      const originalPrimaryBrightness = getColorBrightness(
        sortedColors[0][1].normalized
      );
      const originalTertiaryBrightness = getColorBrightness(
        sortedColors[2][1].normalized
      );

      const brightnessDiff =
        originalTertiaryBrightness - originalPrimaryBrightness;
      const maxPossibleBrightness = 1.0 - originalPrimaryBrightness;
      const lighteningPercent =
        maxPossibleBrightness > 0
          ? (brightnessDiff / maxPossibleBrightness) * 100
          : 70; // Fallback to 70% if calculation fails

      calculatedTertiary = lightenHex(
        primaryColor,
        Math.min(100, Math.max(0, lighteningPercent))
      );
    } else {
      calculatedTertiary = lightenHex(primaryColor, 70);
    }

    // Create color replacement map
    // Primary replaces darkest, secondary replaces next lighter, tertiary replaces next lighter
    // For SVGs with more than 3 colors, map additional colors to the closest of the three
    const colorReplacements: Array<{
      oldNormalized: string;
      new: string;
    }> = [];

    // Replace all colors based on their darkness ranking
    sortedColors.forEach((entry, index) => {
      let replacementColor: string;

      if (index === 0) {
        // Darkest color → primaryColor
        replacementColor = normalizeHex(primaryColor);
      } else if (index === 1) {
        // Second darkest → secondaryColor
        replacementColor = normalizeHex(calculatedSecondary);
      } else if (index === 2) {
        // Third darkest → tertiaryColor
        replacementColor = normalizeHex(calculatedTertiary);
      } else {
        // For colors beyond the third, map them to the closest of the three
        // We'll use tertiaryColor for all additional colors (lightest)
        replacementColor = normalizeHex(calculatedTertiary);
      }

      colorReplacements.push({
        oldNormalized: entry[1].normalized,
        new: replacementColor,
      });
    });

    // Map animation colors to static color replacements while preserving brightness order
    // This prevents animation colors from affecting the brightness-based mapping of static colors
    // Sort animation colors by brightness (darkest to lightest)
    const sortedAnimationColors = Array.from(animationColorMap.keys()).sort(
      (a, b) => getColorBrightness(a) - getColorBrightness(b)
    );

    // Map animation colors to static colors in the same brightness order
    // Darkest animation color -> darkest static color replacement (primary)
    // Second darkest animation color -> second darkest static color replacement (secondary)
    // etc.
    sortedAnimationColors.forEach((normalizedHex, index) => {
      // Map based on position in sorted order
      let replacementColor: string;
      if (sortedColors.length === 0) {
        // No static colors, use primary for all
        replacementColor = normalizeHex(primaryColor);
      } else if (index === 0) {
        // Darkest animation color -> primary (darkest static)
        replacementColor = normalizeHex(primaryColor);
      } else if (index === 1 && sortedColors.length >= 2) {
        // Second darkest animation color -> secondary
        replacementColor = normalizeHex(calculatedSecondary);
      } else if (index === 2 && sortedColors.length >= 3) {
        // Third darkest animation color -> tertiary
        replacementColor = normalizeHex(calculatedTertiary);
      } else {
        // Additional animation colors -> map to closest static color by brightness
        let closestColor = sortedColors[0];
        let minBrightnessDiff = Math.abs(
          getColorBrightness(normalizedHex) -
            getColorBrightness(closestColor[1].normalized)
        );

        for (const entry of sortedColors) {
          const brightnessDiff = Math.abs(
            getColorBrightness(normalizedHex) -
              getColorBrightness(entry[1].normalized)
          );
          if (brightnessDiff < minBrightnessDiff) {
            minBrightnessDiff = brightnessDiff;
            closestColor = entry;
          }
        }

        const closestReplacement = colorReplacements.find(
          (r) => r.oldNormalized === closestColor[1].normalized
        );
        replacementColor = closestReplacement
          ? closestReplacement.new
          : normalizeHex(calculatedTertiary);
      }

      colorReplacements.push({
        oldNormalized: normalizedHex,
        new: replacementColor,
      });
    });

    // Replace colors in SVG content
    // We need to replace ALL occurrences of each color, regardless of case or format
    // Sort replacements by color length (longer first) to avoid partial matches
    // Then sort by brightness (darkest first) to ensure consistent replacement
    const sortedReplacements = [...colorReplacements].sort((a, b) => {
      // First sort by length (6-digit before 3-digit)
      const aLen = a.oldNormalized.length;
      const bLen = b.oldNormalized.length;
      if (aLen !== bLen) return bLen - aLen;
      // Then by brightness (darkest first)
      return (
        getColorBrightness(a.oldNormalized) -
        getColorBrightness(b.oldNormalized)
      );
    });

    let modifiedSvg = svgContent;
    sortedReplacements.forEach(({ oldNormalized, new: newColor }) => {
      // Get the normalized hex value (6-digit, lowercase) for matching
      const normalizedHexValue = oldNormalized.slice(1); // e.g., "7c37ef"

      // Create a case-insensitive pattern for the hex value
      // This matches each character in both upper and lower case
      const hexPattern = normalizedHexValue
        .split("")
        .map((char) => {
          const upper = char.toUpperCase();
          const lower = char.toLowerCase();
          return upper === lower ? char : `[${lower}${upper}]`;
        })
        .join("");

      // FIRST: Explicitly replace colors in animate values attribute (semicolon-separated list)
      // This must happen before global replacement to avoid conflicts
      // Match the entire values attribute and replace colors within it
      const animateValuesRegex = new RegExp(
        `(<animate[^>]*attributeName\\s*=\\s*["']fill["'][^>]*values\\s*=\\s*["'])([^"']*)(["'])`,
        "gi"
      );
      modifiedSvg = modifiedSvg.replace(
        animateValuesRegex,
        (_match, p1, valuesString, p3) => {
          // Replace all instances of this color in the values string
          const replacedString = valuesString.replace(
            new RegExp(`#${hexPattern}(?![0-9a-fA-F])`, "gi"),
            newColor
          );
          return p1 + replacedString + p3;
        }
      );

      // Also handle values before attributeName
      const animateValuesRegex2 = new RegExp(
        `(<animate[^>]*values\\s*=\\s*["'])([^"']*)(["'][^>]*attributeName\\s*=\\s*["']fill["'])`,
        "gi"
      );
      modifiedSvg = modifiedSvg.replace(
        animateValuesRegex2,
        (_match, p1, valuesString, p3) => {
          const replacedString = valuesString.replace(
            new RegExp(`#${hexPattern}(?![0-9a-fA-F])`, "gi"),
            newColor
          );
          return p1 + replacedString + p3;
        }
      );

      // THEN: Do a global replacement of the hex color anywhere else in the SVG
      // This catches colors in any other context (fill, style, from, to, etc.)
      // The negative lookahead ensures we don't match partial hex values
      // We match hex colors followed by non-hex characters (like ;, space, ", ', >, etc.)
      const globalRegex6 = new RegExp(`#${hexPattern}(?![0-9a-fA-F])`, "gi");
      modifiedSvg = modifiedSvg.replace(globalRegex6, newColor);

      // Explicitly replace colors in animate from/to attributes to ensure they're caught
      // Handle attributes in any order - from/to can appear before or after attributeName
      const animateFromRegex = new RegExp(
        `(<animate[^>]*attributeName\\s*=\\s*["']fill["'][^>]*from\\s*=\\s*["'])#${hexPattern}(["'])`,
        "gi"
      );
      modifiedSvg = modifiedSvg.replace(animateFromRegex, `$1${newColor}$2`);

      // Also handle from before attributeName
      const animateFromRegex2 = new RegExp(
        `(<animate[^>]*from\\s*=\\s*["'])#${hexPattern}(["'][^>]*attributeName\\s*=\\s*["']fill["'])`,
        "gi"
      );
      modifiedSvg = modifiedSvg.replace(animateFromRegex2, `$1${newColor}$2`);

      const animateToRegex = new RegExp(
        `(<animate[^>]*attributeName\\s*=\\s*["']fill["'][^>]*to\\s*=\\s*["'])#${hexPattern}(["'])`,
        "gi"
      );
      modifiedSvg = modifiedSvg.replace(animateToRegex, `$1${newColor}$2`);

      // Also handle to before attributeName
      const animateToRegex2 = new RegExp(
        `(<animate[^>]*to\\s*=\\s*["'])#${hexPattern}(["'][^>]*attributeName\\s*=\\s*["']fill["'])`,
        "gi"
      );
      modifiedSvg = modifiedSvg.replace(animateToRegex2, `$1${newColor}$2`);

      // Also match 6-digit format in any case with flexible whitespace for specific attributes
      // This will match: fill="#7c37ef", fill='#7C37EF', fill = "#7C37ef", etc.
      const regex6 = new RegExp(`(fill\\s*=\\s*["'])#${hexPattern}(["'])`, "g");
      modifiedSvg = modifiedSvg.replace(regex6, `$1${newColor}$2`);

      // Also match colors in style attributes: style="fill:#7c37ef" or style='fill:#7C37EF'
      const styleRegex6 = new RegExp(
        `(style\\s*=\\s*["'][^"']*fill\\s*:\\s*)#${hexPattern}([^"']*["'])`,
        "g"
      );
      modifiedSvg = modifiedSvg.replace(styleRegex6, `$1${newColor}$2`);

      // Also match stop-color attributes: stop-color="#7c37ef" or stop-color='#7C37EF'
      const stopColorRegex6 = new RegExp(
        `(stop-color\\s*=\\s*["'])#${hexPattern}(["'])`,
        "g"
      );
      modifiedSvg = modifiedSvg.replace(stopColorRegex6, `$1${newColor}$2`);

      // Also match 3-digit shorthand format if the color can be shortened
      // (e.g., #aabbcc -> #abc, but only if all pairs are the same)
      if (
        normalizedHexValue.length === 6 &&
        normalizedHexValue[0] === normalizedHexValue[1] &&
        normalizedHexValue[2] === normalizedHexValue[3] &&
        normalizedHexValue[4] === normalizedHexValue[5]
      ) {
        const shorthand = `${normalizedHexValue[0]}${normalizedHexValue[2]}${normalizedHexValue[4]}`;
        const shorthandPattern = shorthand
          .split("")
          .map((char) => `[${char}${char.toUpperCase()}]`)
          .join("");
        const regex3 = new RegExp(
          `(fill\\s*=\\s*["'])#${shorthandPattern}(["'])`,
          "g"
        );
        modifiedSvg = modifiedSvg.replace(regex3, `$1${newColor}$2`);

        // Also match 3-digit shorthand in style attributes
        const styleRegex3 = new RegExp(
          `(style\\s*=\\s*["'][^"']*fill\\s*:\\s*)#${shorthandPattern}([^"']*["'])`,
          "g"
        );
        modifiedSvg = modifiedSvg.replace(styleRegex3, `$1${newColor}$2`);

        // Also match 3-digit shorthand in stop-color attributes
        const stopColorRegex3 = new RegExp(
          `(stop-color\\s*=\\s*["'])#${shorthandPattern}(["'])`,
          "g"
        );
        modifiedSvg = modifiedSvg.replace(stopColorRegex3, `$1${newColor}$2`);
      }
    });

    // Convert to data URL using modified SVG
    const svgBlob = new Blob([modifiedSvg], {
      type: "image/svg+xml;charset=utf-8",
    });

    return {
      dataUrl: URL.createObjectURL(svgBlob),
      effectiveSecondaryColor: calculatedSecondary,
      effectiveTertiaryColor: calculatedTertiary,
    };
  }, [svgContent, primaryColor, secondaryColor, tertiaryColor]);

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
