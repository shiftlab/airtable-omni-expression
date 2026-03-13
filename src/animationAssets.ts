import OMNI_Expression_001_Rest from "./animations/OMNI_Expression_001_Rest.svg";
import OMNI_Expression_002_HumanAssistance from "./animations/OMNI_Expression_002_HumanAssistance.svg";
import OMNI_Expression_003_Curiosity from "./animations/OMNI_Expression_003_Curiosity.svg";
import OMNI_Expression_004_Excited from "./animations/OMNI_Expression_004_Excited.svg";
import OMNI_Expression_005_HumanAssistance from "./animations/OMNI_Expression_005_HumanAssistance.svg";
import OMNI_Greeting_001_SunEnergy from "./animations/OMNI_Greeting_001_SunEnergy.svg";
import OMNI_Greeting_002_Bloom from "./animations/OMNI_Greeting_002_Bloom.svg";
import OMNI_Greeting_003_Bloom from "./animations/OMNI_Greeting_003_Bloom.svg";
import OMNI_Greeting_004_DeepResearch from "./animations/OMNI_Greeting_004_DeepResearch.svg";
import OMNI_Greeting_005_Updating from "./animations/OMNI_Greeting_005_Updating.svg";
import OMNI_Loaders_001_General from "./animations/OMNI_Loaders_001_General.svg";
import OMNI_Loaders_002_Building from "./animations/OMNI_Loaders_002_Building.svg";
import OMNI_Loaders_003_DeepAnalysis from "./animations/OMNI_Loaders_003_DeepAnalysis.svg";
import OMNI_Loaders_004_WaitingForInput from "./animations/OMNI_Loaders_004_WaitingForInput.svg";
import OMNI_Expression_001_Rest_static from "./animations/static/OMNI_Expression_001_Rest_snapshot.svg";
import OMNI_Expression_002_HumanAssistance_static from "./animations/static/OMNI_Expression_002_HumanAssistance_snapshot.svg";
import OMNI_Expression_003_Curiosity_static from "./animations/static/OMNI_Expression_003_Curiosity_snapshot.svg";
import OMNI_Expression_004_Excited_static from "./animations/static/OMNI_Expression_004_Excited_snapshot.svg";
import OMNI_Expression_005_HumanAssistance_static from "./animations/static/OMNI_Expression_005_HumanAssistance_snapshot.svg";
import OMNI_Greeting_001_SunEnergy_static from "./animations/static/OMNI_Greeting_001_SunEnergy_snapshot.svg";
import OMNI_Greeting_002_Bloom_static from "./animations/static/OMNI_Greeting_002_Bloom_snapshot.svg";
import OMNI_Greeting_003_Bloom_static from "./animations/static/OMNI_Greeting_003_Bloom_snapshot.svg";
import OMNI_Greeting_004_DeepResearch_static from "./animations/static/OMNI_Greeting_004_DeepResearch_snapshot.svg";
import OMNI_Greeting_005_Updating_static from "./animations/static/OMNI_Greeting_005_Updating_snapshot.svg";
import OMNI_Loaders_001_General_static from "./animations/static/OMNI_Loaders_001_General_snapshot.svg";
import OMNI_Loaders_002_Building_static from "./animations/static/OMNI_Loaders_002_Building_snapshot.svg";
import OMNI_Loaders_003_DeepAnalysis_static from "./animations/static/OMNI_Loaders_003_DeepAnalysis_snapshot.svg";
import OMNI_Loaders_004_WaitingForInput_static from "./animations/static/OMNI_Loaders_004_WaitingForInput_snapshot.svg";

export enum OmniAnimationFileName {
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
  OMNI_Loaders_004_WaitingForInput = "OMNI_Loaders_004_WaitingForInput.svg",
}

export const SVG_CONTENT_MAP: Record<OmniAnimationFileName, string> = {
  [OmniAnimationFileName.OMNI_Expression_001_Rest]: OMNI_Expression_001_Rest,
  [OmniAnimationFileName.OMNI_Expression_002_HumanAssistance]:
    OMNI_Expression_002_HumanAssistance,
  [OmniAnimationFileName.OMNI_Expression_003_Curiosity]:
    OMNI_Expression_003_Curiosity,
  [OmniAnimationFileName.OMNI_Expression_004_Excited]:
    OMNI_Expression_004_Excited,
  [OmniAnimationFileName.OMNI_Expression_005_HumanAssistance]:
    OMNI_Expression_005_HumanAssistance,
  [OmniAnimationFileName.OMNI_Greeting_001_SunEnergy]:
    OMNI_Greeting_001_SunEnergy,
  [OmniAnimationFileName.OMNI_Greeting_002_Bloom]: OMNI_Greeting_002_Bloom,
  [OmniAnimationFileName.OMNI_Greeting_003_Bloom]: OMNI_Greeting_003_Bloom,
  [OmniAnimationFileName.OMNI_Greeting_004_DeepResearch]:
    OMNI_Greeting_004_DeepResearch,
  [OmniAnimationFileName.OMNI_Greeting_005_Updating]:
    OMNI_Greeting_005_Updating,
  [OmniAnimationFileName.OMNI_Loaders_001_General]: OMNI_Loaders_001_General,
  [OmniAnimationFileName.OMNI_Loaders_002_Building]: OMNI_Loaders_002_Building,
  [OmniAnimationFileName.OMNI_Loaders_003_DeepAnalysis]:
    OMNI_Loaders_003_DeepAnalysis,
  [OmniAnimationFileName.OMNI_Loaders_004_WaitingForInput]:
    OMNI_Loaders_004_WaitingForInput,
};

export const STATIC_SVG_CONTENT_MAP: Partial<Record<OmniAnimationFileName, string>> = {
  [OmniAnimationFileName.OMNI_Expression_001_Rest]: OMNI_Expression_001_Rest_static,
  [OmniAnimationFileName.OMNI_Expression_002_HumanAssistance]:
    OMNI_Expression_002_HumanAssistance_static,
  [OmniAnimationFileName.OMNI_Expression_003_Curiosity]:
    OMNI_Expression_003_Curiosity_static,
  [OmniAnimationFileName.OMNI_Expression_004_Excited]: OMNI_Expression_004_Excited_static,
  [OmniAnimationFileName.OMNI_Expression_005_HumanAssistance]:
    OMNI_Expression_005_HumanAssistance_static,
  [OmniAnimationFileName.OMNI_Greeting_001_SunEnergy]:
    OMNI_Greeting_001_SunEnergy_static,
  [OmniAnimationFileName.OMNI_Greeting_002_Bloom]: OMNI_Greeting_002_Bloom_static,
  [OmniAnimationFileName.OMNI_Greeting_003_Bloom]: OMNI_Greeting_003_Bloom_static,
  [OmniAnimationFileName.OMNI_Greeting_004_DeepResearch]:
    OMNI_Greeting_004_DeepResearch_static,
  [OmniAnimationFileName.OMNI_Greeting_005_Updating]: OMNI_Greeting_005_Updating_static,
  [OmniAnimationFileName.OMNI_Loaders_001_General]: OMNI_Loaders_001_General_static,
  [OmniAnimationFileName.OMNI_Loaders_002_Building]: OMNI_Loaders_002_Building_static,
  [OmniAnimationFileName.OMNI_Loaders_003_DeepAnalysis]:
    OMNI_Loaders_003_DeepAnalysis_static,
  [OmniAnimationFileName.OMNI_Loaders_004_WaitingForInput]:
    OMNI_Loaders_004_WaitingForInput_static,
};
