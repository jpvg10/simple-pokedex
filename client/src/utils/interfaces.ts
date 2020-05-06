export interface IPokedex {
  id: string;
  name: string;
}

export interface IPokemonBasic {
  id: string;
  name: string;
}

export interface IPokedexDetail {
  name: string;
  pokemon: IPokemonBasic[];
}

export interface IPokemonPicture {
  name: string;
  pictureUrl: string;
}

export interface IStat {
  name: string;
  baseStat: string;
}

export interface IAbility {
  name: string;
  effect: string;
}

export interface IDefense {
  type: string;
  value: number;
}

export interface IPokemonDetail {
  name: string;
  number: string;
  frontPictureUrl: string;
  backPictureUrl: string;
  types: string[];
  stats: IStat[];
  abilities: IAbility[];
  defenses: IDefense[];
}
