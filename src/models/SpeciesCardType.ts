export interface SpeciesCardType {
  stages?:
    | {
        larva: undefined | number | string;
        adult: undefined | number | string;
        pupa: undefined | number | string;
        egg: undefined | number | string;
      }
    | undefined;
  current_stage?: string;
  nickname?: string;
  taxon_id?: number;
  imgSrc?: string;
  id: string;
}