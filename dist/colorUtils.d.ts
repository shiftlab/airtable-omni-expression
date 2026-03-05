/**
 * Lighten a hex color by a percentage
 * @param hex - The hex color to lighten
 * @param percent - Percentage to lighten (0-100), default 60
 */
export declare function lightenHex(hex: string, percent?: number): string;
/**
 * Generate two tints from a base color
 * @param baseColor - The base hex color
 * @returns An object with base and light tint colors
 */
export declare function generateTints(baseColor: string): {
    base: string;
    tint1: string;
    tint2: string;
};
export declare function hexToHsl(hex: string): {
    h: number;
    s: number;
    l: number;
};
export declare function isNeutralHex(hex: string): boolean;
/**
 * Calculate the relative luminance (brightness) of a hex color
 * Uses the standard relative luminance formula: L = 0.2126*R + 0.7152*G + 0.0722*B
 * @param hex - The hex color (supports both 3 and 6 digit formats)
 * @returns A value between 0 (darkest) and 1 (lightest)
 */
export declare function getColorBrightness(hex: string): number;
