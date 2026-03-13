import { OmniAnimationFileName } from "./animationAssets";
export { OmniAnimationFileName };
export interface OmniExpressionProps {
    fileName: OmniAnimationFileName;
    width?: number;
    height?: number;
    primaryColor: string;
    secondaryColor?: string;
    tertiaryColor?: string;
    /** When true, renders the static (non-animated) version of the asset. Use for prefers-reduced-motion. */
    prefersReducedMotion?: boolean;
}
export declare function OmniExpression({ fileName, width, height, primaryColor, secondaryColor, tertiaryColor, prefersReducedMotion, }: OmniExpressionProps): import("react/jsx-runtime").JSX.Element | null;
