export declare enum OmniAnimationFileName {
    OMNI_Expression_001_Rest = "OMNI_Expression_001_Rest.svg",
    OMNI_Expression_002_HumanAssistance = "OMNI_Expression_002_HumanAssistance.svg",
    OMNI_Expression_003_Curiosity = "OMNI_Expression_003_Curiosity.svg",
    OMNI_Expression_004_Excited = "OMNI_Expression_004_Excited.svg",
    OMNI_Expression_005_HumanAssistance = "OMNI_Expression_005_HumanAssistance.svg",
    OMNI_Greeting_001_SunEnergy = "OMNI_Greeting_001_SunEnergy.svg",
    OMNI_Greeting_002_Bloom = "OMNI_Greeting_002_Bloom.svg",
    OMNI_Greeting_003_Bloom = "OMNI_Greeting_003_Bloom.svg",
    OMNI_Greeting_004_DeepResearch = "OMNI_Greeting_004_DeepResearch.svg",
    OMNI_Greeting_005_Updating = "OMNI_Greeting_005_Updating.svg",
    OMNI_Loaders_001_General = "OMNI_Loaders_001_General.svg",
    OMNI_Loaders_002_Building = "OMNI_Loaders_002_Building.svg",
    OMNI_Loaders_003_DeepAnalysis = "OMNI_Loaders_003_DeepAnalysis.svg",
    OMNI_Loaders_004_WaitingForInput = "OMNI_Loaders_004_WaitingForInput.svg"
}
export declare const SVG_CONTENT_MAP: Record<OmniAnimationFileName, string>;
/** Static SVG used when `prefersReducedMotion` is true (all animations except Building loader). */
export declare const REDUCED_MOTION_FALLBACK_SNAPSHOT: string;
/** Static SVG for Building loader when `prefersReducedMotion` is true. */
export declare const REDUCED_MOTION_BUILDING_SNAPSHOT: string;
export declare function getReducedMotionSvgSource(fileName: OmniAnimationFileName): string;
/** True for `OMNI_Greeting_*` assets — used to default one-shot playback in `OmniExpression`. */
export declare function isGreetingAnimationFile(fileName: OmniAnimationFileName): boolean;
