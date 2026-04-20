import { OmniAnimationFileName, isGreetingAnimationFile } from "./animationAssets";
export { OmniAnimationFileName, isGreetingAnimationFile };
export interface OmniExpressionProps {
    fileName: OmniAnimationFileName;
    width?: number;
    height?: number;
    primaryColor: string;
    secondaryColor?: string;
    /** When true, renders the static (non-animated) version of the asset. Use for prefers-reduced-motion. */
    prefersReducedMotion?: boolean;
    /**
     * When false, SMIL animations use a single iteration (`repeatCount="1"`) and freeze on the last frame.
     * When omitted, greetings (`OMNI_Greeting_*`) default to false; other assets default to true (loop).
     */
    shouldLoop?: boolean;
}
export declare function OmniExpression({ fileName, width, height, primaryColor, secondaryColor, prefersReducedMotion, shouldLoop, }: OmniExpressionProps): import("react/jsx-runtime").JSX.Element | null;
