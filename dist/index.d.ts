import { OmniAnimationFileName } from "./animationAssets";
export { OmniAnimationFileName };
export interface OmniExpressionProps {
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
export declare function OmniExpression({ fileName, width, height, primaryColor, secondaryColor, tertiaryColor, }: OmniExpressionProps): import("react/jsx-runtime").JSX.Element | null;
