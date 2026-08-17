export enum SpiceLevel {
  None = "NONE",
  Mild = "MILD",
  Medium = "MEDIUM",
  Hot = "HOT",
}

export const SpiceLevelLabel: Record<SpiceLevel, string> = {
  [SpiceLevel.None]: "ללא חריפות",
  [SpiceLevel.Mild]: "חריף מעט",
  [SpiceLevel.Medium]: "חריף בינוני",
  [SpiceLevel.Hot]: "חריף מאוד",
};
