export enum WhiskeyStyleId {
  SingleMaltScotch = "single-malt-scotch",
  BlendedScotch = "blended-scotch",
  BlendedMaltScotch = "blended-malt-scotch",
  Bourbon = "bourbon",
  StraightBourbon = "straight-bourbon",
  RyeWhiskey = "rye-whiskey",
  TennesseeWhiskey = "tennessee-whiskey",
  IrishWhiskey = "irish-whiskey",
  SinglePotStill = "single-pot-still",
  JapaneseWhisky = "japanese-whisky",
  CanadianWhisky = "canadian-whisky",
}

export interface WhiskeyStyle {
  id: WhiskeyStyleId;
  label: string;
}
