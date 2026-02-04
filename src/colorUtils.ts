/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Lighten a hex color by a percentage
 * @param hex - The hex color to lighten
 * @param percent - Percentage to lighten (0-100), default 60
 */
export function lightenHex(hex: string, percent: number = 60): string {
  const rgb = hexToRgb(hex);
  const r = Math.min(255, rgb.r + (255 - rgb.r) * (percent / 100));
  const g = Math.min(255, rgb.g + (255 - rgb.g) * (percent / 100));
  const b = Math.min(255, rgb.b + (255 - rgb.b) * (percent / 100));
  return rgbToHex(r, g, b);
}

/**
 * Generate two tints from a base color
 * @param baseColor - The base hex color
 * @returns An object with base and light tint colors
 */
export function generateTints(baseColor: string) {
  return {
    base: baseColor,
    tint1: lightenHex(baseColor, 60), // Light tint (similar to #bfaefc from original)
    tint2: lightenHex(baseColor, 80), // Even lighter tint
  };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const r1 = r / 255;
  const g1 = g / 255;
  const b1 = b / 255;
  const max = Math.max(r1, g1, b1);
  const min = Math.min(r1, g1, b1);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r1:
        h = (g1 - b1) / d + (g1 < b1 ? 6 : 0);
        break;
      case g1:
        h = (b1 - r1) / d + 2;
        break;
      case b1:
        h = (r1 - g1) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function isNeutralHex(hex: string): boolean {
  const normalized = hex.toLowerCase();
  return (
    normalized === "#ffffff" ||
    normalized === "#fff" ||
    normalized === "#000000" ||
    normalized === "#000"
  );
}

/**
 * Calculate the relative luminance (brightness) of a hex color
 * Uses the standard relative luminance formula: L = 0.2126*R + 0.7152*G + 0.0722*B
 * @param hex - The hex color (supports both 3 and 6 digit formats)
 * @returns A value between 0 (darkest) and 1 (lightest)
 */
export function getColorBrightness(hex: string): number {
  // Normalize 3-digit hex to 6-digit
  let normalizedHex = hex.toLowerCase();
  if (normalizedHex.length === 4) {
    // #abc -> #aabbcc
    normalizedHex = `#${normalizedHex[1]}${normalizedHex[1]}${normalizedHex[2]}${normalizedHex[2]}${normalizedHex[3]}${normalizedHex[3]}`;
  }

  const rgb = hexToRgb(normalizedHex);
  // Normalize RGB values to 0-1 range
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  // Apply gamma correction
  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Calculate relative luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}
