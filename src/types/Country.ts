export enum CountryId {
  Scotland = "scotland",
  Japan = "japan",
  UnitedStates = "united-states",
  Ireland = "ireland",
  Canada = "canada",
  Taiwan = "taiwan",
}

export interface Country {
  id: CountryId;
  label: string;
}
