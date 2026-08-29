export enum SpiceLevel {
  None = 'NONE',
  Mild = 'MILD',
  Medium = 'MEDIUM',
  Hot = 'HOT',
}

export const SpiceLevelLabel: Record<SpiceLevel, string> = {
  [SpiceLevel.None]: '',
  [SpiceLevel.Mild]: '🌶️',
  [SpiceLevel.Medium]: '🌶️🌶️',
  [SpiceLevel.Hot]: '🌶️🌶️🌶️',
};
